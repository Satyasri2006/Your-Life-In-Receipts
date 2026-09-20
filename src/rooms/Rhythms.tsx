import { useState, useMemo } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ReceiptDetail } from '@/components/ReceiptDetail';
import { type ReceiptData } from '@/components/Receipt';
import { calendarData, calendarStats } from '@/data/calendar';

export function Rhythms() {
  const [detail, setDetail] = useState<ReceiptData | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // Group by year for display
  const years = useMemo(() => {
    const grouped: Record<number, typeof calendarData> = {};
    calendarData.forEach((d) => {
      const year = parseInt(d.date.split('-')[0]);
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(d);
    });
    return grouped;
  }, []);

  const maxSpotify = Math.max(...calendarData.map((d) => d.spotify));
  const maxTx = Math.max(...calendarData.map((d) => d.transactions));

  return (
    <div className="min-h-screen paper-texture pt-20 md:pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-12">
            <div className="font-mono-receipt text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] mb-3">
              Room 04 · Two Rhythms
            </div>
            <h1 className="font-serif-display text-4xl md:text-7xl font-bold leading-tight mb-4">
              TWO RHYTHMS
            </h1>
            <p className="font-serif-display text-lg md:text-xl italic opacity-50 max-w-2xl">
              Two archives. Many shared dates. Very different patterns.
            </p>
          </div>
        </ScrollReveal>

        {/* Dual calendar */}
        <ScrollReveal variant="scale">
          <div className="mb-12">
            {/* Labels */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-[var(--accent)]" />
                <span className="font-mono-receipt text-xs tracking-[0.15em] uppercase">
                  Spotify — daily plays
                </span>
              </div>
              <span className="font-mono-receipt text-[10px] tracking-[0.2em] uppercase opacity-40 hidden md:inline">
                2015 — 2018
              </span>
            </div>

            {/* Spotify calendar */}
            <div className="space-y-1 mb-6">
              {Object.entries(years).map(([year, days]) => (
                <div key={year} className="flex items-center gap-2">
                  <span className="font-mono-receipt text-[9px] tracking-[0.1em] w-8 opacity-40">
                    {year}
                  </span>
                  <div className="flex-1 flex gap-[1px]">
                    {days.map((d, i) => {
                      const idx = calendarData.indexOf(d);
                      const intensity = d.spotify / maxSpotify;
                      return (
                        <div
                          key={i}
                          onMouseEnter={() => setHoveredDay(idx)}
                          onMouseLeave={() => setHoveredDay(null)}
                          onClick={() =>
                            setDetail({
                              header: 'Spotify Calendar Receipt',
                              year: d.date,
                              category: 'SPOTIFY',
                              value: `${d.spotify} plays`,
                              label: 'DAILY LISTENING ACTIVITY',
                            })
                          }
                          className="flex-1 h-5 md:h-6 cursor-pointer transition-all hover:scale-y-125"
                          style={{
                            backgroundColor: `rgba(184, 68, 46, ${0.1 + intensity * 0.9})`,
                          }}
                          title={`${d.date}: ${d.spotify} plays`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="relative my-4">
              <div className="border-t border-dashed border-[rgba(26,22,18,0.2)]" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-[var(--paper)] px-4">
                <span className="font-mono-receipt text-[9px] tracking-[0.25em] uppercase opacity-40">
                  Same calendar · Different rhythm
                </span>
              </div>
            </div>

            {/* Transactions calendar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-[var(--ink)]" />
                <span className="font-mono-receipt text-xs tracking-[0.15em] uppercase">
                  Transactions — daily activity
                </span>
              </div>
              <span className="font-mono-receipt text-[10px] tracking-[0.2em] uppercase opacity-40 hidden md:inline">
                2015 — 2018
              </span>
            </div>

            <div className="space-y-1">
              {Object.entries(years).map(([year, days]) => (
                <div key={year} className="flex items-center gap-2">
                  <span className="font-mono-receipt text-[9px] tracking-[0.1em] w-8 opacity-40">
                    {year}
                  </span>
                  <div className="flex-1 flex gap-[1px]">
                    {days.map((d, i) => {
                      const idx = calendarData.indexOf(d);
                      const intensity = d.transactions / maxTx;
                      return (
                        <div
                          key={i}
                          onMouseEnter={() => setHoveredDay(idx)}
                          onMouseLeave={() => setHoveredDay(null)}
                          onClick={() =>
                            setDetail({
                              header: 'Transaction Calendar Receipt',
                              year: d.date,
                              category: 'TRANSACTIONS',
                              value: `${d.transactions} activity`,
                              label: 'DAILY TRANSACTION ACTIVITY',
                            })
                          }
                          className="flex-1 h-5 md:h-6 cursor-pointer transition-all hover:scale-y-125"
                          style={{
                            backgroundColor: `rgba(26, 22, 18, ${0.1 + intensity * 0.8})`,
                          }}
                          title={`${d.date}: ${d.transactions} transactions`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Hovered day info */}
            {hoveredDay !== null && calendarData[hoveredDay] && (
              <div className="mt-4 flex gap-6 font-mono-receipt text-xs">
                <span className="opacity-50">{calendarData[hoveredDay].date}</span>
                <span className="text-[var(--accent)]">
                  Spotify: {calendarData[hoveredDay].spotify} plays
                </span>
                <span>Transactions: {calendarData[hoveredDay].transactions}</span>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Correlation */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[var(--paper-deep)] p-6 text-center">
              <div className="font-mono-receipt text-[10px] tracking-[0.2em] uppercase opacity-40 mb-2">
                Shared calendar dates
              </div>
              <div className="font-serif-display text-3xl font-bold">
                {calendarStats.sharedDates.toLocaleString()}
              </div>
              <div className="font-mono-receipt text-[10px] tracking-[0.1em] uppercase opacity-50 mt-1">
                days of overlap
              </div>
            </div>
            <div className="bg-[var(--ink)] text-[var(--paper)] p-6 text-center">
              <div className="font-mono-receipt text-[10px] tracking-[0.2em] uppercase text-[var(--accent-soft)] mb-2">
                Linear correlation
              </div>
              <div className="font-serif-display text-3xl font-bold text-[var(--accent-soft)]">
                r ≈ {calendarStats.correlation}
              </div>
              <div className="font-mono-receipt text-[10px] tracking-[0.1em] uppercase opacity-50 mt-1">
                almost none
              </div>
            </div>
            <div className="bg-[var(--paper-deep)] p-6 text-center">
              <div className="font-mono-receipt text-[10px] tracking-[0.2em] uppercase opacity-40 mb-2">
                Overlap period
              </div>
              <div className="font-serif-display text-3xl font-bold">
                {calendarStats.overlapRange}
              </div>
              <div className="font-mono-receipt text-[10px] tracking-[0.1em] uppercase opacity-50 mt-1">
                years in common
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Narrative */}
        <ScrollReveal>
          <div className="pl-6 border-l-2 border-[var(--accent)]">
            <p className="font-serif-display text-xl md:text-2xl italic leading-relaxed">
              "The archives share a calendar, but not a rhythm."
            </p>
            <p className="font-mono-receipt text-xs tracking-[0.1em] uppercase opacity-50 mt-3">
              Music activity and transaction activity occupy the same dates (2015—2018) but show almost no linear relationship in daily volume. We note this as a pattern, not a cause.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <ReceiptDetail
        open={!!detail}
        onClose={() => setDetail(null)}
        data={detail || { header: '', category: '', value: '', label: '' }}
      />
    </div>
  );
}
