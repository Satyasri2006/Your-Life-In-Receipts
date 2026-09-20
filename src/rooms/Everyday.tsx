import { useState } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { CountUp } from '@/components/CountUp';
import { ReceiptDetail } from '@/components/ReceiptDetail';
import { type ReceiptData } from '@/components/Receipt';
import {
  transactionStats,
  receiptScraps,
  categories,
} from '@/data/transactions';

export function Everyday() {
  const [detail, setDetail] = useState<ReceiptData | null>(null);
  const maxCategory = Math.max(...categories.map((c) => c.count));

  return (
    <div className="min-h-screen paper-texture pt-20 md:pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-12">
            <div className="font-mono-receipt text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] mb-3">
              Room 02 · The Everyday
            </div>
            <h1 className="font-serif-display text-4xl md:text-6xl font-bold leading-tight mb-4">
              What does ordinary life
              <br />
              <span className="italic font-normal">leave behind?</span>
            </h1>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <div className="font-mono-receipt text-sm tracking-[0.1em]">
                <CountUp end={transactionStats.total} duration={2000} className="font-bold text-2xl" />
                <span className="opacity-50 ml-2">transactions</span>
              </div>
              <div className="font-mono-receipt text-sm tracking-[0.1em] opacity-50">
                {transactionStats.yearRange}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Scattered receipt scraps */}
        <ScrollReveal variant="scale">
          <div className="mb-16">
            <h2 className="font-serif-display text-2xl font-bold mb-2">Receipt scraps</h2>
            <p className="font-serif-display text-base italic opacity-50 mb-8">
              The small, repeated purchases that form the texture of a life.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {receiptScraps.map((scrap, i) => (
                <button
                  key={scrap.label}
                  onClick={() =>
                    setDetail({
                      header: 'Everyday Receipt',
                      category: scrap.label,
                      value: `×${scrap.count}`,
                      label: '2015—2018',
                      meta: 'TRANSACTION RECORD',
                    })
                  }
                  className="group relative bg-[#faf6ec] p-4 artifact-hover text-left"
                  style={{
                    transform: `rotate(${scrap.rotation}deg)`,
                    animationDelay: `${i * 80}ms`,
                  }}
                >
                  {/* Receipt top edge */}
                  <div
                    className="absolute top-0 left-0 right-0 h-2 bg-[var(--paper)]"
                    style={{
                      clipPath:
                        'polygon(0 0, 100% 0, 100% 100%, 90% 0, 80% 100%, 70% 0, 60% 100%, 50% 0, 40% 100%, 30% 0, 20% 100%, 10% 0, 0 100%)',
                    }}
                  />
                  <div className="dashed-line mb-2 mt-1" />
                  <div className="font-mono-receipt text-[8px] tracking-[0.2em] uppercase opacity-40 mb-1">
                    Receipt
                  </div>
                  <div className="font-serif-display text-lg font-bold leading-tight mb-1 break-words">
                    {scrap.label}
                  </div>
                  <div className="font-mono-receipt text-2xl font-bold text-[var(--accent)]">
                    ×{scrap.count}
                  </div>
                  <div className="dashed-line mt-2" />
                  <div className="font-mono-receipt text-[7px] tracking-[0.15em] uppercase opacity-30 mt-1 text-center">
                    ◆
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Narrative */}
        <ScrollReveal>
          <div className="mb-16 pl-6 border-l-2 border-[var(--accent)]">
            <p className="font-serif-display text-xl md:text-2xl italic leading-relaxed">
              "A life is partly made of things too ordinary to remember."
            </p>
          </div>
        </ScrollReveal>

        {/* Category composition - typographic/packed */}
        <ScrollReveal variant="scale">
          <div className="mb-16">
            <h2 className="font-serif-display text-2xl font-bold mb-2">By category</h2>
            <p className="font-serif-display text-base italic opacity-50 mb-8">
              The size of each word reflects how often it appears in the archive.
            </p>

            {/* Packed typographic composition */}
            <div className="relative bg-[var(--paper-deep)] p-8 md:p-12 min-h-[400px]">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 justify-center">
                {categories.map((cat, i) => {
                  const scale = 0.8 + (cat.count / maxCategory) * 2.5;
                  const isLargest = cat.count === maxCategory;
                  return (
                    <button
                      key={cat.label}
                      onClick={() =>
                        setDetail({
                          header: 'Category Receipt',
                          category: cat.label.toUpperCase(),
                          value: `${cat.count} transactions`,
                          label: isLargest ? 'LARGEST CATEGORY' : 'TRANSACTION CATEGORY',
                          meta: '2015—2018',
                        })
                      }
                      className="group font-serif-display font-bold leading-none transition-all hover:text-[var(--accent)]"
                      style={{
                        fontSize: `${scale}rem`,
                        opacity: isLargest ? 1 : 0.4 + (cat.count / maxCategory) * 0.5,
                        transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)`,
                        color: isLargest ? 'var(--accent)' : 'var(--ink)',
                      }}
                    >
                      {cat.label}
                      <span className="font-mono-receipt text-xs font-normal ml-1 opacity-50">
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Annotation */}
              <div className="absolute bottom-4 right-4 font-mono-receipt text-[9px] tracking-[0.2em] uppercase opacity-30 text-right">
                Food dominates the archive
                <br />
                with 907 transactions
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Summary receipts */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Food', count: transactionStats.food, note: 'Largest' },
              { label: 'Transportation', count: transactionStats.transportation, note: '' },
              { label: 'Household', count: transactionStats.household, note: '' },
              { label: 'Subscription', count: transactionStats.subscription, note: '' },
            ].map((item, i) => (
              <button
                key={item.label}
                onClick={() =>
                  setDetail({
                    header: 'Category Receipt',
                    category: item.label.toUpperCase(),
                    value: `${item.count} transactions`,
                    label: item.note ? `LARGEST CATEGORY · ${transactionStats.yearRange}` : `TRANSACTION CATEGORY · ${transactionStats.yearRange}`,
                  })
                }
                className="bg-[#faf6ec] p-4 text-left artifact-hover"
                style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}
              >
                <div className="font-mono-receipt text-[8px] tracking-[0.2em] uppercase opacity-40 mb-1">
                  {item.note || 'Category'}
                </div>
                <div className="font-serif-display text-base font-bold mb-1">{item.label}</div>
                <div className="font-mono-receipt text-xl font-bold text-[var(--accent)]">
                  {item.count}
                </div>
              </button>
            ))}
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
