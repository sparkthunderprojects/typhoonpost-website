import Link from 'next/link';
import { Isobars } from '@/components/Isobars';
import { InboxMock, MockFor } from '@/components/Mocks';
import { Icon } from '@/components/Icon';
import { PlanTable } from '@/components/PlanTable';
import { Faq } from '@/components/Faq';
import { LeadForm } from '@/components/LeadForm';
import { JsonLd } from '@/components/JsonLd';
import { getFaqs, getFeatures, getPlans } from '@/lib/content';
import { SITE } from '@/lib/site';

export const revalidate = 300;

export default async function HomePage() {
  const [features, plans, faqs] = await Promise.all([getFeatures(), getPlans(), getFaqs()]);
  const product = features.filter((f) => f.section === 'feature');
  const security = features.filter((f) => f.section === 'security');

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/icon.svg`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: SITE.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: SITE.description,
      url: SITE.url,
      offers: plans.map((p) => ({
        '@type': 'Offer',
        name: p.name,
        price: Number(p.price_monthly).toFixed(2),
        priceCurrency: 'USD',
        description: p.tagline,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Isobars className="pointer-events-none absolute inset-0 h-full w-full" />
        <div className="container-x relative grid items-center gap-14 pb-24 pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:pb-32 lg:pt-24">
          <div>
            <h1 className="text-[clamp(2.75rem,6.4vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.035em]">
              Mail that holds steady.
            </h1>
            <p className="mt-7 max-w-[34ch] text-[19px] leading-relaxed text-slate-ink">
              Typhoonpost brings your inbox, calendar and contacts into one calm workspace. Private by default, fast by design.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/early-access" className="btn-primary">
                Get early access
              </Link>
              <a href={SITE.appUrl} className="btn-quiet">
                Sign in
              </a>
            </div>
            <p className="mt-5 text-[14px] text-slate-muted">Free during early access. No credit card needed.</p>
          </div>
          <div className="lg:-mr-10">
            <InboxMock />
          </div>
        </div>
      </section>

      {/* Product */}
      <section id="features" aria-labelledby="features-title" className="border-t border-sea/10 bg-white py-24 lg:py-32">
        <div className="container-x">
          <h2 id="features-title" className="max-w-[18ch] text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.03em]">
            Everything you check before 9am, in one place.
          </h2>
          <div className="mt-20 space-y-24 lg:space-y-32">
            {product.map((f, i) => (
              <article key={f.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <p className="inline-flex items-center gap-2 text-[15px] font-semibold text-squall">
                    <Icon name={f.icon} size={18} /> {f.eyebrow}
                  </p>
                  <h3 className="mt-4 max-w-[20ch] text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.025em]">
                    {f.title}
                  </h3>
                  <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-slate-ink">{f.body}</p>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <MockFor icon={f.icon} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section aria-labelledby="security-title" className="bg-sea py-24 text-white lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 id="security-title" className="max-w-[14ch] text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.03em]">
              Your mail stays yours.
            </h2>
            <p className="mt-6 max-w-[38ch] text-[17px] leading-relaxed text-white/70">
              Email holds the keys to everything else you do online. Typhoonpost is built so that nobody but you can read yours.
            </p>
            <Link href="/security" className="btn-ghost-dark mt-9">
              How we protect your mail
            </Link>
          </div>
          <ul className="divide-y divide-white/12 border-y border-white/12">
            {security.map((s) => (
              <li key={s.title} className="grid gap-4 py-7 sm:grid-cols-[3rem_1fr]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/8 text-signal">
                  <Icon name={s.icon} size={22} />
                </span>
                <div>
                  <h3 className="font-display text-[20px] font-semibold">{s.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-[16px] leading-relaxed text-white/68">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <section aria-labelledby="pricing-title" className="py-24 lg:py-32">
        <div className="container-x">
          <h2 id="pricing-title" className="max-w-[16ch] text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.03em]">
            Simple plans. Free while we are in early access.
          </h2>
          <p className="mt-5 max-w-[50ch] text-[17px] leading-relaxed text-slate-ink">
            Start on Starter today. Move to Business when your team needs a custom domain and shared calendars.
          </p>
          <div className="mt-12">
            <PlanTable plans={plans} />
          </div>
          <p className="mt-6 text-[15px] text-slate-muted">
            <Link href="/pricing" className="font-semibold text-squall underline-offset-4 hover:underline">
              See the full pricing page
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="border-t border-sea/10 bg-white py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <h2 id="faq-title" className="max-w-[12ch] text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.03em]">
            Questions, answered.
          </h2>
          <Faq items={faqs} />
        </div>
      </section>

      {/* Final call */}
      <section aria-labelledby="cta-title" className="relative overflow-hidden bg-squall py-24 text-white lg:py-32">
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <h2 id="cta-title" className="max-w-[14ch] text-[clamp(2.25rem,4.6vw,4rem)] font-bold leading-[1] tracking-[-0.03em]">
            Give your inbox some calm.
          </h2>
          <div>
            <p className="mb-6 max-w-[40ch] text-[17px] leading-relaxed text-white/90">
              Join early access and we will email you when your mailbox is ready.
            </p>
            <LeadForm source="home" dark />
          </div>
        </div>
      </section>
    </>
  );
}
