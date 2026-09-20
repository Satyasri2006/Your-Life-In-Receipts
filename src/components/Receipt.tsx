import { type ReactNode } from 'react';

export interface ReceiptData {
  header: string;
  year?: string;
  category: string;
  value: string;
  label: string;
  meta?: string;
}

interface ReceiptProps {
  data: ReceiptData;
  rotation?: number;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  variant?: 'light' | 'dark';
}

export function Receipt({
  data,
  rotation = 0,
  className = '',
  children,
  onClick,
  variant = 'light',
}: ReceiptProps) {
  const isDark = variant === 'dark';
  return (
    <div
      onClick={onClick}
      className={`relative inline-block ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div
        className={`relative px-6 py-5 min-w-[200px] ${
          isDark
            ? 'bg-[#1c1815] text-[#f5f0e6]'
            : 'bg-[#faf6ec] text-[#1a1612]'
        }`}
        style={{
          boxShadow:
            '0 1px 3px rgba(0,0,0,0.1), 0 6px 16px rgba(0,0,0,0.08)',
          border: isDark ? '1px solid rgba(245,240,230,0.1)' : '1px solid rgba(26,22,18,0.08)',
        }}
      >
        {/* Top dashed line */}
        <div
          className={`dashed-line ${isDark ? 'dashed-line-light' : ''} mb-3`}
        />
        <div className="font-mono-receipt text-[10px] tracking-[0.2em] uppercase opacity-60 mb-1">
          {data.header}
        </div>
        {data.year && (
          <div className="font-mono-receipt text-[10px] tracking-[0.15em] uppercase opacity-50 mb-2">
            {data.year}
          </div>
        )}
        <div className="font-serif-display text-2xl font-bold leading-tight mb-1">
          {data.category}
        </div>
        <div className="font-mono-receipt text-xl font-bold text-[var(--accent)] mb-1">
          {data.value}
        </div>
        <div className="font-mono-receipt text-[10px] tracking-[0.15em] uppercase opacity-60">
          {data.label}
        </div>
        {data.meta && (
          <div className="font-mono-receipt text-[9px] tracking-[0.1em] uppercase opacity-40 mt-2">
            {data.meta}
          </div>
        )}
        {children}
        <div
          className={`dashed-line ${isDark ? 'dashed-line-light' : ''} mt-3`}
        />
        <div className="font-mono-receipt text-[8px] tracking-[0.2em] uppercase opacity-30 text-center mt-2">
          ◆ ARCHIVE ◆
        </div>
      </div>
    </div>
  );
}
