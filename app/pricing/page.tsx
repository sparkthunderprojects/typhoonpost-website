import type { Metadata } from 'next';
import { PlanTable } from '@/components/PlanTable';
import { Faq } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { getFaqs, getPlans } from '@/lib/content';
import { SITE } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Typhoonpost is free during early access. Business and Enterprise plans add custom domains, shared calendars, admin controls and priority support.',
  alternates: { canonical: '/pricing' },
  openGraph: { url: `${SITE.url}/pricing`, title: 'Typhoonpost pricing' },
};

export default async function PricingPage() {
  const [plans, faqs] = await Promise.all([getPlans(), getFaqs()]);
  const pricingFaqs = faqs.filter((f) => /cost|domain|ads|data/i.test(f.question));

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
              { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${SITE.url}/pricing` },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: SITE.name,
            description: SITE.description,
            offers: plans.map((p) => ({
              '@type': 'Offer',
              name: p.name,
              price: Number(p.price_monthly).toFixed(2),
              priceCurrency: 'USD',
              url: `${SITE.url}/early-access?plan=${p.slug}`,
            })),
          },
        ]}
      />
      <section className="container-x pb-12 pt-16 lg:pt-24">
        <h1 className="max-w-[16ch] text-[clamp(2.5rem,5.6vw,4.5rem)] font-bold leading-[1] tracking-[-0.035em]">
          Pricing that stays out of the way.
        </h1>
        <p className="mt-6 max-w-[52ch] text-[18px] leading-relaxed text-slate-ink">
          Every plan includes mail, calendar and contacts. Pay per user only when you need a custom domain or admin controls.
        </p>
      </section>
      <section className="container-x pb-24" aria-label="Plans">
        <PlanTable plans={plans} />
        <p className="mt-5 text-[14px] text-slate-muted">Prices are shown in US dollars and may change before general availability.</p>
      </section>
      <section aria-labelledby="pricing-faq" className="border-t border-sea/10 bg-white py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <h2 id="pricing-faq" className="max-w-[12ch] text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.03] tracking-[-0.03em]">
            Before you choose.
          </h2>
          <Faq items={pricingFaqs.length ? pricingFaqs : faqs} />
        </div>
      </section>
    </>
  );
}
