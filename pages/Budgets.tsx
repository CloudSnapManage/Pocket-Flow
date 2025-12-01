import React from 'react';
import { useFinance } from '../context/FinancialContext';

export const Budgets: React.FC = () => {
  const { budgets } = useFinance();

  const totalBudget = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const percentUsed = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

  return (
    <div className="flex flex-col h-full pb-20 md:pb-6">
      <header className="px-6 py-4 flex items-center justify-between sticky top-0 bg-background-dark/90 backdrop-blur-md z-20 md:bg-transparent">
        <h1 className="text-xl font-bold md:text-2xl">Budgets</h1>
        <button className="w-10 h-10 rounded-full bg-background-card flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-md">
            <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      <div className="px-6 overflow-y-auto no-scrollbar">
        {/* Summary Card */}
        <div className="bg-background-card p-6 rounded-2xl shadow-sm mb-8 border border-white/5 md:max-w-xl">
            <p className="text-gray-400 text-sm font-medium">Monthly Budget</p>
            <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold text-white">${(totalBudget - totalSpent).toLocaleString()}</span>
                <span className="text-gray-400 font-medium">Remaining</span>
            </div>
            
            <div className="mt-4">
                <div className="h-3 w-full bg-background-input rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${percentUsed}%` }}
                    ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
                    <span>Spent: ${totalSpent.toLocaleString()}</span>
                    <span>Total: ${totalBudget.toLocaleString()}</span>
                </div>
            </div>
        </div>

        <h2 className="text-xl font-bold mb-4">Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgets.map(budget => {
                const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
                const isOver = budget.spent > budget.limit;

                return (
                    <div key={budget.id} className="bg-background-card p-5 rounded-xl flex flex-col justify-between shadow-sm border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-opacity-20" style={{ backgroundColor: `${budget.color}20` }}>
                                    <span className="material-symbols-outlined text-2xl" style={{ color: budget.color }}>
                                        {budget.category === 'Groceries' ? 'shopping_cart' : 
                                         budget.category === 'Transport' ? 'directions_bus' : 
                                         budget.category === 'Shopping' ? 'shopping_bag' : 'stadia_controller'}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-lg">{budget.category}</p>
                                    <p className="text-sm text-gray-400">Monthly</p>
                                </div>
                            </div>
                            <button className="text-gray-500 hover:text-white">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                        </div>

                        <div>
                             <div className="flex justify-between text-sm mb-2">
                                <span className="text-white font-medium">${budget.spent.toLocaleString()}</span>
                                <span className="text-gray-500">of ${budget.limit.toLocaleString()}</span>
                             </div>
                             <div className="h-2 w-full bg-background-input rounded-full overflow-hidden">
                                <div 
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ 
                                        width: `${percentage}%`,
                                        backgroundColor: isOver ? '#ef4444' : budget.color 
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  );
};