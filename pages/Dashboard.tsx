import React, { useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useFinance } from '../context/FinancialContext';

export const Dashboard: React.FC = () => {
  const { accounts, transactions, userName } = useFinance();
  const [balance, setBalance] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Calculate total balance
    const total = accounts.reduce((acc, curr) => acc + curr.balance, 0);
    setBalance(total);

    // Mock chart data generation based on history (simplified)
    const data = [
        { day: '1', val: total * 0.92 },
        { day: '5', val: total * 0.94 },
        { day: '10', val: total * 0.91 },
        { day: '15', val: total * 0.96 },
        { day: '20', val: total * 0.95 },
        { day: '25', val: total * 0.98 },
        { day: '30', val: total },
    ];
    setChartData(data);
  }, [accounts, transactions]);

  // Get recent transactions from context
  const recentTransactions = transactions.slice(0, 5);

  const income = transactions
    .filter(t => t.type === 'INCOME')
    .reduce((acc, t) => acc + t.amount, 0);
    
  const expense = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="flex flex-col h-full pb-20 md:pb-6">
      {/* Header */}
      <header className="px-6 py-6 flex justify-between items-center sticky top-0 bg-background-dark/80 backdrop-blur-md z-20 md:bg-transparent">
        <div>
            <h1 className="text-xl font-bold md:text-2xl">Dashboard</h1>
            <p className="text-gray-400 text-sm">Welcome back, {userName}</p>
        </div>
      </header>

      <div className="px-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column (Balance & Chart) */}
        <div className="md:col-span-7 lg:col-span-8 space-y-6">
            {/* Balance Card */}
            <div className="w-full bg-background-card rounded-2xl p-6 relative overflow-hidden shadow-lg border border-white/5">
                <div className="relative z-10">
                    <p className="text-gray-400 text-sm font-medium">Total Balance</p>
                    <h2 className="text-4xl font-bold mt-1 text-white">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                    <div className="flex items-center gap-1 mt-2">
                        <span className="text-accent-green text-sm font-semibold">+2.1%</span>
                        <span className="text-gray-500 text-sm">Last 30 Days</span>
                    </div>
                </div>
                
                {/* Chart */}
                <div className="h-48 md:h-64 -mx-6 -mb-6 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#13c8ec" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#13c8ec" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Tooltip content={<></>} />
                            <Area 
                                type="monotone" 
                                dataKey="val" 
                                stroke="#13c8ec" 
                                strokeWidth={3} 
                                fillOpacity={1} 
                                fill="url(#colorVal)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-accent-green/10 rounded-xl p-4 flex flex-col items-start gap-1 border border-accent-green/20">
                    <p className="text-accent-green text-xs font-bold uppercase tracking-wider">Income</p>
                    <p className="text-accent-green text-xl md:text-2xl font-bold">+${income.toLocaleString()}</p>
                </div>
                <div className="bg-accent-red/10 rounded-xl p-4 flex flex-col items-start gap-1 border border-accent-red/20">
                    <p className="text-accent-red text-xs font-bold uppercase tracking-wider">Expense</p>
                    <p className="text-accent-red text-xl md:text-2xl font-bold">-${expense.toLocaleString()}</p>
                </div>
            </div>
        </div>

        {/* Right Column (Recent Transactions) */}
        <div className="md:col-span-5 lg:col-span-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Recent Transactions</h3>
            </div>
            <div className="flex flex-col gap-3 flex-1">
                {recentTransactions.map(t => (
                    <div key={t.id} className="bg-background-card p-4 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer border border-white/5">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background-input flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-gray-300">
                                {t.category === 'Food' ? 'restaurant' : t.category === 'Transport' ? 'directions_bus' : t.category === 'Shopping' ? 'shopping_bag' : 'receipt'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white truncate">{t.description || t.category}</p>
                            <p className="text-xs text-gray-400">{new Date(t.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`font-bold ${t.type === 'INCOME' ? 'text-accent-green' : 'text-white'}`}>
                            {t.type === 'INCOME' ? '+' : '-'}${Math.abs(t.amount).toFixed(2)}
                        </span>
                    </div>
                ))}
                
                {recentTransactions.length === 0 && (
                    <div className="flex-1 flex items-center justify-center text-gray-500 text-sm italic">
                        No recent transactions
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};