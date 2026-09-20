export interface DiscoveryItem {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
  room: string;
}

export const discoveries: DiscoveryItem[] = [
  {
    id: 'volume',
    number: '01',
    title: 'THE YEAR OF VOLUME',
    description: '2017 had the most Spotify plays.',
    detail: '26,320 plays — the archive shows a peak year where listening activity reached its highest point across the entire 2013–2024 record.',
    room: 'soundtrack',
  },
  {
    id: 'time',
    number: '02',
    title: 'THE YEAR OF TIME',
    description: '2020 had the most listening time.',
    detail: '≈920.7 hours — despite fewer total plays than 2017, 2020 accumulated the most listening hours. More songs did not necessarily mean more time.',
    room: 'soundtrack',
  },
  {
    id: 'constant',
    number: '03',
    title: 'THE CONSTANT',
    description: 'The Beatles were the most-played artist.',
    detail: '13,621 plays — The Beatles appear consistently across every year of the archive, making them the single most-played artist in the entire record.',
    room: 'soundtrack',
  },
  {
    id: 'everyday',
    number: '04',
    title: 'THE EVERYDAY',
    description: 'Milk appeared 162 times.',
    detail: '162 transactions labeled "Milk" appear across 2015–2018. The archive contains this purchase more often than any other single item.',
    room: 'everyday',
  },
  {
    id: 'rhythms',
    number: '05',
    title: 'TWO RHYTHMS',
    description: 'Music and spending share many calendar dates but show almost no linear daily relationship.',
    detail: 'r ≈ 0.02 — The two archives overlap in calendar time (2015–2018) but daily activity between them shows almost no linear correlation. The archives share a calendar, but not a rhythm.',
    room: 'rhythms',
  },
  {
    id: 'skip',
    number: '06',
    title: 'THE SKIP',
    description: '2015 contains an unusually high proportion of skipped Spotify tracks.',
    detail: 'Archive anomaly — 2015 shows a skip rate of approximately 45%, roughly double the average across other years. We note this as an anomaly in the archive, without attaching further interpretation.',
    room: 'soundtrack',
  },
];

export interface SearchResult {
  query: string;
  title: string;
  subtitle: string;
  type: string;
  room: string;
}

export const searchIndex: SearchResult[] = [
  { query: 'beatles', title: 'THE BEATLES', subtitle: '13,621 plays · Most-played artist', type: 'SPOTIFY', room: 'soundtrack' },
  { query: 'milk', title: 'MILK', subtitle: '×162 · 2015–2018', type: 'EVERYDAY', room: 'everyday' },
  { query: 'auto', title: 'AUTO', subtitle: '×142 · Local commute', type: 'EVERYDAY', room: 'everyday' },
  { query: '2017', title: '2017', subtitle: '26,320 plays · Most active year', type: 'SPOTIFY', room: 'soundtrack' },
  { query: '2020', title: '2020', subtitle: '≈920.7 hours · Most listening time', type: 'SPOTIFY', room: 'soundtrack' },
  { query: 'food', title: 'FOOD', subtitle: '907 transactions · Largest category', type: 'EVERYDAY', room: 'everyday' },
  { query: 'transportation', title: 'TRANSPORTATION', subtitle: '307 transactions', type: 'EVERYDAY', room: 'everyday' },
  { query: 'snacks', title: 'SNACKS', subtitle: '×115', type: 'EVERYDAY', room: 'everyday' },
  { query: 'groceries', title: 'GROCERIES', subtitle: '×113', type: 'EVERYDAY', room: 'everyday' },
  { query: 'kirana', title: 'KIRANA', subtitle: '×83', type: 'EVERYDAY', room: 'everyday' },
  { query: 'tea', title: 'TEA', subtitle: '×43', type: 'EVERYDAY', room: 'everyday' },
  { query: 'train', title: 'TRAIN', subtitle: '×55', type: 'EVERYDAY', room: 'everyday' },
  { query: 'medicine', title: 'MEDICINE', subtitle: '×61', type: 'EVERYDAY', room: 'everyday' },
  { query: 'mobile', title: 'MOBILE SERVICE', subtitle: '×66', type: 'EVERYDAY', room: 'everyday' },
  { query: 'dinner', title: 'DINNER', subtitle: '×55', type: 'EVERYDAY', room: 'everyday' },
  { query: 'subscription', title: 'SUBSCRIPTION', subtitle: '×143', type: 'EVERYDAY', room: 'everyday' },
  { query: 'household', title: 'HOUSEHOLD', subtitle: '×176', type: 'EVERYDAY', room: 'everyday' },
  { query: 'invest', title: 'INVESTMENTS', subtitle: 'Mutual funds · PPF', type: 'FINANCIAL', room: 'scale' },
  { query: 'transfer', title: 'MONEY TRANSFER', subtitle: 'Larger movements', type: 'FINANCIAL', room: 'scale' },
  { query: 'salary', title: 'SALARY', subtitle: 'Monthly income', type: 'FINANCIAL', room: 'scale' },
  { query: 'skip', title: 'THE SKIP', subtitle: '2015 anomaly · 45% skip rate', type: 'DISCOVERY', room: 'discover' },
  { query: 'rhythms', title: 'TWO RHYTHMS', subtitle: 'r ≈ 0.02 · No linear correlation', type: 'DISCOVERY', room: 'rhythms' },
];
