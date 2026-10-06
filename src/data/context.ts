import { displayValue, seriesById, type DollarMode } from "./catalog";

export type ContextPoint = {
  year: number;
  value: number;
  detail?: string;
};

export type ContextSeries = {
  id: string;
  name: string;
  unit: "channels" | "dollars" | "households";
  source: string;
  note: string;
  points: ContextPoint[];
};

/**
 * Expanded-basic channel counts and the FCC's own price-per-channel column.
 * The count is not one continuous series: the survey widened the channel
 * definition in 2010, and the published count drops again after 2020.
 * Stretches are stored separately so a chart cannot draw across the break.
 * Price per channel is the Commission's published figure, not price ÷ channels.
 * Sources: FCC cable-price historical series as carried in FCC 22-103 Attachment 1
 * (1995–2022) and FCC 24-136 Figure 4 (2010–2020). The 1 Jan 2024 price-per-channel
 * readings are from the prose of FCC 24-136 ($0.89 expanded basic, $1.21 basic).
 */
export const EXPANDED_CHANNELS: ContextSeries[] = [
  {
    id: "channels-1995",
    name: "Channels, 1995 definition",
    unit: "channels",
    source: "FCC cable price historical series, 1995–2009",
    note: "The count the FCC published before the 2010 survey started including a broader set of channels.",
    points: [
      [1995, 44],
      [1996, 47],
      [1997, 49.4],
      [1998, 50.1],
      [1999, 51.1],
      [2000, 54.8],
      [2001, 59.4],
      [2002, 62.7],
      [2003, 67.5],
      [2004, 70.3],
      [2005, 70.5],
      [2006, 71],
      [2007, 72.6],
      [2008, 72.8],
      [2009, 78.2],
    ].map(([year, value]) => ({ year, value })),
  },
  {
    id: "channels-2010",
    name: "Channels, 2010 definition",
    unit: "channels",
    source: "FCC cable price historical series, 2010–2020",
    note: "A wider channel count. It is not comparable with the 1995–2009 column, or with the count after 2020.",
    points: [
      [2010, 117],
      [2011, 124.2],
      [2012, 149.9],
      [2013, 159.6],
      [2014, 167.3],
      [2015, 181.3],
      [2016, 181],
      [2017, 195.1],
      [2018, 241.1],
      [2019, 256.1],
      [2020, 256.7],
    ].map(([year, value]) => ({ year, value })),
  },
  {
    id: "channels-2021",
    name: "Channels, after 2020",
    unit: "channels",
    source: "FCC cable price historical series, January 2021 and January 2022",
    note: "The published count falls sharply. FCC 24-136 says the channel definition changed and that a multi-year channel average should not be computed across the break. 2023 is not in the table used here.",
    points: [
      [2021, 135.1],
      [2022, 137.1],
    ].map(([year, value]) => ({ year, value })),
  },
];

export const EXPANDED_PER_CHANNEL: ContextSeries[] = [
  {
    id: "ppc-1995",
    name: "Per channel, 1995 definition",
    unit: "dollars",
    source: "FCC published price per expanded-basic channel, 1995–2009",
    note: "The FCC's column, not the package price divided by the channel count.",
    points: [
      [1995, 0.6],
      [1996, 0.61],
      [1997, 0.63],
      [1998, 0.65],
      [1999, 0.65],
      [2000, 0.66],
      [2001, 0.6],
      [2002, 0.66],
      [2003, 0.65],
      [2004, 0.66],
      [2005, 0.62],
      [2006, 0.65],
      [2007, 0.67],
      [2008, 0.68],
      [2009, 0.71],
    ].map(([year, value]) => ({ year, value })),
  },
  {
    id: "ppc-2010",
    name: "Per channel, 2010 definition",
    unit: "dollars",
    source: "FCC published price per expanded-basic channel, 2010–2020",
    note: "Same break as the channel count. Do not compare a 2009 cent with a 2010 cent as if the package were unchanged.",
    points: [
      [2010, 0.56],
      [2011, 0.569],
      [2012, 0.505],
      [2013, 0.484],
      [2014, 0.496],
      [2015, 0.456],
      [2016, 0.469],
      [2017, 0.487],
      [2018, 0.373],
      [2019, 0.365],
      [2020, 0.39],
    ].map(([year, value]) => ({ year, value })),
  },
  {
    id: "ppc-2021",
    name: "Per channel, after 2020",
    unit: "dollars",
    source: "FCC published price per expanded-basic channel, January 2021–2022, and the 1 Jan 2024 reading in FCC 24-136",
    note: "2023 is not in the tables used here. The 2024 figure is the report's own 89 cents, kept off the 2021–2022 line.",
    points: [
      [2021, 0.826],
      [2022, 0.902],
    ].map(([year, value]) => ({ year, value })),
  },
];

/** A single later reading. Not attached to the 2021–2022 line. */
export const PER_CHANNEL_2024 = {
  expanded: 0.89,
  basic: 1.21,
  year: 2024,
  source: "FCC 24-136: price per channel for the year ending 1 January 2024.",
};

/**
 * Cable households, then — separately — traditional pay-TV subscribers
 * (cable, satellite, and telephone-company video). The two are not one line.
 */
export const CABLE_HOUSEHOLDS: ContextSeries = {
  id: "cable-households",
  name: "Cable households",
  unit: "households",
  source:
    "1955: Paul Kagan, the same note as the early-basic price. 1962: NCTA legacy history. 1970–2001: International Television Almanac 2003, cable penetration table. 2023: 65.3% of traditional MVPD subscribers, FCC 2024 Communications Marketplace Report citing S&P Global.",
  note: "Cable only. The 2002–2022 gap is years this ledger does not have a cable-only count for. The 2023 point is the FCC's cable share times the MVPD total.",
  points: [
    { year: 1955, value: 250_000, detail: "About 250,000. Paul Kagan, beside the early basic rate." },
    { year: 1962, value: 850_000, detail: "NCTA: almost 800 systems serving 850,000 subscribers." },
    { year: 1970, value: 3_900_000 },
    { year: 1980, value: 15_200_000 },
    { year: 1985, value: 36_340_000 },
    { year: 1990, value: 51_900_000 },
    { year: 1991, value: 54_860_000 },
    { year: 1992, value: 55_490_000 },
    { year: 1993, value: 57_200_000 },
    { year: 1994, value: 58_750_000 },
    { year: 1995, value: 60_460_000 },
    { year: 1996, value: 62_580_000 },
    { year: 1997, value: 64_800_000 },
    { year: 1998, value: 65_810_000 },
    { year: 1999, value: 67_120_000 },
    { year: 2000, value: 68_550_000 },
    { year: 2001, value: 73_559_550 },
    {
      year: 2023,
      value: 35_300_000,
      detail: "65.3% of 54.1 million traditional MVPD subscribers at the end of 2023. Rounded from the FCC's published share.",
    },
  ],
};

export const PAY_TV_HOUSEHOLDS: ContextSeries = {
  id: "pay-tv-households",
  name: "Traditional pay TV",
  unit: "households",
  source:
    "FCC 2024 Communications Marketplace Report, citing S&P Global U.S. Multichannel Industry Benchmarks. Traditional MVPD: cable, satellite, and telephone-company video.",
  note: "Not cable alone. The 2012 figure is the peak the FCC cites. Nothing is filled in between 2012 and 2022.",
  points: [
    { year: 2012, value: 101_600_000, detail: "Peak traditional MVPD subscribership, as cited by the FCC." },
    { year: 2022, value: 61_900_000, detail: "End of 2022." },
    { year: 2023, value: 54_100_000, detail: "End of 2023. Down 7.8 million from 2022." },
  ],
};

/**
 * BLS average hourly earnings, total private, CES0500000003.
 * Annual mean of the monthly series. 2006 is omitted (the series starts in March).
 * 2025 is a full year. 2026 is January–September and is not used for the hours line,
 * because there is no 2026 expanded-basic price.
 */
export const HOURLY_WAGE: ContextPoint[] = [
  [2007, 20.91],
  [2008, 21.57],
  [2009, 22.17],
  [2010, 22.58],
  [2011, 23.03],
  [2012, 23.47],
  [2013, 23.96],
  [2014, 24.46],
  [2015, 25.01],
  [2016, 25.65],
  [2017, 26.31],
  [2018, 27.1],
  [2019, 28],
  [2020, 29.36],
  [2021, 30.61],
  [2022, 32.26],
  [2023, 33.7],
  [2024, 35.06],
  [2025, 36.44],
].map(([year, value]) => ({ year, value }));

export const WAGE_SOURCE =
  "BLS average hourly earnings of all employees, total private, CES0500000003, annual mean of the monthly series, via FRED. 2006 starts in March and is left out. This is an average wage, not a typical household's pay.";

export function contextAt(series: ContextSeries, year: number): ContextPoint | undefined {
  return series.points.find((point) => point.year === year);
}

export function perChannelAt(year: number): { value: number; stretch: string } | null {
  if (year === PER_CHANNEL_2024.year) {
    return { value: PER_CHANNEL_2024.expanded, stretch: "FCC 24-136 reading" };
  }
  for (const series of EXPANDED_PER_CHANNEL) {
    const hit = contextAt(series, year);
    if (hit) return { value: hit.value, stretch: series.name };
  }
  return null;
}

export function channelsAt(year: number): { value: number; name: string } | null {
  for (const series of EXPANDED_CHANNELS) {
    const hit = contextAt(series, year);
    if (hit) return { value: hit.value, name: series.name };
  }
  return null;
}

/** Nominal expanded basic divided by the average hourly wage. No CPI toggle. */
export function hoursForExpandedBasic(year: number): number | null {
  const cable = seriesById("cable-expanded");
  const wage = HOURLY_WAGE.find((point) => point.year === year);
  if (!cable || !wage) return null;
  const price = displayValue(cable, year, "nominal" satisfies DollarMode, "dollars");
  if (price == null || wage.value <= 0) return null;
  return price / wage.value;
}
