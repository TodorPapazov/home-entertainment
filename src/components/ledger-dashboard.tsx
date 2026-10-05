import { memo, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import * as Slider from "@radix-ui/react-slider";
import {
  ASPECTS,
  MILESTONES,
  PRESETS,
  SERIES,
  displayValue,
  priceAt,
  seriesById,
  seriesFor,
  spanOf,
  styleFor,
  unitWord,
  type AspectId,
  type DollarMode,
  type Series,
  type ValueMode,
} from "@/data/catalog";

type Row = { year: number } & Record<string, number | null>;

function money(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  const body = Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(2);
  return `$${body}`;
}

function signedPct(n: number): string {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(0)}%`;
}

function changeLabel(ends: WindowEnds | null): string {
  if (!ends) return "—";
  if (ends.start === 0) return "Was free";
  return signedPct(((ends.end - ends.start) / ends.start) * 100);
}

function cagr(start: number, end: number, years: number): number | null {
  if (start <= 0 || end < 0 || years <= 0) return null;
  return Math.pow(end / start, 1 / years) - 1;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function yearTicks(from: number, to: number): number[] {
  const span = to - from;
  const step = span > 50 ? 10 : span > 24 ? 5 : span > 12 ? 2 : 1;
  const ticks = new Set<number>([from, to]);
  const start = Math.ceil(from / step) * step;
  for (let year = start; year <= to; year += step) ticks.add(year);
  return [...ticks].sort((a, b) => a - b);
}

type WindowEnds = {
  startYear: number;
  start: number;
  endYear: number;
  end: number;
};

function endsInWindow(series: Series, lo: number, hi: number, dollars: DollarMode): WindowEnds | null {
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
  return { startYear, start, endYear, end };
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
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
    fontFamily: "var(--font-sans)",
  } as const;
}

function ChartTip({
  active,
  payload,
  label,
  mode,
}: {
  active?: boolean;
  payload?: Array<{ dataKey?: string | number; value?: number | string | null; color?: string; name?: string }>;
  label?: string | number;
  mode: ValueMode;
}) {
  if (!active || !payload?.length) return null;
  const rows = payload.filter((item) => typeof item.value === "number");
  if (!rows.length) return null;
  return (
    <div className="max-w-64 rounded-2xl border border-line bg-surface px-3 py-2 text-sm shadow-none">
      <p className="font-display text-base font-semibold text-ink">{label}</p>
      <ul className="mt-1 space-y-1">
        {rows
          .slice()
          .sort((a, b) => Number(b.value) - Number(a.value))
          .map((item) => (
            <li key={String(item.dataKey)} className="flex items-baseline justify-between gap-4">
              <span className="text-muted">{item.name}</span>
              <span className="font-semibold text-ink tabular-nums">
                {mode === "index" ? Math.round(Number(item.value)) : money(Number(item.value))}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

const TrendChart = memo(function TrendChart({
  series,
  lo,
  hi,
  dollars,
  mode,
  curve,
  animate,
  heightClass,
}: {
  series: Series[];
  lo: number;
  hi: number;
  dollars: DollarMode;
  mode: ValueMode;
  curve: "monotone" | "stepAfter";
  animate: boolean;
  heightClass: string;
}) {
  const rows = useMemo(() => {
    const next: Row[] = [];
    for (let year = lo; year <= hi; year += 1) {
      const row: Row = { year };
      for (const item of series) row[item.id] = displayValue(item, year, dollars, mode);
      next.push(row);
    }
    return next;
  }, [series, lo, hi, dollars, mode]);

  const hasAny = rows.some((row) => series.some((item) => row[item.id] != null));
  if (!hasAny) {
    return (
      <p className="flex h-52 items-center text-sm text-muted">
        No published price falls inside {lo}–{hi}. Widen the years.
      </p>
    );
  }

  return (
    <div className={heightClass}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-line)" vertical={false} />
          <XAxis
            dataKey="year"
            ticks={yearTicks(lo, hi)}
            tick={axisTick()}
            tickLine={false}
            axisLine={false}
            interval={0}
          />
          <YAxis
            tick={axisTick()}
            tickLine={false}
            axisLine={false}
            width={52}
            tickFormatter={(value: number) => (mode === "index" ? `${Math.round(value)}` : money(value))}
          />
          <Tooltip content={<ChartTip mode={mode} />} />
          {series.map((item) => {
            const style = styleFor(item);
            const plotted = rows.filter((row) => row[item.id] != null).length;
            return (
              <Line
                key={item.id}
                type={curve}
                dataKey={item.id}
                name={item.short}
                stroke={style.stroke}
                strokeWidth={2.25}
                strokeDasharray={style.dash}
                dot={plotted > 0 && plotted <= 16 ? { r: 3.5, fill: style.stroke, strokeWidth: 0 } : false}
                activeDot={{ r: 5 }}
                connectNulls
                isAnimationActive={animate}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

const RankChart = memo(function RankChart({
  series,
  year,
  dollars,
  mode,
  animate,
}: {
  series: Series[];
  year: number;
  dollars: DollarMode;
  mode: ValueMode;
  animate: boolean;
}) {
  const rows = series
    .map((item) => {
      const price = displayValue(item, year, dollars, mode);
      if (price == null) return null;
      return { name: item.short, price, fill: styleFor(item).stroke, id: item.id };
    })
    .filter((row): row is { name: string; price: number; fill: string; id: string } => row != null)
    .sort((a, b) => b.price - a.price);

  if (!rows.length) {
    return <p className="text-sm text-muted">Nothing on this list has a published price in {year}.</p>;
  }

  return (
    <div style={{ height: Math.max(180, rows.length * 36) }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} layout="vertical" margin={{ top: 4, right: 12, left: 4, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-line)" horizontal={false} />
          <XAxis
            type="number"
            tick={axisTick()}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => (mode === "index" ? `${Math.round(value)}` : money(value))}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={104}
            tick={axisTick()}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<ChartTip mode={mode} />} />
          <Bar dataKey="price" name="Price" radius={4} isAnimationActive={animate} barSize={14}>
            {rows.map((row) => (
              <Cell key={row.id} fill={row.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

const ChangeChart = memo(function ChangeChart({
  series,
  lo,
  hi,
  dollars,
  animate,
}: {
  series: Series[];
  lo: number;
  hi: number;
  dollars: DollarMode;
  animate: boolean;
}) {
  const rows = series
    .map((item) => {
      const ends = endsInWindow(item, lo, hi, dollars);
      if (!ends || ends.start === 0) return null;
      const pct = ((ends.end - ends.start) / ends.start) * 100;
      return { name: item.short, pct, id: item.id };
    })
    .filter((row): row is { name: string; pct: number; id: string } => row != null)
    .sort((a, b) => b.pct - a.pct);

  if (lo === hi) {
    return <p className="text-sm text-muted">Pull the year knobs apart to measure the change.</p>;
  }
  if (!rows.length) {
    return (
      <p className="text-sm text-muted">
        No series has two prices in this window. Free launches (Hulu at $0) are left off the percent scale.
      </p>
    );
  }

  return (
    <div style={{ height: Math.max(180, rows.length * 36) }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} layout="vertical" margin={{ top: 4, right: 12, left: 4, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-line)" horizontal={false} />
          <XAxis
            type="number"
            tick={axisTick()}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `${Math.round(value)}%`}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={104}
            tick={axisTick()}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={(value) => signedPct(Number(value))}
            contentStyle={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-line)",
              borderRadius: 16,
              fontSize: 14,
            }}
          />
          <Bar dataKey="pct" name="Change" radius={4} isAnimationActive={animate} barSize={14}>
            {rows.map((row) => (
              <Cell key={row.id} fill={row.pct >= 0 ? "var(--color-copper)" : "var(--color-pine)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

function Card({
  title,
  caption,
  children,
  action,
}: {
  title: string;
  caption?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="ledger-card rounded-2xl bg-surface p-4 md:p-5">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">{title}</h2>
          {caption ? <p className="mt-1 max-w-2xl text-sm text-muted">{caption}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

const CAPTIONS: Record<AspectId, string> = {
  cable:
    "FCC points are annual national averages. Early basic is a different series and stops in 1988 — the gap is a definition change, not a price crash.",
  home: "Dots are typical new-release street prices for a disc you keep. Rentals have their own shelf.",
  rent: "Nights are one movie. Mail plans are a whole month, so a $10 plan is several Blockbuster trips, not one of them. Digital rents are a 48-hour watch, not a disc you own. Prime membership does not include these rentals.",
  streaming: "Year-end U.S. list price of the named plan. Steps are increases. A zero is a free tier, not a missing year.",
  live: "Year-end price of the base live package. Taxes, regional sports, and device fees sit on top.",
  satellite:
    "Dots are published package rates. Years without a dot were not invented. DirecTV’s later dip is a redesigned entry price, before the receiver fee.",
};

export function LedgerDashboard() {
  const [aspect, setAspect] = useState<AspectId | "all">("cable");
  const [from, setFrom] = useState(1955);
  const [to, setTo] = useState(2024);
  const [settledFrom, setSettledFrom] = useState(1955);
  const [settledTo, setSettledTo] = useState(2024);
  const [selected, setSelected] = useState<string[]>(() => seriesFor("cable").map((item) => item.id));
  const [dollars, setDollars] = useState<DollarMode>("nominal");
  const [mode, setMode] = useState<ValueMode>("dollars");
  const [bill, setBill] = useState<string[]>(PRESETS[3]?.ids ?? []);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (from === settledFrom && to === settledTo) return;
    const id = window.setTimeout(() => {
      setSettledFrom(from);
      setSettledTo(to);
    }, 120);
    return () => window.clearTimeout(id);
  }, [from, to, settledFrom, settledTo]);

  const span = spanOf(aspect);
  const loLive = clamp(Math.min(from, to), span.min, span.max);
  const hiLive = clamp(Math.max(from, to), span.min, span.max);
  const lo = clamp(Math.min(settledFrom, settledTo), span.min, span.max);
  const hi = clamp(Math.max(settledFrom, settledTo), span.min, span.max);
  const animate = mounted && !reduced;
  const meta = ASPECTS.find((item) => item.id === aspect);
  const pool = useMemo(() => (aspect === "all" ? [] : seriesFor(aspect)), [aspect]);
  const active = useMemo(() => pool.filter((item) => selected.includes(item.id)), [pool, selected]);
  const basis = dollars === "real" ? "2026 dollars" : "nominal dollars";

  function selectAspect(next: AspectId | "all") {
    const nextSpan = spanOf(next);
    setAspect(next);
    setFrom(nextSpan.min);
    setTo(nextSpan.max);
    setSettledFrom(nextSpan.min);
    setSettledTo(nextSpan.max);
    setSelected(next === "all" ? [] : seriesFor(next).map((item) => item.id));
  }

  function applyPreset(id: string) {
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

  const insight = useMemo(() => {
    const focusId = aspect === "all" ? "cable-expanded" : (meta?.primaryId ?? "cable-expanded");
    const preferred = seriesById(focusId);
    const candidate =
      preferred && (aspect === "all" || selected.includes(preferred.id))
        ? preferred
        : active[0];
    if (!candidate) return "Turn a format back on to read the change.";
    const windowLo = Math.max(lo, candidate.points[0]?.year ?? lo);
    const measured = endsInWindow(candidate, windowLo, hi, dollars);
    if (!measured) return `${candidate.name} needs two prices inside this window.`;
    if (measured.start === 0) {
      return `${candidate.name} was free in ${measured.startYear} and ${money(measured.end)} by ${measured.endYear}.`;
    }
    const change = ((measured.end - measured.start) / measured.start) * 100;
    const rate = cagr(measured.start, measured.end, measured.endYear - measured.startYear);
    const direction = change >= 0 ? "up" : "down";
    const yearly = rate == null ? "" : `, about ${Math.abs(rate * 100).toFixed(1)}% a year`;
    return `${candidate.name} moved from ${money(measured.start)} in ${measured.startYear} to ${money(measured.end)} in ${measured.endYear} — ${direction} ${Math.abs(change).toFixed(0)}%${yearly}, in ${basis}.`;
  }, [aspect, meta, selected, active, lo, hi, dollars, basis]);

  const kpis = useMemo(() => {
    const subjects =
      aspect === "all"
        ? ["cable-expanded", "netflix", "yttv", "dvd"]
            .map((id) => seriesById(id))
            .filter((item): item is Series => item != null)
        : active;
    return subjects.slice(0, 4).map((item) => {
      const ends = endsInWindow(item, lo, hi, dollars);
      const atEnd = displayValue(item, hi, dollars, "dollars");
      return { item, ends, atEnd };
    });
  }, [aspect, active, lo, hi, dollars]);

  const tableRows = useMemo(
    () =>
      active
        .map((item) => {
          const ends = endsInWindow(item, lo, hi, dollars);
          const atHi = displayValue(item, hi, dollars, "dollars");
          return { item, ends, atHi };
        })
        .sort((a, b) => (b.atHi ?? -1) - (a.atHi ?? -1)),
    [active, lo, hi, dollars],
  );

  const monthlyBill = bill
    .map((id) => seriesById(id))
    .filter((item): item is Series => item != null && item.unit === "month")
    .map((item) => ({ item, price: displayValue(item, hi, dollars, "dollars") }))
    .filter((row): row is { item: Series; price: number } => row.price != null);
  const onceBill = bill
    .map((id) => seriesById(id))
    .filter((item): item is Series => item != null && item.unit !== "month")
    .map((item) => ({ item, price: displayValue(item, hi, dollars, "dollars") }))
    .filter((row): row is { item: Series; price: number } => row.price != null);
  const monthSum = monthlyBill.reduce((sum, row) => sum + row.price, 0);
  const onceSum = onceBill.reduce((sum, row) => sum + row.price, 0);
  const cableBench = seriesById("cable-expanded");
  let cableNote: { year: number; price: number } | null = null;
  if (cableBench) {
    for (let year = Math.min(hi, cableBench.through); year >= cableBench.points[0]!.year; year -= 1) {
      const price = displayValue(cableBench, year, dollars, "dollars");
      if (price != null) {
        cableNote = { year, price };
        break;
      }
    }
  }

  return (
    <main className="min-h-screen bg-paper pb-24 text-ink tabular-nums">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          <p className="text-xs font-semibold tracking-widest text-copper uppercase">
            U.S. television · 1948–2026
          </p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h1 className="font-display text-5xl leading-none font-semibold text-ink md:text-6xl">
              Living Room Ledger
            </h1>
            <p className="max-w-md text-base text-muted md:text-right">
              Prices, not catalogs. Pick a shelf, drag the years, and see what a household actually paid.
            </p>
          </div>
          <p className="mt-5 max-w-2xl text-base text-ink md:text-lg">
            What it cost to watch, from the first community antennas through VHS, the rental counter, DVD, 4K, the
            streamers, and the live-TV apps that tried to replace the cable box.
          </p>
        </div>
      </header>

      <div className="sticky top-0 z-30 border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3">
          <div className="flex gap-2 overflow-x-auto" role="toolbar" aria-label="Format">
            <Chip pressed={aspect === "all"} onClick={() => selectAspect("all")}>
              All formats
            </Chip>
            {ASPECTS.map((item) => (
              <Chip key={item.id} pressed={aspect === item.id} onClick={() => selectAspect(item.id)}>
                {item.label}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Toggle
              label="Dollars"
              value={dollars}
              options={[
                ["nominal", "Nominal"],
                ["real", "2026 $"],
              ]}
              onChange={setDollars}
            />
            <Toggle
              label="Scale"
              value={mode}
              options={[
                ["dollars", "Price"],
                ["index", "Vs. launch"],
              ]}
              onChange={setMode}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:gap-5 md:py-6">
        <Card
          title={`${loLive} – ${hiLive}`}
          caption={
            aspect === "all"
              ? "Drag either knob. The right-hand year prices the bill below."
              : `${meta?.kicker}. ${meta?.unitLabel}. Drag to zoom, or pull both knobs together for one year.`
          }
        >
          <Slider.Root
            className="relative flex h-11 touch-none items-center px-3"
            min={span.min}
            max={span.max}
            step={1}
            minStepsBetweenThumbs={0}
            value={[loLive, hiLive]}
            onValueChange={([nextFrom, nextTo]) => {
              if (nextFrom == null || nextTo == null) return;
              setFrom(nextFrom);
              setTo(nextTo);
            }}
            aria-label="Year range"
          >
            <Slider.Track className="relative h-1.5 grow rounded-full bg-paper-2">
              <Slider.Range className="absolute h-full rounded-full bg-copper" />
            </Slider.Track>
            <Slider.Thumb
              aria-label="Start year"
              className="block size-11 rounded-full border-2 border-ink bg-surface"
            />
            <Slider.Thumb
              aria-label="End year"
              className="block size-11 rounded-full border-2 border-copper bg-copper"
            />
          </Slider.Root>
          <div className="mt-2 flex justify-between text-xs font-semibold tracking-widest text-muted uppercase">
            <span>{span.min}</span>
            <span>
              {hiLive} snapshot · {basis}
            </span>
            <span>{span.max}</span>
          </div>
        </Card>

        <p className="ledger-card rounded-2xl border-l-2 border-l-copper bg-surface px-4 py-4 font-display text-lg leading-snug font-medium text-ink md:text-xl">
          {insight}
        </p>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {aspect === "all"
            ? kpis.map(({ item, ends, atEnd }) => (
                <Stat
                  key={item.id}
                  label={item.short}
                  value={atEnd != null ? money(atEnd) : ends ? money(ends.end) : "—"}
                  note={
                    ends
                      ? `${changeLabel(ends)} · ${atEnd == null ? `last in ${ends.endYear}` : `since ${ends.startYear}`}`
                      : `No pair of prices in ${lo}–${hi}`
                  }
                />
              ))
            : (
              <AspectStats
                active={active}
                lo={lo}
                hi={hi}
                dollars={dollars}
                primaryId={meta?.primaryId}
              />
            )}
        </div>

        {aspect === "all" ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {ASPECTS.map((item) => {
              const group = seriesFor(item.id);
              const groupSpan = spanOf(item.id);
              const groupLo = Math.max(lo, groupSpan.min);
              const groupHi = Math.min(hi, groupSpan.max);
              return (
                <Card
                  key={item.id}
                  title={item.label}
                  caption={CAPTIONS[item.id]}
                  action={
                    <button
                      type="button"
                      className="min-h-11 rounded-full px-3 text-sm font-semibold text-copper"
                      onClick={() => selectAspect(item.id)}
                    >
                      Open
                    </button>
                  }
                >
                  {mounted && groupLo <= groupHi ? (
                    <TrendChart
                      series={group}
                      lo={groupLo}
                      hi={groupHi}
                      dollars={dollars}
                      mode={mode}
                      curve={item.curve}
                      animate={animate}
                      heightClass="h-52"
                    />
                  ) : (
                    <p className="flex h-52 items-center text-sm text-muted">
                      {groupLo > groupHi ? `No ${item.label.toLowerCase()} prices in ${lo}–${hi}.` : "Drawing the series…"}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        ) : (
          <>
            <Card
              title={mode === "index" ? "Versus the launch price" : "Price over time"}
              caption={meta ? CAPTIONS[meta.id] : undefined}
            >
              <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Series">
                {pool.map((item) => {
                  const on = selected.includes(item.id);
                  const style = styleFor(item);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        setSelected((current) =>
                          current.includes(item.id)
                            ? current.filter((id) => id !== item.id)
                            : [...current, item.id],
                        )
                      }
                      className={
                        "inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-sm font-semibold " +
                        (on ? "border-ink bg-surface text-ink" : "border-line text-muted")
                      }
                    >
                      <span
                        className="inline-block h-0.5 w-5"
                        style={{
                          background: on ? style.stroke : "var(--color-line)",
                          // dashed legend via border when needed
                        }}
                      />
                      {item.short}
                    </button>
                  );
                })}
              </div>
              {mounted ? (
                <TrendChart
                  series={active}
                  lo={lo}
                  hi={hi}
                  dollars={dollars}
                  mode={mode}
                  curve={meta?.curve ?? "monotone"}
                  animate={animate}
                  heightClass="h-72 md:h-80"
                />
              ) : (
                <p className="flex h-72 items-center text-sm text-muted">Drawing the series…</p>
              )}
              {mode === "index" ? (
                <p className="mt-2 text-xs text-muted">
                  100 is the first paid price of that series. Later years are an index, not dollars.
                </p>
              ) : null}
            </Card>

            <div className="grid gap-4 lg:grid-cols-2">
              <Card
                title={`Ranked in ${hi}`}
                caption="Only series with a published figure in the snapshot year. Units match this format."
              >
                {mounted ? (
                  <RankChart series={active} year={hi} dollars={dollars} mode={mode} animate={animate} />
                ) : (
                  <p className="text-sm text-muted">Drawing the bars…</p>
                )}
              </Card>
              <Card
                title="How much it moved"
                caption="Percent change from each series’ first price in the window to its last. Copper is up, green is down."
              >
                {mounted ? (
                  <ChangeChart series={active} lo={lo} hi={hi} dollars={dollars} animate={animate} />
                ) : (
                  <p className="text-sm text-muted">Drawing the bars…</p>
                )}
              </Card>
            </div>

            <Card title="The numbers" caption={`Reading in ${basis}. Quality tells you how hard the figure is.`}>
              <div className="hidden md:block">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs tracking-widest text-muted uppercase">
                    <tr className="border-b border-line">
                      <th className="py-2 pr-3 font-semibold">Series</th>
                      <th className="py-2 pr-3 font-semibold">First in window</th>
                      <th className="py-2 pr-3 font-semibold">Last in window</th>
                      <th className="py-2 pr-3 font-semibold">Change</th>
                      <th className="py-2 font-semibold">Kind</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map(({ item, ends, atHi }) => {
                      const change =
                        ends && ends.start !== 0 ? ((ends.end - ends.start) / ends.start) * 100 : null;
                      const yearly =
                        ends && ends.start > 0 ? cagr(ends.start, ends.end, ends.endYear - ends.startYear) : null;
                      return (
                        <tr key={item.id} className="border-b border-line align-top">
                          <td className="py-3 pr-3">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-muted">{item.blurb}</p>
                          </td>
                          <td className="py-3 pr-3">
                            {ends ? (
                              <>
                                {money(ends.start)}
                                <span className="block text-muted">
                                  {ends.startYear}
                                  {unitWord(item.unit)}
                                </span>
                              </>
                            ) : atHi != null ? (
                              "Single year"
                            ) : (
                              "—"
                            )}
                          </td>
                          <td className="py-3 pr-3">
                            {ends ? (
                              <>
                                {money(ends.end)}
                                <span className="block text-muted">{ends.endYear}</span>
                              </>
                            ) : atHi != null ? (
                              money(atHi)
                            ) : (
                              "—"
                            )}
                          </td>
                          <td className="py-3 pr-3">
                            {change == null ? (
                              ends && ends.start === 0 ? "Was free" : "—"
                            ) : (
                              <>
                                <span className={change >= 0 ? "text-copper-deep" : "text-pine"}>
                                  {signedPct(change)}
                                </span>
                                {yearly != null ? (
                                  <span className="block text-muted">{signedPct(yearly * 100)} / yr</span>
                                ) : null}
                              </>
                            )}
                          </td>
                          <td className="py-3 text-muted capitalize">{item.quality}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <ul className="flex flex-col gap-3 md:hidden">
                {tableRows.map(({ item, ends }) => {
                  const change = ends && ends.start !== 0 ? ((ends.end - ends.start) / ends.start) * 100 : null;
                  return (
                    <li key={item.id} className="border-b border-line pb-3">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted">{item.blurb}</p>
                      <p className="mt-1 text-sm">
                        {ends
                          ? `${money(ends.start)} (${ends.startYear}) → ${money(ends.end)} (${ends.endYear})`
                          : "No pair of prices in this window"}
                        {change != null ? (
                          <span className={change >= 0 ? " text-copper-deep" : " text-pine"}>
                            {" "}
                            {signedPct(change)}
                          </span>
                        ) : null}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </>
        )}

        <Card
          title={`Build a ${hi} bill`}
          caption="Check what a household might have paid that year. Subscriptions add by the month. Discs and rentals are one night, not a bill."
          action={
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.id)}
                  className="min-h-11 rounded-full border border-line bg-paper px-3 text-sm font-semibold text-ink"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          }
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
              {ASPECTS.map((group) => {
                const choices = seriesFor(group.id).filter((item) => priceAt(item, hi) != null);
                if (!choices.length) return null;
                return (
                  <fieldset key={group.id} className="min-w-0">
                    <legend className="mb-1 text-xs font-semibold tracking-widest text-muted uppercase">
                      {group.label}
                    </legend>
                    <div className="flex flex-col">
                      {choices.map((item) => {
                        const price = displayValue(item, hi, dollars, "dollars");
                        const on = bill.includes(item.id);
                        return (
                          <label key={item.id} className="flex min-h-11 items-center gap-3 text-sm">
                            <input
                              className="tick"
                              type="checkbox"
                              checked={on}
                              onChange={() =>
                                setBill((current) =>
                                  current.includes(item.id)
                                    ? current.filter((id) => id !== item.id)
                                    : [...current, item.id],
                                )
                              }
                            />
                            <span className="flex-1">{item.short}</span>
                            <span className="text-muted">
                              {price == null ? "—" : money(price)}
                              {unitWord(item.unit)}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              })}
            </div>
            <div className="order-first rounded-2xl bg-ink px-4 py-4 text-paper lg:order-none">
              <p className="text-xs font-semibold tracking-widest text-paper-2 uppercase">Monthly stack</p>
              <p className="mt-1 font-display text-4xl leading-none font-semibold">
                {monthlyBill.length ? money(monthSum) : "$0"}
              </p>
              <p className="mt-2 text-sm text-paper-2">
                {monthlyBill.length
                  ? monthlyBill.map((row) => row.item.short).join(" + ")
                  : "No monthly service checked for this year."}
              </p>
              <p className="mt-4 text-sm">
                {onceBill.length
                  ? `Plus ${money(onceSum)} if you also buy or rent what you checked.`
                  : "Discs and overnight rentals stay off the monthly number."}
              </p>
              {cableNote ? (
                <p className="mt-4 border-t border-paper-2/30 pt-3 text-sm text-paper-2">
                  FCC expanded basic
                  {cableNote.year === hi ? "" : ` (last surveyed ${cableNote.year})`} was {money(cableNote.price)}.
                  This stack is {cableNote.price === 0 ? "—" : `${(monthSum / cableNote.price).toFixed(2)}×`} that
                  average.
                </p>
              ) : null}
            </div>
          </div>
        </Card>

        <Card title="When it showed up" caption="Tap a year to jump the ledger there.">
          <ol className="grid gap-3 md:grid-cols-2">
            {MILESTONES.map((item) => (
              <li key={`${item.year}-${item.title}`}>
                <button
                  type="button"
                  onClick={() => {
                    const nextSpan = spanOf(item.aspect);
                    const end = clamp(Math.max(item.year, nextSpan.min), nextSpan.min, nextSpan.max);
                    selectAspect(item.aspect);
                    setFrom(nextSpan.min);
                    setTo(end);
                    setSettledFrom(nextSpan.min);
                    setSettledTo(end);
                    setSelected(seriesFor(item.aspect).map((series) => series.id));
                  }}
                  className="flex min-h-11 w-full gap-4 rounded-2xl px-2 py-2 text-left transition-[background-color] duration-150 hover:bg-paper"
                >
                  <span className="font-display text-xl font-semibold text-copper">{item.year}</span>
                  <span>
                    <span className="block font-semibold">{item.title}</span>
                    <span className="block text-sm text-muted">{item.text}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </Card>

        <details className="ledger-card rounded-2xl bg-surface px-4 py-2">
          <summary className="flex min-h-11 cursor-pointer items-center font-semibold">
            Sources, and what these numbers are not
          </summary>
          <div className="flex flex-col gap-3 pb-4 text-sm text-muted">
            <p>
              Nominal means the dollars on the bill or the shelf that year. “2026 $” rescales them with CPI-U so a
              1995 cable bill can be compared with a 2024 one. The 2025 and 2026 index values are estimates.
            </p>
            <p>
              Cable, 1995–2024: FCC reports on cable industry prices (most recently FCC 24-136). Expanded basic,
              basic, and the next-most-popular service plus equipment are subscriber-weighted national averages.
              There is no matching FCC reading for 2025 or 2026 yet.
            </p>
            <p>
              Cable, 1955–1984: Paul Kagan Associates historical averages. 1987 is the NCTA / Arthur Andersen June
              survey reported by UPI. 1988 is the Kagan basic average cited by The New York Times in January 1989.
              Community antenna television itself starts in 1948; a clean national price series does not.
            </p>
            <p>
              Streaming and live TV: year-end U.S. list price of the named tier, compiled from company announcements
              and price trackers (including Streaming Price Tracker and Streaming Better). Promotional trials are
              ignored. Hulu + Live in 2026 reflects the September increase for new subscribers.
            </p>
            <p>
              Satellite: DirecTV’s 1994 launch price is documented; later DirecTV points are compiled package rates,
              programming only. DISH’s early tariffs are launch and America’s Top sheets; 2021–2025 AT120 rates
              include locals; 2026 adds the reported $5 increase. Two-year promo prices are lower and are not
              charted. A line across a gap is not a measured price for the missing years.
            </p>
            <p>
              Discs: typical U.S. new-release street prices, compiled. They are not an official index, and collector
              editions cost more than the 4K line.
            </p>
            <p>
              Rentals: Blockbuster-era overnight rates, Redbox kiosk rates, Netflix / DVD.com mail plans, and typical
              new-release HD rents on Prime Video and Fandango at Home (Vudu until 2024). A mail plan is monthly.
              A store, kiosk, or digital rent is one title. Prime’s included library is on the streaming shelf, not
              here.
            </p>
            <ul className="list-disc pl-5">
              {SERIES.map((item) => (
                <li key={item.id}>
                  <span className="text-ink">{item.name}.</span> {item.source}. Tagged {item.quality}.
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </main>
  );
}

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={
        "min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-[background-color,color,border-color] duration-150 " +
        (pressed ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink")
      }
    >
      {children}
    </button>
  );
}

function Toggle<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<[T, string]>;
  onChange: (next: T) => void;
}) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label={label}>
      <div className="flex rounded-full border border-line bg-surface p-1">
        {options.map(([id, text]) => (
          <button
            key={id}
            type="button"
            aria-pressed={value === id}
            onClick={() => onChange(id)}
            className={
              "min-h-11 rounded-full px-4 text-sm font-semibold " +
              (value === id ? "bg-ink text-paper" : "text-muted")
            }
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

function AspectStats({
  active,
  lo,
  hi,
  dollars,
  primaryId,
}: {
  active: Series[];
  lo: number;
  hi: number;
  dollars: DollarMode;
  primaryId?: string;
}) {
  const headline = active.find((item) => item.id === primaryId) ?? active[0];
  const ends = headline ? endsInWindow(headline, lo, hi, dollars) : null;
  const atEnd = headline ? displayValue(headline, hi, dollars, "dollars") : null;
  const scored = active
    .map((item) => {
      const span = endsInWindow(item, lo, hi, dollars);
      if (!span || span.start === 0) return null;
      return { item, pct: ((span.end - span.start) / span.start) * 100 };
    })
    .filter((row): row is { item: Series; pct: number } => row != null);
  const rise = scored.slice().sort((a, b) => b.pct - a.pct)[0];
  const drop = scored.slice().sort((a, b) => a.pct - b.pct)[0];
  const fell = drop && drop.pct < 0 ? drop : null;
  const shown = atEnd != null ? atEnd : ends?.end;
  const shownYear = atEnd != null ? hi : ends?.endYear;
  return (
    <>
      <Stat
        label={shownYear != null ? `In ${shownYear}` : "In this year"}
        value={shown == null ? "—" : money(shown)}
        note={headline ? headline.short : "Select a series"}
      />
      <Stat
        label="Window"
        value={changeLabel(ends)}
        note={ends ? `${ends.startYear} to ${ends.endYear}` : "Need two years"}
      />
      <Stat
        label="Fastest rise"
        value={rise ? signedPct(rise.pct) : "—"}
        note={rise ? rise.item.short : "Nothing to compare"}
      />
      <Stat
        label="Got cheaper"
        value={fell ? signedPct(fell.pct) : "None"}
        note={fell ? fell.item.short : "No decline in this window"}
      />
    </>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="ledger-stat rounded-2xl bg-surface px-3 py-3">
      <p className="text-xs font-semibold tracking-widest text-muted uppercase">{label}</p>
      <p className="mt-1 font-display text-2xl leading-none font-semibold text-ink md:text-3xl">{value}</p>
      <p className="mt-2 text-sm text-muted">{note}</p>
    </div>
  );
}
