import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useFinance } from '../context/FinancialContext';

const COLORS = ['#8b5cf6', '#ef4444', '#3b82f6', '#10b981', '#f59e0b'];

export const Transactions: React.FC = () => {
  const { transactions, deleteTransaction } = useFinance();
  const [pieData, setPieData] = useState<any[]>([]);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    // Process data for chart (Group expenses by category)
    const expenses = transactions.filter(t => t.type === 'EXPENSE');
    const spent = expenses.reduce((sum, t) => sum + t.amount, 0);
    setTotalSpent(spent);

    const catMap = new Map<string, number>();
    expenses.forEach(t => {
        catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount);
    });

    const data = Array.from(catMap.entries()).map(([name, value]) => ({ name, value }));
    setPieData(data);

  }, [transactions]);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if(window.confirm('Delete this transaction?')) {
        deleteTransaction(id);
    }
  };

  return (
    <div className="flex flex-col h-full pb-20 md:pb-6">
        <header className="px-6 py-4 flex items-center sticky top-0 bg-background-dark/90 backdrop-blur-md z-20 gap-4 md:bg-transparent">
            <h1 className="text-xl font-bold flex-1 md:text-2xl">Activity & Reports</h1>
        </header>

        <div className="flex-1 overflow-y-auto px-6 no-scrollbar">
            {/* Filters */}
            <div className="flex gap-3 py-2 overflow-x-auto no-scrollbar mb-6">
                <button className="whitespace-nowrap px-4 py-2 bg-primary/20 text-primary text-sm font-medium rounded-full flex items-center gap-1 hover:bg-primary/30 transition-colors">
                    All Accounts <span className="material-symbols-outlined text-base">expand_more</span>
                </button>
                <button className="whitespace-nowrap px-4 py-2 bg-background-card text-white text-sm font-medium rounded-full flex items-center gap-1 border border-white/5 hover:bg-white/10 transition-colors">
                    Last 30 Days <span className="material-symbols-outlined text-base">expand_more</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart Section */}
                <div className="bg-background-card rounded-2xl p-6 border border-white/5">
                    <h2 className="text-lg font-bold mb-4">Expense Breakdown</h2>
                    <div className="h-64 relative">
                        {pieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                    cornerRadius={6}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#192f33', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">No data</div>
                        )}
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-gray-400 text-sm">Total Spent</span>
                            <span className="text-2xl font-bold text-white">${totalSpent.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6">
                        {pieData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                <span className="text-sm text-gray-300 truncate">{entry.name}</span>
                                <span className="text-sm text-gray-500 ml-auto">{((entry.value / totalSpent) * 100).toFixed(0)}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Transaction List */}
                <div>
                    <h3 className="text-lg font-bold mb-4">History</h3>
                    <div className="flex flex-col gap-px bg-background-card rounded-xl overflow-hidden border border-white/5">
                        {transactions.map((t, idx) => (
                            <div key={t.id} className={`p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group ${idx !== transactions.length - 1 ? 'border-b border-white/5' : ''}`}>
                                <div className="w-10 h-10 rounded-lg bg-background-input flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-gray-300 text-xl">
                                        {t.category === 'Rent' ? 'home' : t.category === 'Salary' ? 'payments' : 'sell'}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-white truncate">{t.description}</p>
                                    <p className="text-xs text-gray-500">{new Date(t.date).toLocaleDateString()}</p>
                                </div>
                                <span className={`font-medium ${t.type === 'INCOME' ? 'text-accent-green' : 'text-accent-red'}`}>
                                    {t.type === 'INCOME' ? '+' : '-'}${Math.abs(t.amount).toFixed(2)}
                                </span>
                                <button 
                                    onClick={(e) => handleDelete(e, t.id)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-500 hover:text-accent-red transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                            </div>
                        ))}
                         {transactions.length === 0 && (
                            <div className="p-8 text-center text-gray-500">No transactions found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};