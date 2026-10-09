export type TransactionType = 'expense' | 'income';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  categoryNameTh: string;
  wallet: string;
  walletNameTh: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  dateDisplayTh: string; // วันที่แสดงภาษาไทย
  note?: string;
  iconType: string;
  colorClass: string;
}

export interface SavingsGoal {
  id: string;
  title: string;
  subtitle: string;
  categoryTag: string;
  categoryTagColor: string;
  currentAmount: number;
  targetAmount: number;
  deadline: string;
  color: string;
  imageUrl: string;
}

export interface ExpenseCategoryShare {
  nameTh: string;
  percentage: number;
  amount: number;
  color: string;
}

export interface WalletAccount {
  id: string;
  name: string;
  type: string;
  balance: number;
  accountNumber?: string;
  color: string;
}
