import { ScrollReveal } from '@/components/ScrollReveal';
import { ArtifactCard, type RoomId } from '@/components/ArtifactCard';
import { spotifyStats } from '@/data/spotify';
import { transactionStats } from '@/data/transactions';

interface LobbyProps {
  onNavigate: (room: RoomId) => void;
}

export function Lobby({ onNavigate }: LobbyProps) {
  return (
    <div className="min-h-screen paper-texture pt-20 md:pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="font-mono-receipt text-[10px] tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
              ◆ The Archive ◆
            </div>
            <h1 className="font-serif-display text-4xl md:text-6xl font-bold leading-tight mb-4">
              An archive of receipts,
              <br />
              <span className="italic font-normal">waiting to be read.</span>
            </h1>
            <p className="font-serif-display text-lg italic opacity-50 max-w-2xl mx-auto">
              Five rooms. Two datasets. One digital life — laid out on the table like artifacts in a museum.
            </p>
          </div>
        </ScrollReveal>

        {/* Artifact cards - scattered composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-start">
          <ScrollReveal delay={0} className="lg:mt-0">
            <ArtifactCard
              number="01"
              title="THE SOUNDTRACK"
              subtitle="Spotify · 2013—2024"
              rotation={-1.5}
              onClick={() => onNavigate('soundtrack')}
              accent
            >
              <p className="font-serif-display text-sm italic opacity-60 leading-relaxed">
                149,860 listening receipts. What did this life sound like?
              </p>
            </ArtifactCard>
          </ScrollReveal>

          <ScrollReveal delay={100} className="lg:mt-12">
            <ArtifactCard
              number="02"
              title="THE EVERYDAY"
              subtitle="Transactions · 2015—2018"
              rotation={1.2}
              onClick={() => onNavigate('everyday')}
            >
              <p className="font-serif-display text-sm italic opacity-60 leading-relaxed">
                2,461 receipts. What does ordinary life leave behind?
              </p>
            </ArtifactCard>
          </ScrollReveal>

          <ScrollReveal delay={200} className="lg:mt-4">
            <ArtifactCard
              number="03"
              title="SMALL THINGS / BIG MOVES"
              subtitle="Financial scale"
              rotation={-0.8}
              onClick={() => onNavigate('scale')}
            >
              <p className="font-serif-display text-sm italic opacity-60 leading-relaxed">
                Not every receipt is the same size.
              </p>
            </ArtifactCard>
          </ScrollReveal>

          <ScrollReveal delay={100} className="lg:mt-8">
            <ArtifactCard
              number="04"
              title="TWO RHYTHMS"
              subtitle="Calendar overlap"
              rotation={2}
              onClick={() => onNavigate('rhythms')}
              accent
            >
              <p className="font-serif-display text-sm italic opacity-60 leading-relaxed">
                Two archives. Many shared dates. Very different patterns.
              </p>
            </ArtifactCard>
          </ScrollReveal>

          <ScrollReveal delay={200} className="lg:mt-0">
            <ArtifactCard
              number="05"
              title="DISCOVERY ROOM"
              subtitle="Six findings"
              rotation={-1.2}
              onClick={() => onNavigate('discover')}
            >
              <p className="font-serif-display text-sm italic opacity-60 leading-relaxed">
                We found something. Six things, in fact.
              </p>
            </ArtifactCard>
          </ScrollReveal>

          {/* Summary card */}
          <ScrollReveal delay={300} className="lg:mt-16">
            <div
              className="bg-[var(--ink)] text-[var(--paper)] p-6 relative"
              style={{ transform: 'rotate(0.5deg)' }}
            >
              <div className="font-mono-receipt text-[10px] tracking-[0.25em] uppercase text-[var(--accent-soft)] mb-4">
                The Collection
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-serif-display text-sm italic opacity-70">Listening records</span>
                  <span className="font-mono-receipt text-lg font-bold">{spotifyStats.totalRecords.toLocaleString()}</span>
                </div>
                <div className="dashed-line-light" />
                <div className="flex items-baseline justify-between">
                  <span className="font-serif-display text-sm italic opacity-70">Transactions</span>
                  <span className="font-mono-receipt text-lg font-bold">{transactionStats.total.toLocaleString()}</span>
                </div>
                <div className="dashed-line-light" />
                <div className="flex items-baseline justify-between">
                  <span className="font-serif-display text-sm italic opacity-70">Unique tracks</span>
                  <span className="font-mono-receipt text-lg font-bold">{spotifyStats.totalTracks.toLocaleString()}</span>
                </div>
                <div className="dashed-line-light" />
                <div className="flex items-baseline justify-between">
                  <span className="font-serif-display text-sm italic opacity-70">Unique artists</span>
                  <span className="font-mono-receipt text-lg font-bold">{spotifyStats.totalArtists.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom note */}
        <ScrollReveal delay={400}>
          <div className="text-center mt-20">
            <div className="font-mono-receipt text-[10px] tracking-[0.25em] uppercase opacity-30">
              The Museum of a Digital Life · An editorial data story
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
