import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { to2026Dollars } from "@/data/cpi";
import {
  PRESETS,
  displayValue,
  seriesById,
  styleFor,
  unitWord,
  type DollarMode,
  type Series,
  type ValueMode,
} from "@/data/catalog";
import { PAY_TV_HOUSEHOLDS } from "@/data/context";

function money(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  const body = Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(2);
  return `$${body}`;
}

function signedPct(n: number): string {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(0)}%`;
}

function people(n: number): string {
  if (n >= 1_000_000) {
    const digits = n >= 10_000_000 ? 1 : 2;
    const text = (n / 1_000_000).toFixed(digits).replace(/\.0+$/, "");
    return `${text} million`;
  }
  if (n >= 1000) return `${Math.round(n / 1000)} thousand`;
  return n.toLocaleString("en-US");
}

function axisTick() {
  return { fontSize: 12, fill: "var(--color-muted)", fontFamily: "var(--font-sans)" } as const;
}

export function ReceiptDeck({
  dollars,
  onPick,
}: {
  dollars: DollarMode;
  onPick: (id: string) => void;
}) {
  const basis = dollars === "real" ? "2026 dollars" : "nominal dollars";
  const cards = PRESETS.map((preset) => {
    const lines = preset.ids
      .map((id) => seriesById(id))
      .filter((item): item is Series => item != null)
      .map((item) => ({ item, price: displayValue(item, preset.year, dollars, "dollars") }))
      .filter((row): row is { item: Series; price: number } => row.price != null);
    const monthly = lines.filter((row) => row.item.unit === "month");
    const once = lines.filter((row) => row.item.unit !== "month");
    const total = monthly.reduce((sum, row) => sum + row.price, 0);
    return { preset, monthly, once, total };
  });
  const max = Math.max(...cards.map((card) => card.total), 1);

  return (
    <section className="ledger-card rounded-2xl bg-surface p-4 md:p-5">
      <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">What a household paid</h2>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        {basis}. The bar is the monthly total. A disc or a night sits under the line and is not added in. Choose one
        to set the year and the bill.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(({ preset, monthly, once, total }) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onPick(preset.id)}
            className="flex min-h-11 flex-col rounded-2xl bg-paper px-3 py-3 text-left"
          >
            <span className="text-xs font-semibold tracking-widest text-muted uppercase">{preset.year}</span>
            <span className="mt-1 font-semibold text-ink">{preset.label}</span>
            <span className="mt-2 font-display text-3xl leading-none font-semibold text-ink">{money(total)}</span>
            <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-paper-2">
              <span
                className="block h-full rounded-full bg-copper"
                style={{ width: `${Math.max(4, (total / max) * 100)}%` }}
              />
            </span>
            <ul className="mt-3 space-y-1 text-sm">
              {monthly.map((row) => (
                <li key={row.item.id} className="flex justify-between gap-2">
                  <span>{row.item.short}</span>
                  <span className="text-muted tabular-nums">
                    {money(row.price)}
                    {unitWord(row.item.unit)}
                  </span>
                </li>
              ))}
            </ul>
            {once.length ? (
              <p className="mt-3 border-t border-line pt-2 text-xs text-muted">
                Also that year, not in the month:{" "}
                {once.map((row) => `${row.item.short} ${money(row.price)}`).join(", ")}.
              </p>
            ) : null}
          </button>
        ))}
      </div>
    </section>
  );
}

export function SparkRow({
  series,
  lo,
  hi,
  dollars,
  mode,
}: {
  series: Series[];
  lo: number;
  hi: number;
  dollars: DollarMode;
  mode: ValueMode;
}) {
  return (
    <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-4">
      {series.map((item) => {
        const rows = [];
        let start: number | null = null;
        let end: number | null = null;
        for (let year = lo; year <= hi; year += 1) {
          const value = displayValue(item, year, dollars, mode);
          rows.push({ year, value });
          if (value == null) continue;
          if (start == null) start = value;
          end = value;
        }
        const change = start != null && end != null && start !== 0 ? ((end - start) / start) * 100 : null;
        const atEnd = displayValue(item, hi, dollars, "dollars");
        const steps = item.points.filter((point) => point.year >= lo && point.year <= hi && point.price > 0);
        const style = styleFor(item);
        return (
          <div key={item.id} className="rounded-xl bg-paper px-2 py-2">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-xs font-semibold text-ink">{item.short}</span>
              <span className="text-sm font-semibold tabular-nums">{atEnd == null ? "—" : money(atEnd)}</span>
            </div>
            <div className="h-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rows}>
                  <Line
                    dataKey="value"
                    stroke={style.stroke}
                    strokeWidth={1.75}
                    strokeDasharray={style.dash === "0" ? undefined : style.dash}
                    dot={false}
                    connectNulls={item.hold}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted">{change == null ? "One price in this window" : signedPct(change)}</p>
            {item.hold && mode === "dollars" && steps.length > 1 ? (
              <p className="text-xs text-muted">
                {steps
                  .map((point) => money(dollars === "real" ? to2026Dollars(point.price, point.year) : point.price))
                  .join(" → ")}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function StackOverTime({
  ids,
  hi,
  dollars,
  animate,
}: {
  ids: string[];
  hi: number;
  dollars: DollarMode;
  animate: boolean;
}) {
  const monthly = ids
    .map((id) => seriesById(id))
    .filter((item): item is Series => item != null && item.unit === "month");
  const cable = seriesById("cable-expanded");

  const start = monthly.length ? Math.min(...monthly.map((item) => item.points[0]?.year ?? hi)) : hi;
  const rows: Array<{ year: number; stack: number | null; cable: number | null }> = [];
  for (let year = start; year <= hi; year += 1) {
    let sum = 0;
    let any = false;
    for (const item of monthly) {
      const price = displayValue(item, year, dollars, "dollars");
      if (price == null) continue;
      sum += price;
      any = true;
    }
    rows.push({
      year,
      stack: any ? sum : null,
      cable: cable ? displayValue(cable, year, dollars, "dollars") : null,
    });
  }
  const late = monthly
    .filter((item) => (item.points[0]?.year ?? start) > start)
    .map((item) => `${item.short} starts in ${item.points[0]?.year}`);

  if (!monthly.length) {
    return <p className="text-sm text-muted">Check a monthly service to draw the stack across years.</p>;
  }

  return (
    <div>
      <h3 className="font-display text-lg font-semibold">This stack over time</h3>
      <p className="mt-1 text-sm text-muted">
        The sum of the monthly lines that are checked, through {hi}. FCC expanded basic is the comparison, in years
        the survey published one.
        {late.length ? ` ${late.join(". ")}.` : ""}
      </p>
      <div className="mt-3 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-line)" vertical={false} />
            <XAxis dataKey="year" tick={axisTick()} tickLine={false} axisLine={false} minTickGap={24} />
            <YAxis
              tick={axisTick()}
              tickLine={false}
              axisLine={false}
              width={52}
              tickFormatter={(value: number) => money(value)}
            />
            <Tooltip
              formatter={(value, name) => [money(Number(value)), name === "cable" ? "Expanded basic" : "Your stack"]}
              labelFormatter={(label) => String(label)}
              contentStyle={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-line)",
                borderRadius: 16,
                fontSize: 14,
              }}
            />
            <Line
              type="monotone"
              dataKey="stack"
              name="stack"
              stroke="var(--color-copper)"
              strokeWidth={2.25}
              dot={false}
              connectNulls={false}
              isAnimationActive={animate}
            />
            <Line
              type="monotone"
              dataKey="cable"
              name="cable"
              stroke="var(--color-ink)"
              strokeWidth={1.75}
              strokeDasharray="6 4"
              dot={false}
              connectNulls={false}
              isAnimationActive={animate}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function HouseholdLine({ lo, hi }: { lo: number; hi: number }) {
  const inWindow = PAY_TV_HOUSEHOLDS.points.filter((point) => point.year >= lo && point.year <= hi);
  if (!inWindow.length) {
    return (
      <p className="text-sm text-muted">
        No traditional pay-TV count falls inside {lo}–{hi}. The series is the 2012 peak, the end of 2022, and the end
        of 2023.
      </p>
    );
  }
  const first = inWindow[0]!;
  const last = inWindow[inWindow.length - 1]!;
  const change = last.value - first.value;
  const direction = change === 0 ? "unchanged" : change > 0 ? "up" : "down";
  return (
    <p className="ledger-card rounded-2xl bg-surface px-4 py-4 text-sm text-ink">
      Traditional pay TV (cable, satellite, and telephone-company video)
      {inWindow.length > 1
        ? ` moved from ${people(first.value)} in ${first.year} to ${people(last.value)} in ${last.year} — ${direction} ${people(Math.abs(change))}.`
        : ` was ${people(last.value)} in ${last.year}.`}{" "}
      <span className="text-muted">Open Cable for the household chart. This count is not part of any bill.</span>
    </p>
  );
}
