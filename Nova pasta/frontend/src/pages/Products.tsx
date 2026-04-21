import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, AlertCircle } from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: '1', name: 'X-Burger', category: 'Lanches', price: 25.00, stock: 50 },
  { id: '2', name: 'Coca Cola 2L', category: 'Bebidas', price: 12.00, stock: 120 },
  { id: '3', name: 'Pizza Média Calabresa', category: 'Pizzas', price: 45.00, stock: 20 },
  { id: '4', name: 'Embalagem Padrão', category: 'Insumos', price: 1.50, stock: 5 }, // Low stock
];

export default function Products() {
  const [products] = useState(MOCK_PRODUCTS);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estoque e Produtos</h1>
          <p className="text-sm text-gray-500">Gerencie seu cardápio e insumos.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Novo Produto
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="relative w-64">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm">
              Filtrar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-6 font-semibold text-sm text-gray-600">Nome</th>
                <th className="py-3 px-6 font-semibold text-sm text-gray-600">Categoria</th>
                <th className="py-3 px-6 font-semibold text-sm text-gray-600">Preço</th>
                <th className="py-3 px-6 font-semibold text-sm text-gray-600">Estoque</th>
                <th className="py-3 px-6 font-semibold text-sm text-gray-600 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm text-gray-800 font-medium">{product.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{product.category}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-800 font-medium">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    {product.stock <= 10 ? (
                      <span className="flex items-center text-red-600 font-medium">
                        <AlertCircle className="w-4 h-4 mr-1" /> {product.stock} un
                      </span>
                    ) : (
                      <span className="text-green-600 font-medium">{product.stock} un</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-right">
                    <button className="text-blue-500 hover:text-blue-700 mr-3 p-1 rounded-md hover:bg-blue-50 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-sm text-gray-500 flex justify-between">
          <span>Mostrando {products.length} produtos</span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100">Anterior</button>
            <button className="px-3 py-1 border rounded-md bg-white hover:bg-gray-100">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
}