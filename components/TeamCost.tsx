'use client';

import { useId, useState } from 'react';

/** Team-size cost calculator. Uses the Business plan price from the database. */
export function TeamCost({ pricePerUser, storageGb = 50 }: { pricePerUser: number; storageGb?: number }) {
  const id = useId();
  const [n, setN] = useState(10);
  const monthly = n * pricePerUser;
  const fmt = (v: number) => `$${v.toLocaleString('en-US')}`;
  return (
    <div className="rounded-3xl border border-white/12 bg-sea-2 p-8 lg:p-12">
      <h2 className="max-w-[16ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
        What would your team pay?
      </h2>
      <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-white/70">
        One price per person, billed yearly. Move the slider to your team size.
      </p>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <label htmlFor={id} className="flex items-baseline justify-between text-[15px] font-semibold text-white">
            Team size
            <output htmlFor={id} className="font-display text-3xl font-bold">
              {n}
            </output>
          </label>
          <input
            id={id}
            type="range"
            min={1}
            max={200}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="mt-5 w-full accent-[#FFB000]"
          />
          <div className="mt-2 flex justify-between text-[13px] text-white/50">
            <span>1 person</span>
            <span>200 people</span>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/6 p-5">
            <dt className="text-[14px] text-white/65">Per month</dt>
            <dd className="mt-1 font-display text-4xl font-bold text-white">{fmt(monthly)}</dd>
          </div>
          <div className="rounded-2xl bg-white/6 p-5">
            <dt className="text-[14px] text-white/65">Per year</dt>
            <dd className="mt-1 font-display text-4xl font-bold text-signal">{fmt(monthly * 12)}</dd>
          </div>
          <div className="col-span-2 rounded-2xl bg-white/6 p-5 text-[14px] text-white/70">
            {(n * storageGb).toLocaleString('en-US')} GB of storage across the team, {storageGb} GB per person.
          </div>
        </dl>
      </div>
      <p className="mt-6 text-[13px] text-white/50">Early-access price in US dollars. It may change before general availability.</p>
    </div>
  );
}
