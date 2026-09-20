import { useEffect, useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchIndex, type SearchResult } from '@/data/discoveries';
import type { RoomId } from '@/components/ArtifactCard';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (room: RoomId) => void;
}

export function SearchOverlay({ open, onClose, onNavigate }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase().trim();
    const matches = searchIndex.filter(
      (r) =>
        r.query.includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q)
    );
    setResults(matches);
  }, [query]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const suggestions = ['Beatles', 'milk', 'auto', '2017', '2020', 'food', 'transportation'];

  return (
    <div className="fixed inset-0 z-50 paper-texture-deep animate-fade-in">
      <div className="sticky top-0 flex items-center justify-between px-6 py-5 border-b border-[rgba(26,22,18,0.1)]">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-[var(--accent)]" strokeWidth={1.5} />
          <span className="font-mono-receipt text-xs tracking-[0.2em] uppercase opacity-50">
            Search the archive
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:opacity-60 transition-opacity"
          aria-label="Close search"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search the archive…"
          className="w-full bg-transparent border-none outline-none font-serif-display text-3xl md:text-5xl placeholder:opacity-30 pb-4 border-b-2 border-[rgba(26,22,18,0.15)] focus:border-[var(--accent)] transition-colors"
        />

        {query.trim().length === 0 && (
          <div className="mt-8">
            <div className="font-mono-receipt text-[10px] tracking-[0.2em] uppercase opacity-40 mb-4">
              Try searching for
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-4 py-2 font-mono-receipt text-xs tracking-[0.1em] uppercase border border-[rgba(26,22,18,0.15)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-8 space-y-3">
            <div className="font-mono-receipt text-[10px] tracking-[0.2em] uppercase opacity-40 mb-4">
              {results.length} {results.length === 1 ? 'result' : 'results'} found
            </div>
            {results.map((r, i) => (
              <button
                key={r.title}
                onClick={() => {
                  onNavigate(r.room as RoomId);
                  onClose();
                }}
                className="group w-full text-left flex items-start gap-4 p-4 bg-[#faf6ec] border border-[rgba(26,22,18,0.08)] hover:border-[var(--accent)] transition-colors"
                style={{
                  transform: `rotate(${(i % 2 === 0 ? -0.5 : 0.5)}deg)`,
                }}
              >
                <div className="flex-1">
                  <div className="font-mono-receipt text-[9px] tracking-[0.2em] uppercase text-[var(--accent)] mb-1">
                    {r.type}
                  </div>
                  <div className="font-serif-display text-xl font-bold mb-1">
                    {r.title}
                  </div>
                  <div className="font-mono-receipt text-xs tracking-[0.1em] opacity-60">
                    {r.subtitle}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 mt-2 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
              </button>
            ))}
          </div>
        )}

        {query.trim().length > 0 && results.length === 0 && (
          <div className="mt-12 text-center">
            <div className="font-serif-display text-2xl italic opacity-40 mb-2">
              No receipts found.
            </div>
            <div className="font-mono-receipt text-xs tracking-[0.1em] uppercase opacity-30">
              The archive does not contain a match for "{query}"
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
