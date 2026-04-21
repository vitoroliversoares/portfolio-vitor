import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

const prisma = new PrismaClient({ adapter: null }); // For Prisma 7+ with sqlite

// --- WhatsApp Setup ---
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

let qrCodeData = '';
let isClientReady = false;

client.on('qr', (qr) => {
    console.log('QR Code recebido, escaneie-o.');
    qrcode.generate(qr, {small: true});
    qrCodeData = qr;
    io.emit('whatsapp_qr', qr);
});

client.on('ready', () => {
    console.log('Cliente WhatsApp está pronto!');
    isClientReady = true;
    io.emit('whatsapp_ready', true);
});

client.on('message', async msg => {
    if (msg.body === '!ping') {
        msg.reply('pong');
    }
});

// Disable WhatsApp initialization during dev if it crashes, but let's try it.
client.initialize().catch(err => {
    console.error("Erro ao inicializar WhatsApp:", err);
});

// --- API Routes ---
app.get('/api/status', (req, res) => {
    res.json({ ready: isClientReady, qr: isClientReady ? null : qrCodeData });
});

// Products
app.get('/api/products', async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

app.post('/api/products', async (req, res) => {
    const { name, description, price, stock } = req.body;
    const product = await prisma.product.create({
        data: { name, description, price, stock }
    });
    res.json(product);
});

// Orders
app.get('/api/orders', async (req, res) => {
    const orders = await prisma.order.findMany({ include: { items: true, customer: true } });
    res.json(orders);
});

app.post('/api/orders', async (req, res) => {
    const { items, total, customerId } = req.body; // items: { productId, quantity, price }[]
    const order = await prisma.order.create({
        data: {
            total,
            customerId,
            items: {
                create: items
            }
        }
    });
    io.emit('new_order', order);
    res.json(order);
});

// Customers
app.get('/api/customers', async (req, res) => {
    const customers = await prisma.customer.findMany();
    res.json(customers);
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});