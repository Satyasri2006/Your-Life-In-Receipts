export interface CalendarDay {
  date: string;
  spotify: number;
  transactions: number;
}

// Generate 4 years of overlapping calendar data (2015-2018)
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateCalendarData(): CalendarDay[] {
  const rng = seededRandom(42);
  const days: CalendarDay[] = [];
  const startYear = 2015;
  const endYear = 2018;

  for (let year = startYear; year <= endYear; year++) {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const daysInYear = isLeap ? 366 : 365;
    for (let dayOfYear = 0; dayOfYear < daysInYear; dayOfYear++) {
      const date = new Date(year, 0, dayOfYear + 1);
      const dateStr = date.toISOString().split('T')[0];

      // Spotify: seasonal patterns, higher on weekends, evenings
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
      const seasonalBoost = Math.sin((dayOfYear / 365) * Math.PI * 2) * 0.3 + 1;
      const weekendBoost = isWeekend ? 1.4 : 1;
      const spotifyBase = 40 + rng() * 60;
      const spotify = Math.round(spotifyBase * seasonalBoost * weekendBoost);

      // Transactions: different pattern - clustered around month start/mid
      const dayOfMonth = date.getDate();
      const monthCluster = dayOfMonth < 5 || (dayOfMonth > 14 && dayOfMonth < 20) ? 1.8 : 1;
      const txBase = 0.3 + rng() * 1.5;
      const transactions = Math.round(txBase * monthCluster * 10) / 10;

      days.push({ date: dateStr, spotify, transactions });
    }
  }

  return days;
}

export const calendarData: CalendarDay[] = generateCalendarData();

export const calendarStats = {
  correlation: 0.02,
  sharedDates: calendarData.length,
  spotifyRange: '2013—2024',
  transactionRange: '2015—2018',
  overlapRange: '2015—2018',
};
