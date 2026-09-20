import { useState } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ReceiptDetail } from '@/components/ReceiptDetail';
import { type ReceiptData } from '@/components/Receipt';
import { discoveries, type DiscoveryItem } from '@/data/discoveries';
import type { RoomId } from '@/components/ArtifactCard';

interface DiscoverProps {
  onNavigate: (room: RoomId) => void;
}

export function Discover({ onNavigate }: DiscoverProps) {
  const [detail, setDetail] = useState<{ data: ReceiptData; item: DiscoveryItem } | null>(null);

  const receiptMap: Record<string, ReceiptData> = {
    volume: {
      header: 'Discovery Receipt',
      year: '2017',
      category: 'THE YEAR OF VOLUME',
      value: '26,320 plays',
      label: 'MOST ACTIVE YEAR · SPOTIFY',
      meta: 'DISCOVERY 01',
    },
    time: {
      header: 'Discovery Receipt',
      year: '2020',
      category: 'THE YEAR OF TIME',
      value: '≈920.7 hours',
      label: 'MOST LISTENING TIME · SPOTIFY',
      meta: 'DISCOVERY 02',
    },
    constant: {
      header: 'Discovery Receipt',
      category: 'THE BEATLES',
      value: '13,621 plays',
      label: 'MOST-PLAYED ARTIST · 2013—2024',
      meta: 'DISCOVERY 03',
    },
    everyday: {
      header: 'Discovery Receipt',
      category: 'MILK',
      value: '×162',
      label: 'MOST FREQUENT SINGLE ITEM · 2015—2018',
      meta: 'DISCOVERY 04',
    },
    rhythms: {
      header: 'Discovery Receipt',
      category: 'TWO RHYTHMS',
      value: 'r ≈ 0.02',
      label: 'ALMOST NO LINEAR CORRELATION',
      meta: 'DISCOVERY 05',
    },
    skip: {
      header: 'Discovery Receipt',
      year: '2015',
      category: 'THE SKIP',
      value: '≈45% skip rate',
      label: 'ARCHIVE ANOMALY · NO INTERPRETATION',
      meta: 'DISCOVERY 06',
    },
  };

  return (
    <div className="min-h-screen dark-room pt-20 md:pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16 pt-8">
            <div className="font-mono-receipt text-[10px] tracking-[0.3em] uppercase text-[var(--accent-soft)] mb-4">
              Room 05 · Discovery
            </div>
            <h1 className="font-serif-display text-5xl md:text-7xl font-bold text-[#f5f0e6] leading-tight mb-4">
              WE FOUND
              <br />
              <span className="italic font-normal text-[var(--accent-soft)]">something.</span>
            </h1>
            <p className="font-serif-display text-lg italic text-[#f5f0e6]/40 max-w-xl mx-auto">
              Six discoveries hidden inside the archive. Each one is a receipt waiting to be opened.
            </p>
          </div>
        </ScrollReveal>

        {/* Discovery cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discoveries.map((d, i) => (
            <ScrollReveal key={d.id} delay={i * 100} variant="scale">
              <button
                onClick={() => setDetail({ data: receiptMap[d.id], item: d })}
                className="group relative w-full text-left bg-[#1c1815] border border-[#f5f0e6]/10 p-6 hover:border-[var(--accent)] transition-colors"
              >
                {/* Number */}
                <div className="font-serif-display text-5xl font-bold text-[var(--accent-soft)]/30 mb-4">
                  {d.number}
                </div>

                {/* Corner marks */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[var(--accent)]/30" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[var(--accent)]/30" />

                <h3 className="font-serif-display text-xl font-bold text-[#f5f0e6] mb-3 leading-tight">
                  {d.title}
                </h3>
                <p className="font-serif-display text-sm italic text-[#f5f0e6]/50 leading-relaxed mb-4">
                  {d.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#f5f0e6]/10">
                  <span className="font-mono-receipt text-[9px] tracking-[0.2em] uppercase text-[#f5f0e6]/30">
                    Open receipt
                  </span>
                  <span className="font-mono-receipt text-[9px] tracking-[0.2em] uppercase text-[var(--accent-soft)] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* Footer note */}
        <ScrollReveal delay={400}>
          <div className="text-center mt-16">
            <p className="font-serif-display text-lg italic text-[#f5f0e6]/30 max-w-2xl mx-auto">
              These are patterns the archive contains. They are descriptive, not diagnostic.
              The data shows what it shows — nothing more.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <ReceiptDetail
        open={!!detail}
        onClose={() => setDetail(null)}
        data={detail?.data || { header: '', category: '', value: '', label: '' }}
      >
        {detail && (
          <div className="mt-4">
            <p className="font-serif-display text-base leading-relaxed opacity-70">
              {detail.item.detail}
            </p>
            <button
              onClick={() => {
                setDetail(null);
                onNavigate(detail.item.room as RoomId);
              }}
              className="mt-6 w-full py-3 font-mono-receipt text-[10px] tracking-[0.2em] uppercase border border-[rgba(26,22,18,0.2)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              View in archive →
            </button>
          </div>
        )}
      </ReceiptDetail>
    </div>
  );
}
