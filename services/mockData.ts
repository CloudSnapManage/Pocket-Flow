import { Account, AccountType, Budget, RecurringTransaction, Transaction, TransactionType } from '../types';

export const INITIAL_ACCOUNTS: Account[] = [
  { id: '1', name: 'Main Bank Account', type: AccountType.BANK, balance: 5210.00, currency: 'USD', icon: 'account_balance' },
  { id: '2', name: 'Savings Account', type: AccountType.SAVINGS, balance: 10000.00, currency: 'USD', icon: 'savings' },
  { id: '3', name: 'Visa Credit Card', type: AccountType.CREDIT, balance: -350.50, currency: 'USD', icon: 'credit_card' },
  { id: '4', name: 'Physical Wallet', type: AccountType.WALLET, balance: 80.00, currency: 'USD', icon: 'wallet' },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '101', accountId: '1', amount: 1200.00, type: TransactionType.EXPENSE, category: 'Rent', date: new Date().toISOString(), description: 'Monthly Rent', merchant: 'Landlord' },
  { id: '102', accountId: '1', amount: 6.50, type: TransactionType.EXPENSE, category: 'Food', date: new Date(Date.now() - 86400000).toISOString(), description: 'Morning Coffee', merchant: 'Starbucks' },
  { id: '103', accountId: '1', amount: 2500.00, type: TransactionType.INCOME, category: 'Salary', date: new Date(Date.now() - 172800000).toISOString(), description: 'Paycheck', merchant: 'Employer' },
  { id: '104', accountId: '1', amount: 30.00, type: TransactionType.EXPENSE, category: 'Transport', date: new Date(Date.now() - 259200000).toISOString(), description: 'Metro Card Refill', merchant: 'MTA' },
  { id: '105', accountId: '3', amount: 115.30, type: TransactionType.EXPENSE, category: 'Shopping', date: new Date(Date.now() - 345600000).toISOString(), description: 'New Clothes', merchant: 'H&M' },
];

export const INITIAL_BUDGETS: Budget[] = [
  { id: 'b1', category: 'Groceries', limit: 400, spent: 250, period: 'MONTHLY', color: '#34c759' },
  { id: 'b2', category: 'Transport', limit: 150, spent: 130, period: 'MONTHLY', color: '#ff9500' },
  { id: 'b3', category: 'Shopping', limit: 500, spent: 550, period: 'MONTHLY', color: '#ff4d4d' },
  { id: 'b4', category: 'Entertainment', limit: 200, spent: 80, period: 'MONTHLY', color: '#13c8ec' },
];

export const INITIAL_RECURRING: RecurringTransaction[] = [
  { id: 'r1', name: 'Netflix', amount: 15.99, type: TransactionType.EXPENSE, frequency: 'MONTHLY', nextDate: '2023-10-28', icon: 'movie' },
  { id: 'r2', name: 'Spotify Premium', amount: 10.99, type: TransactionType.EXPENSE, frequency: 'MONTHLY', nextDate: '2023-11-05', icon: 'music_note' },
  { id: 'r3', name: 'Rent Payment', amount: 1850.00, type: TransactionType.EXPENSE, frequency: 'MONTHLY', nextDate: '2023-11-01', icon: 'home' },
  { id: 'r4', name: 'Monthly Salary', amount: 4500.00, type: TransactionType.INCOME, frequency: 'MONTHLY', nextDate: '2023-10-31', icon: 'work' },
];