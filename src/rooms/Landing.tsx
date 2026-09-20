import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CountUp } from '@/components/CountUp';
import { spotifyStats } from '@/data/spotify';
import { transactionStats } from '@/data/transactions';

interface LandingProps {
  onEnter: () => void;
}

export function Landing({ onEnter }: LandingProps) {
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen dark-room flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Faint grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(245,240,230,0.5) 49px, rgba(245,240,230,0.5) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(245,240,230,0.5) 49px, rgba(245,240,230,0.5) 50px)',
        }}
      />

      {/* Top label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 font-mono-receipt text-[10px] tracking-[0.4em] uppercase text-[#f5f0e6]/30 animate-fade-in">
        ◆ The Museum of a Digital Life ◆
      </div>

      {/* Title */}
      <div className="text-center relative z-10">
        <div className="font-mono-receipt text-[11px] md:text-xs tracking-[0.3em] uppercase text-[var(--accent-soft)] mb-6 animate-fade-in opacity-0-init" style={{ animationFillMode: 'forwards' }}>
          An archive of receipts
        </div>
        <h1 className="font-serif-display text-[#f5f0e6] leading-[0.95] tracking-tight">
          <span className="block text-5xl md:text-7xl lg:text-8xl font-normal animate-fade-in-up opacity-0-init" style={{ animationFillMode: 'forwards' }}>
            THE MUSEUM
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-normal italic text-[var(--accent-soft)] animate-fade-in-up delay-200 opacity-0-init" style={{ animationFillMode: 'forwards' }}>
            of a
          </span>
          <span className="block text-5xl md:text-7xl lg:text-8xl font-bold animate-fade-in-up delay-300 opacity-0-init" style={{ animationFillMode: 'forwards' }}>
            DIGITAL LIFE
          </span>
        </h1>

        <p className="mt-8 font-serif-display text-lg md:text-xl italic text-[#f5f0e6]/50 max-w-xl mx-auto animate-fade-in-up delay-500 opacity-0-init" style={{ animationFillMode: 'forwards' }}>
          An archive of music, money, routines, and repetition.
        </p>
      </div>

      {/* Stats */}
      <div className={`mt-16 flex flex-col md:flex-row items-center gap-8 md:gap-16 transition-opacity duration-1000 ${statsVisible ? 'opacity-100' : 'opacity-0'}`}>
        <StatBlock value={spotifyStats.totalRecords} label="songs" />
        <div className="hidden md:block w-px h-12 bg-[#f5f0e6]/15" />
        <StatBlock value={transactionStats.total} label="receipts" />
        <div className="hidden md:block w-px h-12 bg-[#f5f0e6]/15" />
        <div className="text-center">
          <div className="font-serif-display text-3xl md:text-4xl font-bold text-[#f5f0e6]">
            {spotifyStats.yearRange}
          </div>
          <div className="font-mono-receipt text-[10px] tracking-[0.2em] uppercase text-[#f5f0e6]/40 mt-1">
            years archived
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onEnter}
        className="group mt-16 flex items-center gap-3 px-8 py-4 border border-[var(--accent)] text-[var(--accent-soft)] hover:bg-[var(--accent)] hover:text-[#f5f0e6] transition-all animate-fade-in-up delay-1000 opacity-0-init"
        style={{ animationFillMode: 'forwards' }}
      >
        <span className="font-mono-receipt text-xs tracking-[0.25em] uppercase">
          Enter the archive
        </span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
      </button>

      {/* Bottom hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono-receipt text-[9px] tracking-[0.3em] uppercase text-[#f5f0e6]/20 animate-pulse-subtle">
        Tiny receipts · Unexpected patterns · One digital life
      </div>
    </div>
  );
}

function StatBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="font-serif-display text-3xl md:text-4xl font-bold text-[#f5f0e6]">
        <CountUp end={value} duration={2500} />
      </div>
      <div className="font-mono-receipt text-[10px] tracking-[0.2em] uppercase text-[#f5f0e6]/40 mt-1">
        {label}
      </div>
    </div>
  );
}
