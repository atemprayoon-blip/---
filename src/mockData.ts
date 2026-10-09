import { Transaction, SavingsGoal, WalletAccount } from './types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Roaster District Cafe',
    amount: 140,
    type: 'expense',
    category: 'food',
    categoryNameTh: 'กาแฟ & เครื่องดื่ม',
    wallet: 'tokyo_pass',
    walletNameTh: 'Tokyo Cyber Pass',
    date: '2026-10-26',
    time: '14:28',
    dateDisplayTh: 'วันนี้ 26 ต.ค. 2567',
    note: 'Dirty Coffee ยามบ่าย',
    iconType: 'coffee',
    colorClass: 'bg-rose-50 text-rose-500 border-rose-100'
  },
  {
    id: 'tx-2',
    title: 'MRT รถไฟฟ้าใต้ดินสายสีม่วง',
    amount: 280,
    type: 'expense',
    category: 'transport',
    categoryNameTh: 'การเดินทาง',
    wallet: 'promptpay',
    walletNameTh: 'PromptPay QR',
    date: '2026-10-26',
    time: '08:45',
    dateDisplayTh: 'วันนี้ 26 ต.ค. 2567',
    note: 'เดินทางไปประชุมออฟฟิศ',
    iconType: 'train',
    colorClass: 'bg-blue-50 text-blue-500 border-blue-100'
  },
  {
    id: 'tx-3',
    title: 'เงินเดือนประจำเดือน (Payroll)',
    amount: 58000,
    type: 'income',
    category: 'salary',
    categoryNameTh: 'เงินเดือน / รายได้',
    wallet: 'kbank',
    walletNameTh: 'ธ.กสิกรไทย • 4091',
    date: '2026-10-25',
    time: '18:00',
    dateDisplayTh: 'เมื่อวาน 25 ต.ค. 2567',
    note: 'เงินเดือนโอนเข้าบัญชีหลัก',
    iconType: 'banknote',
    colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  },
  {
    id: 'tx-4',
    title: 'Ramen Shinjuku Izakaya',
    amount: 890,
    type: 'expense',
    category: 'food',
    categoryNameTh: 'อาหารค่ำ',
    wallet: 'credit_card',
    walletNameTh: 'บัตรเครดิต Vault Metal',
    date: '2026-10-25',
    time: '19:35',
    dateDisplayTh: 'เมื่อวาน 25 ต.ค. 2567',
    note: 'มื้อเย็นกับทีมงาน',
    iconType: 'utensils',
    colorClass: 'bg-amber-50 text-amber-500 border-amber-100'
  },
  {
    id: 'tx-5',
    title: 'Cyber Gear & Mechanical...',
    amount: 13500,
    type: 'expense',
    category: 'shopping',
    categoryNameTh: 'ช้อปปิ้งไอที',
    wallet: 'neo_wallet',
    walletNameTh: 'Tokyo Vault Wallet',
    date: '2026-10-24',
    time: '15:12',
    dateDisplayTh: '24 ต.ค. 2567 พฤหัสบดี',
    note: 'Custom Keyboard & Keycaps',
    iconType: 'shopping-bag',
    colorClass: 'bg-purple-50 text-purple-500 border-purple-100'
  },
  {
    id: 'tx-6',
    title: 'LINE MAN Delivery Meal',
    amount: 690,
    type: 'expense',
    category: 'food',
    categoryNameTh: 'เดลิเวอรี',
    wallet: 'promptpay',
    walletNameTh: 'PromptPay QR',
    date: '2026-10-24',
    time: '12:15',
    dateDisplayTh: '24 ต.ค. 2567 พฤหัสบดี',
    note: 'อาหารกลางวันชุดเบนโตะ',
    iconType: 'bike',
    colorClass: 'bg-emerald-50 text-emerald-500 border-emerald-100'
  }
];

export const INITIAL_SAVINGS_GOALS: SavingsGoal[] = [
  {
    id: 'goal-1',
    title: 'กองทุนฉุกเฉิน',
    subtitle: 'Emergency Fund 6 เดือน',
    categoryTag: 'มั่นคง',
    categoryTagColor: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60',
    currentAmount: 50000,
    targetAmount: 60000,
    deadline: 'ส.ค. 2025',
    color: '#10b981',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'goal-2',
    title: 'ทริปเที่ยวญี่ปุ่น',
    subtitle: 'Tokyo & Osaka Winter 2025',
    categoryTag: 'ท่องเที่ยว',
    categoryTagColor: 'bg-rose-50 text-rose-500 border border-rose-200/60',
    currentAmount: 25400,
    targetAmount: 40000,
    deadline: 'ธ.ค. 2025',
    color: '#f43f5e',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'goal-3',
    title: 'ซื้อ Gadget ใหม่',
    subtitle: 'Pro Tablet + Stylus Pen',
    categoryTag: 'อุปกรณ์',
    categoryTagColor: 'bg-teal-50 text-teal-600 border border-teal-200/60',
    currentAmount: 10000,
    targetAmount: 15000,
    deadline: 'ต.ค. 2025',
    color: '#0d9488',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80'
  }
];

export const WALLET_ACCOUNTS: WalletAccount[] = [
  {
    id: 'neo_wallet',
    name: 'Neo Wallet',
    type: 'Digital Vault',
    balance: 42500,
    color: '#0d1527'
  },
  {
    id: 'promptpay',
    name: 'PromptPay QR',
    type: 'Instant Pay',
    balance: 14200,
    accountNumber: 'xxx-xxx-1234',
    color: '#0284c7'
  },
  {
    id: 'kbank',
    name: 'ธ.กสิกรไทย (KBank)',
    type: 'Savings Account',
    balance: 98000,
    accountNumber: 'xxx-x-4091',
    color: '#059669'
  },
  {
    id: 'credit_card',
    name: 'Vault Metal Card',
    type: 'Credit Card',
    balance: 150000,
    accountNumber: '•••• 8820',
    color: '#475569'
  }
];

export const CATEGORY_DEFINITIONS = [
  { id: 'food', nameTh: 'อาหาร', icon: 'utensils', color: '#f43f5e', bgClass: 'bg-rose-50 text-rose-500' },
  { id: 'transport', nameTh: 'เดินทาง', icon: 'train', color: '#0ea5e9', bgClass: 'bg-sky-50 text-sky-500' },
  { id: 'shopping', nameTh: 'ช้อปปิ้ง', icon: 'shopping-bag', color: '#f59e0b', bgClass: 'bg-amber-50 text-amber-500' },
  { id: 'housing', nameTh: 'ที่พัก', icon: 'home', color: '#0d9488', bgClass: 'bg-teal-50 text-teal-500' },
  { id: 'entertainment', nameTh: 'บันเทิง', icon: 'gamepad-2', color: '#8b5cf6', bgClass: 'bg-purple-50 text-purple-500' },
  { id: 'salary', nameTh: 'เงินเดือน', icon: 'banknote', color: '#10b981', bgClass: 'bg-emerald-50 text-emerald-500' },
  { id: 'others', nameTh: 'อื่นๆ', icon: 'more-horizontal', color: '#64748b', bgClass: 'bg-slate-100 text-slate-500' }
];
