import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { to2026Dollars } from "@/data/cpi";
import type { DollarMode } from "@/data/catalog";
import {
  CABLE_HOUSEHOLDS,
  EXPANDED_CHANNELS,
  HOURLY_WAGE,
  PAY_TV_HOUSEHOLDS,
  PER_CHANNEL_2024,
  channelsAt,
  hoursForExpandedBasic,
  perChannelAt,
} from "@/data/context";

function money(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  const body = Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(2);
  return `$${body}`;
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

const STROKES = ["var(--color-ink)", "var(--color-copper)", "var(--color-pine)"];

export function CableContext({
  year,
  lo,
  hi,
  dollars,
  animate,
}: {
  year: number;
  lo: number;
  hi: number;
  dollars: DollarMode;
  animate: boolean;
}) {
  const channelRows = useMemo(() => {
    const rows: Array<Record<string, number | null>> = [];
    for (let y = 1995; y <= 2022; y += 1) {
      const row: Record<string, number | null> = { year: y };
      for (const series of EXPANDED_CHANNELS) {
        row[series.id] = series.points.find((point) => point.year === y)?.value ?? null;
      }
      rows.push(row);
    }
    return rows;
  }, []);

  const hourRows = useMemo(() => {
    const rows: Array<{ year: number; hours: number | null }> = [];
    for (const wage of HOURLY_WAGE) {
      if (wage.year < lo || wage.year > hi) continue;
      rows.push({ year: wage.year, hours: hoursForExpandedBasic(wage.year) });
    }
    return rows;
  }, [lo, hi]);

  const perChannel = perChannelAt(year);
  const perChannelShown =
    perChannel == null ? null : dollars === "real" ? to2026Dollars(perChannel.value, year) : perChannel.value;
  const channels = channelsAt(year);
  const hours = hoursForExpandedBasic(year);
  const householdRows = useMemo(() => {
    const years = [
      ...CABLE_HOUSEHOLDS.points.map((point) => point.year),
      ...PAY_TV_HOUSEHOLDS.points.map((point) => point.year),
    ].filter((item) => item >= lo && item <= hi);
    if (!years.length) return [];
    const first = Math.min(...years);
    const last = Math.max(...years);
    const rows: Array<{ year: number; cable: number | null; pay: number | null }> = [];
    for (let item = first; item <= last; item += 1) {
      rows.push({
        year: item,
        cable: CABLE_HOUSEHOLDS.points.find((point) => point.year === item)?.value ?? null,
        pay: PAY_TV_HOUSEHOLDS.points.find((point) => point.year === item)?.value ?? null,
      });
    }
    return rows;
  }, [lo, hi]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="ledger-card rounded-2xl bg-surface p-4 md:p-5 lg:col-span-2">
        <h2 className="font-display text-xl font-semibold md:text-2xl">Channels in expanded basic</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          FCC channel counts. The line breaks where the survey changed what it counted: a wider set in 2010, and
          another definition after 2020. A gap is a definition change, not a collapse in the lineup.
          {channels ? ` In ${year}, ${channels.name.toLowerCase()} reads ${channels.value.toFixed(0)} channels.` : ` No channel count is published for ${year}.`}
        </p>
        <div className="mt-3 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={channelRows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-line)" vertical={false} />
              <XAxis dataKey="year" tick={axisTick()} tickLine={false} axisLine={false} minTickGap={28} />
              <YAxis tick={axisTick()} tickLine={false} axisLine={false} width={40} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-line)",
                  borderRadius: 16,
                }}
              />
              {EXPANDED_CHANNELS.map((series, index) => (
                <Line
                  key={series.id}
                  dataKey={series.id}
                  name={series.name}
                  stroke={STROKES[index] ?? STROKES[0]}
                  strokeWidth={2.25}
                  dot={{ r: 2.5, strokeWidth: 0 }}
                  connectNulls={false}
                  isAnimationActive={animate}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-sm">
          {perChannelShown == null ? (
            <span className="text-muted">No FCC price-per-channel reading in {year}.</span>
          ) : (
            <>
              <span className="font-display text-2xl font-semibold">{money(perChannelShown)}</span>
              <span className="ml-2 text-muted">
                per expanded-basic channel in {year}
                {dollars === "real" ? ", in 2026 dollars" : ""}. {perChannel?.stretch}. FCC’s published figure.
              </span>
            </>
          )}
        </p>
        {year === PER_CHANNEL_2024.year ? (
          <p className="mt-1 text-sm text-muted">
            Basic service that year was {money(dollars === "real" ? to2026Dollars(PER_CHANNEL_2024.basic, year) : PER_CHANNEL_2024.basic)} per
            channel, also the FCC’s figure.
          </p>
        ) : null}
      </section>

      <section className="ledger-card rounded-2xl bg-surface p-4 md:p-5">
        <h2 className="font-display text-xl font-semibold md:text-2xl">Hours of work</h2>
        <p className="mt-1 text-sm text-muted">
          Expanded basic divided by the average private-sector hourly wage. Hours do not follow the 2026-dollar
          toggle. This is an average wage, not a typical household’s pay.
        </p>
        <p className="mt-3">
          {hours == null ? (
            <span className="text-sm text-muted">No wage and expanded-basic pair in {year}.</span>
          ) : (
            <>
              <span className="font-display text-3xl font-semibold">{hours.toFixed(1)}</span>
              <span className="ml-2 text-sm text-muted">hours in {year}</span>
            </>
          )}
        </p>
        <div className="mt-3 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourRows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-line)" vertical={false} />
              <XAxis dataKey="year" tick={axisTick()} tickLine={false} axisLine={false} minTickGap={24} />
              <YAxis tick={axisTick()} tickLine={false} axisLine={false} width={32} />
              <Tooltip formatter={(value) => [`${Number(value).toFixed(1)} hours`, "Expanded basic"]} />
              <Line
                dataKey="hours"
                stroke="var(--color-copper)"
                strokeWidth={2.25}
                dot={false}
                connectNulls={false}
                isAnimationActive={animate}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="ledger-card rounded-2xl bg-surface p-4 md:p-5">
        <h2 className="font-display text-xl font-semibold md:text-2xl">Who was paying</h2>
        <p className="mt-1 text-sm text-muted">
          Cable households and traditional pay TV are different counts. The chart does not connect a missing year.
          Neither number is part of the bill.
        </p>
        {householdRows.length ? (
          <div className="mt-3 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={householdRows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-line)" vertical={false} />
                <XAxis dataKey="year" tick={axisTick()} tickLine={false} axisLine={false} minTickGap={24} />
                <YAxis
                  tick={axisTick()}
                  tickLine={false}
                  axisLine={false}
                  width={48}
                  tickFormatter={(value: number) => `${Math.round(value / 1_000_000)}m`}
                />
                <Tooltip formatter={(value, name) => [people(Number(value)), name === "pay" ? "Pay TV" : "Cable"]} />
                <Line
                  dataKey="cable"
                  name="cable"
                  stroke="var(--color-ink)"
                  strokeWidth={2.25}
                  dot={{ r: 3, strokeWidth: 0 }}
                  connectNulls={false}
                  isAnimationActive={animate}
                />
                <Line
                  dataKey="pay"
                  name="pay"
                  stroke="var(--color-copper)"
                  strokeWidth={2.25}
                  dot={{ r: 3, strokeWidth: 0 }}
                  connectNulls={false}
                  isAnimationActive={animate}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">No household count falls inside {lo}–{hi}.</p>
        )}
        <p className="mt-2 text-xs text-muted">
          Cable counts through 2001, then the FCC’s 2023 cable share. Pay TV is the FCC’s traditional-MVPD series.
          Sources are in the drawer at the bottom.
        </p>
      </section>
    </div>
  );
}
