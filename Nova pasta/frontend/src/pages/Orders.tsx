import React, { useState, useEffect } from 'react';
import { Plus, MoreVertical, CheckCircle2, Clock, Truck, FileText } from 'lucide-react';

const MOCK_ORDERS = [
  { id: '1', customer: 'João Silva', items: '2x X-Burger, 1x Coca Cola', status: 'PENDING', total: 45.00 },
  { id: '2', customer: 'Maria Oliveira', items: '1x Pizza Média', status: 'PREPARING', total: 60.00 },
  { id: '3', customer: 'Carlos Santos', items: '3x Açaí 500ml', status: 'DELIVERING', total: 45.00 },
  { id: '4', customer: 'Ana Clara', items: '1x Combo Casal', status: 'FINISHED', total: 110.00 },
];

const STATUS_COLUMNS = [
  { id: 'PENDING', title: 'Aguardando', icon: <FileText className="w-5 h-5 text-gray-500" />, bgColor: 'bg-gray-100', borderColor: 'border-gray-200' },
  { id: 'PREPARING', title: 'Em Preparo', icon: <Clock className="w-5 h-5 text-yellow-500" />, bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  { id: 'DELIVERING', title: 'Em Rota (Entrega)', icon: <Truck className="w-5 h-5 text-blue-500" />, bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  { id: 'FINISHED', title: 'Finalizado', icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, bgColor: 'bg-green-50', borderColor: 'border-green-200' },
];

export default function Orders() {
  const [orders, setOrders] = useState(MOCK_ORDERS);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedidos (Kanban)</h1>
          <p className="text-sm text-gray-500">Arraste e solte para atualizar o status do pedido.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Novo Pedido Manual
        </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {STATUS_COLUMNS.map(column => (
          <div key={column.id} className={`flex-shrink-0 w-80 rounded-xl border ${column.borderColor} bg-white shadow-sm flex flex-col`}>
            <div className={`p-4 border-b ${column.borderColor} ${column.bgColor} rounded-t-xl flex items-center justify-between`}>
              <div className="flex items-center">
                {column.icon}
                <h2 className="font-semibold text-gray-800 ml-2">{column.title}</h2>
              </div>
              <span className="bg-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                {orders.filter(o => o.status === column.id).length}
              </span>
            </div>
            
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50/50">
              {orders.filter(o => o.status === column.id).map(order => (
                <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-gray-500">#{order.id}</span>
                    <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{order.customer}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{order.items}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                    <span className="font-semibold text-green-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.total)}
                    </span>
                    <span className="text-xs text-gray-400">14:30</span>
                  </div>
                </div>
              ))}
              {orders.filter(o => o.status === column.id).length === 0 && (
                <div className="text-center py-8 text-sm text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                  Nenhum pedido aqui
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}