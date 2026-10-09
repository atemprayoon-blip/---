import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Layers,
  ArrowDown,
  ArrowUp,
  ArrowDownLeft,
  ArrowUpRight,
  Coffee,
  Train,
  Banknote,
  Utensils,
  ShoppingBag,
  Bike,
  ShieldCheck,
  Download,
  Trash2,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { Transaction } from '../types';

interface TransactionsScreenProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onOpenAddTransaction: () => void;
}

export const TransactionsScreen: React.FC<TransactionsScreenProps> = ({
  transactions,
  onDeleteTransaction,
  onOpenAddTransaction
}) => {
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

  const months = ['ตุลาคม 2567', 'กันยายน 2567', 'สิงหาคม 2567'];

  // Filter transactions
  const filteredList = transactions.filter((tx) => {
    if (filterType === 'all') return true;
    return tx.type === filterType;
  });

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const incomeCount = transactions.filter((t) => t.type === 'income').length;
  const expenseCount = transactions.filter((t) => t.type === 'expense').length;

  // Group by dateDisplayTh
  const groupedDates: { [key: string]: Transaction[] } = {};
  filteredList.forEach((tx) => {
    const key = tx.dateDisplayTh || tx.date;
    if (!groupedDates[key]) {
      groupedDates[key] = [];
    }
    groupedDates[key].push(tx);
  });

  const getTxIcon = (iconType: string) => {
    switch (iconType) {
      case 'coffee':
        return <Coffee className="w-5 h-5 text-rose-500" />;
      case 'train':
      case 'transport':
        return <Train className="w-5 h-5 text-blue-500" />;
      case 'banknote':
      case 'salary':
        return <Banknote className="w-5 h-5 text-emerald-600" />;
      case 'utensils':
      case 'food':
        return <Utensils className="w-5 h-5 text-amber-500" />;
      case 'shopping-bag':
      case 'shopping':
        return <ShoppingBag className="w-5 h-5 text-purple-500" />;
      case 'bike':
        return <Bike className="w-5 h-5 text-emerald-500" />;
      default:
        return <Utensils className="w-5 h-5 text-slate-500" />;
    }
  };

  const getTxIconBg = (iconType: string) => {
    switch (iconType) {
      case 'coffee':
        return 'bg-rose-50 border-rose-100';
      case 'train':
      case 'transport':
        return 'bg-blue-50 border-blue-100';
      case 'banknote':
      case 'salary':
        return 'bg-emerald-50 border-emerald-100';
      case 'utensils':
      case 'food':
        return 'bg-amber-50 border-amber-100';
      case 'shopping-bag':
      case 'shopping':
        return 'bg-purple-50 border-purple-100';
      case 'bike':
        return 'bg-emerald-50 border-emerald-100';
      default:
        return 'bg-slate-100 border-slate-200';
    }
  };

  // Export CSV Statement
  const handleExportCSV = () => {
    const headers = ['ID,Title,Type,Category,Amount,Wallet,Date,Time,Note'];
    const rows = transactions.map(
      (t) =>
        `"${t.id}","${t.title}","${t.type}","${t.categoryNameTh}",${t.amount},"${t.walletNameTh}","${t.date}","${t.time}","${t.note || ''}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `statement_${months[selectedMonthIndex].replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 pb-28 pt-1">
      {/* 1. Month Selector Pill */}
      <section className="bg-white rounded-2xl p-2 border border-slate-100 shadow-sm flex items-center justify-between">
        <button
          onClick={() =>
            setSelectedMonthIndex((prev) => (prev > 0 ? prev - 1 : months.length - 1))
          }
          className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
          aria-label="เดือนก่อนหน้า"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-bold text-slate-800">
            {months[selectedMonthIndex]}
          </span>
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100/80 px-2 py-0.5 rounded-full">
            รอบปัจจุบัน
          </span>
        </div>

        <button
          onClick={() =>
            setSelectedMonthIndex((prev) => (prev < months.length - 1 ? prev + 1 : 0))
          }
          className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
          aria-label="เดือนถัดไป"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </section>

      {/* 2. Filter Pills */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterType('all')}
          className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
            filterType === 'all'
              ? 'bg-[#0d1527] text-white shadow-slate-900/10'
              : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>ทั้งหมด</span>
        </button>

        <button
          onClick={() => setFilterType('income')}
          className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
            filterType === 'income'
              ? 'bg-emerald-600 text-white shadow-emerald-900/10'
              : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
          }`}
        >
          <ArrowDown className="w-3.5 h-3.5 text-emerald-500" />
          <span>รายรับ</span>
        </button>

        <button
          onClick={() => setFilterType('expense')}
          className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm ${
            filterType === 'expense'
              ? 'bg-rose-500 text-white shadow-rose-900/10'
              : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
          }`}
        >
          <ArrowUp className="w-3.5 h-3.5 text-rose-500" />
          <span>รายจ่าย</span>
        </button>
      </div>

      {/* 3. Sub-summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Income Card */}
        <div className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">รายรับทั้งหมด</span>
            <div className="w-7 h-7 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ArrowDownLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>
          <p className="text-base sm:text-lg font-extrabold text-emerald-600 tracking-tight">
            +฿{totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            {incomeCount} รายการย่อย
          </p>
        </div>

        {/* Total Expense Card */}
        <div className="bg-white rounded-[24px] p-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">รายจ่ายทั้งหมด</span>
            <div className="w-7 h-7 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>
          <p className="text-base sm:text-lg font-extrabold text-rose-500 tracking-tight">
            -฿{totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            {expenseCount} รายการย่อย
          </p>
        </div>
      </div>

      {/* 4. Grouped Transactions by Date */}
      <div className="space-y-4 pt-1">
        {Object.keys(groupedDates).length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-100">
            <p className="text-slate-400 text-sm">ไม่พบรายการตามตัวกรองนี้</p>
            <button
              onClick={onOpenAddTransaction}
              className="mt-3 text-xs font-bold text-emerald-600 underline"
            >
              + บันทึกรายการใหม่ทันที
            </button>
          </div>
        ) : (
          Object.entries(groupedDates).map(([dateLabel, items]) => {
            // Calculate day total
            const dayExpense = items
              .filter((i) => i.type === 'expense')
              .reduce((s, c) => s + c.amount, 0);
            const dayIncome = items
              .filter((i) => i.type === 'income')
              .reduce((s, c) => s + c.amount, 0);

            const netDay = dayIncome - dayExpense;

            return (
              <div key={dateLabel} className="space-y-2">
                {/* Date Header Row */}
                <div className="flex items-center justify-between px-2 pt-1">
                  <span className="text-xs font-bold text-slate-800">{dateLabel}</span>
                  <span
                    className={`text-xs font-bold ${
                      netDay >= 0 ? 'text-emerald-600' : 'text-rose-500'
                    }`}
                  >
                    {netDay >= 0 ? `+฿${netDay.toLocaleString()}` : `-฿${Math.abs(netDay).toLocaleString()}`}
                    .00
                  </span>
                </div>

                {/* Items in this date */}
                <div className="space-y-2.5">
                  {items.map((tx) => (
                    <div
                      key={tx.id}
                      onClick={() => setSelectedTx(tx)}
                      className="bg-white rounded-[22px] p-3.5 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between hover:border-slate-200 transition-all cursor-pointer active:scale-[0.99]"
                    >
                      {/* Left: Icon & Title & Wallet */}
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div
                          className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${getTxIconBg(
                            tx.iconType
                          )}`}
                        >
                          {getTxIcon(tx.iconType)}
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {tx.title}
                          </h3>
                          <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                            {tx.walletNameTh} • {tx.time}
                          </p>
                        </div>
                      </div>

                      {/* Right: Amount & Category */}
                      <div className="text-right shrink-0">
                        <p
                          className={`text-xs sm:text-sm font-extrabold tracking-tight ${
                            tx.type === 'income' ? 'text-emerald-600' : 'text-rose-500'
                          }`}
                        >
                          {tx.type === 'income' ? '+' : '-'}฿
                          {tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                          {tx.categoryNameTh}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 5. Sync Footer & Statement Download Button */}
      <section className="pt-3 space-y-3">
        <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>ซิงค์ข้อมูลบัญชีล่าสุดเมื่อ 5 นาทีที่แล้ว</span>
        </div>

        <button
          onClick={handleExportCSV}
          className="w-full bg-white hover:bg-slate-50 active:scale-[0.99] border border-slate-200 rounded-2xl py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-700 shadow-sm transition-all"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>ดาวน์โหลดสเตทเมนต์ (CSV/PDF)</span>
        </button>
      </section>

      {/* Transaction Detail Modal */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">รายละเอียดรายการ</span>
              <button
                onClick={() => setSelectedTx(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center py-2 border-b border-slate-100">
              <div
                className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-2 ${getTxIconBg(
                  selectedTx.iconType
                )}`}
              >
                {getTxIcon(selectedTx.iconType)}
              </div>
              <h2 className="text-base font-bold text-slate-900">{selectedTx.title}</h2>
              <p
                className={`text-2xl font-extrabold mt-1 ${
                  selectedTx.type === 'income' ? 'text-emerald-600' : 'text-rose-500'
                }`}
              >
                {selectedTx.type === 'income' ? '+' : '-'}฿
                {selectedTx.amount.toLocaleString()}
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 text-slate-600">
                <span className="text-slate-400">หมวดหมู่</span>
                <span className="font-semibold text-slate-800">{selectedTx.categoryNameTh}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-600">
                <span className="text-slate-400">กระเป๋าเงิน / บัญชี</span>
                <span className="font-semibold text-slate-800">{selectedTx.walletNameTh}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-600">
                <span className="text-slate-400">วันและเวลา</span>
                <span className="font-semibold text-slate-800">
                  {selectedTx.date} • {selectedTx.time}
                </span>
              </div>
              {selectedTx.note && (
                <div className="flex justify-between py-1 text-slate-600">
                  <span className="text-slate-400">บันทึกเพิ่มเติม</span>
                  <span className="font-semibold text-slate-800">{selectedTx.note}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  onDeleteTransaction(selectedTx.id);
                  setSelectedTx(null);
                }}
                className="flex-1 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                ลบรายการนี้
              </button>
              <button
                onClick={() => setSelectedTx(null)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
