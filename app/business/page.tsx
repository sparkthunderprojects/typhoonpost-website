import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { Isobars } from '@/components/Isobars';
import { Icon } from '@/components/Icon';
import { AccessMock, DomainMock, TeamCalendarMock, TeamMock } from '@/components/BusinessMocks';
import { Faq } from '@/components/Faq';
import { LeadForm } from '@/components/LeadForm';
import { JsonLd } from '@/components/JsonLd';
import { getPlans } from '@/lib/content';
import { SITE } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Typhoonpost Business',
  description: 'Private email and calendar for teams: your own domain, shared calendars, an admin console and priority support, billed per user.',
  alternates: { canonical: '/business' },
  openGraph: { url: `${SITE.url}/business`, title: 'Typhoonpost Business' },
};

const ADDED: { icon: string; title: string; body: string; mock: ReactNode }[] = [
  {
    icon: 'globe',
    title: 'Your own domain',
    body: 'Everyone on the team sends and receives as name@yourcompany.com. You add three records once, and every message is signed so receiving servers can tell it really came from you.',
    mock: <DomainMock />,
  },
  {
    icon: 'calendar',
    title: 'Calendars the whole team shares',
    body: 'See when colleagues are free before you ask. Find the hour that works for everyone, then book it from the conversation that started the meeting.',
    mock: <TeamCalendarMock />,
  },
  {
    icon: 'badge',
    title: 'One place to manage people',
    body: 'Add a new starter and their mailbox is ready. Close a leaver and their access ends. Admins manage people, not mail.',
    mock: <AccessMock />,
  },
];

const INCLUDED = [
  { icon: 'inbox', title: 'An inbox that stays calm', body: 'Focused and Other sorting, flags and snooze.' },
  { icon: 'eye', title: 'Trackers blocked, links cleaned', body: 'Senders cannot see when your team opens their mail.' },
  { icon: 'lock', title: 'Two-factor sign-in', body: 'Enforced by the database, so a stolen password is not enough.' },
  { icon: 'users', title: 'Tasks, contacts and calendar', body: 'My Day, groups and week views beside the inbox.' },
  { icon: 'zap', title: 'Search that stays on the device', body: 'Your queries never reach our servers.' },
] as const;

const SIZES = [5, 10, 25, 50];

const FAQS = [
  { question: 'Is Business available today?', answer: 'Typhoonpost is in early access. Everything listed under “Already in every mailbox” works today. Custom domains, shared calendars and the admin console are being built, and joining the list tells us your team is waiting for them.' },
  { question: 'What do I get with Business?', answer: 'Everything in Personal, plus your own domain, shared and team calendars, an admin console, 50 GB of storage per user and priority email support.' },
  { question: 'What does it cost?', answer: 'Business is billed per user, per month, billed yearly. The early-access price is shown on this page and may change before general availability.' },
  { question: 'Can admins read my team’s mail?', answer: 'The admin console is for adding and removing people, not for reading mail. We will publish exactly what admins can and cannot see before Business opens.' },
  { question: 'Can we move over from another provider?', answer: 'Import tools are on the roadmap. Until they ship, forward mail from the old address while your team switches over.' },
  { question: 'Who is Business for?', answer: 'Teams that want private email on their own domain without the clutter or the ads. If it is only you, Personal is the better fit.' },
].map((f, i) => ({ ...f, sort_order: i }));

export default async function BusinessPage() {
  const plan = (await getPlans()).find((p) => p.slug === 'business');
  const price = plan ? Number(plan.price_monthly) : 6;

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
              { '@type': 'ListItem', position: 2, name: 'Business', item: `${SITE.url}/business` },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
          },
        ]}
      />

      {/* Hero: same layout and size as the home page */}
      <section className="relative overflow-hidden">
        <Isobars className="pointer-events-none absolute inset-0 h-full w-full" />
        <div className="container-x relative grid items-center gap-14 pb-24 pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:pb-32 lg:pt-24">
          <div>
            <h1 className="text-[clamp(2.75rem,6.4vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.035em]">
              One calm inbox for the whole team.
            </h1>
            <p className="mt-7 max-w-[34ch] text-[19px] leading-relaxed text-slate-ink">
              Typhoonpost Business puts your team on your own domain, with shared calendars and one place to manage who has a mailbox.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/early-access?plan=business" className="btn-primary">
                {plan?.cta_label ?? 'Get Business'}
              </Link>
              <Link href="/pricing" className="btn-quiet">
                See pricing
              </Link>
            </div>
            <p className="mt-5 text-[14px] text-slate-muted">In early access. Free to join the list, no credit card needed.</p>
          </div>
          <div className="lg:-mr-10">
            <TeamMock tall />
          </div>
        </div>
      </section>

      {/* What Business adds */}
      <section id="added" aria-labelledby="biz-added" className="border-t border-sea/10 bg-white py-24 lg:py-32">
        <div className="container-x">
          <h2 id="biz-added" className="max-w-[20ch] text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.03em]">
            What Business adds to Personal.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-slate-ink">
            These three are being built now. Join the list and tell us which one your team needs first.
          </p>
          <div className="mt-20 space-y-24 lg:space-y-32">
            {ADDED.map((f, i) => (
              <article key={f.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <p className="inline-flex items-center gap-2 text-[15px] font-semibold text-squall">
                    <Icon name={f.icon} size={18} /> Coming for Business
                  </p>
                  <h3 className="mt-4 max-w-[20ch] text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.025em]">
                    {f.title}
                  </h3>
                  <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-slate-ink">{f.body}</p>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>{f.mock}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Already included */}
      <section aria-labelledby="biz-included" className="bg-sea py-24 text-white lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 id="biz-included" className="max-w-[14ch] text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.03em]">
              Already in every mailbox.
            </h2>
            <p className="mt-6 max-w-[38ch] text-[17px] leading-relaxed text-white/70">
              Business starts from the same private inbox as Personal, so these work for your team today.
            </p>
            <Link href="/security" className="btn-ghost-dark mt-9">
              How we protect your mail
            </Link>
          </div>
          <ul className="divide-y divide-white/12 border-y border-white/12">
            {INCLUDED.map((s) => (
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

      {/* Price */}
      <section aria-labelledby="biz-price" className="py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <h2 id="biz-price" className="max-w-[14ch] text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.03em]">
              One price per person.
            </h2>
            <p className="mt-6 font-display text-6xl font-bold tracking-tight">${price}</p>
            <p className="mt-1 text-[15px] text-slate-muted">{plan?.price_note ?? 'per user / month, billed yearly'}</p>
            <ul className="mt-7 space-y-3">
              {(plan?.features ?? []).map((f) => (
                <li key={f} className="flex gap-3 text-[15px]">
                  <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-squall" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="self-center">
            <table className="w-full border-collapse text-left">
              <caption className="pb-4 text-left text-[15px] text-slate-muted">What a team pays, billed yearly. Early-access prices may change.</caption>
              <thead>
                <tr className="border-b border-sea/15 text-[14px] text-slate-muted">
                  <th scope="col" className="py-3 font-semibold">Team size</th>
                  <th scope="col" className="py-3 text-right font-semibold">Per month</th>
                  <th scope="col" className="py-3 text-right font-semibold">Per year</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map((n) => (
                  <tr key={n} className="border-b border-sea/10">
                    <th scope="row" className="py-4 font-display text-[20px] font-semibold">{n} people</th>
                    <td className="py-4 text-right text-[17px]">${(n * price).toLocaleString('en-US')}</td>
                    <td className="py-4 text-right text-[17px] font-semibold">${(n * price * 12).toLocaleString('en-US')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link href="/early-access?plan=business" className="btn-primary mt-8">
              {plan?.cta_label ?? 'Get Business'}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="biz-faq" className="border-t border-sea/10 bg-white py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <h2 id="biz-faq" className="max-w-[12ch] text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.03em]">
            Business questions.
          </h2>
          <Faq items={FAQS} />
        </div>
      </section>

      {/* Final call */}
      <section aria-labelledby="biz-cta" className="bg-squall py-24 text-white lg:py-32">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <h2 id="biz-cta" className="max-w-[14ch] text-[clamp(2.25rem,4.6vw,4rem)] font-bold leading-[1] tracking-[-0.03em]">
            Bring your team on board.
          </h2>
          <div>
            <p className="mb-6 max-w-[40ch] text-[17px] leading-relaxed text-white/90">
              Leave your email and we will tell you when Business opens for your team.
            </p>
            <LeadForm source="business" dark />
          </div>
        </div>
      </section>
    </>
  );
}
