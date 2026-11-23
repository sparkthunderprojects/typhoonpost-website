import Link from 'next/link';
import { Check } from 'lucide-react';
import type { Plan } from '@/lib/content';

function price(p: Plan) {
  return p.price_monthly === 0 ? 'Free' : `$${Number(p.price_monthly).toFixed(0)}`;
}

/** One joined panel rather than three floating cards; the middle plan is inverted. */
export function PlanTable({ plans }: { plans: Plan[] }) {
  return (
    <div className="grid overflow-hidden rounded-3xl border border-sea/10 bg-white shadow-lift md:grid-cols-3">
      {plans.map((p) => (
        <section
          key={p.slug}
          aria-labelledby={`plan-${p.slug}`}
          className={`flex flex-col p-8 lg:p-10 ${p.highlighted ? 'bg-sea text-white' : 'md:border-l md:border-sea/10 first:md:border-l-0'}`}
        >
          <div className="flex items-center justify-between">
            <h3 id={`plan-${p.slug}`} className="font-display text-2xl font-bold">
              {p.name}
            </h3>
            {p.highlighted && (
              <span className="rounded-full bg-signal px-3 py-1 text-[12px] font-bold text-sea">Most popular</span>
            )}
          </div>
          <p className={`mt-2 text-[15px] ${p.highlighted ? 'text-white/70' : 'text-slate-muted'}`}>{p.tagline}</p>
          <p className="mt-7 flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold tracking-tight">{price(p)}</span>
          </p>
          <p className={`mt-1 text-[14px] ${p.highlighted ? 'text-white/65' : 'text-slate-muted'}`}>{p.price_note}</p>
          <ul className="mt-8 flex-1 space-y-3.5">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3 text-[15px]">
                <Check
                  size={18}
                  aria-hidden="true"
                  className={`mt-0.5 shrink-0 ${p.highlighted ? 'text-signal' : 'text-squall'}`}
                />
                <span className={p.highlighted ? 'text-white/90' : 'text-slate-ink'}>{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`/early-access?plan=${p.slug}`}
            className={`mt-10 ${p.highlighted ? 'btn-light' : 'btn-primary'}`}
          >
            {p.cta_label}
          </Link>
        </section>
      ))}
    </div>
  );
}
