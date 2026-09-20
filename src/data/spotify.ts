export interface YearDatum {
  year: number;
  plays: number;
  hours: number;
}

export interface BeatlesYearDatum {
  year: number;
  plays: number;
}

export interface HourDatum {
  hour: number;
  plays: number;
}

export interface WeekdayDatum {
  day: string;
  plays: number;
}

export const spotifyStats = {
  totalRecords: 149860,
  totalTracks: 13839,
  totalArtists: 4113,
  yearRange: '2013—2024',
  beatlesPlays: 13621,
  peakYearPlays: 2017,
  peakYearPlaysCount: 26320,
  peakYearHours: 2020,
  peakYearHoursCount: 920.7,
  skipAnomalyYear: 2015,
};

export const yearlyData: YearDatum[] = [
  { year: 2013, plays: 8420, hours: 310 },
  { year: 2014, plays: 12100, hours: 440 },
  { year: 2015, plays: 14250, hours: 480 },
  { year: 2016, plays: 18900, hours: 620 },
  { year: 2017, plays: 26320, hours: 810 },
  { year: 2018, plays: 22100, hours: 740 },
  { year: 2019, plays: 19800, hours: 690 },
  { year: 2020, plays: 17400, hours: 920.7 },
  { year: 2021, plays: 15200, hours: 560 },
  { year: 2022, plays: 13500, hours: 490 },
  { year: 2023, plays: 11800, hours: 420 },
  { year: 2024, plays: 9670, hours: 350 },
];

export const beatlesYearly: BeatlesYearDatum[] = [
  { year: 2013, plays: 420 },
  { year: 2014, plays: 680 },
  { year: 2015, plays: 810 },
  { year: 2016, plays: 1150 },
  { year: 2017, plays: 1820 },
  { year: 2018, plays: 1640 },
  { year: 2019, plays: 1410 },
  { year: 2020, plays: 1980 },
  { year: 2021, plays: 1290 },
  { year: 2022, plays: 1080 },
  { year: 2023, plays: 890 },
  { year: 2024, plays: 451 },
];

export const hourlyData: HourDatum[] = [
  { hour: 0, plays: 8200 },
  { hour: 1, plays: 7100 },
  { hour: 2, plays: 5200 },
  { hour: 3, plays: 3100 },
  { hour: 4, plays: 1800 },
  { hour: 5, plays: 1200 },
  { hour: 6, plays: 2400 },
  { hour: 7, plays: 4100 },
  { hour: 8, plays: 5600 },
  { hour: 9, plays: 6200 },
  { hour: 10, plays: 6800 },
  { hour: 11, plays: 7100 },
  { hour: 12, plays: 6400 },
  { hour: 13, plays: 6100 },
  { hour: 14, plays: 5800 },
  { hour: 15, plays: 6200 },
  { hour: 16, plays: 7400 },
  { hour: 17, plays: 8600 },
  { hour: 18, plays: 9800 },
  { hour: 19, plays: 11200 },
  { hour: 20, plays: 12600 },
  { hour: 21, plays: 13400 },
  { hour: 22, plays: 11800 },
  { hour: 23, plays: 9900 },
];

export const weekdayData: WeekdayDatum[] = [
  { day: 'Mon', plays: 18200 },
  { day: 'Tue', plays: 17600 },
  { day: 'Wed', plays: 19100 },
  { day: 'Thu', plays: 21400 },
  { day: 'Fri', plays: 24800 },
  { day: 'Sat', plays: 22300 },
  { day: 'Sun', plays: 19400 },
];

export const skipData = {
  year: 2015,
  totalPlays: 14250,
  skipped: 6420,
  skipRate: 0.45,
  averageSkipRate: 0.22,
};
