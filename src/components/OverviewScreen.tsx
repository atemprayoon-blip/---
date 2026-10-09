import React from 'react';
import { ArrowDownLeft, ArrowUpRight, PiggyBank, PieChart, Plus, Calendar } from 'lucide-react';
import { DonutChart } from './DonutChart';
import { Transaction } from '../types';

interface OverviewScreenProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  currentSavings: number;
  savingsGoalThisMonth: number;
  currentMonthName: string;
  onOpenAddTransaction: () => void;
  onNavigateToSavings: () => void;
  onNavigateToTransactions: () => void;
  transactions?: Transaction[];
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  balance = 42500,
  totalIncome = 58000,
  totalExpense = 15500,
  currentSavings = 12800,
  savingsGoalThisMonth = 15000,
  currentMonthName = 'มีนาคม 2025',
  onOpenAddTransaction,
  onNavigateToSavings,
  onNavigateToTransactions
}) => {
  const savingsPercent = Math.min(
    100,
    Math.round((currentSavings / savingsGoalThisMonth) * 1000) / 10
  );

  return (
    <div className="space-y-4 pb-28 pt-1">
      {/* 1. Main Net Balance Card */}
      <section className="bg-white rounded-[28px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span className="text-sm font-semibold text-slate-700">ยอดเงินคงเหลือสุทธิ</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-xs font-medium text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{currentMonthName}</span>
          </div>
        </div>

        {/* Big Balance Display */}
        <div className="mb-5">
          <div className="flex items-baseline">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#0d1527] tracking-tight">
              ฿{balance.toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-slate-400 ml-0.5">
              .00
            </span>
          </div>
        </div>

        {/* 2 Sub-metrics (Income & Expense) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Income Box */}
          <div
            onClick={onNavigateToTransactions}
            className="cursor-pointer bg-emerald-50/70 border border-emerald-100/80 rounded-2xl p-3 flex items-center gap-2.5 hover:bg-emerald-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <ArrowDownLeft className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-slate-500 truncate">รายรับรวม</p>
              <p className="text-sm sm:text-base font-bold text-emerald-600 truncate">
                +฿{totalIncome.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Expense Box */}
          <div
            onClick={onNavigateToTransactions}
            className="cursor-pointer bg-rose-50/70 border border-rose-100/80 rounded-2xl p-3 flex items-center gap-2.5 hover:bg-rose-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-500 shrink-0">
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-slate-500 truncate">รายจ่ายรวม</p>
              <p className="text-sm sm:text-base font-bold text-rose-500 truncate">
                -฿{totalExpense.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Monthly Savings Card */}
      <section
        onClick={onNavigateToSavings}
        className="cursor-pointer bg-white rounded-[28px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-amber-200 transition-all group"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0 group-hover:scale-105 transition-transform">
              <PiggyBank className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 leading-tight">เงินออมสะสม</h2>
              <p className="text-xs text-slate-400 font-medium leading-tight mt-0.5">
                เป้าหมายเดือนนี้ ฿{savingsGoalThisMonth.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-base font-bold text-amber-600 leading-tight">
              ฿{currentSavings.toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-400 font-semibold leading-tight mt-0.5">
              {savingsPercent}%
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${savingsPercent}%` }}
          />
        </div>
      </section>

      {/* 3. Expense Breakdown Card */}
      <section className="bg-white rounded-[28px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
              <PieChart className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <h2 className="text-sm font-bold text-slate-800">สัดส่วนรายจ่ายหลัก</h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">เดือนปัจจุบัน</span>
        </div>

        {/* Chart & Legends */}
        <div className="flex items-center justify-between gap-4 py-1">
          {/* Donut Chart */}
          <div className="shrink-0 pl-1">
            <DonutChart
              size={120}
              centerLabelTop="รวม"
              centerLabelBottom="15.5k"
              segments={[
                { name: 'อาหาร', percentage: 45, color: '#f43f5e' },
                { name: 'เดินทาง', percentage: 25, color: '#0ea5e9' },
                { name: 'บิล/รายเดือน', percentage: 20, color: '#f59e0b' },
                { name: 'ช้อปปิ้ง', percentage: 10, color: '#8b5cf6' }
              ]}
            />
          </div>

          {/* 2-Column Legend matching Image 1.jpeg */}
          <div className="grid grid-cols-2 gap-x-5 gap-y-3.5 flex-1 pr-1">
            {/* Food */}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#f43f5e] shrink-0" />
                <span className="text-xs text-slate-600 font-medium">อาหาร</span>
              </div>
              <p className="text-sm font-bold text-slate-800 pl-3.5">45%</p>
            </div>

            {/* Transport */}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0ea5e9] shrink-0" />
                <span className="text-xs text-slate-600 font-medium">เดินทาง</span>
              </div>
              <p className="text-sm font-bold text-slate-800 pl-3.5">25%</p>
            </div>

            {/* Bills */}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#f59e0b] shrink-0" />
                <span className="text-xs text-slate-600 font-medium">บิล/รายเดือน</span>
              </div>
              <p className="text-sm font-bold text-slate-800 pl-3.5">20%</p>
            </div>

            {/* Shopping */}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#8b5cf6] shrink-0" />
                <span className="text-xs text-slate-600 font-medium">ช้อปปิ้ง</span>
              </div>
              <p className="text-sm font-bold text-slate-800 pl-3.5">10%</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Action Button: + บันทึกรายการใหม่ */}
      <div className="pt-2">
        <button
          onClick={onOpenAddTransaction}
          className="w-full bg-[#0d1527] hover:bg-slate-800 active:scale-[0.98] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm sm:text-base shadow-lg shadow-slate-900/15 transition-all"
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Plus className="w-3.5 h-3.5 text-white stroke-[3]" />
          </div>
          <span>บันทึกรายการใหม่</span>
        </button>
      </div>
    </div>
  );
};
