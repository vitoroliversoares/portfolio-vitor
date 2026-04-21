import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

const MOCK_TRANSACTIONS = [
  { id: '1', description: 'Pedido #4 - Ana Clara', type: 'INCOME', amount: 110.00, date: '18 Abr 2026' },
  { id: '2', description: 'Compra Embalagens', type: 'EXPENSE', amount: 45.50, date: '18 Abr 2026' },
  { id: '3', description: 'Pedido #3 - Carlos Santos', type: 'INCOME', amount: 45.00, date: '18 Abr 2026' },
  { id: '4', description: 'Pedido #2 - Maria Oliveira', type: 'INCOME', amount: 60.00, date: '17 Abr 2026' },
];

export default function Finance() {
  const totalIncome = MOCK_TRANSACTIONS.filter(t => t.type === 'INCOME').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = MOCK_TRANSACTIONS.filter(t => t.type === 'EXPENSE').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-sm text-gray-500">Acompanhamento de caixa e transações.</p>
        </div>
        <button className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors text-sm font-medium">
          <Calendar className="w-4 h-4 mr-2" />
          Filtro: Abril 2026
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Receitas Brutas</p>
            <h2 className="text-3xl font-bold text-gray-900">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalIncome)}
            </h2>
          </div>
          <div className="bg-green-100 p-3 rounded-xl text-green-600">
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Despesas</p>
            <h2 className="text-3xl font-bold text-gray-900">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalExpense)}
            </h2>
          </div>
          <div className="bg-red-100 p-3 rounded-xl text-red-600">
            <TrendingDown className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-blue-600 p-6 rounded-2xl shadow-sm flex items-center justify-between text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm font-medium text-blue-200 mb-1">Lucro Líquido</p>
            <h2 className="text-3xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(balance)}
            </h2>
          </div>
          <div className="relative z-10 bg-blue-500 p-3 rounded-xl">
            <DollarSign className="w-8 h-8" />
          </div>
          {/* Decorative circle */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-8 -translate-y-8 blur-2xl"></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Últimas Transações</h3>
        </div>
        <div className="overflow-y-auto flex-1">
          <ul className="divide-y divide-gray-100">
            {MOCK_TRANSACTIONS.map(tx => (
              <li key={tx.id} className="p-5 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-4 ${tx.type === 'INCOME' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {tx.type === 'INCOME' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tx.description}</p>
                    <p className="text-sm text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <span className={`font-bold ${tx.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'INCOME' ? '+' : '-'} {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tx.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}