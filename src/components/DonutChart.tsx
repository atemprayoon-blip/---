import React from 'react';

interface Segment {
  name: string;
  percentage: number;
  color: string;
}

interface DonutChartProps {
  segments?: Segment[];
  centerLabelTop?: string;
  centerLabelBottom?: string;
  size?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  segments = [
    { name: 'อาหาร', percentage: 45, color: '#f43f5e' }, // coral/red
    { name: 'เดินทาง', percentage: 25, color: '#0ea5e9' }, // sky blue
    { name: 'บิล/รายเดือน', percentage: 20, color: '#f59e0b' }, // amber
    { name: 'ช้อปปิ้ง', percentage: 10, color: '#8b5cf6' } // purple
  ],
  centerLabelTop = 'รวม',
  centerLabelBottom = '15.5k',
  size = 130
}) => {
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate cumulative offsets for segments
  let cumulativePercent = 0;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />
        {/* Segments */}
        {segments.map((segment, idx) => {
          const dashArray = (segment.percentage / 100) * circumference;
          const strokeDashoffset = -((cumulativePercent / 100) * circumference);
          cumulativePercent += segment.percentage;

          return (
            <circle
              key={idx}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashArray} ${circumference - dashArray}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 hover:opacity-90"
            />
          );
        })}
      </svg>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-[11px] text-slate-400 font-medium leading-tight">{centerLabelTop}</span>
        <span className="text-base font-bold text-slate-800 leading-tight tracking-tight">
          {centerLabelBottom}
        </span>
      </div>
    </div>
  );
};
