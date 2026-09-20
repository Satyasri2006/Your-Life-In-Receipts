import { useState } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ReceiptDetail } from '@/components/ReceiptDetail';
import { type ReceiptData } from '@/components/Receipt';
import { scaleItems } from '@/data/transactions';

export function Scale() {
  const [detail, setDetail] = useState<ReceiptData | null>(null);

  const smallItems = scaleItems.filter((s) => s.category === 'small');
  const mediumItems = scaleItems.filter((s) => s.category === 'medium');
  const largeItems = scaleItems.filter((s) => s.category === 'large');

  return (
    <div className="min-h-screen paper-texture pt-20 md:pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-12">
            <div className="font-mono-receipt text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] mb-3">
              Room 03 · Small Things / Big Moves
            </div>
            <h1 className="font-serif-display text-4xl md:text-6xl font-bold leading-tight mb-4">
              Not every receipt
              <br />
              <span className="italic font-normal">is the same size.</span>
            </h1>
            <p className="font-serif-display text-lg italic opacity-50 max-w-2xl">
              From a cup of tea to a mutual fund deposit — the archive contains receipts of vastly different scales.
            </p>
          </div>
        </ScrollReveal>

        {/* Scale visualization */}
        <ScrollReveal variant="scale">
          <div className="mb-16">
            <div className="relative">
              {/* Scale axis */}
              <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[rgba(26,22,18,0.15)]" />

              {/* Small receipts */}
              <div className="mb-12">
                <div className="font-mono-receipt text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] mb-4">
                  Small things · ₹15 — ₹150
                </div>
                <div className="flex flex-wrap gap-3">
                  {smallItems.map((item, i) => (
                    <button
                      key={item.label}
                      onClick={() =>
                        setDetail({
                          header: 'Everyday Receipt',
                          category: item.label.toUpperCase(),
                          value: item.value,
                          label: item.description.toUpperCase(),
                          meta: 'SMALL · DAILY',
                        })
                      }
                      className="group bg-[#faf6ec] px-3 py-2 artifact-hover"
                      style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
                    >
                      <div className="font-mono-receipt text-[8px] tracking-[0.15em] uppercase opacity-40">
                        {item.description}
                      </div>
                      <div className="font-serif-display text-sm font-bold">{item.label}</div>
                      <div className="font-mono-receipt text-sm font-bold text-[var(--accent)]">
                        {item.value}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Medium receipts */}
              <div className="mb-12">
                <div className="font-mono-receipt text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] mb-4">
                  Medium · ₹300 — ₹1,500
                </div>
                <div className="flex flex-wrap gap-4">
                  {mediumItems.map((item, i) => (
                    <button
                      key={item.label}
                      onClick={() =>
                        setDetail({
                          header: 'Everyday Receipt',
                          category: item.label.toUpperCase(),
                          value: item.value,
                          label: item.description.toUpperCase(),
                          meta: 'MEDIUM · PERIODIC',
                        })
                      }
                      className="group bg-[#faf6ec] px-4 py-3 artifact-hover"
                      style={{ transform: `rotate(${i % 2 === 0 ? -0.8 : 0.8}deg)` }}
                    >
                      <div className="font-mono-receipt text-[8px] tracking-[0.15em] uppercase opacity-40">
                        {item.description}
                      </div>
                      <div className="font-serif-display text-base font-bold">{item.label}</div>
                      <div className="font-mono-receipt text-lg font-bold text-[var(--accent)]">
                        {item.value}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Large receipts */}
              <div>
                <div className="font-mono-receipt text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] mb-4">
                  Big moves · ₹10,000 — ₹1,50,000+
                </div>
                <div className="flex flex-wrap gap-6">
                  {largeItems.map((item, i) => (
                    <button
                      key={item.label}
                      onClick={() =>
                        setDetail({
                          header: 'Financial Receipt',
                          category: item.label.toUpperCase(),
                          value: item.value,
                          label: item.description.toUpperCase(),
                          meta: 'LARGE · FINANCIAL MOVEMENT',
                        })
                      }
                      className="group bg-[var(--ink)] text-[var(--paper)] px-6 py-4 artifact-hover"
                      style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}
                    >
                      <div className="font-mono-receipt text-[8px] tracking-[0.15em] uppercase text-[var(--accent-soft)]">
                        {item.description}
                      </div>
                      <div className="font-serif-display text-xl font-bold">{item.label}</div>
                      <div className="font-mono-receipt text-2xl font-bold text-[var(--accent-soft)]">
                        {item.value}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scale arrow */}
              <div className="mt-12 flex items-center justify-center gap-4">
                <div className="font-mono-receipt text-[10px] tracking-[0.2em] uppercase opacity-40">
                  Tiny routines
                </div>
                <div className="flex-1 max-w-xs h-px bg-[var(--ink)] relative">
                  <div className="absolute right-0 top-0 w-0 h-0 border-l-8 border-l-[var(--ink)] border-t-4 border-t-transparent border-b-4 border-b-transparent" />
                </div>
                <div className="font-mono-receipt text-[10px] tracking-[0.2em] uppercase text-[var(--accent)]">
                  Larger financial decisions
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Narrative */}
        <ScrollReveal>
          <div className="pl-6 border-l-2 border-[var(--accent)]">
            <p className="font-serif-display text-xl md:text-2xl italic leading-relaxed">
              "Between tiny routines were much larger financial decisions."
            </p>
            <p className="font-mono-receipt text-xs tracking-[0.1em] uppercase opacity-50 mt-3">
              The archive contains salary records, investments, recurring deposits, public provident fund contributions, mutual funds, and money transfers — alongside tea and milk.
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
