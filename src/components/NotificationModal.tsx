import React from 'react';
import { X, CheckCircle, TrendingUp, AlertCircle, Bell } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      title: 'เงินเดือนโอนเข้าบัญชีสำเร็จ',
      desc: '+฿58,000.00 จาก ธ.กสิกรไทย เข้าสู่ Neo Wallet',
      time: 'เมื่อวาน 18:00 น.',
      icon: CheckCircle,
      iconColor: 'text-emerald-500 bg-emerald-50'
    },
    {
      id: 'n2',
      title: 'เป้าหมายออมเงินใกล้ถึงเป้าหมายแล้ว!',
      desc: 'กองทุนฉุกเฉิน บรรลุ 83% แล้ว ออมอีกเพียง ฿10,000 จะครบเป้าหมาย',
      time: '2 วันที่แล้ว',
      icon: TrendingUp,
      iconColor: 'text-amber-500 bg-amber-50'
    },
    {
      id: 'n3',
      title: 'แจ้งเตือนสรุปรายจ่ายประจำสัปดาห์',
      desc: 'คุณใช้จ่ายไป ฿15,500 อยู่ในเกณฑ์งบประมาณที่กำหนด',
      time: '3 วันที่แล้ว',
      icon: AlertCircle,
      iconColor: 'text-blue-500 bg-blue-50'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">การแจ้งเตือน</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5 pt-1">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100/80 flex items-start gap-3"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconColor}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {item.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
