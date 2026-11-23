import Link from 'next/link';
import { Check } from 'lucide-react';
import { Icon } from '@/components/Icon';
import { MockFor } from '@/components/Mocks';
import { LeadForm } from '@/components/LeadForm';
import { JsonLd } from '@/components/JsonLd';
import { Faq } from '@/components/Faq';
import type { Plan } from '@/lib/content';
import { SITE } from '@/lib/site';

export interface AudienceContent {
  slug: 'personal' | 'business';
  headline: string;
  intro: string;
  sections: { icon: string; title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  other: { href: string; label: string };
  ctaTitle: string;
}

/** Shared layout for the Personal and Business sections of the site. */
export function AudiencePage({ content, plan }: { content: AudienceContent; plan?: Plan }) {
  const name = plan?.name ?? (content.slug === 'personal' ? 'Personal' : 'Business');
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
              { '@type': 'ListItem', position: 2, name, item: `${SITE.url}/${content.slug}` },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: content.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          },
        ]}
      />
      <section className="container-x grid items-center gap-12 pb-20 pt-16 lg:grid-cols-[1fr_1fr] lg:pt-24">
        <div>
          <p className="text-[15px] font-semibold text-squall">Typhoonpost {name}</p>
          <h1 className="mt-4 max-w-[14ch] text-[clamp(2.5rem,5.6vw,4.5rem)] font-bold leading-[1] tracking-[-0.035em]">
            {content.headline}
          </h1>
          <p className="mt-6 max-w-[46ch] text-[18px] leading-relaxed text-slate-ink">{content.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`/early-access?plan=${content.slug}`} className="btn-primary">
              {plan?.cta_label ?? `Get ${name}`}
            </Link>
            <Link href={content.other.href} className="btn-quiet">
              {content.other.label}
            </Link>
          </div>
        </div>
        {plan && (
          <aside aria-label={`${name} plan`} className="rounded-3xl border border-sea/10 bg-white p-8 shadow-lift lg:p-10">
            <p className="font-display text-5xl font-bold tracking-tight">
              {plan.price_monthly === 0 ? 'Free' : `$${Number(plan.price_monthly).toFixed(0)}`}
            </p>
            <p className="mt-1 text-[14px] text-slate-muted">{plan.price_note}</p>
            <ul className="mt-7 space-y-3.5">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-3 text-[15px]">
                  <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-squall" />
                  <span className="text-slate-ink">{f}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </section>

      <section aria-label={`What ${name} gives you`} className="border-t border-sea/10 bg-white py-24 lg:py-28">
        <div className="container-x space-y-24">
          {content.sections.map((s, i) => (
            <article key={s.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <p className="inline-flex items-center gap-2 text-[15px] font-semibold text-squall">
                  <Icon name={s.icon} size={18} /> {s.title}
                </p>
                <p className="mt-5 max-w-[46ch] text-[18px] leading-relaxed text-slate-ink">{s.body}</p>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <MockFor icon={s.icon} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="aud-faq" className="border-t border-sea/10 py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <h2 id="aud-faq" className="max-w-[12ch] text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.03] tracking-[-0.03em]">
            {name} questions.
          </h2>
          <Faq items={content.faqs.map((f, i) => ({ ...f, sort_order: i }))} />
        </div>
      </section>

      <section aria-labelledby="aud-cta" className="bg-squall py-24 text-white">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <h2 id="aud-cta" className="max-w-[14ch] text-[clamp(2.25rem,4.6vw,4rem)] font-bold leading-[1] tracking-[-0.03em]">
            {content.ctaTitle}
          </h2>
          <LeadForm source={content.slug} dark />
        </div>
      </section>
    </>
  );
}
