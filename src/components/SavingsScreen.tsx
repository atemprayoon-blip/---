import React, { useState } from 'react';
import {
  WalletCards,
  TrendingUp,
  Flag,
  Calendar,
  Plus,
  Sparkles,
  CheckCircle2,
  X,
  Target
} from 'lucide-react';
import { SavingsGoal } from '../types';

interface SavingsScreenProps {
  goals: SavingsGoal[];
  onDeposit: (goalId: string, amount: number) => void;
  onCreateGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
}

export const SavingsScreen: React.FC<SavingsScreenProps> = ({
  goals,
  onDeposit,
  onCreateGoal
}) => {
  const [selectedGoalForDeposit, setSelectedGoalForDeposit] = useState<SavingsGoal | null>(
    null
  );
  const [depositAmount, setDepositAmount] = useState<string>('1000');
  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);

  // New goal form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newTarget, setNewTarget] = useState('20000');
  const [newDeadline, setNewDeadline] = useState('ม.ค. 2026');
  const [newTag, setNewTag] = useState('ลงทุน');

  // Compute Total Vault figures
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const overallPercent = Math.round((totalSaved / (totalTarget || 1)) * 100);

  const handleConfirmDeposit = () => {
    if (!selectedGoalForDeposit) return;
    const num = parseFloat(depositAmount) || 0;
    if (num <= 0) return;
    onDeposit(selectedGoalForDeposit.id, num);
    setSelectedGoalForDeposit(null);
    setDepositAmount('1000');
  };

  const handleCreateNewGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onCreateGoal({
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'เป้าหมายส่วนตัว',
      categoryTag: newTag,
      categoryTagColor: 'bg-indigo-50 text-indigo-600 border border-indigo-200/60',
      currentAmount: 0,
      targetAmount: parseFloat(newTarget) || 10000,
      deadline: newDeadline,
      color: '#6366f1',
      imageUrl:
        'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&q=80'
    });

    setIsNewGoalModalOpen(false);
    setNewTitle('');
    setNewSubtitle('');
  };

  return (
    <div className="space-y-4 pb-28 pt-1">
      {/* 1. Total Vault Banner Card (Mint green soft gradient) */}
      <section className="bg-gradient-to-br from-[#e8f7f2] via-[#e6f8f4] to-[#e1f5ee] rounded-[28px] p-5 border border-emerald-100/80 shadow-[0_4px_16px_rgba(16,185,129,0.06)] relative overflow-hidden">
        {/* Decorative subtle ambient shape */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-emerald-200/30 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <WalletCards className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
              ยอดเงินออมรวม (TOTAL VAULT)
            </span>
          </div>

          <span className="text-[11px] font-bold text-emerald-800 bg-white/80 border border-emerald-200/60 px-2.5 py-0.5 rounded-full shadow-xs">
            {goals.length} เป้าหมาย
          </span>
        </div>

        <p className="text-xs font-medium text-slate-500">ยอดสะสมทั้งหมดของคุณ</p>

        {/* Big Total */}
        <div className="flex items-baseline gap-1.5 my-1.5">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#0d1527] tracking-tight">
            ฿{totalSaved.toLocaleString()}
          </span>
          <span className="text-sm font-bold text-slate-500">THB</span>
        </div>

        {/* Bottom stats row */}
        <div className="flex items-center justify-between pt-2 border-t border-emerald-200/50 mt-3 text-xs">
          <div className="flex items-center gap-1 text-emerald-700 font-bold bg-white/70 px-2.5 py-1 rounded-xl">
            <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+฿7,200 เดือนนี้</span>
          </div>

          <span className="text-slate-600 font-semibold">
            เป้าหมายรวม: ฿{totalTarget.toLocaleString()}
          </span>
        </div>
      </section>

      {/* 2. My Goals Section Header */}
      <div className="flex items-center justify-between px-1 pt-1">
        <div className="flex items-center gap-2">
          <Flag className="w-4 h-4 text-slate-700" />
          <h2 className="text-sm font-bold text-slate-900">เป้าหมายของฉัน</h2>
        </div>

        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
          คืบหน้าภาพรวม {overallPercent}%
        </span>
      </div>

      {/* 3. Goal Cards List */}
      <div className="space-y-3.5">
        {goals.map((goal) => {
          const percent = Math.min(
            100,
            Math.round((goal.currentAmount / goal.targetAmount) * 100)
          );
          const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

          return (
            <div
              key={goal.id}
              className="bg-white rounded-[26px] p-4 sm:p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all"
            >
              {/* Top Row: Thumbnail + Titles + Percentage */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-13 h-13 rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-xs relative bg-slate-900">
                    <img
                      src={goal.imageUrl}
                      alt={goal.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {goal.title}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${goal.categoryTagColor}`}
                      >
                        {goal.categoryTag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
                      {goal.subtitle}
                    </p>
                  </div>
                </div>

                {/* Percentage */}
                <span className="text-sm sm:text-base font-extrabold text-slate-800 shrink-0">
                  {percent}%
                </span>
              </div>

              {/* Middle Row: Progress numbers */}
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <div className="text-slate-800">
                  <span>฿{goal.currentAmount.toLocaleString()}</span>
                  <span className="text-slate-400 font-medium">
                    {' '}/ ฿{goal.targetAmount.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-slate-500 font-medium">ขาดอีก </span>
                  <span
                    className={`font-bold ${
                      remaining === 0 ? 'text-emerald-600' : 'text-slate-800'
                    }`}
                  >
                    ฿{remaining.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-3">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: goal.color
                  }}
                />
              </div>

              {/* Bottom Row: Deadline + Deposit Button */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>กำหนด: {goal.deadline}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedGoalForDeposit(goal);
                    setDepositAmount('1000');
                  }}
                  className="px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all active:scale-95 shadow-xs"
                  style={{
                    color: goal.color,
                    borderColor: `${goal.color}33`,
                    backgroundColor: `${goal.color}10`
                  }}
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>ฝากเงิน</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Smart Tip Card (Auto Vault) */}
      <section className="bg-sky-50/70 border border-sky-100/90 rounded-[24px] p-4 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-white border border-sky-100 flex items-center justify-center text-sky-500 shrink-0 shadow-xs">
          <Sparkles className="w-5 h-5 stroke-[2]" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900">ทิปออมอัจฉริยะ (Auto Vault)</h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed mt-0.5">
            ออมเงินวันละ ฿150 จะทำให้เป้าหมายท่องเที่ยวสำเร็จเร็วขึ้น 28 วัน
          </p>
        </div>
      </section>

      {/* 5. Create Goal Action Button */}
      <div className="pt-2">
        <button
          onClick={() => setIsNewGoalModalOpen(true)}
          className="w-full bg-[#0d1527] hover:bg-slate-800 active:scale-[0.98] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm sm:text-base shadow-lg shadow-slate-900/15 transition-all"
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Plus className="w-3.5 h-3.5 text-white stroke-[3]" />
          </div>
          <span>สร้างเป้าหมายออมเงินใหม่</span>
        </button>
      </div>

      {/* Quick Deposit Modal */}
      {selectedGoalForDeposit && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  ฝากเงิน: {selectedGoalForDeposit.title}
                </h3>
                <p className="text-xs text-slate-400">
                  ขาดอีก ฿{(selectedGoalForDeposit.targetAmount - selectedGoalForDeposit.currentAmount).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedGoalForDeposit(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl text-center">
              <span className="text-xs text-slate-400 font-medium">ระบุยอดเงินที่ต้องการฝาก</span>
              <div className="flex items-center justify-center gap-1 mt-1">
                <span className="text-xl font-bold text-slate-400">฿</span>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="text-3xl font-extrabold text-[#0d1527] bg-transparent text-center w-40 outline-none"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[500, 1000, 2000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDepositAmount(amt.toString())}
                    className="py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
                  >
                    +฿{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleConfirmDeposit}
                className="flex-1 py-3.5 bg-[#0d1527] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-slate-900/10 active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ยืนยันการฝากเงิน
              </button>
              <button
                type="button"
                onClick={() => setSelectedGoalForDeposit(null)}
                className="px-4 py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-200"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Goal Modal */}
      {isNewGoalModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <form
            onSubmit={handleCreateNewGoal}
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">สร้างเป้าหมายออมใหม่</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsNewGoalModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">ชื่อเป้าหมาย</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ดาวน์คอนโด, คอร์สเรียน"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-800 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">คำอธิบายย่อย</label>
                <input
                  type="text"
                  placeholder="เช่น ห้อง 1 Bedroom ใกล้ MRT"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-800 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">เป้าหมาย (บาท)</label>
                  <input
                    type="number"
                    required
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-800 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">กำหนดเสร็จ</label>
                  <input
                    type="text"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-800 text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">หมวดหมู่แท็ก</label>
                <div className="flex gap-1.5">
                  {['มั่นคง', 'ท่องเที่ยว', 'อุปกรณ์', 'ลงทุน'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setNewTag(tag)}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold border transition-colors ${
                        newTag === tag
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#0d1527] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md"
              >
                บันทึกเป้าหมาย
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
