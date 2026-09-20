import { Search, SlidersHorizontal } from 'lucide-react';
import type { RoomId } from '@/components/ArtifactCard';

interface NavigationProps {
  currentRoom: RoomId;
  onNavigate: (room: RoomId) => void;
  onSearchOpen: () => void;
  onFilterOpen: () => void;
}

const navItems: { id: RoomId; label: string }[] = [
  { id: 'lobby', label: 'Archive' },
  { id: 'soundtrack', label: 'Soundtrack' },
  { id: 'everyday', label: 'Everyday' },
  { id: 'rhythms', label: 'Rhythms' },
  { id: 'discover', label: 'Discover' },
];

export function Navigation({
  currentRoom,
  onNavigate,
  onSearchOpen,
  onFilterOpen,
}: NavigationProps) {
  return (
    <>
      {/* Desktop nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 hidden md:flex items-center justify-between px-8 py-4 paper-texture border-b border-[rgba(26,22,18,0.06)]">
        <button
          onClick={() => onNavigate('lobby')}
          className="font-serif-display text-lg font-bold tracking-tight"
        >
          The Museum of a Digital Life
        </button>
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`font-mono-receipt text-xs tracking-[0.15em] uppercase transition-colors ${
                currentRoom === item.id
                  ? 'text-[var(--accent)]'
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onSearchOpen}
            className="flex items-center gap-2 font-mono-receipt text-xs tracking-[0.15em] uppercase opacity-50 hover:opacity-100 hover:text-[var(--accent)] transition-all"
          >
            <Search className="w-4 h-4" strokeWidth={1.5} />
            Search
          </button>
          <button
            onClick={onFilterOpen}
            className="flex items-center gap-2 font-mono-receipt text-xs tracking-[0.15em] uppercase opacity-50 hover:opacity-100 hover:text-[var(--accent)] transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
            Filter
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 md:hidden paper-texture border-b border-[rgba(26,22,18,0.06)]">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => onNavigate('lobby')}
            className="font-serif-display text-sm font-bold tracking-tight"
          >
            Museum of a Digital Life
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onSearchOpen}
              className="p-2"
              aria-label="Search"
            >
              <Search className="w-4 h-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={onFilterOpen}
              className="p-2"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto no-scrollbar px-4 pb-2 gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`whitespace-nowrap font-mono-receipt text-[10px] tracking-[0.15em] uppercase transition-colors ${
                currentRoom === item.id
                  ? 'text-[var(--accent)]'
                  : 'opacity-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
