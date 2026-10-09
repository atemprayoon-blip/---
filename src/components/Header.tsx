import React from 'react';
import { Zap, Bell, User, ChevronLeft } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  isAddTransactionOpen: boolean;
  onCloseAddTransaction?: () => void;
  onOpenNotifications?: () => void;
  onOpenProfile?: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  isAddTransactionOpen,
  onCloseAddTransaction,
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 2
}) => {
  if (isAddTransactionOpen) {
    return (
      <header className="px-5 pt-6 pb-3 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-30 transition-all">
        <div className="flex items-center gap-3">
          <button
            onClick={onCloseAddTransaction}
            className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 active:scale-95 transition-all shadow-sm"
            aria-label="ย้อนกลับ"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">บันทึกรายการใหม่</h1>
            <p className="text-xs text-slate-400 font-medium leading-tight">Add Transaction</p>
          </div>
        </div>

        <button
          onClick={onOpenProfile}
          className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 active:scale-95 transition-all shadow-sm"
          aria-label="โปรไฟล์"
        >
          <User className="w-5 h-5" />
        </button>
      </header>
    );
  }

  // Titles per tab
  const getTabTitle = () => {
    switch (currentTab) {
      case 'overview':
        return 'Overview';
      case 'transactions':
        return 'Transactions';
      case 'savings':
        return 'Savings (เป้าหมายการออม)';
      case 'account':
        return 'Account & Wallets';
      default:
        return 'Overview';
    }
  };

  return (
    <header className="px-5 pt-6 pb-3 flex items-center justify-between bg-transparent sticky top-0 z-30 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-[#0d1527] flex items-center justify-center text-white shadow-md shadow-slate-900/10">
          <Zap className="w-5 h-5 fill-white text-white" />
        </div>
        <div>
          <span className="text-[11px] font-extrabold tracking-wider text-emerald-600 block uppercase leading-none">
            NU ARMY
          </span>
          <h1 className="text-lg font-bold text-slate-900 leading-tight mt-0.5">
            {getTabTitle()}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenNotifications}
          className="relative w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
          aria-label="การแจ้งเตือน"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          )}
        </button>

        <button
          onClick={onOpenProfile}
          className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
          aria-label="โปรไฟล์"
        >
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
