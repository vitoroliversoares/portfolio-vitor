import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Package, Users, DollarSign, Menu, X, Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Finance from './pages/Finance';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Pedidos (Kanban)', icon: <Home className="w-5 h-5" /> },
    { path: '/products', label: 'Estoque / Produtos', icon: <Package className="w-5 h-5" /> },
    { path: '/customers', label: 'Clientes', icon: <Users className="w-5 h-5" /> },
    { path: '/finance', label: 'Financeiro', icon: <DollarSign className="w-5 h-5" /> },
  ];

  const activeClass = "bg-blue-600 text-white";
  const inactiveClass = "text-gray-300 hover:bg-gray-800 hover:text-white";

  return (
    <div className="flex h-screen bg-gray-900 text-white w-64 flex-shrink-0 flex-col transition-all">
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <Smartphone className="w-6 h-6 mr-2 text-green-400" />
        <span className="font-bold text-lg tracking-wider">ZapDelivery</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 transition-colors ${
                  location.pathname === item.path ? activeClass : inactiveClass
                }`}
              >
                {item.icon}
                <span className="ml-3 font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
        v1.0.0
      </div>
    </div>
  );
}

function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 h-full">
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/finance" element={<Finance />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}