import { type ReactNode } from 'react';

export type RoomId = 'lobby' | 'soundtrack' | 'everyday' | 'scale' | 'rhythms' | 'discover';

interface ArtifactCardProps {
  number: string;
  title: string;
  subtitle: string;
  rotation: number;
  onClick?: () => void;
  children?: ReactNode;
  accent?: boolean;
}

export function ArtifactCard({
  number,
  title,
  subtitle,
  rotation,
  onClick,
  children,
  accent = false,
}: ArtifactCardProps) {
  return (
    <div
      onClick={onClick}
      className="artifact-hover relative bg-[#faf6ec] border border-[rgba(26,22,18,0.1)] p-6 select-none"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Stamp number */}
      <div className="absolute top-3 right-3 font-mono-receipt text-[10px] tracking-[0.2em] opacity-40">
        {number}
      </div>

      {/* Corner mark */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[var(--accent)] opacity-40" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[var(--accent)] opacity-40" />

      <div className="pt-2">
        <div
          className={`font-mono-receipt text-[10px] tracking-[0.25em] uppercase mb-3 ${
            accent ? 'text-[var(--accent)]' : 'opacity-50'
          }`}
        >
          {subtitle}
        </div>
        <h3 className="font-serif-display text-2xl md:text-3xl font-bold leading-tight mb-3">
          {title}
        </h3>
        {children}
      </div>

      <div className="dashed-line mt-4 pt-3 flex items-center justify-between">
        <span className="font-mono-receipt text-[9px] tracking-[0.2em] uppercase opacity-40">
          Exhibit
        </span>
        {onClick && (
          <span className="font-mono-receipt text-[9px] tracking-[0.2em] uppercase text-[var(--accent)]">
            Enter →
          </span>
        )}
      </div>
    </div>
  );
}
