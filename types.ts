export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';

export enum AccountType {
  BANK = 'BANK',
  SAVINGS = 'SAVINGS',
  WALLET = 'WALLET',
  CREDIT = 'CREDIT'
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: Currency;
  icon: string;
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER'
}

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string; // ISO string
  description?: string;
  merchant?: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'MONTHLY' | 'WEEKLY' | 'ANNUAL';
  color: string;
}

export interface RecurringTransaction {
  id: string;
  name: string;
  amount: number;
  type: TransactionType;
  frequency: 'MONTHLY' | 'WEEKLY' | 'ANNUAL';
  nextDate: string;
  icon: string;
}
