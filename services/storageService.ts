import { Account, AccountType, Budget, RecurringTransaction, Transaction } from '../types';
import { INITIAL_ACCOUNTS, INITIAL_BUDGETS, INITIAL_RECURRING, INITIAL_TRANSACTIONS } from './mockData';

// Keys for local storage
const KEYS = {
  ACCOUNTS: 'pf_accounts',
  TRANSACTIONS: 'pf_transactions',
  BUDGETS: 'pf_budgets',
  RECURRING: 'pf_recurring',
  USER_PROFILE: 'pf_user_profile',
};

// Helper to load or initialize data
const load = <T>(key: string, defaultData: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(stored);
};

const save = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const StorageService = {
  // Accounts
  getAccounts: (): Account[] => load(KEYS.ACCOUNTS, INITIAL_ACCOUNTS),
  addAccount: (account: Account) => {
    const accounts = load<Account[]>(KEYS.ACCOUNTS, INITIAL_ACCOUNTS);
    const newAccounts = [...accounts, account];
    save(KEYS.ACCOUNTS, newAccounts);
    return newAccounts;
  },

  // Transactions
  getTransactions: (): Transaction[] => load(KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS),
  addTransaction: (transaction: Transaction) => {
    const transactions = load<Transaction[]>(KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS);
    const newTransactions = [transaction, ...transactions];
    save(KEYS.TRANSACTIONS, newTransactions);
    
    // Update account balance atomically (simulated)
    const accounts = load<Account[]>(KEYS.ACCOUNTS, INITIAL_ACCOUNTS);
    const updatedAccounts = accounts.map(acc => {
      if (acc.id === transaction.accountId) {
        const multiplier = transaction.type === 'INCOME' ? 1 : -1;
        return { ...acc, balance: acc.balance + (transaction.amount * multiplier) };
      }
      return acc;
    });
    save(KEYS.ACCOUNTS, updatedAccounts);
    
    return newTransactions;
  },

  // Budgets
  getBudgets: (): Budget[] => load(KEYS.BUDGETS, INITIAL_BUDGETS),
  
  // Recurring
  getRecurring: (): RecurringTransaction[] => load(KEYS.RECURRING, INITIAL_RECURRING),

  // User Profile & App State
  getUserProfile: () => {
    const stored = localStorage.getItem(KEYS.USER_PROFILE);
    return stored ? JSON.parse(stored) : null;
  },

  isOnboarded: (): boolean => {
    return !!localStorage.getItem(KEYS.USER_PROFILE);
  },

  initializeUser: (name: string, physicalBalance: number, digitalName: string, digitalBalance: number) => {
    const profile = { name, onboarded: true, joined: new Date().toISOString() };
    save(KEYS.USER_PROFILE, profile);

    const initialAccounts: Account[] = [
      { id: '1', name: 'Physical Wallet', type: AccountType.WALLET, balance: physicalBalance, currency: 'USD', icon: 'wallet' },
      { id: '2', name: digitalName, type: AccountType.BANK, balance: digitalBalance, currency: 'USD', icon: 'account_balance' }
    ];
    save(KEYS.ACCOUNTS, initialAccounts);

    // Reset other data
    save(KEYS.TRANSACTIONS, []);
    save(KEYS.BUDGETS, INITIAL_BUDGETS);
    save(KEYS.RECURRING, []);
  },

  clearAll: () => {
    localStorage.clear();
  }
};