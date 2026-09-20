import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import type { RoomId } from '@/components/ArtifactCard';

interface FilterOverlayProps {
  open: boolean;
  onClose: () => void;
  onApply: (filter: ArchiveFilter) => void;
}

export interface ArchiveFilter {
  year: string;
  dataType: string;
  category: string;
  timePeriod: string;
}

export const defaultFilter: ArchiveFilter = {
  year: 'all',
  dataType: 'all',
  category: 'all',
  timePeriod: 'all',
};

const yearOptions = ['all', '2013', '2015', '2017', '2018', '2020', '2024'];
const dataTypeOptions = ['all', 'Spotify', 'Transactions'];
const categoryOptions = [
  'all',
  'Food',
  'Transportation',
  'Household',
  'Subscription',
  'Investment',
];
const timePeriodOptions = ['all', 'Morning', 'Evening', 'Late Night', 'Weekday', 'Weekend'];

export function FilterOverlay({ open, onClose, onApply }: FilterOverlayProps) {
  const [filter, setFilter] = useState<ArchiveFilter>(defaultFilter);

  if (!open) return null;

  const update = (key: keyof ArchiveFilter, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const apply = () => {
    onApply(filter);
    onClose();
  };

  const reset = () => {
    setFilter(defaultFilter);
    onApply(defaultFilter);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 paper-texture-deep animate-fade-in">
      <div className="sticky top-0 flex items-center justify-between px-6 py-5 border-b border-[rgba(26,22,18,0.1)]">
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-5 h-5 text-[var(--accent)]" strokeWidth={1.5} />
          <span className="font-mono-receipt text-xs tracking-[0.2em] uppercase opacity-50">
            Filter the archive
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:opacity-60 transition-opacity"
          aria-label="Close filters"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 space-y-10">
        <FilterSection
          label="Year"
          options={yearOptions}
          value={filter.year}
          onChange={(v) => update('year', v)}
        />
        <FilterSection
          label="Data type"
          options={dataTypeOptions}
          value={filter.dataType}
          onChange={(v) => update('dataType', v)}
        />
        <FilterSection
          label="Category"
          options={categoryOptions}
          value={filter.category}
          onChange={(v) => update('category', v)}
        />
        <FilterSection
          label="Time period"
          options={timePeriodOptions}
          value={filter.timePeriod}
          onChange={(v) => update('timePeriod', v)}
        />

        <div className="flex gap-4 pt-6 border-t border-[rgba(26,22,18,0.1)]">
          <button
            onClick={reset}
            className="flex-1 py-3 font-mono-receipt text-xs tracking-[0.2em] uppercase border border-[rgba(26,22,18,0.2)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            Reset
          </button>
          <button
            onClick={apply}
            className="flex-1 py-3 font-mono-receipt text-xs tracking-[0.2em] uppercase bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent)] transition-colors"
          >
            Apply filter
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterSection({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="font-mono-receipt text-[10px] tracking-[0.25em] uppercase opacity-50 mb-4">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-4 py-2 font-mono-receipt text-xs tracking-[0.1em] uppercase border transition-colors ${
              value === opt
                ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--paper)]'
                : 'border-[rgba(26,22,18,0.15)] hover:border-[var(--accent)]'
            }`}
          >
            {opt === 'all' ? 'All' : opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export type { RoomId };
