import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Line, c as Cell, i as XAxis, l as ResponsiveContainer, n as LineChart, o as CartesianGrid, r as YAxis, s as Bar, t as BarChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider } from "../_libs/@radix-ui/react-slider+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cfq1G4HN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** CPI-U annual averages, 1982–84 = 100. 2025–2026 are estimates for the constant-dollar toggle. */
var CPI = {
	1955: 26.8,
	1956: 27.2,
	1957: 28.1,
	1958: 28.9,
	1959: 29.1,
	1960: 29.6,
	1961: 29.9,
	1962: 30.2,
	1963: 30.6,
	1964: 31,
	1965: 31.5,
	1966: 32.4,
	1967: 33.4,
	1968: 34.8,
	1969: 36.7,
	1970: 38.8,
	1971: 40.5,
	1972: 41.8,
	1973: 44.4,
	1974: 49.3,
	1975: 53.8,
	1976: 56.9,
	1977: 60.6,
	1978: 65.2,
	1979: 72.6,
	1980: 82.4,
	1981: 90.9,
	1982: 96.5,
	1983: 99.6,
	1984: 103.9,
	1985: 107.6,
	1986: 109.6,
	1987: 113.6,
	1988: 118.3,
	1989: 124,
	1990: 130.7,
	1991: 136.2,
	1992: 140.3,
	1993: 144.5,
	1994: 148.2,
	1995: 152.4,
	1996: 156.9,
	1997: 160.5,
	1998: 163,
	1999: 166.6,
	2e3: 172.2,
	2001: 177.1,
	2002: 179.9,
	2003: 184,
	2004: 188.9,
	2005: 195.3,
	2006: 201.6,
	2007: 207.3,
	2008: 215.3,
	2009: 214.5,
	2010: 218.1,
	2011: 224.9,
	2012: 229.6,
	2013: 233,
	2014: 236.7,
	2015: 237,
	2016: 240,
	2017: 245.1,
	2018: 251.1,
	2019: 255.7,
	2020: 258.8,
	2021: 271,
	2022: 292.7,
	2023: 304.7,
	2024: 313.7,
	2025: 322.5,
	2026: 331
};
var CPI_BASE_YEAR = 2026;
function cpiFor(year) {
	const exact = CPI[year];
	if (exact != null) return exact;
	const years = Object.keys(CPI).map(Number).sort((a, b) => a - b);
	const lo = [...years].reverse().find((y) => y < year);
	const hi = years.find((y) => y > year);
	if (lo == null || hi == null) return CPI[years[years.length - 1] ?? 2026] ?? 331;
	const span = hi - lo;
	const t = (year - lo) / span;
	return CPI[lo] * (1 - t) + CPI[hi] * t;
}
function to2026Dollars(nominal, year) {
	return nominal * (cpiFor(CPI_BASE_YEAR) / cpiFor(year));
}
var ASPECTS = [
	{
		id: "cable",
		label: "Cable",
		kicker: "From community antennas",
		unitLabel: "per month",
		curve: "monotone",
		primaryId: "cable-expanded"
	},
	{
		id: "home",
		label: "Home media",
		kicker: "VHS to 4K",
		unitLabel: "per disc",
		curve: "monotone",
		primaryId: "dvd"
	},
	{
		id: "rent",
		label: "Rentals",
		kicker: "Store, mail, and a digital night",
		unitLabel: "per night or per month",
		curve: "monotone",
		primaryId: "blockbuster"
	},
	{
		id: "streaming",
		label: "Streaming",
		kicker: "On-demand apps",
		unitLabel: "per month",
		curve: "stepAfter",
		primaryId: "netflix"
	},
	{
		id: "live",
		label: "Live TV apps",
		kicker: "YouTube TV, Hulu, Sling",
		unitLabel: "per month",
		curve: "stepAfter",
		primaryId: "yttv"
	},
	{
		id: "satellite",
		label: "Satellite",
		kicker: "DirecTV and DISH",
		unitLabel: "per month",
		curve: "monotone",
		primaryId: "directv"
	}
];
var SERIES = [
	{
		id: "cable-early",
		name: "Early basic cable",
		short: "Early basic",
		aspect: "cable",
		unit: "month",
		hold: false,
		through: 1988,
		blurb: "National average basic rate before the FCC’s expanded-basic series. Not the same product as today’s broadcast-only tier.",
		source: "Paul Kagan Associates; NCTA survey via UPI (1987); New York Times (1989)",
		quality: "compiled",
		points: [
			{
				year: 1955,
				price: 5,
				detail: "Kagan history. About 250,000 subscribers."
			},
			{
				year: 1960,
				price: 5
			},
			{
				year: 1965,
				price: 5
			},
			{
				year: 1970,
				price: 5.5
			},
			{
				year: 1975,
				price: 6.5
			},
			{
				year: 1976,
				price: 6.75
			},
			{
				year: 1977,
				price: 7
			},
			{
				year: 1978,
				price: 7.25
			},
			{
				year: 1979,
				price: 7.5
			},
			{
				year: 1980,
				price: 7.75
			},
			{
				year: 1981,
				price: 7.95
			},
			{
				year: 1982,
				price: 8.25
			},
			{
				year: 1983,
				price: 8.74
			},
			{
				year: 1984,
				price: 9.2,
				detail: "Last Kagan historical year before the databook turns into projections."
			},
			{
				year: 1987,
				price: 11.66,
				detail: "NCTA / Arthur Andersen, June 1987, after the 1984 Cable Act lifted most local rate caps."
			},
			{
				year: 1988,
				price: 14.52,
				detail: "Kagan year-average basic, cited by The New York Times in January 1989."
			}
		]
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
			[2e3, 12.84],
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
			[2024, 47.06]
		].map(([year, price]) => ({
			year,
			price
		}))
	},
	{
		id: "cable-expanded",
		name: "FCC expanded basic",
		short: "Expanded basic",
		aspect: "cable",
		unit: "month",
		hold: false,
		through: 2024,
		blurb: "The package people mean by “cable”: locals plus cable networks. National subscriber-weighted average. Latest FCC reading is January 1, 2024.",
		source: "FCC Report on Cable Industry Prices, historical series 1995–2024",
		quality: "survey",
		points: [
			[1995, 22.35],
			[1996, 24.28],
			[1997, 26.31],
			[1998, 27.88],
			[1999, 28.94],
			[2e3, 31.22],
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
			[2024, 108.41]
		].map(([year, price]) => ({
			year,
			price
		}))
	},
	{
		id: "cable-bundle",
		name: "FCC popular bundle + equipment",
		short: "Bundle + gear",
		aspect: "cable",
		unit: "month",
		hold: false,
		through: 2024,
		blurb: "FCC “next most popular” service plus equipment. Closer to a real household bill than expanded basic alone. Fees and premiums can still sit on top.",
		source: "FCC cable price reports, 1998–2024",
		quality: "survey",
		points: [
			[1998, 38.58],
			[1999, 38.43],
			[2e3, 39.64],
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
			[2024, 132.76]
		].map(([year, price]) => ({
			year,
			price
		}))
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
			{
				year: 1978,
				price: 49.95,
				detail: "Prerecorded VHS is still new. Most copies go to rental shops."
			},
			{
				year: 1983,
				price: 79.95,
				detail: "Studio prices peak while the rental window rules."
			},
			{
				year: 1987,
				price: 26.95,
				detail: "Sell-through breaks through. Top Gun-class hits land near $27."
			},
			{
				year: 1992,
				price: 14.95
			},
			{
				year: 1997,
				price: 14.98
			},
			{
				year: 2001,
				price: 9.99
			},
			{
				year: 2006,
				price: 6.99,
				detail: "Last full year of major-studio VHS."
			}
		]
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
			{
				year: 1997,
				price: 24.98,
				detail: "DVD launches in the U.S. in March."
			},
			{
				year: 2e3,
				price: 19.98
			},
			{
				year: 2004,
				price: 16.99
			},
			{
				year: 2008,
				price: 14.99
			},
			{
				year: 2012,
				price: 14.99
			},
			{
				year: 2016,
				price: 12.99
			},
			{
				year: 2020,
				price: 9.99
			},
			{
				year: 2024,
				price: 12.99
			},
			{
				year: 2026,
				price: 14.99,
				detail: "New-release street price. Older titles are often under $10."
			}
		]
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
			{
				year: 2006,
				price: 29.99,
				detail: "Blu-ray launches in the U.S. HD DVD is the rival until 2008."
			},
			{
				year: 2009,
				price: 24.99
			},
			{
				year: 2012,
				price: 19.99
			},
			{
				year: 2016,
				price: 19.99
			},
			{
				year: 2020,
				price: 17.99
			},
			{
				year: 2024,
				price: 19.99
			},
			{
				year: 2026,
				price: 22.99
			}
		]
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
			{
				year: 2016,
				price: 29.99,
				detail: "Ultra HD Blu-ray launches."
			},
			{
				year: 2018,
				price: 24.99
			},
			{
				year: 2021,
				price: 24.99
			},
			{
				year: 2024,
				price: 27.99
			},
			{
				year: 2026,
				price: 29.99,
				detail: "Standard new 4K. Steelbooks run higher."
			}
		]
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
			{
				year: 2010,
				price: 7.99,
				detail: "Streaming-only plan."
			},
			{
				year: 2014,
				price: 8.99
			},
			{
				year: 2015,
				price: 9.99
			},
			{
				year: 2017,
				price: 10.99
			},
			{
				year: 2019,
				price: 12.99
			},
			{
				year: 2020,
				price: 13.99
			},
			{
				year: 2022,
				price: 15.49
			},
			{
				year: 2025,
				price: 17.99
			},
			{
				year: 2026,
				price: 19.99,
				detail: "March 2026 increase. Ads tier is $8.99; Premium is $26.99."
			}
		]
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
			{
				year: 2008,
				price: 0,
				detail: "Free, ad-supported. Hulu opens to the public."
			},
			{
				year: 2010,
				price: 7.99,
				detail: "Hulu Plus. A $9.99 launch price was cut to $7.99 the same year."
			},
			{
				year: 2019,
				price: 5.99
			},
			{
				year: 2021,
				price: 6.99
			},
			{
				year: 2022,
				price: 7.99
			},
			{
				year: 2024,
				price: 9.99
			},
			{
				year: 2025,
				price: 11.99
			},
			{
				year: 2026,
				price: 12.49
			}
		]
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
			{
				year: 2019,
				price: 6.99,
				detail: "November launch. One ad-free price."
			},
			{
				year: 2021,
				price: 7.99
			},
			{
				year: 2022,
				price: 10.99
			},
			{
				year: 2023,
				price: 13.99
			},
			{
				year: 2024,
				price: 15.99
			},
			{
				year: 2025,
				price: 18.99
			},
			{
				year: 2026,
				price: 21.49
			}
		]
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
			{
				year: 2015,
				price: 14.99,
				detail: "HBO Now launches in April."
			},
			{
				year: 2023,
				price: 15.99
			},
			{
				year: 2024,
				price: 16.99
			},
			{
				year: 2025,
				price: 18.49
			}
		]
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
			{
				year: 2019,
				price: 4.99
			},
			{
				year: 2022,
				price: 6.99
			},
			{
				year: 2023,
				price: 9.99
			},
			{
				year: 2025,
				price: 12.99
			},
			{
				year: 2026,
				price: 14.99
			}
		]
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
			{
				year: 2020,
				price: 4.99,
				detail: "National launch in July."
			},
			{
				year: 2023,
				price: 5.99
			},
			{
				year: 2024,
				price: 7.99
			},
			{
				year: 2025,
				price: 10.99
			},
			{
				year: 2026,
				price: 12.99
			}
		]
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
			{
				year: 2014,
				price: 5.99,
				detail: "CBS All Access, limited commercials."
			},
			{
				year: 2021,
				price: 4.99,
				detail: "Paramount+ Essential launch price."
			},
			{
				year: 2023,
				price: 5.99
			},
			{
				year: 2024,
				price: 7.99
			},
			{
				year: 2026,
				price: 8.99
			}
		]
	},
	{
		id: "prime",
		name: "Amazon Prime",
		short: "Prime",
		aspect: "streaming",
		unit: "month",
		hold: true,
		through: 2026,
		blurb: "Annual membership divided by 12, not the pricier month-to-month plan. Video joined the bundle in 2006. In 2026, month-to-month Prime is $14.99.",
		source: "Amazon Prime U.S. annual rates",
		quality: "list",
		points: [
			{
				year: 2005,
				price: 6.58,
				detail: "$79 a year. Instant Video comes the next year."
			},
			{
				year: 2014,
				price: 8.25,
				detail: "$99 a year."
			},
			{
				year: 2018,
				price: 9.92,
				detail: "$119 a year."
			},
			{
				year: 2022,
				price: 11.58,
				detail: "$139 a year."
			}
		]
	},
	{
		id: "yttv",
		name: "YouTube TV",
		short: "YouTube TV",
		aspect: "live",
		unit: "month",
		hold: true,
		through: 2026,
		blurb: "Base plan with locals in most markets and cloud DVR. The reference live-TV streamer.",
		source: "YouTube TV U.S. base-plan list prices",
		quality: "list",
		points: [
			{
				year: 2017,
				price: 35,
				detail: "April launch."
			},
			{
				year: 2018,
				price: 40
			},
			{
				year: 2019,
				price: 49.99
			},
			{
				year: 2020,
				price: 64.99
			},
			{
				year: 2023,
				price: 72.99
			},
			{
				year: 2024,
				price: 82.99
			}
		]
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
			{
				year: 2017,
				price: 39.99,
				detail: "May launch."
			},
			{
				year: 2019,
				price: 54.99
			},
			{
				year: 2020,
				price: 64.99
			},
			{
				year: 2021,
				price: 69.99
			},
			{
				year: 2022,
				price: 74.99
			},
			{
				year: 2023,
				price: 76.99
			},
			{
				year: 2024,
				price: 82.99
			},
			{
				year: 2025,
				price: 89.99
			},
			{
				year: 2026,
				price: 99.99,
				detail: "September 2026 increase for new subscribers."
			}
		]
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
			{
				year: 2015,
				price: 20,
				detail: "February launch. The wedge that started cord-cutting."
			},
			{
				year: 2018,
				price: 25
			},
			{
				year: 2019,
				price: 30
			},
			{
				year: 2021,
				price: 35
			},
			{
				year: 2022,
				price: 40
			},
			{
				year: 2024,
				price: 45.99
			}
		]
	},
	{
		id: "dtv-stream",
		name: "DirecTV Stream",
		short: "DirecTV Stream",
		aspect: "live",
		unit: "month",
		hold: true,
		through: 2026,
		blurb: "Entry live package. Launched as DirecTV Now (2016), then AT&T TV, now DirecTV Stream. Not the satellite dish.",
		source: "DirecTV Now / DirecTV Stream entry-package list prices",
		quality: "list",
		points: [
			{
				year: 2016,
				price: 35,
				detail: "DirecTV Now, November."
			},
			{
				year: 2018,
				price: 40
			},
			{
				year: 2019,
				price: 65
			},
			{
				year: 2020,
				price: 55,
				detail: "A rare cut, to $55."
			},
			{
				year: 2021,
				price: 70
			},
			{
				year: 2023,
				price: 79.99
			},
			{
				year: 2024,
				price: 86.99
			}
		]
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
			{
				year: 2017,
				price: 34.99
			},
			{
				year: 2018,
				price: 44.99
			},
			{
				year: 2019,
				price: 54.99
			},
			{
				year: 2020,
				price: 64.99
			},
			{
				year: 2022,
				price: 69.99
			},
			{
				year: 2023,
				price: 74.99
			},
			{
				year: 2024,
				price: 79.99
			},
			{
				year: 2025,
				price: 73.99,
				detail: "A one-year dip in the advertised base."
			},
			{
				year: 2026,
				price: 88.99
			}
		]
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
			{
				year: 2017,
				price: 16
			},
			{
				year: 2018,
				price: 20
			},
			{
				year: 2021,
				price: 25
			},
			{
				year: 2024,
				price: 28
			}
		]
	},
	{
		id: "directv",
		name: "DirecTV satellite",
		short: "DirecTV",
		aspect: "satellite",
		unit: "month",
		hold: false,
		through: 2026,
		blurb: "Published starting package, programming only. Promotional teaser rates and the receiver fee (about $15 in recent years) are not included. Gaps are undocumented years, not a flat price.",
		source: "1994 launch price; later package sheets compiled through 2026",
		quality: "compiled",
		points: [
			{
				year: 1994,
				price: 21.95,
				detail: "June 17 launch. Up to about 75 channels. Dish and receiver about $699."
			},
			{
				year: 2e3,
				price: 31.99,
				detail: "Total Choice era, compiled from period ads."
			},
			{
				year: 2005,
				price: 49.99,
				detail: "Mid-tier Total Choice list, compiled."
			},
			{
				year: 2010,
				price: 69.99,
				detail: "Choice-class package, compiled."
			},
			{
				year: 2015,
				price: 84.99,
				detail: "Select-class list. Two-year promos were lower."
			},
			{
				year: 2020,
				price: 109.99,
				detail: "A commonly cited post-promo prevailing rate, compiled."
			},
			{
				year: 2025,
				price: 89.99,
				detail: "Entertainment list before the advanced-receiver fee. The drop is a package redesign, not a cheaper all-in bill."
			},
			{
				year: 2026,
				price: 89.99,
				detail: "Entertainment list. Fees still extra."
			}
		]
	},
	{
		id: "dish",
		name: "DISH Network",
		short: "DISH",
		aspect: "satellite",
		unit: "month",
		hold: false,
		through: 2026,
		blurb: "America’s Top entry, then the AT120 family. Locals were extra until they were bundled. Recent points are with-locals bill rates, not the 24-month promo.",
		source: "DISH launch tariffs; package log through 2025; 2026 estimated from the reported $5 increase",
		quality: "compiled",
		points: [
			{
				year: 1996,
				price: 19.95,
				detail: "March launch. America’s Top 40. Locals extra."
			},
			{
				year: 1998,
				price: 28.99,
				detail: "America’s Top 60."
			},
			{
				year: 2e3,
				price: 39.99,
				detail: "America’s Top 150. Locals still about $6 extra."
			},
			{
				year: 2009,
				price: 39.99,
				detail: "Lower-mid America’s Top tier, before locals were bundled in."
			},
			{
				year: 2021,
				price: 94.99,
				detail: "America’s Top 120 including locals."
			},
			{
				year: 2022,
				price: 99.99
			},
			{
				year: 2023,
				price: 104.99
			},
			{
				year: 2024,
				price: 111.99
			},
			{
				year: 2025,
				price: 116.99
			},
			{
				year: 2026,
				price: 121.99,
				detail: "With-locals AT120 after the reported September increase. Advertised 24-month promos were nearer $95."
			}
		]
	},
	{
		id: "blockbuster",
		name: "Blockbuster overnight",
		short: "Blockbuster",
		aspect: "rent",
		unit: "night",
		hold: true,
		through: 2013,
		blurb: "New-release overnight at a Blockbuster-style store, VHS then DVD. Late fees were extra. This is the price the red envelope was built to beat.",
		source: "Compiled advertised new-release overnight rates",
		quality: "compiled",
		points: [
			{
				year: 1986,
				price: 2.99,
				detail: "New-release VHS overnight."
			},
			{
				year: 1992,
				price: 3.29
			},
			{
				year: 1998,
				price: 3.99
			},
			{
				year: 2004,
				price: 4.99,
				detail: "New-release DVD overnight. Older titles were cheaper. Late fees still applied."
			},
			{
				year: 2008,
				price: 4.99
			},
			{
				year: 2013,
				price: 3.99,
				detail: "Most company-owned stores are gone after the 2010 bankruptcy."
			}
		]
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
			{
				year: 2008,
				price: 5.99,
				detail: "Blu-ray hits the new-release wall, typically $1 over DVD."
			},
			{
				year: 2011,
				price: 5.99
			},
			{
				year: 2013,
				price: 4.99
			}
		]
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
			{
				year: 2006,
				price: 1
			},
			{
				year: 2011,
				price: 1.2
			},
			{
				year: 2014,
				price: 1.5
			},
			{
				year: 2019,
				price: 1.75
			},
			{
				year: 2022,
				price: 2
			},
			{
				year: 2024,
				price: 2.25,
				detail: "Kiosks largely disappear after this."
			}
		]
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
			{
				year: 2008,
				price: 1.5
			},
			{
				year: 2014,
				price: 1.75
			},
			{
				year: 2018,
				price: 2
			},
			{
				year: 2022,
				price: 2.25
			},
			{
				year: 2024,
				price: 2.5
			}
		]
	},
	{
		id: "netflix-mail3",
		name: "Netflix mail, 3 discs",
		short: "Mail, 3 discs",
		aspect: "rent",
		unit: "month",
		hold: true,
		through: 2011,
		blurb: "The plan that killed the late fee: unlimited exchanges, several discs at home. Not comparable to a single overnight without dividing by how many movies you actually watched.",
		source: "Netflix subscription list prices",
		quality: "list",
		points: [
			{
				year: 1999,
				price: 19.95,
				detail: "Subscription replaces the 1998 pay-per-disc store. About four discs out at a time."
			},
			{
				year: 2005,
				price: 17.99,
				detail: "The advertised 3-disc unlimited plan."
			},
			{
				year: 2008,
				price: 16.99
			},
			{
				year: 2011,
				price: 16.99,
				detail: "The July 2011 split rewrites the tiers. One disc, without streaming, becomes $7.99."
			}
		]
	},
	{
		id: "netflix-mail",
		name: "Netflix mail, 1 disc",
		short: "Mail, 1 disc",
		aspect: "rent",
		unit: "month",
		hold: true,
		through: 2023,
		blurb: "One disc at a time, no late fee. Streaming was bundled into this plan until the 2011 split, then stripped out. Blu-ray was included by the end. Last envelopes mailed September 29, 2023.",
		source: "Netflix / DVD.com list prices",
		quality: "list",
		points: [
			{
				year: 2007,
				price: 9.99,
				detail: "One disc out. Streaming, added this year, came along on plans at this price."
			},
			{
				year: 2011,
				price: 7.99,
				detail: "DVD-only after the split. Streaming is now a separate $7.99."
			},
			{
				year: 2020,
				price: 9.99,
				detail: "DVD.com 1-disc price. Two discs were $14.99 and three were $19.99 at shutdown."
			}
		]
	},
	{
		id: "amazon-rent",
		name: "Prime Video HD rental",
		short: "Prime Video rent",
		aspect: "rent",
		unit: "night",
		hold: true,
		through: 2026,
		blurb: "A new-release HD rental on Prime Video, not the movies included with Prime. You get 30 days to start and 48 hours once you press play. Library titles are often $2.99–$3.99. A $19.99 early window is a different product and is not on this line.",
		source: "Compiled Prime Video / Amazon Video storefront rates",
		quality: "compiled",
		points: [
			{
				year: 2008,
				price: 4.99,
				detail: "Amazon’s storefront matches the new iTunes rental scale. HD new releases sit near $5."
			},
			{
				year: 2012,
				price: 3.99
			},
			{
				year: 2016,
				price: 3.99
			},
			{
				year: 2020,
				price: 4.99
			},
			{
				year: 2024,
				price: 5.99
			},
			{
				year: 2026,
				price: 5.99,
				detail: "Typical new-release HD. Many catalog rents are still under $4."
			}
		]
	},
	{
		id: "fandango-rent",
		name: "Fandango at Home HD rental",
		short: "Fandango rent",
		aspect: "rent",
		unit: "night",
		hold: true,
		through: 2026,
		blurb: "Vudu until the 2024 rename. Same idea as a Prime Video rental: no monthly fee, one new-release HD title, 48 hours after you start it.",
		source: "Compiled Vudu / Fandango at Home storefront rates",
		quality: "compiled",
		points: [
			{
				year: 2008,
				price: 4.99,
				detail: "Vudu HD rental, in line with Amazon and iTunes."
			},
			{
				year: 2014,
				price: 3.99
			},
			{
				year: 2020,
				price: 3.99
			},
			{
				year: 2024,
				price: 5.99,
				detail: "Rebranded Fandango at Home. SD rents are cheaper; 4K runs higher."
			},
			{
				year: 2026,
				price: 5.99
			}
		]
	}
];
var MILESTONES = [
	{
		year: 1948,
		aspect: "cable",
		title: "Cable arrives",
		text: "Community antennas in Astoria, Oregon and Mahanoy City, Pennsylvania. A shared hilltop aerial, a few dollars a month. Reliable national averages start in the 1950s."
	},
	{
		year: 1972,
		aspect: "cable",
		title: "HBO",
		text: "Premium movie channels begin as an add-on. They were never inside the basic price on these charts."
	},
	{
		year: 1977,
		aspect: "home",
		title: "VHS",
		text: "JVC’s format reaches U.S. shelves. Studios price tapes for rental stores, which is why buying one could cost as much as a month of cable times ten."
	},
	{
		year: 1987,
		aspect: "cable",
		title: "Caps come off",
		text: "The 1984 Cable Act frees most basic rates. By June 1987 the average basic bill is $11.66, and it is still rising."
	},
	{
		year: 1994,
		aspect: "satellite",
		title: "DirecTV",
		text: "June 17. Digital satellite from $21.95 a month. The dish and receiver are about $699 on top."
	},
	{
		year: 1996,
		aspect: "satellite",
		title: "DISH",
		text: "Charlie Ergen’s service launches in March. America’s Top 40 is $19.95, locals extra."
	},
	{
		year: 1997,
		aspect: "home",
		title: "DVD",
		text: "A new movie is about $25, and unlike cable it spends the next twenty years getting cheaper."
	},
	{
		year: 1999,
		aspect: "rent",
		title: "Red envelope",
		text: "Netflix drops pay-per-disc and charges about $19.95 a month for several DVDs at home, with no late fee. The 1998 service had mailed discs one rental at a time."
	},
	{
		year: 2008,
		aspect: "rent",
		title: "Rent without a disc",
		text: "iTunes, Amazon, and Vudu settle on a few dollars for a new-release digital rental. A Blockbuster night is still about $5, plus the drive."
	},
	{
		year: 2006,
		aspect: "home",
		title: "Blu-ray",
		text: "High-definition discs open near $30. HD DVD loses the format war in 2008."
	},
	{
		year: 2007,
		aspect: "streaming",
		title: "Netflix streams",
		text: "Streaming starts inside DVD-by-mail plans. A standalone price, $7.99, shows up in 2010."
	},
	{
		year: 2015,
		aspect: "live",
		title: "Sling TV",
		text: "Twenty dollars, no contract, no truck roll. The first live bundle built to replace cable."
	},
	{
		year: 2016,
		aspect: "home",
		title: "4K discs",
		text: "Ultra HD Blu-ray launches near $30 and mostly stays there. It is the home format that did not race to the bottom."
	},
	{
		year: 2017,
		aspect: "live",
		title: "YouTube TV",
		text: "Launches at $35 with locals and a cloud DVR. The price more than doubles by 2024."
	},
	{
		year: 2023,
		aspect: "rent",
		title: "Last red envelope",
		text: "September 29. DVD.com closes. One disc at a time is $9.99. After this, a new movie at home is a digital rental or a subscription."
	}
];
var PRESETS = [
	{
		id: "cable88",
		label: "1988 cable house",
		year: 1988,
		blurb: "Basic cable, right after deregulation.",
		ids: ["cable-early"]
	},
	{
		id: "dvd05",
		label: "2005 DVD night",
		year: 2005,
		blurb: "Expanded basic on the bill, a new disc by the TV.",
		ids: [
			"cable-expanded",
			"dvd",
			"blockbuster"
		]
	},
	{
		id: "mail07",
		label: "2007 red envelope",
		year: 2007,
		blurb: "One disc in the mail, or a Blockbuster night if you drive.",
		ids: ["netflix-mail", "blockbuster"]
	},
	{
		id: "cut17",
		label: "2017 cord-cutter",
		year: 2017,
		blurb: "Sling, Netflix, and Hulu. No truck, no bundle.",
		ids: [
			"sling",
			"netflix",
			"hulu-ads"
		]
	},
	{
		id: "stack26",
		label: "2026 full stack",
		year: 2026,
		blurb: "YouTube TV plus the big on-demand apps.",
		ids: [
			"yttv",
			"netflix",
			"disney",
			"max",
			"hulu-ads"
		]
	}
];
function seriesById(id) {
	return SERIES.find((s) => s.id === id);
}
function seriesFor(aspect) {
	return SERIES.filter((s) => s.aspect === aspect);
}
function priceAt(series, year) {
	const first = series.points[0];
	if (!first || year < first.year || year > series.through) return null;
	if (!series.hold) {
		const hit = series.points.find((p) => p.year === year);
		return hit ? hit.price : null;
	}
	let price = null;
	for (const point of series.points) if (point.year <= year) price = point.price;
	else break;
	return price;
}
function spanOf(aspect) {
	const years = (aspect === "all" ? SERIES : seriesFor(aspect)).flatMap((s) => [s.points[0]?.year ?? s.through, s.through]);
	return {
		min: Math.min(...years),
		max: Math.max(...years)
	};
}
function displayValue(series, year, dollars, mode) {
	const nominal = priceAt(series, year);
	if (nominal == null) return null;
	const amount = dollars === "real" ? to2026Dollars(nominal, year) : nominal;
	if (mode === "dollars") return amount;
	const basePoint = series.points.find((point) => point.price > 0) ?? series.points[0];
	if (!basePoint || basePoint.price <= 0) return 0;
	return amount / (dollars === "real" ? to2026Dollars(basePoint.price, basePoint.year) : basePoint.price) * 100;
}
var STROKES = [
	"var(--color-s0)",
	"var(--color-s1)",
	"var(--color-s2)",
	"var(--color-s3)"
];
var DASHES = [
	"0",
	"6 4",
	"2 3",
	"9 3 2 3"
];
function styleFor(series) {
	const peers = seriesFor(series.aspect);
	const index = Math.max(0, peers.findIndex((s) => s.id === series.id));
	return {
		stroke: STROKES[index % STROKES.length] ?? STROKES[0],
		dash: DASHES[Math.floor(index / STROKES.length) % DASHES.length] ?? "0"
	};
}
function unitWord(unit) {
	if (unit === "month") return "/mo";
	if (unit === "night") return "/night";
	return "/disc";
}
function money(n) {
	const rounded = Math.round(n * 100) / 100;
	return `$${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(2)}`;
}
function signedPct(n) {
	return `${n > 0 ? "+" : ""}${n.toFixed(0)}%`;
}
function changeLabel(ends) {
	if (!ends) return "—";
	if (ends.start === 0) return "Was free";
	return signedPct((ends.end - ends.start) / ends.start * 100);
}
function cagr(start, end, years) {
	if (start <= 0 || end < 0 || years <= 0) return null;
	return Math.pow(end / start, 1 / years) - 1;
}
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
function yearTicks(from, to) {
	const span = to - from;
	const step = span > 50 ? 10 : span > 24 ? 5 : span > 12 ? 2 : 1;
	const ticks = /* @__PURE__ */ new Set([from, to]);
	const start = Math.ceil(from / step) * step;
	for (let year = start; year <= to; year += step) ticks.add(year);
	return [...ticks].sort((a, b) => a - b);
}
function endsInWindow(series, lo, hi, dollars) {
	let startYear = 0;
	let start = 0;
	let endYear = 0;
	let end = 0;
	let seen = false;
	for (let year = lo; year <= hi; year += 1) {
		const value = displayValue(series, year, dollars, "dollars");
		if (value == null) continue;
		if (!seen) {
			startYear = year;
			start = value;
			seen = true;
		}
		endYear = year;
		end = value;
	}
	if (!seen || startYear === endYear) return null;
	return {
		startYear,
		start,
		endYear,
		end
	};
}
function useReducedMotion() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => setReduced(query.matches);
		apply();
		query.addEventListener("change", apply);
		return () => query.removeEventListener("change", apply);
	}, []);
	return reduced;
}
function axisTick() {
	return {
		fontSize: 12,
		fill: "var(--color-muted)",
		fontFamily: "var(--font-sans)"
	};
}
function ChartTip({ active, payload, label, mode }) {
	if (!active || !payload?.length) return null;
	const rows = payload.filter((item) => typeof item.value === "number");
	if (!rows.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-64 rounded-2xl border border-line bg-surface px-3 py-2 text-sm shadow-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-base font-semibold text-ink",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-1 space-y-1",
			children: rows.slice().sort((a, b) => Number(b.value) - Number(a.value)).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-baseline justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: item.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-ink tabular-nums",
					children: mode === "index" ? Math.round(Number(item.value)) : money(Number(item.value))
				})]
			}, String(item.dataKey)))
		})]
	});
}
var TrendChart = (0, import_react.memo)(function TrendChart({ series, lo, hi, dollars, mode, curve, animate, heightClass }) {
	const rows = (0, import_react.useMemo)(() => {
		const next = [];
		for (let year = lo; year <= hi; year += 1) {
			const row = { year };
			for (const item of series) row[item.id] = displayValue(item, year, dollars, mode);
			next.push(row);
		}
		return next;
	}, [
		series,
		lo,
		hi,
		dollars,
		mode
	]);
	if (!rows.some((row) => series.some((item) => row[item.id] != null))) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "flex h-52 items-center text-sm text-muted",
		children: [
			"No published price falls inside ",
			lo,
			"–",
			hi,
			". Widen the years."
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: heightClass,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data: rows,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "year",
						ticks: yearTicks(lo, hi),
						tick: axisTick(),
						tickLine: false,
						axisLine: false,
						interval: 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: axisTick(),
						tickLine: false,
						axisLine: false,
						width: 52,
						tickFormatter: (value) => mode === "index" ? `${Math.round(value)}` : money(value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, { mode }) }),
					series.map((item) => {
						const style = styleFor(item);
						const plotted = rows.filter((row) => row[item.id] != null).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							type: curve,
							dataKey: item.id,
							name: item.short,
							stroke: style.stroke,
							strokeWidth: 2.25,
							strokeDasharray: style.dash,
							dot: plotted > 0 && plotted <= 16 ? {
								r: 3.5,
								fill: style.stroke,
								strokeWidth: 0
							} : false,
							activeDot: { r: 5 },
							connectNulls: true,
							isAnimationActive: animate
						}, item.id);
					})
				]
			})
		})
	});
});
var RankChart = (0, import_react.memo)(function RankChart({ series, year, dollars, mode, animate }) {
	const rows = series.map((item) => {
		const price = displayValue(item, year, dollars, mode);
		if (price == null) return null;
		return {
			name: item.short,
			price,
			fill: styleFor(item).stroke,
			id: item.id
		};
	}).filter((row) => row != null).sort((a, b) => b.price - a.price);
	if (!rows.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm text-muted",
		children: [
			"Nothing on this list has a published price in ",
			year,
			"."
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { height: Math.max(180, rows.length * 36) },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: rows,
				layout: "vertical",
				margin: {
					top: 4,
					right: 12,
					left: 4,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						horizontal: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						type: "number",
						tick: axisTick(),
						tickLine: false,
						axisLine: false,
						tickFormatter: (value) => mode === "index" ? `${Math.round(value)}` : money(value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						type: "category",
						dataKey: "name",
						width: 104,
						tick: axisTick(),
						tickLine: false,
						axisLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, { mode }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "price",
						name: "Price",
						radius: 4,
						isAnimationActive: animate,
						barSize: 14,
						children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: row.fill }, row.id))
					})
				]
			})
		})
	});
});
var ChangeChart = (0, import_react.memo)(function ChangeChart({ series, lo, hi, dollars, animate }) {
	const rows = series.map((item) => {
		const ends = endsInWindow(item, lo, hi, dollars);
		if (!ends || ends.start === 0) return null;
		const pct = (ends.end - ends.start) / ends.start * 100;
		return {
			name: item.short,
			pct,
			id: item.id
		};
	}).filter((row) => row != null).sort((a, b) => b.pct - a.pct);
	if (lo === hi) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Pull the year knobs apart to measure the change."
	});
	if (!rows.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No series has two prices in this window. Free launches (Hulu at $0) are left off the percent scale."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { height: Math.max(180, rows.length * 36) },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: rows,
				layout: "vertical",
				margin: {
					top: 4,
					right: 12,
					left: 4,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						horizontal: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						type: "number",
						tick: axisTick(),
						tickLine: false,
						axisLine: false,
						tickFormatter: (value) => `${Math.round(value)}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						type: "category",
						dataKey: "name",
						width: 104,
						tick: axisTick(),
						tickLine: false,
						axisLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						formatter: (value) => signedPct(Number(value)),
						contentStyle: {
							background: "var(--color-surface)",
							border: "1px solid var(--color-line)",
							borderRadius: 16,
							fontSize: 14
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "pct",
						name: "Change",
						radius: 4,
						isAnimationActive: animate,
						barSize: 14,
						children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: row.pct >= 0 ? "var(--color-copper)" : "var(--color-pine)" }, row.id))
					})
				]
			})
		})
	});
});
function Card({ title, caption, children, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "ledger-card rounded-2xl bg-surface p-4 md:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-wrap items-end justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold text-ink md:text-2xl",
				children: title
			}), caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted",
				children: caption
			}) : null] }), action]
		}), children]
	});
}
var CAPTIONS = {
	cable: "FCC points are annual national averages. Early basic is a different series and stops in 1988 — the gap is a definition change, not a price crash.",
	home: "Dots are typical new-release street prices for a disc you keep. Rentals have their own shelf.",
	rent: "Nights are one movie. Mail plans are a whole month, so a $10 plan is several Blockbuster trips, not one of them. Digital rents are a 48-hour watch, not a disc you own. Prime membership does not include these rentals.",
	streaming: "Year-end U.S. list price of the named plan. Steps are increases. A zero is a free tier, not a missing year.",
	live: "Year-end price of the base live package. Taxes, regional sports, and device fees sit on top.",
	satellite: "Dots are published package rates. Years without a dot were not invented. DirecTV’s later dip is a redesigned entry price, before the receiver fee."
};
function LedgerDashboard() {
	const [aspect, setAspect] = (0, import_react.useState)("cable");
	const [from, setFrom] = (0, import_react.useState)(1955);
	const [to, setTo] = (0, import_react.useState)(2024);
	const [settledFrom, setSettledFrom] = (0, import_react.useState)(1955);
	const [settledTo, setSettledTo] = (0, import_react.useState)(2024);
	const [selected, setSelected] = (0, import_react.useState)(() => seriesFor("cable").map((item) => item.id));
	const [dollars, setDollars] = (0, import_react.useState)("nominal");
	const [mode, setMode] = (0, import_react.useState)("dollars");
	const [bill, setBill] = (0, import_react.useState)(PRESETS[3]?.ids ?? []);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const reduced = useReducedMotion();
	(0, import_react.useEffect)(() => setMounted(true), []);
	(0, import_react.useEffect)(() => {
		if (from === settledFrom && to === settledTo) return;
		const id = window.setTimeout(() => {
			setSettledFrom(from);
			setSettledTo(to);
		}, 120);
		return () => window.clearTimeout(id);
	}, [
		from,
		to,
		settledFrom,
		settledTo
	]);
	const span = spanOf(aspect);
	const loLive = clamp(Math.min(from, to), span.min, span.max);
	const hiLive = clamp(Math.max(from, to), span.min, span.max);
	const lo = clamp(Math.min(settledFrom, settledTo), span.min, span.max);
	const hi = clamp(Math.max(settledFrom, settledTo), span.min, span.max);
	const animate = mounted && !reduced;
	const meta = ASPECTS.find((item) => item.id === aspect);
	const pool = (0, import_react.useMemo)(() => aspect === "all" ? [] : seriesFor(aspect), [aspect]);
	const active = (0, import_react.useMemo)(() => pool.filter((item) => selected.includes(item.id)), [pool, selected]);
	const basis = dollars === "real" ? "2026 dollars" : "nominal dollars";
	function selectAspect(next) {
		const nextSpan = spanOf(next);
		setAspect(next);
		setFrom(nextSpan.min);
		setTo(nextSpan.max);
		setSettledFrom(nextSpan.min);
		setSettledTo(nextSpan.max);
		setSelected(next === "all" ? [] : seriesFor(next).map((item) => item.id));
	}
	function applyPreset(id) {
		const preset = PRESETS.find((item) => item.id === id);
		if (!preset) return;
		const nextSpan = spanOf("all");
		const nextTo = clamp(preset.year, nextSpan.min, nextSpan.max);
		const nextFrom = clamp(preset.year - 15, nextSpan.min, nextSpan.max);
		setAspect("all");
		setTo(nextTo);
		setFrom(nextFrom);
		setSettledTo(nextTo);
		setSettledFrom(nextFrom);
		setBill(preset.ids);
		setSelected([]);
	}
	const insight = (0, import_react.useMemo)(() => {
		const preferred = seriesById(aspect === "all" ? "cable-expanded" : meta?.primaryId ?? "cable-expanded");
		const candidate = preferred && (aspect === "all" || selected.includes(preferred.id)) ? preferred : active[0];
		if (!candidate) return "Turn a format back on to read the change.";
		const measured = endsInWindow(candidate, Math.max(lo, candidate.points[0]?.year ?? lo), hi, dollars);
		if (!measured) return `${candidate.name} needs two prices inside this window.`;
		if (measured.start === 0) return `${candidate.name} was free in ${measured.startYear} and ${money(measured.end)} by ${measured.endYear}.`;
		const change = (measured.end - measured.start) / measured.start * 100;
		const rate = cagr(measured.start, measured.end, measured.endYear - measured.startYear);
		const direction = change >= 0 ? "up" : "down";
		const yearly = rate == null ? "" : `, about ${Math.abs(rate * 100).toFixed(1)}% a year`;
		return `${candidate.name} moved from ${money(measured.start)} in ${measured.startYear} to ${money(measured.end)} in ${measured.endYear} — ${direction} ${Math.abs(change).toFixed(0)}%${yearly}, in ${basis}.`;
	}, [
		aspect,
		meta,
		selected,
		active,
		lo,
		hi,
		dollars,
		basis
	]);
	const kpis = (0, import_react.useMemo)(() => {
		return (aspect === "all" ? [
			"cable-expanded",
			"netflix",
			"yttv",
			"dvd"
		].map((id) => seriesById(id)).filter((item) => item != null) : active).slice(0, 4).map((item) => {
			return {
				item,
				ends: endsInWindow(item, lo, hi, dollars),
				atEnd: displayValue(item, hi, dollars, "dollars")
			};
		});
	}, [
		aspect,
		active,
		lo,
		hi,
		dollars
	]);
	const tableRows = (0, import_react.useMemo)(() => active.map((item) => {
		return {
			item,
			ends: endsInWindow(item, lo, hi, dollars),
			atHi: displayValue(item, hi, dollars, "dollars")
		};
	}).sort((a, b) => (b.atHi ?? -1) - (a.atHi ?? -1)), [
		active,
		lo,
		hi,
		dollars
	]);
	const monthlyBill = bill.map((id) => seriesById(id)).filter((item) => item != null && item.unit === "month").map((item) => ({
		item,
		price: displayValue(item, hi, dollars, "dollars")
	})).filter((row) => row.price != null);
	const onceBill = bill.map((id) => seriesById(id)).filter((item) => item != null && item.unit !== "month").map((item) => ({
		item,
		price: displayValue(item, hi, dollars, "dollars")
	})).filter((row) => row.price != null);
	const monthSum = monthlyBill.reduce((sum, row) => sum + row.price, 0);
	const onceSum = onceBill.reduce((sum, row) => sum + row.price, 0);
	const cableBench = seriesById("cable-expanded");
	let cableNote = null;
	if (cableBench) for (let year = Math.min(hi, cableBench.through); year >= cableBench.points[0].year; year -= 1) {
		const price = displayValue(cableBench, year, dollars, "dollars");
		if (price != null) {
			cableNote = {
				year,
				price
			};
			break;
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-paper pb-24 text-ink tabular-nums",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-line bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-8 md:py-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-widest text-copper uppercase",
							children: "U.S. television · 1948–2026"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-5xl leading-none font-semibold text-ink md:text-6xl",
								children: "Living Room Ledger"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-md text-base text-muted md:text-right",
								children: "Prices, not catalogs. Pick a shelf, drag the years, and see what a household actually paid."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-2xl text-base text-ink md:text-lg",
							children: "What it cost to watch, from the first community antennas through VHS, the rental counter, DVD, 4K, the streamers, and the live-TV apps that tried to replace the cable box."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-0 z-30 border-b border-line bg-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 overflow-x-auto",
						role: "toolbar",
						"aria-label": "Format",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							pressed: aspect === "all",
							onClick: () => selectAspect("all"),
							children: "All formats"
						}), ASPECTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							pressed: aspect === item.id,
							onClick: () => selectAspect(item.id),
							children: item.label
						}, item.id))]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: "Dollars",
							value: dollars,
							options: [["nominal", "Nominal"], ["real", "2026 $"]],
							onChange: setDollars
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: "Scale",
							value: mode,
							options: [["dollars", "Price"], ["index", "Vs. launch"]],
							onChange: setMode
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:gap-5 md:py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						title: `${loLive} – ${hiLive}`,
						caption: aspect === "all" ? "Drag either knob. The right-hand year prices the bill below." : `${meta?.kicker}. ${meta?.unitLabel}. Drag to zoom, or pull both knobs together for one year.`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider, {
							className: "relative flex h-11 touch-none items-center px-3",
							min: span.min,
							max: span.max,
							step: 1,
							minStepsBetweenThumbs: 0,
							value: [loLive, hiLive],
							onValueChange: ([nextFrom, nextTo]) => {
								if (nextFrom == null || nextTo == null) return;
								setFrom(nextFrom);
								setTo(nextTo);
							},
							"aria-label": "Year range",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
									className: "relative h-1.5 grow rounded-full bg-paper-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full rounded-full bg-copper" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, {
									"aria-label": "Start year",
									className: "block size-11 rounded-full border-2 border-ink bg-surface"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, {
									"aria-label": "End year",
									className: "block size-11 rounded-full border-2 border-copper bg-copper"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex justify-between text-xs font-semibold tracking-widest text-muted uppercase",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: span.min }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									hiLive,
									" snapshot · ",
									basis
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: span.max })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ledger-card rounded-2xl border-l-2 border-l-copper bg-surface px-4 py-4 font-display text-lg leading-snug font-medium text-ink md:text-xl",
						children: insight
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
						children: aspect === "all" ? kpis.map(({ item, ends, atEnd }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: item.short,
							value: atEnd != null ? money(atEnd) : ends ? money(ends.end) : "—",
							note: ends ? `${changeLabel(ends)} · ${atEnd == null ? `last in ${ends.endYear}` : `since ${ends.startYear}`}` : `No pair of prices in ${lo}–${hi}`
						}, item.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AspectStats, {
							active,
							lo,
							hi,
							dollars,
							primaryId: meta?.primaryId
						})
					}),
					aspect === "all" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 lg:grid-cols-2",
						children: ASPECTS.map((item) => {
							const group = seriesFor(item.id);
							const groupSpan = spanOf(item.id);
							const groupLo = Math.max(lo, groupSpan.min);
							const groupHi = Math.min(hi, groupSpan.max);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								title: item.label,
								caption: CAPTIONS[item.id],
								action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "min-h-11 rounded-full px-3 text-sm font-semibold text-copper",
									onClick: () => selectAspect(item.id),
									children: "Open"
								}),
								children: mounted && groupLo <= groupHi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
									series: group,
									lo: groupLo,
									hi: groupHi,
									dollars,
									mode,
									curve: item.curve,
									animate,
									heightClass: "h-52"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "flex h-52 items-center text-sm text-muted",
									children: groupLo > groupHi ? `No ${item.label.toLowerCase()} prices in ${lo}–${hi}.` : "Drawing the series…"
								})
							}, item.id);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							title: mode === "index" ? "Versus the launch price" : "Price over time",
							caption: meta ? CAPTIONS[meta.id] : void 0,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-4 flex flex-wrap gap-2",
									role: "group",
									"aria-label": "Series",
									children: pool.map((item) => {
										const on = selected.includes(item.id);
										const style = styleFor(item);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											"aria-pressed": on,
											onClick: () => setSelected((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]),
											className: "inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-sm font-semibold " + (on ? "border-ink bg-surface text-ink" : "border-line text-muted"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-block h-0.5 w-5",
												style: { background: on ? style.stroke : "var(--color-line)" }
											}), item.short]
										}, item.id);
									})
								}),
								mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
									series: active,
									lo,
									hi,
									dollars,
									mode,
									curve: meta?.curve ?? "monotone",
									animate,
									heightClass: "h-72 md:h-80"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "flex h-72 items-center text-sm text-muted",
									children: "Drawing the series…"
								}),
								mode === "index" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted",
									children: "100 is the first paid price of that series. Later years are an index, not dollars."
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 lg:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								title: `Ranked in ${hi}`,
								caption: "Only series with a published figure in the snapshot year. Units match this format.",
								children: mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankChart, {
									series: active,
									year: hi,
									dollars,
									mode,
									animate
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "Drawing the bars…"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								title: "How much it moved",
								caption: "Percent change from each series’ first price in the window to its last. Copper is up, green is down.",
								children: mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChangeChart, {
									series: active,
									lo,
									hi,
									dollars,
									animate
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "Drawing the bars…"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							title: "The numbers",
							caption: `Reading in ${basis}. Quality tells you how hard the figure is.`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden md:block",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "text-xs tracking-widest text-muted uppercase",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-b border-line",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-2 pr-3 font-semibold",
													children: "Series"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-2 pr-3 font-semibold",
													children: "First in window"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-2 pr-3 font-semibold",
													children: "Last in window"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-2 pr-3 font-semibold",
													children: "Change"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-2 font-semibold",
													children: "Kind"
												})
											]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: tableRows.map(({ item, ends, atHi }) => {
										const change = ends && ends.start !== 0 ? (ends.end - ends.start) / ends.start * 100 : null;
										const yearly = ends && ends.start > 0 ? cagr(ends.start, ends.end, ends.endYear - ends.startYear) : null;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-b border-line align-top",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "py-3 pr-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-semibold",
														children: item.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-muted",
														children: item.blurb
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-3 pr-3",
													children: ends ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [money(ends.start), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "block text-muted",
														children: [ends.startYear, unitWord(item.unit)]
													})] }) : atHi != null ? "Single year" : "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-3 pr-3",
													children: ends ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [money(ends.end), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-muted",
														children: ends.endYear
													})] }) : atHi != null ? money(atHi) : "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-3 pr-3",
													children: change == null ? ends && ends.start === 0 ? "Was free" : "—" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: change >= 0 ? "text-copper-deep" : "text-pine",
														children: signedPct(change)
													}), yearly != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "block text-muted",
														children: [signedPct(yearly * 100), " / yr"]
													}) : null] })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-3 text-muted capitalize",
													children: item.quality
												})
											]
										}, item.id);
									}) })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "flex flex-col gap-3 md:hidden",
								children: tableRows.map(({ item, ends }) => {
									const change = ends && ends.start !== 0 ? (ends.end - ends.start) / ends.start * 100 : null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "border-b border-line pb-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold",
												children: item.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted",
												children: item.blurb
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-sm",
												children: [ends ? `${money(ends.start)} (${ends.startYear}) → ${money(ends.end)} (${ends.endYear})` : "No pair of prices in this window", change != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: change >= 0 ? " text-copper-deep" : " text-pine",
													children: [" ", signedPct(change)]
												}) : null]
											})
										]
									}, item.id);
								})
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						title: `Build a ${hi} bill`,
						caption: "Check what a household might have paid that year. Subscriptions add by the month. Discs and rentals are one night, not a bill.",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => applyPreset(preset.id),
								className: "min-h-11 rounded-full border border-line bg-paper px-3 text-sm font-semibold text-ink",
								children: preset.label
							}, preset.id))
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 lg:grid-cols-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 sm:grid-cols-2 lg:col-span-2",
								children: ASPECTS.map((group) => {
									const choices = seriesFor(group.id).filter((item) => priceAt(item, hi) != null);
									if (!choices.length) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
											className: "mb-1 text-xs font-semibold tracking-widest text-muted uppercase",
											children: group.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-col",
											children: choices.map((item) => {
												const price = displayValue(item, hi, dollars, "dollars");
												const on = bill.includes(item.id);
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "flex min-h-11 items-center gap-3 text-sm",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															className: "tick",
															type: "checkbox",
															checked: on,
															onChange: () => setBill((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "flex-1",
															children: item.short
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-muted",
															children: [price == null ? "—" : money(price), unitWord(item.unit)]
														})
													]
												}, item.id);
											})
										})]
									}, group.id);
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "order-first rounded-2xl bg-ink px-4 py-4 text-paper lg:order-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold tracking-widest text-paper-2 uppercase",
										children: "Monthly stack"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-display text-4xl leading-none font-semibold",
										children: monthlyBill.length ? money(monthSum) : "$0"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-paper-2",
										children: monthlyBill.length ? monthlyBill.map((row) => row.item.short).join(" + ") : "No monthly service checked for this year."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-sm",
										children: onceBill.length ? `Plus ${money(onceSum)} if you also buy or rent what you checked.` : "Discs and overnight rentals stay off the monthly number."
									}),
									cableNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-4 border-t border-paper-2/30 pt-3 text-sm text-paper-2",
										children: [
											"FCC expanded basic",
											cableNote.year === hi ? "" : ` (last surveyed ${cableNote.year})`,
											" was ",
											money(cableNote.price),
											". This stack is ",
											cableNote.price === 0 ? "—" : `${(monthSum / cableNote.price).toFixed(2)}×`,
											" that average."
										]
									}) : null
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						title: "When it showed up",
						caption: "Tap a year to jump the ledger there.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "grid gap-3 md:grid-cols-2",
							children: MILESTONES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									const nextSpan = spanOf(item.aspect);
									const end = clamp(Math.max(item.year, nextSpan.min), nextSpan.min, nextSpan.max);
									selectAspect(item.aspect);
									setFrom(nextSpan.min);
									setTo(end);
									setSettledFrom(nextSpan.min);
									setSettledTo(end);
									setSelected(seriesFor(item.aspect).map((series) => series.id));
								},
								className: "flex min-h-11 w-full gap-4 rounded-2xl px-2 py-2 text-left transition-[background-color] duration-150 hover:bg-paper",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xl font-semibold text-copper",
									children: item.year
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-semibold",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm text-muted",
									children: item.text
								})] })]
							}) }, `${item.year}-${item.title}`))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "ledger-card rounded-2xl bg-surface px-4 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
							className: "flex min-h-11 cursor-pointer items-center font-semibold",
							children: "Sources, and what these numbers are not"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 pb-4 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nominal means the dollars on the bill or the shelf that year. “2026 $” rescales them with CPI-U so a 1995 cable bill can be compared with a 2024 one. The 2025 and 2026 index values are estimates." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cable, 1995–2024: FCC reports on cable industry prices (most recently FCC 24-136). Expanded basic, basic, and the next-most-popular service plus equipment are subscriber-weighted national averages. There is no matching FCC reading for 2025 or 2026 yet." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cable, 1955–1984: Paul Kagan Associates historical averages. 1987 is the NCTA / Arthur Andersen June survey reported by UPI. 1988 is the Kagan basic average cited by The New York Times in January 1989. Community antenna television itself starts in 1948; a clean national price series does not." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Streaming and live TV: year-end U.S. list price of the named tier, compiled from company announcements and price trackers (including Streaming Price Tracker and Streaming Better). Promotional trials are ignored. Hulu + Live in 2026 reflects the September increase for new subscribers." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Satellite: DirecTV’s 1994 launch price is documented; later DirecTV points are compiled package rates, programming only. DISH’s early tariffs are launch and America’s Top sheets; 2021–2025 AT120 rates include locals; 2026 adds the reported $5 increase. Two-year promo prices are lower and are not charted. A line across a gap is not a measured price for the missing years." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Discs: typical U.S. new-release street prices, compiled. They are not an official index, and collector editions cost more than the 4K line." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Rentals: Blockbuster-era overnight rates, Redbox kiosk rates, Netflix / DVD.com mail plans, and typical new-release HD rents on Prime Video and Fandango at Home (Vudu until 2024). A mail plan is monthly. A store, kiosk, or digital rent is one title. Prime’s included library is on the streaming shelf, not here." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "list-disc pl-5",
									children: SERIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-ink",
											children: [item.name, "."]
										}),
										" ",
										item.source,
										". Tagged ",
										item.quality,
										"."
									] }, item.id))
								})
							]
						})]
					})
				]
			})
		]
	});
}
function Chip({ pressed, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": pressed,
		onClick,
		className: "min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-[background-color,color,border-color] duration-150 " + (pressed ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink"),
		children
	});
}
function Toggle({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-2",
		role: "group",
		"aria-label": label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex rounded-full border border-line bg-surface p-1",
			children: options.map(([id, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": value === id,
				onClick: () => onChange(id),
				className: "min-h-11 rounded-full px-4 text-sm font-semibold " + (value === id ? "bg-ink text-paper" : "text-muted"),
				children: text
			}, id))
		})
	});
}
function AspectStats({ active, lo, hi, dollars, primaryId }) {
	const headline = active.find((item) => item.id === primaryId) ?? active[0];
	const ends = headline ? endsInWindow(headline, lo, hi, dollars) : null;
	const atEnd = headline ? displayValue(headline, hi, dollars, "dollars") : null;
	const scored = active.map((item) => {
		const span = endsInWindow(item, lo, hi, dollars);
		if (!span || span.start === 0) return null;
		return {
			item,
			pct: (span.end - span.start) / span.start * 100
		};
	}).filter((row) => row != null);
	const rise = scored.slice().sort((a, b) => b.pct - a.pct)[0];
	const drop = scored.slice().sort((a, b) => a.pct - b.pct)[0];
	const fell = drop && drop.pct < 0 ? drop : null;
	const shown = atEnd != null ? atEnd : ends?.end;
	const shownYear = atEnd != null ? hi : ends?.endYear;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
			label: shownYear != null ? `In ${shownYear}` : "In this year",
			value: shown == null ? "—" : money(shown),
			note: headline ? headline.short : "Select a series"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
			label: "Window",
			value: changeLabel(ends),
			note: ends ? `${ends.startYear} to ${ends.endYear}` : "Need two years"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
			label: "Fastest rise",
			value: rise ? signedPct(rise.pct) : "—",
			note: rise ? rise.item.short : "Nothing to compare"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
			label: "Got cheaper",
			value: fell ? signedPct(fell.pct) : "None",
			note: fell ? fell.item.short : "No decline in this window"
		})
	] });
}
function Stat({ label, value, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ledger-stat rounded-2xl bg-surface px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-widest text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-2xl leading-none font-semibold text-ink md:text-3xl",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: note
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerDashboard, {});
}
//#endregion
export { Home as component };
