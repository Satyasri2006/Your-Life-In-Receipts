import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { SearchOverlay } from '@/components/SearchOverlay';
import { FilterOverlay, defaultFilter, type ArchiveFilter } from '@/components/FilterOverlay';
import { Landing } from '@/rooms/Landing';
import { Lobby } from '@/rooms/Lobby';
import { Soundtrack } from '@/rooms/Soundtrack';
import { Everyday } from '@/rooms/Everyday';
import { Scale } from '@/rooms/Scale';
import { Rhythms } from '@/rooms/Rhythms';
import { Discover } from '@/rooms/Discover';
import type { RoomId } from '@/components/ArtifactCard';

type View = 'landing' | RoomId;

export function App() {
  const [view, setView] = useState<View>('landing');
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<ArchiveFilter>(defaultFilter);

  const navigate = (room: RoomId) => {
    setView(room);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const enter = () => {
    setView('lobby');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view]);

  return (
    <div className="min-h-screen paper-texture">
      {view === 'landing' ? (
        <Landing onEnter={enter} />
      ) : (
        <>
          <Navigation
            currentRoom={view as RoomId}
            onNavigate={navigate}
            onSearchOpen={() => setSearchOpen(true)}
            onFilterOpen={() => setFilterOpen(true)}
          />
          <main key={view} className="animate-fade-in">
            {view === 'lobby' && <Lobby onNavigate={navigate} />}
            {view === 'soundtrack' && <Soundtrack />}
            {view === 'everyday' && <Everyday />}
            {view === 'scale' && <Scale />}
            {view === 'rhythms' && <Rhythms />}
            {view === 'discover' && <Discover onNavigate={navigate} />}
          </main>

          {/* Active filter indicator */}
          {(filter.year !== 'all' ||
            filter.dataType !== 'all' ||
            filter.category !== 'all' ||
            filter.timePeriod !== 'all') && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-[var(--ink)] text-[var(--paper)] px-4 py-2">
              <span className="font-mono-receipt text-[9px] tracking-[0.2em] uppercase text-[var(--accent-soft)]">
                Filter active
              </span>
              {filter.year !== 'all' && <FilterChip label={`Year: ${filter.year}`} />}
              {filter.dataType !== 'all' && <FilterChip label={filter.dataType} />}
              {filter.category !== 'all' && <FilterChip label={filter.category} />}
              {filter.timePeriod !== 'all' && <FilterChip label={filter.timePeriod} />}
              <button
                onClick={() => {
                  setFilter(defaultFilter);
                }}
                className="font-mono-receipt text-[9px] tracking-[0.2em] uppercase opacity-50 hover:opacity-100"
              >
                Clear
              </button>
            </div>
          )}
        </>
      )}

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
      />
      <FilterOverlay
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={setFilter}
      />
    </div>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <span className="font-mono-receipt text-[9px] tracking-[0.15em] uppercase border border-[#f5f0e6]/20 px-2 py-0.5">
      {label}
    </span>
  );
}

export default App;
