import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { StorageService } from '../services/storageService';
import { Account, Budget, RecurringTransaction, Transaction } from '../types';

interface FinancialContextType {
  accounts: Account[];
  transactions: Transaction[];
  budgets: Budget[];
  recurring: RecurringTransaction[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  initializeUser: (name: string, physicalBalance: number, digitalName: string, digitalBalance: number) => void;
  clearAllData: () => void;
  refreshData: () => void;
  isLoading: boolean;
  isOnboarded: boolean;
  userName: string;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export const FinancialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [recurring, setRecurring] = useState<RecurringTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userName, setUserName] = useState('');

  const refreshData = () => {
    setAccounts(StorageService.getAccounts());
    setTransactions(StorageService.getTransactions());
    setBudgets(StorageService.getBudgets());
    setRecurring(StorageService.getRecurring());
    setIsOnboarded(StorageService.isOnboarded());
    setUserName(StorageService.getUserProfile()?.name || '');
    setIsLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const initializeUser = (name: string, physicalBalance: number, digitalName: string, digitalBalance: number) => {
    StorageService.initializeUser(name, physicalBalance, digitalName, digitalBalance);
    refreshData();
  };

  const addTransaction = (transaction: Transaction) => {
    StorageService.addTransaction(transaction);
    refreshData(); // Reload data to reflect balance changes
  };

  const deleteTransaction = (id: string) => {
    const tx = transactions.find(t => t.id === id);
    if (!tx) return;

    // Manual balance revert logic for this mock
    const accounts = StorageService.getAccounts();
    const updatedAccounts = accounts.map(acc => {
      if (acc.id === tx.accountId) {
        const multiplier = tx.type === 'INCOME' ? -1 : 1; // Reverse operation
        return { ...acc, balance: acc.balance + (tx.amount * multiplier) };
      }
      return acc;
    });
    
    // Save reverted accounts
    localStorage.setItem('pf_accounts', JSON.stringify(updatedAccounts));
    
    // Filter out transaction
    const updatedTransactions = transactions.filter(t => t.id !== id);
    localStorage.setItem('pf_transactions', JSON.stringify(updatedTransactions));

    refreshData();
  };

  const clearAllData = () => {
    StorageService.clearAll();
    refreshData();
  };

  return (
    <FinancialContext.Provider value={{ 
      accounts, 
      transactions, 
      budgets, 
      recurring, 
      addTransaction, 
      deleteTransaction,
      initializeUser,
      clearAllData,
      refreshData,
      isLoading,
      isOnboarded,
      userName
    }}>
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinancialContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinancialProvider');
  }
  return context;
};