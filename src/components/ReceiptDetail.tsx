import { type ReactNode } from 'react';
import { X } from 'lucide-react';
import { type ReceiptData } from '@/components/Receipt';

interface ReceiptDetailProps {
  open: boolean;
  onClose: () => void;
  data: ReceiptData;
  children?: ReactNode;
}

export function ReceiptDetail({ open, onClose, data, children }: ReceiptDetailProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(20, 17, 14, 0.6)' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-[var(--paper)] hover:opacity-60 transition-opacity flex items-center gap-2"
        >
          <span className="font-mono-receipt text-xs tracking-[0.2em] uppercase">Close</span>
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>

        <div className="relative bg-[#faf6ec] text-[var(--ink)] p-8">
          {/* Stamp */}
          <div className="absolute top-4 right-4 stamp-border px-3 py-1 font-mono-receipt text-[9px] tracking-[0.2em] uppercase -rotate-12">
            Verified
          </div>

          <div className="dashed-line mb-4" />
          <div className="font-mono-receipt text-[10px] tracking-[0.25em] uppercase opacity-50 mb-2">
            {data.header}
          </div>
          {data.year && (
            <div className="font-mono-receipt text-xs tracking-[0.2em] uppercase opacity-40 mb-4">
              {data.year}
            </div>
          )}
          <div className="font-serif-display text-4xl font-bold leading-tight mb-3">
            {data.category}
          </div>
          <div className="font-mono-receipt text-3xl font-bold text-[var(--accent)] mb-3">
            {data.value}
          </div>
          <div className="font-mono-receipt text-xs tracking-[0.15em] uppercase opacity-60 mb-4">
            {data.label}
          </div>

          {children}

          <div className="dashed-line mt-4 pt-3" />
          <div className="font-mono-receipt text-[9px] tracking-[0.2em] uppercase opacity-30 text-center">
            ◆ DIGITAL ARCHIVE · RECEIPT ◆
          </div>
          <div className="font-mono-receipt text-[8px] tracking-[0.15em] uppercase opacity-20 text-center mt-1">
            The Museum of a Digital Life
          </div>
        </div>
      </div>
    </div>
  );
}
