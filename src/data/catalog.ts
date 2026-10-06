import { cpiFor, to2026Dollars } from "./cpi";

export type AspectId = "cable" | "home" | "rent" | "streaming" | "live" | "satellite";

export type Unit = "month" | "disc" | "night";

export type Quality = "survey" | "list" | "compiled";

export type PricePoint = {
  year: number;
  price: number;
  detail?: string;
};

export type Series = {
  id: string;
  name: string;
  short: string;
  aspect: AspectId;
  unit: Unit;
  /** List prices hold until the next change. Survey and sparse benchmarks do not. */
  hold: boolean;
  through: number;
  blurb: string;
  source: string;
  quality: Quality;
  points: PricePoint[];
  /** Drawn when a shelf opens. Comparison series stay off until the reader turns them on. */
  featured?: boolean;
  /** At most one series in a group can sit on the bill. */
  exclusiveGroup?: string;
  /** Standalone series already counted inside this package. */
  includes?: string[];
};

export type Aspect = {
  id: AspectId;
  label: string;
  kicker: string;
  unitLabel: string;
  curve: "monotone" | "stepAfter";
  primaryId: string;
};

export const ASPECTS: Aspect[] = [
  {
    id: "cable",
    label: "Cable",
    kicker: "From community antennas",
    unitLabel: "per month",
    curve: "monotone",
    primaryId: "cable-expanded",
  },
  {
    id: "home",
    label: "Home media",
    kicker: "VHS to 4K",
    unitLabel: "per disc",
    curve: "monotone",
    primaryId: "dvd",
  },
  {
    id: "rent",
    label: "Rentals",
    kicker: "Store, mail, and a digital night",
    unitLabel: "per night or per month",
    curve: "monotone",
    primaryId: "blockbuster",
  },
  {
    id: "streaming",
    label: "Streaming",
    kicker: "On-demand apps",
    unitLabel: "per month",
    curve: "stepAfter",
    primaryId: "netflix",
  },
  {
    id: "live",
    label: "Live TV apps",
    kicker: "YouTube TV, Hulu, Sling",
    unitLabel: "per month",
    curve: "stepAfter",
    primaryId: "yttv",
  },
  {
    id: "satellite",
    label: "Satellite",
    kicker: "DirecTV and DISH",
    unitLabel: "per month",
    curve: "monotone",
    primaryId: "directv",
  },
];

export const SERIES: Series[] = [
  {
    id: "cable-early",
    name: "Early basic cable",
    short: "Early basic",
    aspect: "cable",
    unit: "month",
    hold: false,
    through: 1988,
    blurb:
      "National average basic rate before the FCC’s expanded-basic series. Not the same product as today’s broadcast-only tier.",
    source: "Paul Kagan Associates; NCTA survey via UPI (1987); New York Times (1989)",
    quality: "compiled",
    points: [
      { year: 1955, price: 5, detail: "Kagan history. About 250,000 subscribers." },
      { year: 1960, price: 5 },
      { year: 1965, price: 5 },
      { year: 1970, price: 5.5 },
      { year: 1975, price: 6.5 },
      { year: 1976, price: 6.75 },
      { year: 1977, price: 7 },
      { year: 1978, price: 7.25 },
      { year: 1979, price: 7.5 },
      { year: 1980, price: 7.75 },
      { year: 1981, price: 7.95 },
      { year: 1982, price: 8.25 },
      { year: 1983, price: 8.74 },
      { year: 1984, price: 9.2, detail: "Last Kagan historical year before the databook turns into projections." },
      {
        year: 1987,
        price: 11.66,
        detail: "NCTA / Arthur Andersen, June 1987, after the 1984 Cable Act lifted most local rate caps.",
      },
      { year: 1988, price: 14.52, detail: "Kagan year-average basic, cited by The New York Times in January 1989." },
    ],
  },
  {
    id: "cable-basic",
    name: "FCC basic tier",
    short: "FCC basic",
    aspect: "cable",
    unit: "month",
    hold: false,
    through: 2024,
    blurb: "The cheapest FCC-surveyed tier, mostly local broadcast stations. Most households bought more than this.",
    source: "FCC cable price reports, 1998–2024 (surveyed January 1 from 2003)",
    quality: "survey",
    points: [
      [1998, 12.06],
      [1999, 12.58],
      [2000, 12.84],
      [2001, 12.84],
      [2002, 14.45],
      [2003, 13.45],
      [2004, 13.8],
      [2005, 14.3],
      [2006, 14.59],
      [2007, 15.33],
      [2008, 16.11],
      [2009, 17.65],
      [2010, 17.93],
      [2011, 19.33],
      [2012, 20.55],
      [2013, 22.63],
      [2014, 22.78],
      [2015, 23.79],
      [2016, 25.4],
      [2017, 25.06],
      [2018, 28.42],
      [2019, 31.42],
      [2020, 34.79],
      [2021, 39.85],
      [2022, 42.63],
      [2023, 43.77],
      [2024, 47.06],
    ].map(([year, price]) => ({ year, price })),
  },
  {
    id: "cable-expanded",
    name: "FCC expanded basic",
    short: "Expanded basic",
    aspect: "cable",
    unit: "month",
    hold: false,
    through: 2024,
    blurb:
      "The package people mean by “cable”: locals plus cable networks. National subscriber-weighted average. Latest FCC reading is January 1, 2024.",
    source: "FCC Report on Cable Industry Prices, historical series 1995–2024",
    quality: "survey",
    points: [
      [1995, 22.35],
      [1996, 24.28],
      [1997, 26.31],
      [1998, 27.88],
      [1999, 28.94],
      [2000, 31.22],
      [2001, 33.75],
      [2002, 36.47],
      [2003, 38.95],
      [2004, 41.04],
      [2005, 43.04],
      [2006, 45.26],
      [2007, 47.27],
      [2008, 49.65],
      [2009, 52.37],
      [2010, 54.44],
      [2011, 57.46],
      [2012, 61.63],
      [2013, 64.41],
      [2014, 66.61],
      [2015, 69.03],
      [2016, 71.37],
      [2017, 75.21],
      [2018, 77.24],
      [2019, 80.98],
      [2020, 86.7],
      [2021, 96.53],
      [2022, 101.54],
      [2023, 102.37],
      [2024, 108.41],
    ].map(([year, price]) => ({ year, price })),
  },
  {
    id: "cable-bundle",
    name: "FCC popular bundle + equipment",
    short: "Bundle + gear",
    aspect: "cable",
    unit: "month",
    hold: false,
    through: 2024,
    blurb:
      "FCC “next most popular” service plus equipment. Closer to a real household bill than expanded basic alone. Fees and premiums can still sit on top.",
    source: "FCC cable price reports, 1998–2024",
    quality: "survey",
    points: [
      [1998, 38.58],
      [1999, 38.43],
      [2000, 39.64],
      [2001, 45.33],
      [2002, 46.59],
      [2003, 49.03],
      [2004, 51.76],
      [2005, 56.03],
      [2006, 59.09],
      [2007, 60.27],
      [2008, 63.66],
      [2009, 67.92],
      [2010, 71.39],
      [2011, 75.37],
      [2012, 78.91],
      [2013, 81.64],
      [2014, 84.65],
      [2015, 86.83],
      [2016, 90.42],
      [2017, 95.13],
      [2018, 96.48],
      [2019, 100.34],
      [2020, 106.68],
      [2021, 110.16],
      [2022, 115.73],
      [2023, 126.07],
      [2024, 132.76],
    ].map(([year, price]) => ({ year, price })),
  },
  {
    id: "vhs",
    name: "VHS new release",
    short: "VHS",
    aspect: "home",
    unit: "disc",
    hold: false,
    through: 2006,
    blurb: "What a household paid to own a new movie on tape. Early prices were set for rental stores, not living rooms.",
    source: "Compiled U.S. retail benchmarks (studio list and sell-through era)",
    quality: "compiled",
    points: [
      { year: 1978, price: 49.95, detail: "Prerecorded VHS is still new. Most copies go to rental shops." },
      { year: 1983, price: 79.95, detail: "Studio prices peak while the rental window rules." },
      { year: 1987, price: 26.95, detail: "Sell-through breaks through. Top Gun-class hits land near $27." },
      { year: 1992, price: 14.95 },
      { year: 1997, price: 14.98 },
      { year: 2001, price: 9.99 },
      { year: 2006, price: 6.99, detail: "Last full year of major-studio VHS." },
    ],
  },
  {
    id: "dvd",
    name: "DVD new release",
    short: "DVD",
    aspect: "home",
    unit: "disc",
    hold: false,
    through: 2026,
    blurb: "Typical street price for a new theatrical DVD, not the bargain bin.",
    source: "Compiled U.S. street prices, 1997 launch through 2026",
    quality: "compiled",
    points: [
      { year: 1997, price: 24.98, detail: "DVD launches in the U.S. in March." },
      { year: 2000, price: 19.98 },
      { year: 2004, price: 16.99 },
      { year: 2008, price: 14.99 },
      { year: 2012, price: 14.99 },
      { year: 2016, price: 12.99 },
      { year: 2020, price: 9.99 },
      { year: 2024, price: 12.99 },
      { year: 2026, price: 14.99, detail: "New-release street price. Older titles are often under $10." },
    ],
  },
  {
    id: "bluray",
    name: "Blu-ray new release",
    short: "Blu-ray",
    aspect: "home",
    unit: "disc",
    hold: false,
    through: 2026,
    blurb: "Typical new-release Blu-ray after the June 2006 U.S. launch.",
    source: "Compiled U.S. street prices",
    quality: "compiled",
    points: [
      { year: 2006, price: 29.99, detail: "Blu-ray launches in the U.S. HD DVD is the rival until 2008." },
      { year: 2009, price: 24.99 },
      { year: 2012, price: 19.99 },
      { year: 2016, price: 19.99 },
      { year: 2020, price: 17.99 },
      { year: 2024, price: 19.99 },
      { year: 2026, price: 22.99 },
    ],
  },
  {
    id: "uhd",
    name: "4K Ultra HD Blu-ray",
    short: "4K Blu-ray",
    aspect: "home",
    unit: "disc",
    hold: false,
    through: 2026,
    blurb: "The format that refused to get cheap. New releases stay near $30; collector editions cost more.",
    source: "Compiled U.S. street prices since the 2016 launch",
    quality: "compiled",
    points: [
      { year: 2016, price: 29.99, detail: "Ultra HD Blu-ray launches." },
      { year: 2018, price: 24.99 },
      { year: 2021, price: 24.99 },
      { year: 2024, price: 27.99 },
      { year: 2026, price: 29.99, detail: "Standard new 4K. Steelbooks run higher." },
    ],
  },
  {
    id: "netflix",
    name: "Netflix Standard",
    short: "Netflix",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    blurb: "Ad-free Standard plan, year-end U.S. price. Streaming-only pricing starts in 2010; watching inside a DVD plan began in 2007.",
    source: "Netflix U.S. list prices",
    quality: "list",
    points: [
      { year: 2010, price: 7.99, detail: "Streaming-only plan." },
      { year: 2014, price: 8.99 },
      { year: 2015, price: 9.99 },
      { year: 2017, price: 10.99 },
      { year: 2019, price: 12.99 },
      { year: 2020, price: 13.99 },
      { year: 2022, price: 15.49 },
      { year: 2025, price: 17.99 },
      { year: 2026, price: 19.99, detail: "March 2026 increase. Ads tier is $8.99; Premium is $26.99." },
    ],
  },
  {
    id: "hulu-ads",
    name: "Hulu (with ads)",
    short: "Hulu",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    blurb: "The main Hulu plan. It launched free, got cheap again in 2019, then climbed.",
    source: "Hulu U.S. list prices",
    quality: "list",
    points: [
      { year: 2008, price: 0, detail: "Free, ad-supported. Hulu opens to the public." },
      { year: 2010, price: 7.99, detail: "Hulu Plus. A $9.99 launch price was cut to $7.99 the same year." },
      { year: 2019, price: 5.99 },
      { year: 2021, price: 6.99 },
      { year: 2022, price: 7.99 },
      { year: 2024, price: 9.99 },
      { year: 2025, price: 11.99 },
      { year: 2026, price: 12.49 },
    ],
  },
  {
    id: "disney",
    name: "Disney+ (no ads)",
    short: "Disney+",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    blurb: "Ad-free Disney+, year-end. The ad-supported tier, added in 2022, is cheaper.",
    source: "Disney+ U.S. list prices",
    quality: "list",
    points: [
      { year: 2019, price: 6.99, detail: "November launch. One ad-free price." },
      { year: 2021, price: 7.99 },
      { year: 2022, price: 10.99 },
      { year: 2023, price: 13.99 },
      { year: 2024, price: 15.99 },
      { year: 2025, price: 18.99 },
      { year: 2026, price: 21.49 },
    ],
  },
  {
    id: "max",
    name: "Max / HBO (no ads)",
    short: "Max",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    blurb: "HBO Now (2015), then HBO Max (2020), then Max. Standard ad-free price. Cable HBO was a separate add-on before this.",
    source: "HBO Now / Max U.S. list prices",
    quality: "list",
    points: [
      { year: 2015, price: 14.99, detail: "HBO Now launches in April." },
      { year: 2023, price: 15.99 },
      { year: 2024, price: 16.99 },
      { year: 2025, price: 18.49 },
      {
        year: 2026,
        price: 18.49,
        detail: "Still the Standard ad-free price in fall 2026. Basic with ads is $10.99. Premium is $22.99.",
      },
    ],
  },
  {
    id: "apple",
    name: "Apple TV+",
    short: "Apple TV+",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    blurb: "The only plan Apple sells. Started as the cheap one.",
    source: "Apple TV+ U.S. list prices",
    quality: "list",
    points: [
      { year: 2019, price: 4.99 },
      { year: 2022, price: 6.99 },
      { year: 2023, price: 9.99 },
      { year: 2025, price: 12.99 },
      { year: 2026, price: 14.99 },
    ],
  },
  {
    id: "peacock",
    name: "Peacock Premium",
    short: "Peacock",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    blurb: "Premium with ads, the plan most people mean. Premium Plus (no ads) costs more. A free tier existed at launch.",
    source: "Peacock U.S. list prices",
    quality: "list",
    points: [
      { year: 2020, price: 4.99, detail: "National launch in July." },
      { year: 2023, price: 5.99 },
      { year: 2024, price: 7.99 },
      { year: 2025, price: 10.99 },
      {
        year: 2026,
        price: 12.99,
        detail: "August 2026 list price, up from $10.99. Premium Plus, without ads, is $19.99.",
      },
    ],
  },
  {
    id: "paramount",
    name: "Paramount+ Essential",
    short: "Paramount+",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    blurb: "With-ads tier. CBS All Access until the 2021 rebrand, which briefly cut the price.",
    source: "CBS All Access / Paramount+ U.S. list prices",
    quality: "list",
    points: [
      { year: 2014, price: 5.99, detail: "CBS All Access, limited commercials." },
      { year: 2021, price: 4.99, detail: "Paramount+ Essential launch price." },
      { year: 2023, price: 5.99 },
      { year: 2024, price: 7.99 },
      {
        year: 2026,
        price: 8.99,
        detail: "15 January 2026 increase, from $7.99. Premium, without ads, is $13.99.",
      },
    ],
  },
  {
    id: "prime",
    name: "Amazon Prime",
    short: "Prime",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    blurb:
      "Annual membership divided by 12, not the month-to-month plan, which is its own line. Video joined the bundle in 2006.",
    source: "Amazon Prime U.S. annual rates",
    quality: "list",
    points: [
      { year: 2005, price: 6.58, detail: "$79 a year. Instant Video comes the next year." },
      { year: 2014, price: 8.25, detail: "$99 a year." },
      { year: 2018, price: 9.92, detail: "$119 a year." },
      { year: 2022, price: 11.58, detail: "$139 a year." },
      {
        year: 2026,
        price: 11.58,
        detail: "Still $139 a year in fall 2026. Month-to-month Prime is $14.99.",
      },
    ],
  },
  {
    id: "netflix-ads",
    name: "Netflix Standard with ads",
    short: "Netflix ads",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    featured: false,
    blurb: "The ads tier, year-end U.S. list price. It is not the Standard plan on the main line.",
    source: "Netflix U.S. list prices. Launched November 2022 at $6.99, $7.99 in January 2025, $8.99 in March 2026.",
    quality: "list",
    points: [
      { year: 2022, price: 6.99, detail: "November launch." },
      { year: 2025, price: 7.99, detail: "January increase." },
      { year: 2026, price: 8.99, detail: "March increase." },
    ],
  },
  {
    id: "disney-ads",
    name: "Disney+ (with ads)",
    short: "Disney+ ads",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    featured: false,
    blurb: "The ads tier. The main Disney+ line is the no-ads plan.",
    source: "Disney+ U.S. list prices. Ads tier launched December 2022.",
    quality: "list",
    points: [
      { year: 2022, price: 7.99, detail: "December launch, beside the no-ads increase to $10.99." },
      { year: 2024, price: 9.99, detail: "October increase." },
      { year: 2025, price: 11.99, detail: "October increase." },
      { year: 2026, price: 12.49, detail: "23 September increase for new subscribers." },
    ],
  },
  {
    id: "max-ads",
    name: "Max Basic with ads",
    short: "Max ads",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    featured: false,
    blurb: "The ads tier. The main Max line is Standard, without ads.",
    source: "Max U.S. list prices. With-ads tier launched June 2021 at $9.99 and rose to $10.99 on 21 October 2025.",
    quality: "list",
    points: [
      { year: 2021, price: 9.99, detail: "June launch of the with-ads tier." },
      { year: 2025, price: 10.99, detail: "21 October increase." },
      { year: 2026, price: 10.99, detail: "Unchanged through fall 2026." },
    ],
  },
  {
    id: "hulu-premium",
    name: "Hulu Premium (no ads)",
    short: "Hulu no ads",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    featured: false,
    blurb: "The no-ads plan. The main Hulu line is the with-ads plan.",
    source: "Hulu U.S. list prices. No-ads launched September 2015. The 23 September 2026 price is the Hulu help-center rate for new subscribers.",
    quality: "list",
    points: [
      { year: 2015, price: 11.99, detail: "September launch of the no-ads plan." },
      { year: 2021, price: 12.99 },
      { year: 2022, price: 14.99 },
      { year: 2023, price: 17.99 },
      { year: 2024, price: 18.99 },
      { year: 2026, price: 21.49, detail: "23 September increase for new subscribers, from $18.99." },
    ],
  },
  {
    id: "peacock-plus",
    name: "Peacock Premium Plus",
    short: "Peacock no ads",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    featured: false,
    blurb: "Premium Plus, the no-ads plan. The main Peacock line is Premium with ads.",
    source: "Peacock U.S. list prices.",
    quality: "list",
    points: [
      { year: 2020, price: 9.99, detail: "July national launch." },
      { year: 2023, price: 11.99 },
      { year: 2024, price: 13.99 },
      { year: 2025, price: 16.99 },
      { year: 2026, price: 19.99, detail: "August 2026 increase, from $16.99." },
    ],
  },
  {
    id: "paramount-premium",
    name: "Paramount+ Premium",
    short: "Paramount+ no ads",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    featured: false,
    blurb: "The no-ads plan, with Showtime from 2023. The main Paramount+ line is Essential, with ads. Live TV on this plan still carries ads.",
    source: "Paramount+ U.S. list prices. Premium launched March 2021.",
    quality: "list",
    points: [
      { year: 2021, price: 9.99, detail: "March launch, three months before Essential." },
      { year: 2023, price: 11.99, detail: "June increase. Showtime is bundled in at this price." },
      { year: 2024, price: 12.99, detail: "August increase." },
      { year: 2026, price: 13.99, detail: "15 January 2026 increase, from $12.99." },
    ],
  },
  {
    id: "prime-monthly",
    name: "Amazon Prime, month to month",
    short: "Prime monthly",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    featured: false,
    blurb: "The month-to-month membership, not the annual plan divided by 12. The chart starts when the 2022 rate is documented.",
    source: "Amazon Prime U.S. monthly rate. February 2022 increase to $14.99, still the list price in fall 2026.",
    quality: "list",
    points: [
      {
        year: 2022,
        price: 14.99,
        detail: "February 2022. Monthly rose from $12.99 as the annual plan went to $139.",
      },
      { year: 2026, price: 14.99, detail: "Still $14.99 a month in fall 2026." },
    ],
  },
  {
    id: "espn-select",
    name: "ESPN Select",
    short: "ESPN Select",
    aspect: "streaming",
    unit: "month",
    hold: false,
    through: 2026,
    featured: false,
    exclusiveGroup: "espn-plan",
    blurb:
      "ESPN+ until August 2025, then ESPN Select. Year-end list price for a new subscriber. Years without a dot were not pinned down, so the line stops rather than inventing them.",
    source:
      "ESPN U.S. list prices. Launch 12 April 2018 at $4.99 (ESPN). Later steps: Variety (August 2020), Axios (July 2021 and August 2022), ESPN Fan Support for the 17 September 2026 price of $13.99, up from $12.99.",
    quality: "list",
    points: [
      { year: 2018, price: 4.99, detail: "12 April launch, as ESPN+." },
      { year: 2019, price: 4.99 },
      { year: 2020, price: 5.99, detail: "12 August, for new subscribers. Existing monthly subscribers kept $4.99 for a year." },
      { year: 2021, price: 6.99, detail: "July increase." },
      { year: 2022, price: 9.99, detail: "23 August increase, from $6.99." },
      {
        year: 2025,
        price: 12.99,
        detail: "The price ESPN Select rose from on 17 September 2026. Renamed from ESPN+ in August 2025. The path from 2023 to this price is not charted.",
      },
      { year: 2026, price: 13.99, detail: "17 September increase. Annual plan $139.99." },
    ],
  },
  {
    id: "espn-unlimited",
    name: "ESPN Unlimited",
    short: "ESPN Unlimited",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    featured: false,
    exclusiveGroup: "espn-plan",
    blurb: "The full ESPN channel lineup as a standalone stream. Short history. Select is the cheaper plan and does not include the linear channels.",
    source: "ESPN U.S. list prices. Launched 21 August 2025 at $29.99. $31.99 after 17 September 2026 (ESPN Fan Support).",
    quality: "list",
    points: [
      { year: 2025, price: 29.99, detail: "21 August launch." },
      { year: 2026, price: 31.99, detail: "17 September increase. Annual plan $319.99." },
    ],
  },
  {
    id: "disney-hulu-ads",
    name: "Disney+ and Hulu, with ads",
    short: "Disney+ Hulu ads",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    featured: false,
    exclusiveGroup: "disney-bundle",
    includes: ["disney-ads", "hulu-ads"],
    blurb: "The with-ads duo. It did not rise in the September 2026 hike. Earlier bundle years are not filled in.",
    source: "Hulu help center, 30 September 2026, and the 23 September 2026 price notice. With-ads bundle stayed $12.99.",
    quality: "list",
    points: [
      { year: 2025, price: 12.99, detail: "The price the September 2026 notice left unchanged." },
      { year: 2026, price: 12.99, detail: "Still $12.99 after 23 September 2026." },
    ],
  },
  {
    id: "disney-hulu-premium",
    name: "Disney+ and Hulu, no ads",
    short: "Disney+ Hulu no ads",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    featured: false,
    exclusiveGroup: "disney-bundle",
    includes: ["disney", "hulu-premium"],
    blurb: "Both services without ads. Cheaper than buying the two no-ads plans separately.",
    source: "Hulu help center, 30 September 2026. Rose by $2 in the 23 September 2026 notice, from $19.99.",
    quality: "list",
    points: [
      { year: 2025, price: 19.99, detail: "Price before the 23 September 2026 increase." },
      { year: 2026, price: 21.99, detail: "New-subscriber price after 23 September 2026." },
    ],
  },
  {
    id: "disney-hulu-espn-select",
    name: "Disney+, Hulu, ESPN Select, with ads",
    short: "Trio with ads",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    featured: false,
    exclusiveGroup: "disney-bundle",
    includes: ["disney-ads", "hulu-ads", "espn-select"],
    blurb: "The with-ads trio. ESPN Select, not Unlimited.",
    source: "Hulu help center, 30 September 2026. Rose by $2 in the 23 September 2026 notice, from $19.99.",
    quality: "list",
    points: [
      { year: 2025, price: 19.99, detail: "Price before the 23 September 2026 increase." },
      { year: 2026, price: 21.99 },
    ],
  },
  {
    id: "disney-hulu-espn-select-premium",
    name: "Disney+, Hulu, ESPN Select, no ads",
    short: "Trio no ads",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    featured: false,
    exclusiveGroup: "disney-bundle",
    includes: ["disney", "hulu-premium", "espn-select"],
    blurb: "Disney+ and Hulu without ads, plus ESPN Select, which still has ads.",
    source: "Hulu help center, 30 September 2026: $32.99. The 23 September notice put the increase at $3, from $29.99.",
    quality: "list",
    points: [
      { year: 2025, price: 29.99, detail: "Price before the 23 September 2026 increase." },
      { year: 2026, price: 32.99 },
    ],
  },
  {
    id: "disney-hulu-espn-unlimited",
    name: "Disney+, Hulu, ESPN Unlimited, with ads",
    short: "Unlimited trio",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    featured: false,
    exclusiveGroup: "disney-bundle",
    includes: ["disney-ads", "hulu-ads", "espn-unlimited"],
    blurb: "With-ads Disney+ and Hulu, plus ESPN Unlimited. Unchanged in the September 2026 hike. Unlimited itself only launched in August 2025.",
    source: "Hulu help center, 30 September 2026. The 23 September notice said this bundle stayed $35.99.",
    quality: "list",
    points: [
      { year: 2025, price: 35.99, detail: "Year-end price. Unlimited launched in August 2025." },
      { year: 2026, price: 35.99, detail: "Unchanged on 23 September 2026." },
    ],
  },
  {
    id: "disney-hulu-espn-unlimited-premium",
    name: "Disney+, Hulu, ESPN Unlimited, no ads",
    short: "Unlimited trio no ads",
    aspect: "streaming",
    unit: "month",
    hold: true,
    through: 2026,
    featured: false,
    exclusiveGroup: "disney-bundle",
    includes: ["disney", "hulu-premium", "espn-unlimited"],
    blurb: "Disney+ and Hulu without ads, plus ESPN Unlimited. Unchanged in the September 2026 hike.",
    source: "Hulu help center, 30 September 2026. The 23 September notice said this bundle stayed $44.99.",
    quality: "list",
    points: [
      { year: 2025, price: 44.99, detail: "Year-end price. Unlimited launched in August 2025." },
      { year: 2026, price: 44.99, detail: "Unchanged on 23 September 2026." },
    ],
  },
  {
    id: "yttv",
    name: "YouTube TV",
    short: "YouTube TV",
    aspect: "live",
    unit: "month",
    hold: true,
    through: 2026,
    exclusiveGroup: "yttv-plan",
    blurb: "Base plan with locals in most markets and cloud DVR. The reference live-TV streamer.",
    source: "YouTube TV U.S. base-plan list prices",
    quality: "list",
    points: [
      { year: 2017, price: 35, detail: "April launch." },
      { year: 2018, price: 40 },
      { year: 2019, price: 49.99 },
      { year: 2020, price: 64.99 },
      { year: 2023, price: 72.99 },
      { year: 2024, price: 82.99 },
    ],
  },
  {
    id: "hulu-live",
    name: "Hulu + Live TV",
    short: "Hulu + Live",
    aspect: "live",
    unit: "month",
    hold: true,
    through: 2026,
    blurb: "Live TV bundle with the ad-supported Hulu library. The no-ads live bundle costs more.",
    source: "Hulu + Live TV U.S. list prices",
    quality: "list",
    points: [
      { year: 2017, price: 39.99, detail: "May launch." },
      { year: 2019, price: 54.99 },
      { year: 2020, price: 64.99 },
      { year: 2021, price: 69.99 },
      { year: 2022, price: 74.99 },
      { year: 2023, price: 76.99 },
      { year: 2024, price: 82.99 },
      { year: 2025, price: 89.99 },
      { year: 2026, price: 99.99, detail: "September 2026 increase for new subscribers." },
    ],
  },
  {
    id: "sling",
    name: "Sling Orange",
    short: "Sling",
    aspect: "live",
    unit: "month",
    hold: true,
    through: 2026,
    blurb: "The first big contract-free live bundle. Orange is the ESPN-leaning single plan. Blue is priced the same in recent years.",
    source: "Sling TV U.S. list prices",
    quality: "list",
    points: [
      { year: 2015, price: 20, detail: "February launch. The wedge that started cord-cutting." },
      { year: 2018, price: 25 },
      { year: 2019, price: 30 },
      { year: 2021, price: 35 },
      { year: 2022, price: 40 },
      { year: 2024, price: 45.99 },
      {
        year: 2026,
        price: 45.99,
        detail: "Still the Orange list price in October 2026, on Sling’s plan comparison. Cheaper Select and Essentials plans are a different product.",
      },
    ],
  },
  {
    id: "dtv-stream",
    name: "DirecTV Stream",
    short: "DirecTV Stream",
    aspect: "live",
    unit: "month",
    hold: true,
    through: 2026,
    blurb:
      "Entry live package. Launched as DirecTV Now (2016), then AT&T TV, now DirecTV Stream. Not the satellite dish.",
    source: "DirecTV Now / DirecTV Stream entry-package list prices",
    quality: "list",
    points: [
      { year: 2016, price: 35, detail: "DirecTV Now, November." },
      { year: 2018, price: 40 },
      { year: 2019, price: 65 },
      { year: 2020, price: 55, detail: "A rare cut, to $55." },
      { year: 2021, price: 70 },
      { year: 2023, price: 79.99 },
      { year: 2024, price: 86.99 },
    ],
  },
  {
    id: "fubo",
    name: "Fubo",
    short: "Fubo",
    aspect: "live",
    unit: "month",
    hold: true,
    through: 2026,
    blurb: "Sports-leaning base plan. The cheapest widely sold tier changed names, so this is the entry live package, not one frozen channel count.",
    source: "Fubo U.S. base-plan list prices",
    quality: "list",
    points: [
      { year: 2017, price: 34.99 },
      { year: 2018, price: 44.99 },
      { year: 2019, price: 54.99 },
      { year: 2020, price: 64.99 },
      { year: 2022, price: 69.99 },
      { year: 2023, price: 74.99 },
      { year: 2024, price: 79.99 },
      { year: 2025, price: 73.99, detail: "A one-year dip in the advertised base." },
      { year: 2026, price: 88.99 },
    ],
  },
  {
    id: "philo",
    name: "Philo",
    short: "Philo",
    aspect: "live",
    unit: "month",
    hold: true,
    through: 2026,
    blurb: "Entertainment channels only. No local stations and no ESPN. The budget live bundle.",
    source: "Philo U.S. list prices",
    quality: "list",
    points: [
      { year: 2017, price: 16 },
      { year: 2018, price: 20 },
      { year: 2021, price: 25 },
      { year: 2024, price: 28 },
    ],
  },
  {
    id: "yttv-sports",
    name: "YouTube TV Sports",
    short: "YT Sports",
    aspect: "live",
    unit: "month",
    hold: false,
    through: 2026,
    featured: false,
    exclusiveGroup: "yttv-plan",
    blurb: "A 2026 genre plan, not a history. It replaces the base plan. It is not added on top of it. Intro rates are ignored.",
    source: "YouTube blog, 9 February 2026. Sports plan list price $64.99.",
    quality: "list",
    points: [{ year: 2026, price: 64.99, detail: "February 2026 list price. New-subscriber intros were lower and are not charted." }],
  },
  {
    id: "yttv-sports-news",
    name: "YouTube TV Sports + News",
    short: "YT Sports News",
    aspect: "live",
    unit: "month",
    hold: false,
    through: 2026,
    featured: false,
    exclusiveGroup: "yttv-plan",
    blurb: "Sports plan plus national news. A 2026 snapshot.",
    source: "YouTube blog, 9 February 2026.",
    quality: "list",
    points: [{ year: 2026, price: 71.99, detail: "February 2026 list price." }],
  },
  {
    id: "yttv-entertainment",
    name: "YouTube TV Entertainment",
    short: "YT Entertainment",
    aspect: "live",
    unit: "month",
    hold: false,
    through: 2026,
    featured: false,
    exclusiveGroup: "yttv-plan",
    blurb: "The entertainment genre plan. No sports package. A 2026 snapshot.",
    source: "YouTube blog, 9 February 2026.",
    quality: "list",
    points: [{ year: 2026, price: 54.99, detail: "February 2026 list price." }],
  },
  {
    id: "yttv-family",
    name: "YouTube TV News, Entertainment, Family",
    short: "YT Family",
    aspect: "live",
    unit: "month",
    hold: false,
    through: 2026,
    featured: false,
    exclusiveGroup: "yttv-plan",
    blurb: "News, entertainment, and family. A 2026 snapshot. Not the $82.99 base plan.",
    source: "YouTube blog, 9 February 2026. News + Entertainment + Family plan.",
    quality: "list",
    points: [{ year: 2026, price: 69.99, detail: "February 2026 list price." }],
  },
  {
    id: "directv",
    name: "DirecTV satellite",
    short: "DirecTV",
    aspect: "satellite",
    unit: "month",
    hold: false,
    through: 2026,
    blurb:
      "Published starting package, programming only. Promotional teaser rates and the receiver fee (about $15 in recent years) are not included. Gaps are undocumented years, not a flat price.",
    source: "1994 launch price; later package sheets compiled through 2026",
    quality: "compiled",
    points: [
      {
        year: 1994,
        price: 21.95,
        detail: "June 17 launch. Up to about 75 channels. Dish and receiver about $699.",
      },
      { year: 2000, price: 31.99, detail: "Total Choice era, compiled from period ads." },
      { year: 2005, price: 49.99, detail: "Mid-tier Total Choice list, compiled." },
      { year: 2010, price: 69.99, detail: "Choice-class package, compiled." },
      { year: 2015, price: 84.99, detail: "Select-class list. Two-year promos were lower." },
      { year: 2020, price: 109.99, detail: "A commonly cited post-promo prevailing rate, compiled." },
      {
        year: 2025,
        price: 89.99,
        detail: "Entertainment list before the advanced-receiver fee. The drop is a package redesign, not a cheaper all-in bill.",
      },
      { year: 2026, price: 89.99, detail: "Entertainment list. Fees still extra." },
    ],
  },
  {
    id: "dish",
    name: "DISH Network",
    short: "DISH",
    aspect: "satellite",
    unit: "month",
    hold: false,
    through: 2026,
    blurb:
      "America’s Top entry, then the AT120 family. Locals were extra until they were bundled. Recent points are with-locals bill rates, not the 24-month promo.",
    source: "DISH launch tariffs; package log through 2025; 2026 estimated from the reported $5 increase",
    quality: "compiled",
    points: [
      { year: 1996, price: 19.95, detail: "March launch. America’s Top 40. Locals extra." },
      { year: 1998, price: 28.99, detail: "America’s Top 60." },
      { year: 2000, price: 39.99, detail: "America’s Top 150. Locals still about $6 extra." },
      { year: 2009, price: 39.99, detail: "Lower-mid America’s Top tier, before locals were bundled in." },
      { year: 2021, price: 94.99, detail: "America’s Top 120 including locals." },
      { year: 2022, price: 99.99 },
      { year: 2023, price: 104.99 },
      { year: 2024, price: 111.99 },
      { year: 2025, price: 116.99 },
      {
        year: 2026,
        price: 121.99,
        detail: "With-locals AT120 after the reported September increase. Advertised 24-month promos were nearer $95.",
      },
    ],
  },
  {
    id: "blockbuster",
    name: "Blockbuster overnight",
    short: "Blockbuster",
    aspect: "rent",
    unit: "night",
    hold: true,
    through: 2013,
    blurb:
      "New-release overnight at a Blockbuster-style store, VHS then DVD. Late fees were extra. This is the price the red envelope was built to beat.",
    source: "Compiled advertised new-release overnight rates",
    quality: "compiled",
    points: [
      { year: 1986, price: 2.99, detail: "New-release VHS overnight." },
      { year: 1992, price: 3.29 },
      { year: 1998, price: 3.99 },
      {
        year: 2004,
        price: 4.99,
        detail: "New-release DVD overnight. Older titles were cheaper. Late fees still applied.",
      },
      { year: 2008, price: 4.99 },
      { year: 2013, price: 3.99, detail: "Most company-owned stores are gone after the 2010 bankruptcy." },
    ],
  },
  {
    id: "bb-bluray",
    name: "Blockbuster Blu-ray night",
    short: "Store Blu-ray",
    aspect: "rent",
    unit: "night",
    hold: true,
    through: 2013,
    blurb: "New-release Blu-ray overnight. Usually about a dollar more than the DVD on the same shelf.",
    source: "Compiled store rates",
    quality: "compiled",
    points: [
      { year: 2008, price: 5.99, detail: "Blu-ray hits the new-release wall, typically $1 over DVD." },
      { year: 2011, price: 5.99 },
      { year: 2013, price: 4.99 },
    ],
  },
  {
    id: "redbox",
    name: "Redbox DVD",
    short: "Redbox DVD",
    aspect: "rent",
    unit: "night",
    hold: true,
    through: 2024,
    blurb: "One-night DVD from a kiosk. The dollar-a-night answer to both Blockbuster and the mailbox.",
    source: "Compiled kiosk rates",
    quality: "compiled",
    points: [
      { year: 2006, price: 1 },
      { year: 2011, price: 1.2 },
      { year: 2014, price: 1.5 },
      { year: 2019, price: 1.75 },
      { year: 2022, price: 2 },
      { year: 2024, price: 2.25, detail: "Kiosks largely disappear after this." },
    ],
  },
  {
    id: "redbox-br",
    name: "Redbox Blu-ray",
    short: "Redbox Blu-ray",
    aspect: "rent",
    unit: "night",
    hold: true,
    through: 2024,
    blurb: "Kiosk Blu-ray, a notch above the DVD slot.",
    source: "Compiled kiosk rates",
    quality: "compiled",
    points: [
      { year: 2008, price: 1.5 },
      { year: 2014, price: 1.75 },
      { year: 2018, price: 2 },
      { year: 2022, price: 2.25 },
      { year: 2024, price: 2.5 },
    ],
  },
  {
    id: "netflix-mail3",
    name: "Netflix mail, 3 discs",
    short: "Mail, 3 discs",
    aspect: "rent",
    unit: "month",
    hold: true,
    through: 2011,
    blurb:
      "The plan that killed the late fee: unlimited exchanges, several discs at home. Not comparable to a single overnight without dividing by how many movies you actually watched.",
    source: "Netflix subscription list prices",
    quality: "list",
    points: [
      {
        year: 1999,
        price: 19.95,
        detail: "Subscription replaces the 1998 pay-per-disc store. About four discs out at a time.",
      },
      { year: 2005, price: 17.99, detail: "The advertised 3-disc unlimited plan." },
      { year: 2008, price: 16.99 },
      {
        year: 2011,
        price: 16.99,
        detail: "The July 2011 split rewrites the tiers. One disc, without streaming, becomes $7.99.",
      },
    ],
  },
  {
    id: "netflix-mail",
    name: "Netflix mail, 1 disc",
    short: "Mail, 1 disc",
    aspect: "rent",
    unit: "month",
    hold: true,
    through: 2023,
    blurb:
      "One disc at a time, no late fee. Streaming was bundled into this plan until the 2011 split, then stripped out. Blu-ray was included by the end. Last envelopes mailed September 29, 2023.",
    source: "Netflix / DVD.com list prices",
    quality: "list",
    points: [
      {
        year: 2007,
        price: 9.99,
        detail: "One disc out. Streaming, added this year, came along on plans at this price.",
      },
      { year: 2011, price: 7.99, detail: "DVD-only after the split. Streaming is now a separate $7.99." },
      {
        year: 2020,
        price: 9.99,
        detail: "DVD.com 1-disc price. Two discs were $14.99 and three were $19.99 at shutdown.",
      },
    ],
  },
  {
    id: "amazon-rent",
    name: "Prime Video HD rental",
    short: "Prime Video rent",
    aspect: "rent",
    unit: "night",
    hold: true,
    through: 2026,
    blurb:
      "A new-release HD rental on Prime Video, not the movies included with Prime. You get 30 days to start and 48 hours once you press play. Library titles are often $2.99–$3.99. A $19.99 early window is a different product and is not on this line.",
    source: "Compiled Prime Video / Amazon Video storefront rates",
    quality: "compiled",
    points: [
      {
        year: 2008,
        price: 4.99,
        detail: "Amazon’s storefront matches the new iTunes rental scale. HD new releases sit near $5.",
      },
      { year: 2012, price: 3.99 },
      { year: 2016, price: 3.99 },
      { year: 2020, price: 4.99 },
      { year: 2024, price: 5.99 },
      { year: 2026, price: 5.99, detail: "Typical new-release HD. Many catalog rents are still under $4." },
    ],
  },
  {
    id: "fandango-rent",
    name: "Fandango at Home HD rental",
    short: "Fandango rent",
    aspect: "rent",
    unit: "night",
    hold: true,
    through: 2026,
    blurb:
      "Vudu until the 2024 rename. Same idea as a Prime Video rental: no monthly fee, one new-release HD title, 48 hours after you start it.",
    source: "Compiled Vudu / Fandango at Home storefront rates",
    quality: "compiled",
    points: [
      { year: 2008, price: 4.99, detail: "Vudu HD rental, in line with Amazon and iTunes." },
      { year: 2014, price: 3.99 },
      { year: 2020, price: 3.99 },
      { year: 2024, price: 5.99, detail: "Rebranded Fandango at Home. SD rents are cheaper; 4K runs higher." },
      { year: 2026, price: 5.99 },
    ],
  },
];

export type Milestone = {
  year: number;
  aspect: AspectId;
  title: string;
  text: string;
};

export const MILESTONES: Milestone[] = [
  {
    year: 1948,
    aspect: "cable",
    title: "Cable arrives",
    text: "Community antennas in Astoria, Oregon and Mahanoy City, Pennsylvania. A shared hilltop aerial, a few dollars a month. Reliable national averages start in the 1950s.",
  },
  {
    year: 1972,
    aspect: "cable",
    title: "HBO",
    text: "Premium movie channels begin as an add-on. They were never inside the basic price on these charts.",
  },
  {
    year: 1977,
    aspect: "home",
    title: "VHS",
    text: "JVC’s format reaches U.S. shelves. Studios price tapes for rental stores, which is why buying one could cost as much as a month of cable times ten.",
  },
  {
    year: 1987,
    aspect: "cable",
    title: "Caps come off",
    text: "The 1984 Cable Act frees most basic rates. By June 1987 the average basic bill is $11.66, and it is still rising.",
  },
  {
    year: 1994,
    aspect: "satellite",
    title: "DirecTV",
    text: "June 17. Digital satellite from $21.95 a month. The dish and receiver are about $699 on top.",
  },
  {
    year: 1996,
    aspect: "satellite",
    title: "DISH",
    text: "Charlie Ergen’s service launches in March. America’s Top 40 is $19.95, locals extra.",
  },
  {
    year: 1997,
    aspect: "home",
    title: "DVD",
    text: "A new movie is about $25, and unlike cable it spends the next twenty years getting cheaper.",
  },
  {
    year: 1999,
    aspect: "rent",
    title: "Red envelope",
    text: "Netflix drops pay-per-disc and charges about $19.95 a month for several DVDs at home, with no late fee. The 1998 service had mailed discs one rental at a time.",
  },
  {
    year: 2008,
    aspect: "rent",
    title: "Rent without a disc",
    text: "iTunes, Amazon, and Vudu settle on a few dollars for a new-release digital rental. A Blockbuster night is still about $5, plus the drive.",
  },
  {
    year: 2006,
    aspect: "home",
    title: "Blu-ray",
    text: "High-definition discs open near $30. HD DVD loses the format war in 2008.",
  },
  {
    year: 2007,
    aspect: "streaming",
    title: "Netflix streams",
    text: "Streaming starts inside DVD-by-mail plans. A standalone price, $7.99, shows up in 2010.",
  },
  {
    year: 2015,
    aspect: "live",
    title: "Sling TV",
    text: "Twenty dollars, no contract, no truck roll. The first live bundle built to replace cable.",
  },
  {
    year: 2016,
    aspect: "home",
    title: "4K discs",
    text: "Ultra HD Blu-ray launches near $30 and mostly stays there. It is the home format that did not race to the bottom.",
  },
  {
    year: 2017,
    aspect: "live",
    title: "YouTube TV",
    text: "Launches at $35 with locals and a cloud DVR. The price more than doubles by 2024.",
  },
  {
    year: 2023,
    aspect: "rent",
    title: "Last red envelope",
    text: "September 29. DVD.com closes. One disc at a time is $9.99. After this, a new movie at home is a digital rental or a subscription.",
  },
];

export type Preset = {
  id: string;
  label: string;
  year: number;
  blurb: string;
  ids: string[];
};

export const PRESETS: Preset[] = [
  {
    id: "cable88",
    label: "1988 cable house",
    year: 1988,
    blurb: "Basic cable, right after deregulation.",
    ids: ["cable-early"],
  },
  {
    id: "dvd05",
    label: "2005 DVD night",
    year: 2005,
    blurb: "Expanded basic on the bill, a new disc by the TV.",
    ids: ["cable-expanded", "dvd", "blockbuster"],
  },
  {
    id: "mail07",
    label: "2007 red envelope",
    year: 2007,
    blurb: "One disc in the mail, or a Blockbuster night if you drive.",
    ids: ["netflix-mail", "blockbuster"],
  },
  {
    id: "cut17",
    label: "2017 cord-cutter",
    year: 2017,
    blurb: "Sling, Netflix, and Hulu. No truck, no bundle.",
    ids: ["sling", "netflix", "hulu-ads"],
  },
  {
    id: "stack26",
    label: "2026 full stack",
    year: 2026,
    blurb: "YouTube TV plus the big on-demand apps.",
    ids: ["yttv", "netflix", "disney", "max", "hulu-ads"],
  },
  {
    id: "bundle26",
    label: "2026 bundle household",
    year: 2026,
    blurb: "Disney+ and Hulu with ads, Netflix Standard, and Max with ads.",
    ids: ["disney-hulu-ads", "netflix", "max-ads"],
  },
];

export function seriesById(id: string): Series | undefined {
  return SERIES.find((s) => s.id === id);
}

export function seriesFor(aspect: AspectId): Series[] {
  return SERIES.filter((s) => s.aspect === aspect);
}

export function featuredSeries(aspect: AspectId): Series[] {
  return seriesFor(aspect).filter((series) => series.featured !== false);
}

function sharesExclusive(a: Series, b: Series): boolean {
  return a.exclusiveGroup != null && a.exclusiveGroup === b.exclusiveGroup;
}

function billConflicts(next: Series, other: Series): boolean {
  if (sharesExclusive(next, other)) return true;
  if (next.includes?.includes(other.id)) return true;
  if (other.includes?.includes(next.id)) return true;
  if (
    next.includes?.some((included) => {
      const item = seriesById(included);
      return item != null && sharesExclusive(item, other) && included !== other.id;
    })
  ) {
    return true;
  }
  if (
    other.includes?.some((included) => {
      const item = seriesById(included);
      return item != null && sharesExclusive(item, next) && included !== next.id;
    })
  ) {
    return true;
  }
  return false;
}

/** Checking a package clears the services inside it, and the reverse. Plans in one group replace each other. */
export function toggleBill(current: string[], id: string): string[] {
  if (current.includes(id)) return current.filter((item) => item !== id);
  const next = seriesById(id);
  if (!next) return current;
  return [...current.filter((otherId) => {
    const other = seriesById(otherId);
    return other != null && !billConflicts(next, other);
  }), id];
}

export function firstPaidPoint(series: Series): PricePoint | undefined {
  return series.points.find((point) => point.price > 0);
}

/** What the first paid price would be in `year` if it had only followed CPI. */
export function inflationGhost(series: Series, year: number): number | null {
  const base = firstPaidPoint(series);
  if (!base || year < base.year || year > series.through) return null;
  const baseCpi = cpiFor(base.year);
  if (baseCpi <= 0) return null;
  return base.price * (cpiFor(year) / baseCpi);
}

export function priceAt(series: Series, year: number): number | null {
  const first = series.points[0];
  if (!first || year < first.year || year > series.through) return null;
  if (!series.hold) {
    const hit = series.points.find((p) => p.year === year);
    return hit ? hit.price : null;
  }
  let price: number | null = null;
  for (const point of series.points) {
    if (point.year <= year) price = point.price;
    else break;
  }
  return price;
}

export function detailAt(series: Series, year: number): string | undefined {
  return series.points.find((p) => p.year === year)?.detail;
}

export function spanOf(aspect: AspectId | "all"): { min: number; max: number } {
  const rows = aspect === "all" ? SERIES : seriesFor(aspect);
  const years = rows.flatMap((s) => [s.points[0]?.year ?? s.through, s.through]);
  return { min: Math.min(...years), max: Math.max(...years) };
}

export type DollarMode = "nominal" | "real";
export type ValueMode = "dollars" | "index";

export function displayValue(
  series: Series,
  year: number,
  dollars: DollarMode,
  mode: ValueMode,
): number | null {
  const nominal = priceAt(series, year);
  if (nominal == null) return null;
  const amount = dollars === "real" ? to2026Dollars(nominal, year) : nominal;
  if (mode === "dollars") return amount;
  const basePoint = series.points.find((point) => point.price > 0) ?? series.points[0];
  if (!basePoint || basePoint.price <= 0) return 0;
  const base = dollars === "real" ? to2026Dollars(basePoint.price, basePoint.year) : basePoint.price;
  return (amount / base) * 100;
}

export const STROKES = ["var(--color-s0)", "var(--color-s1)", "var(--color-s2)", "var(--color-s3)"];
export const DASHES = ["0", "6 4", "2 3", "9 3 2 3"];

export function styleFor(series: Series): { stroke: string; dash: string } {
  const peers = seriesFor(series.aspect);
  const index = Math.max(0, peers.findIndex((s) => s.id === series.id));
  return {
    stroke: STROKES[index % STROKES.length] ?? STROKES[0]!,
    dash: DASHES[Math.floor(index / STROKES.length) % DASHES.length] ?? "0",
  };
}

export function unitWord(unit: Unit): string {
  if (unit === "month") return "/mo";
  if (unit === "night") return "/night";
  return "/disc";
}
