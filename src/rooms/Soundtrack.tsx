import { useState } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { CountUp } from '@/components/CountUp';
import { ReceiptDetail } from '@/components/ReceiptDetail';
import { type ReceiptData } from '@/components/Receipt';
import {
  spotifyStats,
  yearlyData,
  beatlesYearly,
  hourlyData,
  weekdayData,
  skipData,
} from '@/data/spotify';

export function Soundtrack() {
  const [detail, setDetail] = useState<ReceiptData | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const maxPlays = Math.max(...yearlyData.map((d) => d.plays));
  const maxHours = Math.max(...yearlyData.map((d) => d.hours));
  const maxBeatles = Math.max(...beatlesYearly.map((d) => d.plays));
  const maxHourly = Math.max(...hourlyData.map((d) => d.plays));
  const maxWeekday = Math.max(...weekdayData.map((d) => d.plays));

  return (
    <div className="min-h-screen paper-texture pt-20 md:pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-12">
            <div className="font-mono-receipt text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] mb-3">
              Room 01 · The Soundtrack
            </div>
            <h1 className="font-serif-display text-4xl md:text-6xl font-bold leading-tight mb-4">
              What did this life
              <br />
              <span className="italic font-normal">sound like?</span>
            </h1>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <div className="font-mono-receipt text-sm tracking-[0.1em]">
                <CountUp end={spotifyStats.totalRecords} duration={2000} className="font-bold text-2xl" />
                <span className="opacity-50 ml-2">listening receipts</span>
              </div>
              <div className="font-mono-receipt text-sm tracking-[0.1em] opacity-50">
                {spotifyStats.yearRange}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Year-by-year visualization */}
        <ScrollReveal variant="scale">
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif-display text-2xl font-bold">Listening by year</h2>
              <button
                onClick={() => setCompareMode(!compareMode)}
                className="font-mono-receipt text-[10px] tracking-[0.2em] uppercase border border-[rgba(26,22,18,0.2)] px-3 py-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                {compareMode ? 'Exit comparison' : 'Compare 2017 vs 2020'}
              </button>
            </div>

            {compareMode ? (
              <ComparisonView
                onDetail={setDetail}
              />
            ) : (
              <div className="space-y-1">
                {yearlyData.map((d, i) => {
                  const isPeak = d.year === spotifyStats.peakYearPlays;
                  const isPeakHours = d.year === spotifyStats.peakYearHours;
                  return (
                    <button
                      key={d.year}
                      onClick={() =>
                        setDetail({
                          header: 'Digital Receipt',
                          year: String(d.year),
                          category: 'SPOTIFY',
                          value: `${d.plays.toLocaleString()} plays`,
                          label: `${d.hours} hours · ${isPeak ? 'MOST ACTIVE YEAR' : isPeakHours ? 'MOST LISTENING TIME' : 'Listening record'}`,
                          meta: isPeak ? 'PEAK VOLUME' : isPeakHours ? 'PEAK TIME' : undefined,
                        })
                      }
                      className="group w-full flex items-center gap-3 md:gap-4 py-2 hover:bg-[rgba(184,68,46,0.04)] transition-colors px-2 -mx-2"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <span className="font-mono-receipt text-xs tracking-[0.1em] w-10 md:w-12 text-right opacity-60">
                        {d.year}
                      </span>
                      <div className="flex-1 relative h-6 md:h-8 bg-[rgba(26,22,18,0.04)]">
                        <div
                          className={`absolute left-0 top-0 h-full transition-all duration-1000 ${
                            isPeak
                              ? 'bg-[var(--accent)]'
                              : isPeakHours
                              ? 'bg-[var(--accent-soft)]'
                              : 'bg-[var(--ink)] opacity-70'
                          } group-hover:opacity-100`}
                          style={{ width: `${(d.plays / maxPlays) * 100}%` }}
                        />
                        {/* Hours indicator as dots */}
                        <div
                          className="absolute right-0 top-0 h-full flex items-center pr-2"
                        >
                          {Array.from({ length: Math.round((d.hours / maxHours) * 8) }).map((_, j) => (
                            <div
                              key={j}
                              className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full mr-0.5 ${
                                isPeakHours ? 'bg-[var(--accent)]' : 'bg-[var(--ink)]'
                              } opacity-40`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="font-mono-receipt text-xs font-bold w-16 md:w-20 text-right">
                        {d.plays.toLocaleString()}
                      </span>
                      {(isPeak || isPeakHours) && (
                        <span className="font-mono-receipt text-[8px] tracking-[0.2em] uppercase text-[var(--accent)] hidden md:inline">
                          {isPeak ? 'VOLUME' : 'TIME'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex items-center gap-6 mt-4 font-mono-receipt text-[9px] tracking-[0.15em] uppercase opacity-40">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[var(--accent)]" />
                Peak volume
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[var(--accent-soft)]" />
                Peak time
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--ink)] opacity-40" />
                Listening hours
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Narrative */}
        <ScrollReveal>
          <div className="mb-16 pl-6 border-l-2 border-[var(--accent)]">
            <p className="font-serif-display text-xl md:text-2xl italic leading-relaxed">
              "More songs didn't necessarily mean more time."
            </p>
            <p className="font-mono-receipt text-xs tracking-[0.1em] uppercase opacity-50 mt-3">
              2017 had the most plays. 2020 had the most hours.
            </p>
          </div>
        </ScrollReveal>

        {/* The Beatles exhibit */}
        <ScrollReveal variant="scale">
          <div className="mb-16">
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <div className="font-mono-receipt text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] mb-2">
                  The Constant
                </div>
                <h2 className="font-serif-display text-3xl md:text-4xl font-bold">
                  THE BEATLES
                </h2>
              </div>
              <button
                onClick={() =>
                  setDetail({
                    header: 'Digital Receipt',
                    category: 'THE BEATLES',
                    value: `${spotifyStats.beatlesPlays.toLocaleString()} plays`,
                    label: 'MOST-PLAYED ARTIST · 2013—2024',
                    meta: 'THE CONSTANT',
                  })
                }
                className="font-mono-receipt text-[10px] tracking-[0.2em] uppercase border border-[rgba(26,22,18,0.2)] px-3 py-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors whitespace-nowrap"
              >
                View receipt
              </button>
            </div>

            <p className="font-serif-display text-lg italic opacity-60 mb-6">
              13,621 plays — appearing in every year of the archive.
            </p>

            {/* Beatles receipt marks */}
            <div className="flex flex-wrap gap-1 md:gap-2">
              {beatlesYearly.map((d) => {
                const intensity = d.plays / maxBeatles;
                return (
                  <button
                    key={d.year}
                    onClick={() =>
                      setDetail({
                        header: 'Beatles Receipt',
                        year: String(d.year),
                        category: 'THE BEATLES',
                        value: `${d.plays.toLocaleString()} plays`,
                        label: `${d.year} LISTENING RECORD`,
                      })
                    }
                    className="group flex flex-col items-center"
                    title={`${d.year}: ${d.plays} plays`}
                  >
                    {/* Receipt mark - vertical bar with receipt-like notches */}
                    <div
                      className="relative w-8 md:w-10 bg-[var(--ink)] group-hover:bg-[var(--accent)] transition-colors"
                      style={{ height: `${20 + intensity * 100}px` }}
                    >
                      {/* Notches at top and bottom */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--paper)]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 80% 100%, 60% 50%, 40% 100%, 20% 50%, 0 100%)' }} />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--paper)]" style={{ clipPath: 'polygon(0 0, 20% 50%, 40% 0, 60% 50%, 80% 0, 100% 50%, 100% 100%, 0 100%)' }} />
                    </div>
                    <span className="font-mono-receipt text-[8px] md:text-[9px] tracking-[0.1em] opacity-40 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all mt-1">
                      {d.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* 24-hour clock */}
        <ScrollReveal variant="scale">
          <div className="mb-16">
            <h2 className="font-serif-display text-2xl font-bold mb-2">The listening clock</h2>
            <p className="font-serif-display text-base italic opacity-50 mb-8">
              When does this life listen? The archive shows concentration in the evening and late-night hours.
            </p>

            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Circular clock */}
              <ListeningClock
                data={hourlyData}
                max={maxHourly}
                onDetail={setDetail}
              />

              {/* Weekday bars */}
              <div className="flex-1 w-full">
                <div className="font-mono-receipt text-[10px] tracking-[0.2em] uppercase opacity-50 mb-4">
                  By weekday
                </div>
                <div className="space-y-2">
                  {weekdayData.map((d) => {
                    const isPeak = d.day === 'Fri';
                    return (
                      <button
                        key={d.day}
                        onClick={() =>
                          setDetail({
                            header: 'Weekday Receipt',
                            category: d.day.toUpperCase(),
                            value: `${d.plays.toLocaleString()} plays`,
                            label: isPeak ? 'HIGHEST VOLUME WEEKDAY' : 'WEEKDAY LISTENING',
                          })
                        }
                        className="group w-full flex items-center gap-3"
                      >
                        <span className="font-mono-receipt text-xs w-8 opacity-60">{d.day}</span>
                        <div className="flex-1 h-4 bg-[rgba(26,22,18,0.04)] relative">
                          <div
                            className={`absolute left-0 top-0 h-full transition-all duration-1000 ${
                              isPeak ? 'bg-[var(--accent)]' : 'bg-[var(--ink)] opacity-60'
                            } group-hover:opacity-100`}
                            style={{ width: `${(d.plays / maxWeekday) * 100}%` }}
                          />
                        </div>
                        <span className="font-mono-receipt text-xs font-bold w-14 text-right">
                          {d.plays.toLocaleString()}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 font-mono-receipt text-[10px] tracking-[0.15em] uppercase opacity-40">
                  Friday is the highest-volume weekday.
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Skip anomaly note */}
        <ScrollReveal>
          <div className="bg-[var(--paper-deep)] p-6 border-l-4 border-[var(--accent)]">
            <div className="font-mono-receipt text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] mb-2">
              Archive anomaly
            </div>
            <p className="font-serif-display text-lg leading-relaxed">
              The archive shows that <strong>2015</strong> contains an unusually high proportion of skipped tracks
              — approximately <strong>{Math.round(skipData.skipRate * 100)}%</strong>, roughly double the average
              across other years. We note this as an anomaly in the record, without further interpretation.
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

function ComparisonView({ onDetail }: { onDetail: (d: ReceiptData) => void }) {
  const y2017 = yearlyData.find((d) => d.year === 2017)!;
  const y2020 = yearlyData.find((d) => d.year === 2020)!;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        className="bg-[#faf6ec] p-6 border border-[rgba(26,22,18,0.1)]"
        style={{ transform: 'rotate(-0.8deg)' }}
      >
        <div className="font-mono-receipt text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] mb-2">
          Year of Volume
        </div>
        <div className="font-serif-display text-5xl font-bold mb-2">2017</div>
        <div className="dashed-line mb-4" />
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="font-mono-receipt text-xs tracking-[0.1em] uppercase opacity-50">Plays</span>
            <span className="font-mono-receipt text-2xl font-bold">{y2017.plays.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="font-mono-receipt text-xs tracking-[0.1em] uppercase opacity-50">Hours</span>
            <span className="font-mono-receipt text-xl font-bold opacity-70">{y2017.hours}h</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="font-mono-receipt text-xs tracking-[0.1em] uppercase opacity-50">Plays/hour</span>
            <span className="font-mono-receipt text-lg font-bold">{(y2017.plays / y2017.hours).toFixed(1)}</span>
          </div>
        </div>
        <button
          onClick={() =>
            onDetail({
              header: 'Digital Receipt',
              year: '2017',
              category: 'SPOTIFY',
              value: `${y2017.plays.toLocaleString()} plays`,
              label: 'MOST ACTIVE YEAR · PEAK VOLUME',
              meta: 'YEAR OF VOLUME',
            })
          }
          className="mt-4 w-full py-2 font-mono-receipt text-[10px] tracking-[0.2em] uppercase border border-[rgba(26,22,18,0.2)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
        >
          View receipt
        </button>
      </div>

      <div
        className="bg-[#faf6ec] p-6 border border-[rgba(26,22,18,0.1)]"
        style={{ transform: 'rotate(0.8deg)' }}
      >
        <div className="font-mono-receipt text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] mb-2">
          Year of Time
        </div>
        <div className="font-serif-display text-5xl font-bold mb-2">2020</div>
        <div className="dashed-line mb-4" />
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="font-mono-receipt text-xs tracking-[0.1em] uppercase opacity-50">Plays</span>
            <span className="font-mono-receipt text-xl font-bold opacity-70">{y2020.plays.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="font-mono-receipt text-xs tracking-[0.1em] uppercase opacity-50">Hours</span>
            <span className="font-mono-receipt text-2xl font-bold text-[var(--accent)]">{y2020.hours}h</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="font-mono-receipt text-xs tracking-[0.1em] uppercase opacity-50">Plays/hour</span>
            <span className="font-mono-receipt text-lg font-bold">{(y2020.plays / y2020.hours).toFixed(1)}</span>
          </div>
        </div>
        <button
          onClick={() =>
            onDetail({
              header: 'Digital Receipt',
              year: '2020',
              category: 'SPOTIFY',
              value: `${y2020.hours} hours`,
              label: 'MOST LISTENING TIME · FEWER PLAYS, MORE TIME',
              meta: 'YEAR OF TIME',
            })
          }
          className="mt-4 w-full py-2 font-mono-receipt text-[10px] tracking-[0.2em] uppercase border border-[rgba(26,22,18,0.2)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
        >
          View receipt
        </button>
      </div>

      <div className="md:col-span-2 text-center">
        <p className="font-serif-display text-xl italic opacity-60">
          2017 had more plays. 2020 had more hours. The archive shows that volume and time moved differently.
        </p>
      </div>
    </div>
  );
}

function ListeningClock({
  data,
  max,
  onDetail,
}: {
  data: typeof hourlyData;
  max: number;
  onDetail: (d: ReceiptData) => void;
}) {
  const size = 280;
  const center = size / 2;
  const radius = size / 2 - 20;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Outer circle */}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(26,22,18,0.1)" strokeWidth={1} />
        <circle cx={center} cy={center} r={radius - 20} fill="none" stroke="rgba(26,22,18,0.05)" strokeWidth={1} />

        {/* Hour bars */}
        {data.map((d) => {
          const angle = (d.hour / 24) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const barLength = (d.plays / max) * (radius - 30);
          const innerR = radius - 20;
          const outerR = innerR - barLength;
          const x1 = center + Math.cos(rad) * innerR;
          const y1 = center + Math.sin(rad) * innerR;
          const x2 = center + Math.cos(rad) * outerR;
          const y2 = center + Math.sin(rad) * outerR;
          const isEvening = d.hour >= 18 && d.hour <= 23;
          const isLateNight = d.hour >= 0 && d.hour <= 2;
          const isPeak = isEvening || isLateNight;

          return (
            <g key={d.hour}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isPeak ? 'var(--accent)' : 'var(--ink)'}
                strokeWidth={isPeak ? 8 : 5}
                opacity={isPeak ? 0.9 : 0.4}
                className="cursor-pointer transition-opacity hover:opacity-100"
                onClick={() =>
                  onDetail({
                    header: 'Hourly Receipt',
                    category: `${String(d.hour).padStart(2, '0')}:00`,
                    value: `${d.plays.toLocaleString()} plays`,
                    label: isPeak ? 'PEAK LISTENING HOUR' : 'HOURLY ACTIVITY',
                  })
                }
              />
            </g>
          );
        })}

        {/* Hour labels */}
        {[0, 6, 12, 18].map((h) => {
          const angle = (h / 24) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const labelR = radius + 8;
          const x = center + Math.cos(rad) * labelR;
          const y = center + Math.sin(rad) * labelR;
          return (
            <text
              key={h}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-mono-receipt"
              fontSize={9}
              fill="var(--ink-soft)"
              opacity={0.5}
            >
              {String(h).padStart(2, '0')}:00
            </text>
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="font-mono-receipt text-[9px] tracking-[0.2em] uppercase opacity-40">24hr</div>
          <div className="font-serif-display text-sm italic opacity-50">listening</div>
        </div>
      </div>
    </div>
  );
}
