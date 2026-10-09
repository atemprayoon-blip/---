import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OverviewScreen } from './components/OverviewScreen';
import { AddTransactionScreen } from './components/AddTransactionScreen';
import { TransactionsScreen } from './components/TransactionsScreen';
import { SavingsScreen } from './components/SavingsScreen';
import { AccountScreen } from './components/AccountScreen';
import { NotificationModal } from './components/NotificationModal';
import {
  INITIAL_TRANSACTIONS,
  INITIAL_SAVINGS_GOALS
} from './mockData';
import { Transaction, SavingsGoal } from './types';
import { Smartphone, Monitor, Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<
    'overview' | 'transactions' | 'savings' | 'account'
  >('overview');
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileFrameMode, setIsMobileFrameMode] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize transactions with localStorage persistence
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('nu_army_transactions');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_TRANSACTIONS;
  });

  // Initialize savings goals
  const [goals, setGoals] = useState<SavingsGoal[]>(() => {
    try {
      const saved = localStorage.getItem('nu_army_goals');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_SAVINGS_GOALS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('nu_army_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('nu_army_goals', JSON.stringify(goals));
  }, [goals]);

  // Toast trigger helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Financial calculations
  const { totalIncome, totalExpense, balance } = useMemo(() => {
    let inc = 0;
    let exp = 0;
    transactions.forEach((tx) => {
      if (tx.type === 'income') inc += tx.amount;
      else exp += tx.amount;
    });

    // Net remaining balance calculation based on initial baseline
    // In screenshot: Income = 58,000, Expense = 15,500, Balance = 42,500 (58,000 - 15,500)
    const bal = inc - exp;
    return {
      totalIncome: inc,
      totalExpense: exp,
      balance: bal
    };
  }, [transactions]);

  // Handle saving new transaction
  const handleSaveTransaction = (
    newTx: Omit<Transaction, 'id' | 'dateDisplayTh'>
  ) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const isToday = newTx.date === todayStr;

    const formattedTx: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}`,
      dateDisplayTh: isToday ? 'วันนี้ ' + newTx.date : newTx.date
    };

    setTransactions([formattedTx, ...transactions]);
    setIsAddTransactionOpen(false);
    setCurrentTab('transactions');
    showToast('บันทึกรายการสำเร็จเรียบร้อย');
  };

  // Handle delete transaction
  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    showToast('ลบรายการสำเร็จ');
  };

  // Handle deposit to goal
  const handleDepositToGoal = (goalId: string, amount: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          return {
            ...g,
            currentAmount: g.currentAmount + amount
          };
        }
        return g;
      })
    );
    showToast(`ฝากเงิน ฿${amount.toLocaleString()} เข้าสู่เป้าหมายเรียบร้อย`);
  };

  // Handle create new goal
  const handleCreateGoal = (goalData: Omit<SavingsGoal, 'id'>) => {
    const newGoal: SavingsGoal = {
      ...goalData,
      id: `goal-${Date.now()}`
    };
    setGoals([...goals, newGoal]);
    showToast('สร้างเป้าหมายออมเงินสำเร็จ');
  };

  // Reset to initial demo data
  const handleResetData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    setGoals(INITIAL_SAVINGS_GOALS);
    localStorage.removeItem('nu_army_transactions');
    localStorage.removeItem('nu_army_goals');
    showToast('รีเซ็ตข้อมูลตัวอย่างกลับสู่ค่าเริ่มต้นแล้ว');
  };

  // Export full JSON data
  const handleExportData = () => {
    const data = {
      transactions,
      goals,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nu_army_finance_backup_${Date.now()}.json`;
    link.click();
    showToast('ดาวน์โหลดไฟล์สำรองข้อมูลเรียบร้อย');
  };

  return (
    <div className="min-h-screen bg-slate-900/90 text-slate-900 flex flex-col items-center justify-start p-0 sm:py-6 sm:px-4 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Device Bar (Switch between Phone mockup and Full screen) */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-md mb-3 px-2 text-white/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200">
            NU ARMY Personal Finance Vault
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shadow-xs">
          <button
            onClick={() => setIsMobileFrameMode(true)}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 font-medium transition-all ${
              isMobileFrameMode
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Frame</span>
          </button>
          <button
            onClick={() => setIsMobileFrameMode(false)}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 font-medium transition-all ${
              !isMobileFrameMode
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Fluid View</span>
          </button>
        </div>
      </div>

      {/* Main App Container */}
      <div
        className={`w-full bg-[#f8fafc] text-slate-900 relative transition-all duration-300 min-h-screen flex flex-col ${
          isMobileFrameMode
            ? 'max-w-[425px] sm:min-h-[880px] sm:rounded-[40px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] sm:border-[8px] sm:border-slate-800 overflow-hidden'
            : 'max-w-2xl min-h-screen sm:rounded-3xl sm:shadow-2xl overflow-hidden'
        }`}
      >
        {/* Mobile Mockup Status Notch (Only in desktop frame mode) */}
        {isMobileFrameMode && (
          <div className="hidden sm:flex items-center justify-between px-7 pt-3 text-[11px] font-bold text-slate-800 select-none">
            <span>09:41</span>
            <div className="w-24 h-4 bg-slate-900 rounded-full" />
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div className="w-5 h-2.5 border border-slate-800 rounded-xs p-0.5 flex items-center">
                <div className="w-full h-full bg-slate-800 rounded-2xs" />
              </div>
            </div>
          </div>
        )}

        {/* Global Screen Header */}
        <Header
          currentTab={currentTab}
          isAddTransactionOpen={isAddTransactionOpen}
          onCloseAddTransaction={() => setIsAddTransactionOpen(false)}
          onOpenNotifications={() => setIsNotificationOpen(true)}
          onOpenProfile={() => {
            setIsAddTransactionOpen(false);
            setCurrentTab('account');
          }}
          unreadCount={2}
        />

        {/* Screen Content */}
        <main className="flex-1 px-5 overflow-y-auto">
          {isAddTransactionOpen ? (
            <AddTransactionScreen
              onSave={handleSaveTransaction}
              onCancel={() => setIsAddTransactionOpen(false)}
            />
          ) : (
            <>
              {currentTab === 'overview' && (
                <OverviewScreen
                  balance={balance}
                  totalIncome={totalIncome}
                  totalExpense={totalExpense}
                  currentSavings={12800}
                  savingsGoalThisMonth={15000}
                  currentMonthName="มีนาคม 2025"
                  onOpenAddTransaction={() => setIsAddTransactionOpen(true)}
                  onNavigateToSavings={() => setCurrentTab('savings')}
                  onNavigateToTransactions={() => setCurrentTab('transactions')}
                  transactions={transactions}
                />
              )}

              {currentTab === 'transactions' && (
                <TransactionsScreen
                  transactions={transactions}
                  onDeleteTransaction={handleDeleteTransaction}
                  onOpenAddTransaction={() => setIsAddTransactionOpen(true)}
                />
              )}

              {currentTab === 'savings' && (
                <SavingsScreen
                  goals={goals}
                  onDeposit={handleDepositToGoal}
                  onCreateGoal={handleCreateGoal}
                />
              )}

              {currentTab === 'account' && (
                <AccountScreen
                  onResetData={handleResetData}
                  onExportData={handleExportData}
                />
              )}
            </>
          )}
        </main>

        {/* Bottom Navigation Bar (Hidden when Add Transaction form is open) */}
        {!isAddTransactionOpen && (
          <BottomNav
            currentTab={currentTab}
            onChangeTab={(tab) => {
              setIsAddTransactionOpen(false);
              setCurrentTab(tab);
            }}
          />
        )}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 z-50 bg-[#0d1527] text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
}
