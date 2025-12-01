import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '../context/FinancialContext';
import { TransactionType } from '../types';

export const AddTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { addTransaction } = useFinance();
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = () => {
    if (!amount) return;
    
    addTransaction({
        id: Date.now().toString(),
        accountId: '1', // Default to main for mock
        amount: parseFloat(amount),
        type,
        category,
        date: new Date().toISOString(),
        description: description || category
    });
    
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen bg-background-dark z-50 md:bg-black/50 md:fixed md:inset-0 md:items-center md:justify-center">
      {/* Container for Desktop Centering */}
      <div className="flex flex-col h-full md:h-auto md:w-full md:max-w-lg md:bg-background-dark md:rounded-2xl md:border md:border-white/10 md:shadow-2xl md:overflow-hidden">
          <header className="px-4 py-4 flex items-center justify-between border-b border-white/5 bg-background-dark">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined text-white">close</span>
            </button>
            <h1 className="text-lg font-bold">Add Transaction</h1>
            <button onClick={handleSubmit} className="text-primary font-bold px-2 hover:text-primary-dark transition-colors">Save</button>
          </header>

          <div className="px-6 pt-4 pb-6 space-y-6 flex-1 bg-background-dark">
            {/* Toggle */}
            <div className="bg-background-card p-1 rounded-xl flex">
                <button 
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${type === TransactionType.EXPENSE ? 'bg-background-input text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setType(TransactionType.EXPENSE)}
                >
                    Expense
                </button>
                <button 
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${type === TransactionType.INCOME ? 'bg-background-input text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setType(TransactionType.INCOME)}
                >
                    Income
                </button>
            </div>

            {/* Amount Input */}
            <div className="bg-background-card rounded-2xl p-6 flex flex-col items-center justify-center gap-2 border border-primary/20">
                <label className="text-sm text-gray-400 uppercase tracking-wide font-bold">Amount</label>
                <div className="flex items-center text-white">
                    <span className="text-3xl font-bold mr-1">$</span>
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        autoFocus
                        className="bg-transparent text-4xl font-bold w-40 text-center focus:outline-none placeholder-gray-600"
                    />
                </div>
            </div>

            {/* Details Form */}
            <div className="bg-background-card rounded-2xl overflow-hidden space-y-px border border-white/5">
                <div className="p-4 flex items-center gap-4 bg-background-card hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-background-input flex items-center justify-center text-gray-400">
                        <span className="material-symbols-outlined">category</span>
                    </div>
                    <div className="flex-1">
                        <label className="text-xs text-gray-500 block">Category</label>
                        <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-transparent text-white w-full focus:outline-none py-1 appearance-none font-medium cursor-pointer"
                        >
                            <option value="Food" className="bg-background-card">Food</option>
                            <option value="Rent" className="bg-background-card">Rent</option>
                            <option value="Transport" className="bg-background-card">Transport</option>
                            <option value="Shopping" className="bg-background-card">Shopping</option>
                            <option value="Salary" className="bg-background-card">Salary</option>
                            <option value="Entertainment" className="bg-background-card">Entertainment</option>
                        </select>
                    </div>
                    <span className="material-symbols-outlined text-gray-500">expand_more</span>
                </div>

                <div className="h-px bg-white/5 mx-4"></div>

                <div className="p-4 flex items-center gap-4 bg-background-card hover:bg-white/5 transition-colors">
                     <div className="w-10 h-10 rounded-full bg-background-input flex items-center justify-center text-gray-400">
                        <span className="material-symbols-outlined">edit</span>
                    </div>
                    <div className="flex-1">
                         <label className="text-xs text-gray-500 block">Note</label>
                        <input 
                            type="text" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description (Optional)"
                            className="bg-transparent text-white w-full focus:outline-none py-1 font-medium placeholder-gray-600"
                        />
                    </div>
                </div>

                <div className="h-px bg-white/5 mx-4"></div>

                <div className="p-4 flex items-center gap-4 bg-background-card">
                     <div className="w-10 h-10 rounded-full bg-background-input flex items-center justify-center text-gray-400">
                        <span className="material-symbols-outlined">calendar_today</span>
                    </div>
                    <div className="flex-1">
                         <label className="text-xs text-gray-500 block">Date</label>
                        <p className="font-medium text-white">Today</p>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};