import React from 'react';
import { useFinance } from '../context/FinancialContext';

export const Accounts: React.FC = () => {
  const { accounts, clearAllData } = useFinance();

  const netWorth = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  const handleReset = () => {
    if (window.confirm("Are you sure? This will delete all your data and return you to the setup screen. This cannot be undone.")) {
        clearAllData();
    }
  };

  return (
    <div className="flex flex-col h-full pb-20 md:pb-6">
      <header className="px-6 py-4 flex items-center justify-between sticky top-0 bg-background-dark/90 backdrop-blur-md z-20 md:bg-transparent">
        <h1 className="text-xl font-bold flex-1 text-center md:text-left md:text-2xl">Accounts</h1>
        <button className="text-primary font-bold text-sm absolute right-6 md:relative md:right-0 hover:text-primary-dark transition-colors">Edit</button>
      </header>

      <div className="px-6 overflow-y-auto no-scrollbar flex-1">
        {/* Net Worth Card */}
        <div className="bg-background-card p-6 rounded-2xl shadow-lg mb-8 border border-white/5 md:max-w-md">
            <p className="text-gray-400 text-sm font-medium">Total Net Worth</p>
            <h2 className="text-4xl font-bold text-white mt-1">${netWorth.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
        </div>

        <h3 className="text-lg font-bold mb-4">My Accounts</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {accounts.map((acc, index) => (
                <div key={acc.id} className="bg-background-card p-5 rounded-xl flex items-center justify-between border border-white/5 hover:border-primary/30 transition-all cursor-pointer shadow-sm group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors">
                            <span className="material-symbols-outlined">{acc.icon}</span>
                        </div>
                        <div>
                            <p className="font-semibold text-white group-hover:text-primary transition-colors">{acc.name}</p>
                            <p className={`text-sm font-medium ${acc.balance < 0 ? 'text-accent-red' : 'text-gray-400'}`}>
                                {acc.balance < 0 ? '-' : ''}${Math.abs(acc.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                    <span className="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors">chevron_right</span>
                </div>
            ))}
        </div>

        {/* Danger Zone */}
        <div className="border-t border-white/10 pt-6">
            <button 
                onClick={handleReset}
                className="text-accent-red text-sm font-semibold flex items-center gap-2 hover:bg-accent-red/10 px-4 py-2 rounded-lg transition-colors"
            >
                <span className="material-symbols-outlined text-lg">delete_forever</span>
                Reset App Data
            </button>
        </div>
      </div>

       <div className="fixed bottom-24 right-6 md:bottom-8">
            <button className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 text-background-dark hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-3xl">add</span>
            </button>
       </div>
    </div>
  );
};