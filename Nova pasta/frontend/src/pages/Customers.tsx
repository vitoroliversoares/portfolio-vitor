import React, { useState } from 'react';
import { Search, MessageCircle, MapPin } from 'lucide-react';

const MOCK_CUSTOMERS = [
  { id: '1', name: 'João Silva', phone: '5511999999999', ordersCount: 12, totalSpent: 450.00, address: 'Rua das Flores, 123' },
  { id: '2', name: 'Maria Oliveira', phone: '5511888888888', ordersCount: 3, totalSpent: 120.50, address: 'Av Paulista, 1000' },
  { id: '3', name: 'Carlos Santos', phone: '5511777777777', ordersCount: 1, totalSpent: 45.00, address: 'Rua Augusta, 400' },
];

export default function Customers() {
  const [customers] = useState(MOCK_CUSTOMERS);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        <p className="text-sm text-gray-500">Histórico de clientes e contatos do WhatsApp.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="relative w-72">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou número..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {customers.map(customer => (
            <div key={customer.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MessageCircle className="w-4 h-4 mr-1 text-green-500" />
                    +{customer.phone}
                  </div>
                </div>
                <div className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-lg">
                  {customer.ordersCount} pedidos
                </div>
              </div>
              
              <div className="flex items-start text-sm text-gray-600 mb-4 bg-gray-50 p-2 rounded-lg">
                <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                <span>{customer.address}</span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="text-gray-500">Gasto total:</span>
                  <span className="font-semibold text-gray-900 ml-1">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(customer.totalSpent)}
                  </span>
                </div>
                <button className="text-sm font-medium text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors flex items-center opacity-0 group-hover:opacity-100">
                  <MessageCircle className="w-4 h-4 mr-1" /> Mensagem
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}