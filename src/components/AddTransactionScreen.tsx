import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Utensils,
  Train,
  ShoppingBag,
  Home,
  Gamepad2,
  Banknote,
  MoreHorizontal,
  Calendar,
  Clock,
  PenLine,
  Wallet,
  CheckCircle2,
  Delete,
  Sparkles
} from 'lucide-react';
import { Transaction, TransactionType } from '../types';
import { WALLET_ACCOUNTS } from '../mockData';

interface AddTransactionScreenProps {
  onSave: (transaction: Omit<Transaction, 'id' | 'dateDisplayTh'>) => void;
  onCancel: () => void;
}

export const AddTransactionScreen: React.FC<AddTransactionScreenProps> = ({
  onSave,
  onCancel
}) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amountStr, setAmountStr] = useState<string>('0');
  const [selectedCategory, setSelectedCategory] = useState<string>('food');
  const [date, setDate] = useState<string>('2026-10-09');
  const [time, setTime] = useState<string>('20:46');
  const [note, setNote] = useState<string>('');
  const [selectedWalletId, setSelectedWalletId] = useState<string>('neo_wallet');
  const [showWalletPicker, setShowWalletPicker] = useState<boolean>(false);

  const categories = [
    {
      id: 'food',
      nameTh: 'อาหาร',
      icon: Utensils,
      color: '#f43f5e',
      bg: 'bg-rose-50 text-rose-500',
      borderActive: 'border-rose-400 ring-2 ring-rose-100'
    },
    {
      id: 'transport',
      nameTh: 'เดินทาง',
      icon: Train,
      color: '#0ea5e9',
      bg: 'bg-sky-50 text-sky-500',
      borderActive: 'border-sky-400 ring-2 ring-sky-100'
    },
    {
      id: 'shopping',
      nameTh: 'ช้อปปิ้ง',
      icon: ShoppingBag,
      color: '#f59e0b',
      bg: 'bg-amber-50 text-amber-500',
      borderActive: 'border-amber-400 ring-2 ring-amber-100'
    },
    {
      id: 'housing',
      nameTh: 'ที่พัก',
      icon: Home,
      color: '#0d9488',
      bg: 'bg-teal-50 text-teal-600',
      borderActive: 'border-teal-400 ring-2 ring-teal-100'
    },
    {
      id: 'entertainment',
      nameTh: 'บันเทิง',
      icon: Gamepad2,
      color: '#8b5cf6',
      bg: 'bg-purple-50 text-purple-500',
      borderActive: 'border-purple-400 ring-2 ring-purple-100'
    },
    {
      id: 'salary',
      nameTh: 'เงินเดือน',
      icon: Banknote,
      color: '#10b981',
      bg: 'bg-emerald-50 text-emerald-600',
      borderActive: 'border-emerald-400 ring-2 ring-emerald-100'
    },
    {
      id: 'others',
      nameTh: 'อื่นๆ',
      icon: MoreHorizontal,
      color: '#64748b',
      bg: 'bg-slate-100 text-slate-600',
      borderActive: 'border-slate-400 ring-2 ring-slate-100'
    }
  ];

  const handleQuickAdd = (value: number) => {
    const current = parseFloat(amountStr) || 0;
    const updated = current + value;
    setAmountStr(updated.toString());
  };

  const handleBackspace = () => {
    if (amountStr.length <= 1) {
      setAmountStr('0');
    } else {
      setAmountStr(amountStr.slice(0, -1));
    }
  };

  const handleNumberInput = (num: string) => {
    if (amountStr === '0') {
      setAmountStr(num);
    } else {
      if (amountStr.length < 9) {
        setAmountStr(amountStr + num);
      }
    }
  };

  const handleSave = () => {
    const numericAmount = parseFloat(amountStr) || 0;
    if (numericAmount <= 0) {
      alert('กรุณาระบุจำนวนเงินที่มากกว่า 0');
      return;
    }

    const cat = categories.find((c) => c.id === selectedCategory) || categories[0];
    const selectedWallet =
      WALLET_ACCOUNTS.find((w) => w.id === selectedWalletId) || WALLET_ACCOUNTS[0];

    onSave({
      title: note.trim() || cat.nameTh,
      amount: numericAmount,
      type,
      category: cat.id,
      categoryNameTh: cat.nameTh,
      wallet: selectedWallet.id,
      walletNameTh: selectedWallet.name,
      date,
      time,
      note: note.trim(),
      iconType: cat.id,
      colorClass: cat.bg
    });
  };

  const currentWallet =
    WALLET_ACCOUNTS.find((w) => w.id === selectedWalletId) || WALLET_ACCOUNTS[0];

  return (
    <div className="space-y-4 pb-28 pt-1">
      {/* 1. Toggle Button: รายจ่าย (Expense) vs รายรับ (Income) */}
      <div className="bg-slate-200/70 p-1.5 rounded-2xl flex items-center gap-1 shadow-inner">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all duration-200 ${
            type === 'expense'
              ? 'bg-white text-rose-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowDown className="w-4 h-4 stroke-[2.5]" />
          <span>รายจ่าย (Expense)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setType('income');
            if (selectedCategory === 'food') setSelectedCategory('salary');
          }}
          className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all duration-200 ${
            type === 'income'
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          <span>รายรับ (Income)</span>
        </button>
      </div>

      {/* 2. Amount Card */}
      <section className="bg-white rounded-[28px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] text-center">
        <p className="text-xs font-semibold text-slate-400 mb-2">ระบุจำนวนเงิน</p>

        {/* Big Numeric Display */}
        <div className="flex items-center justify-center gap-2 my-2">
          <span
            className={`text-2xl sm:text-3xl font-extrabold ${
              type === 'expense' ? 'text-rose-500' : 'text-emerald-500'
            }`}
          >
            ฿
          </span>
          <span
            className="text-4xl sm:text-5xl font-extrabold text-[#0d1527] tracking-tight min-w-[120px]"
          >
            {parseFloat(amountStr).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </span>
        </div>

        {/* Quick Chips & Backspace */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-1">
          <button
            type="button"
            onClick={() => handleQuickAdd(100)}
            className="py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl text-xs sm:text-sm font-bold text-slate-700 active:scale-95 transition-all"
          >
            +100
          </button>
          <button
            type="button"
            onClick={() => handleQuickAdd(500)}
            className="py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl text-xs sm:text-sm font-bold text-slate-700 active:scale-95 transition-all"
          >
            +500
          </button>
          <button
            type="button"
            onClick={() => handleQuickAdd(1000)}
            className="py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl text-xs sm:text-sm font-bold text-slate-700 active:scale-95 transition-all"
          >
            +1,000
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            className="py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl text-slate-500 flex items-center justify-center active:scale-95 transition-all"
            aria-label="ลบตัวเลข"
          >
            <Delete className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Numeric keypad row for easy touch input */}
        <div className="grid grid-cols-6 gap-1.5 mt-2.5">
          {['1', '2', '3', '4', '5', '6'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleNumberInput(num)}
              className="py-1.5 bg-slate-50/70 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold"
            >
              {num}
            </button>
          ))}
          {['7', '8', '9', '0', '00', 'C'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => (num === 'C' ? setAmountStr('0') : handleNumberInput(num))}
              className={`py-1.5 rounded-lg text-xs font-semibold ${
                num === 'C'
                  ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                  : 'bg-slate-50/70 hover:bg-slate-100 text-slate-600'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Categories Selection Grid */}
      <section className="bg-white rounded-[28px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-xs font-bold text-slate-700">เลือกหมวดหมู่</span>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            โบนัส
          </span>
        </div>

        {/* Grid matching Image 3.jpeg (4 columns) */}
        <div className="grid grid-cols-4 gap-2.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all ${
                  isSelected
                    ? 'border-slate-800 bg-slate-50/80 shadow-sm'
                    : 'border-slate-100 hover:border-slate-200 bg-white'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-1.5 transition-transform ${cat.bg} ${
                    isSelected ? 'scale-105 shadow-sm' : ''
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <span
                  className={`text-[11px] truncate w-full text-center ${
                    isSelected ? 'font-bold text-slate-900' : 'text-slate-600 font-medium'
                  }`}
                >
                  {cat.nameTh}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Date, Time & Note */}
      <section className="bg-white rounded-[28px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
        {/* Date & Time Row */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Date Picker Input */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-2xl px-3 py-2.5">
            <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-slate-700 outline-none"
            />
          </div>

          {/* Time Picker Input */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-2xl px-3 py-2.5">
            <div className="w-7 h-7 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-slate-700 outline-none"
            />
          </div>
        </div>

        {/* Note input field */}
        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-2xl px-3.5 py-3">
          <PenLine className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="บันทึกข้อความสั้นๆ เช่น กาแฟยามเช้า..."
            className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none font-medium"
          />
        </div>
      </section>

      {/* 5. Wallet Selector Card */}
      <section className="bg-white rounded-[28px] p-4 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div
          onClick={() => setShowWalletPicker(!showWalletPicker)}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                กระเป๋าหลัก: {currentWallet.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-semibold text-emerald-600">
              พร้อมซิงค์เรียลไทม์
            </span>
          </div>
        </div>

        {/* Wallet Picker Dropdown */}
        {showWalletPicker && (
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 animate-in fade-in duration-200">
            {WALLET_ACCOUNTS.map((wallet) => (
              <div
                key={wallet.id}
                onClick={() => {
                  setSelectedWalletId(wallet.id);
                  setShowWalletPicker(false);
                }}
                className={`p-2.5 rounded-xl flex items-center justify-between text-xs cursor-pointer ${
                  selectedWalletId === wallet.id
                    ? 'bg-slate-100 font-bold text-slate-900'
                    : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                <span>{wallet.name}</span>
                <span className="text-slate-400">฿{wallet.balance.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Save Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleSave}
          className="w-full bg-[#0d1527] hover:bg-slate-800 active:scale-[0.98] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm sm:text-base shadow-lg shadow-slate-900/15 transition-all"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
          <span>บันทึกรายการ (Save Transaction)</span>
        </button>
      </div>
    </div>
  );
};
