import React from 'react';
import {
  User,
  ShieldCheck,
  CreditCard,
  RotateCcw,
  Download,
  Settings,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { WALLET_ACCOUNTS } from '../mockData';

interface AccountScreenProps {
  onResetData: () => void;
  onExportData: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  onResetData,
  onExportData
}) => {
  return (
    <div className="space-y-4 pb-28 pt-1">
      {/* 1. User Profile Header Card */}
      <section className="bg-white rounded-[28px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-700 flex items-center justify-center text-white shadow-md font-bold text-xl relative">
            <User className="w-7 h-7" />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Alex S.</h2>
              <span className="text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> PRO VIP
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">alex.nuarmy@vault.io</p>
          </div>
        </div>

        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
          <ChevronRight className="w-4 h-4" />
        </div>
      </section>

      {/* 2. Connected Wallets & Accounts */}
      <section className="bg-white rounded-[28px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">กระเป๋าเงิน & บัญชีธนาคาร</h3>
          </div>
          <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
            4 บัญชีเชื่อมต่อ
          </span>
        </div>

        <div className="space-y-2 pt-1">
          {WALLET_ACCOUNTS.map((wallet) => (
            <div
              key={wallet.id}
              className="p-3 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 transition-colors flex items-center justify-between border border-slate-100/60"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-xs"
                  style={{ backgroundColor: wallet.color }}
                >
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{wallet.name}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {wallet.type} {wallet.accountNumber ? `• ${wallet.accountNumber}` : ''}
                  </p>
                </div>
              </div>

              <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                ฿{wallet.balance.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Preferences & Security */}
      <section className="bg-white rounded-[28px] p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-2.5">
        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-4 h-4 text-slate-700" />
          <h3 className="text-sm font-bold text-slate-900">ตั้งค่าความปลอดภัย & ระบบ</h3>
        </div>

        <div className="flex items-center justify-between py-2 text-xs border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="font-semibold text-slate-700">ยืนยันตัวตนด้วย Biometric / FaceID</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            เปิดใช้งาน
          </span>
        </div>

        <div className="flex items-center justify-between py-2 text-xs border-b border-slate-100">
          <span className="font-semibold text-slate-700">สกุลเงินหลัก</span>
          <span className="font-bold text-slate-800">THB (฿) บาท</span>
        </div>

        <div className="flex items-center justify-between py-2 text-xs">
          <span className="font-semibold text-slate-700">การแจ้งเตือนยอดใช้จ่ายประจำวัน</span>
          <span className="text-emerald-600 font-bold">20:00 น. ทุกวัน</span>
        </div>
      </section>

      {/* 4. Data Management Buttons */}
      <div className="space-y-2 pt-1">
        <button
          onClick={onExportData}
          className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-3.5 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm shadow-xs transition-colors"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>สำรองข้อมูลทางการเงิน (Export Data)</span>
        </button>

        <button
          onClick={onResetData}
          className="w-full bg-rose-50 hover:bg-rose-100/80 border border-rose-100 text-rose-600 py-3.5 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>รีเซ็ตข้อมูลตัวอย่างกลับสู่ค่าเริ่มต้น</span>
        </button>
      </div>

      <p className="text-center text-[11px] text-slate-400 font-medium pt-2">
        NU ARMY Finance Vault v2.4 • Secured by Cloud Vault
      </p>
    </div>
  );
};
