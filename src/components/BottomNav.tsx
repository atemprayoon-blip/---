import React from 'react';
import { LayoutGrid, ReceiptText, PiggyBank, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: 'overview' | 'transactions' | 'savings' | 'account';
  onChangeTab: (tab: 'overview' | 'transactions' | 'savings' | 'account') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const tabs = [
    { id: 'overview', label: 'ภาพรวม', icon: LayoutGrid },
    { id: 'transactions', label: 'รายการ', icon: ReceiptText },
    { id: 'savings', label: 'เงินออม', icon: PiggyBank },
    { id: 'account', label: 'บัญชี', icon: User },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-2 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-[#0d1527] scale-105'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${isActive ? 'text-[#0d1527]' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              </div>
              <span className={`text-[11px] mt-0.5 font-medium ${isActive ? 'font-bold text-[#0d1527]' : 'text-slate-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
