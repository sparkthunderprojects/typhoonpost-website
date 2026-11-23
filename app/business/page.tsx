import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Eye, Lock, Search, ShieldCheck, Globe, FileText, BadgeCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { Isobars } from '@/components/Isobars';
import { InboxMock } from '@/components/Mocks';
import { Faq } from '@/components/Faq';
import { LeadForm } from '@/components/LeadForm';
import { JsonLd } from '@/components/JsonLd';
import { TeamCost } from '@/components/TeamCost';
import { getPlans } from '@/lib/content';
import { SITE } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Typhoonpost Business',
  description: 'Private email and calendar for teams: your own domain, shared calendars, an admin console and priority support, billed per user.',
  alternates: { canonical: '/business' },
  openGraph: { url: `${SITE.url}/business`, title: 'Typhoonpost Business' },
};

/* ---------- Feature tiles: a small drawing of the feature on a dark panel, text below ---------- */

type Status = 'now' | 'soon';

function Tile({ visual, title, body, status }: { visual: ReactNode; title: string; body: string; status: Status }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-lift">
      <div aria-hidden="true" className="flex h-44 items-center justify-center bg-sea-2 px-6">
        {visual}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p
          className={`mb-3 w-fit rounded-full px-3 py-1 text-[12px] font-bold ${
            status === 'now' ? 'bg-squall-soft text-squall-dark' : 'bg-signal/25 text-[#7A5200]'
          }`}
        >
          {status === 'now' ? 'Available now' : 'Coming for Business'}
        </p>
        <h3 className="text-[19px] font-bold leading-tight tracking-[-0.01em]">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-ink">{body}</p>
      </div>
    </article>
  );
}

const chip = 'rounded-lg bg-white/10 px-3 py-2 text-[13px] text-white';

const VisualDomain = (
  <div className="w-full max-w-[230px] space-y-3">
    <div className="flex -space-x-2">
      {['MO', 'DP', 'NH', 'AL'].map((i, k) => (
        <span key={i} className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-sea-2 text-[11px] font-bold text-white ${['bg-[#0F6CBD]', 'bg-[#2E7D6B]', 'bg-[#B4572E]', 'bg-[#6B4FA0]'][k]}`}>
          {i}
        </span>
      ))}
    </div>
    <div className={`${chip} flex items-center gap-2`}>
      <Globe size={16} className="text-signal" /> maya@yourcompany.com
    </div>
  </div>
);
const VisualCalendar = (
  <div className="w-full max-w-[240px] space-y-2">
    <div className="rounded-lg border-l-4 border-signal bg-white/10 px-3 py-2 text-[13px] text-white">
      Weekly sync<span className="block text-[12px] text-white/60">Thu 10:00, 4 people</span>
    </div>
    <div className="rounded-lg border-l-4 border-squall bg-white/10 px-3 py-2 text-[13px] text-white">
      Launch review<span className="block text-[12px] text-white/60">Fri 14:00, Design team</span>
    </div>
  </div>
);
const VisualAdmin = (
  <div className="w-full max-w-[250px] space-y-2">
    {[['maya@yourcompany.com', 'Admin'], ['dev@yourcompany.com', 'User'], ['noor@yourcompany.com', 'User']].map(([e, r]) => (
      <div key={e} className={`${chip} flex items-center justify-between gap-3`}>
        <span className="truncate">{e}</span>
        <span className="rounded bg-white/15 px-2 py-0.5 text-[11px]">{r}</span>
      </div>
    ))}
  </div>
);
const VisualInbox = (
  <div className="w-full max-w-[250px] space-y-2">
    <div className="flex gap-4 text-[13px] font-semibold text-white">
      <span className="border-b-2 border-signal pb-1">Focused</span>
      <span className="text-white/50">Other</span>
    </div>
    {['Q4 launch checklist', 'Invoice 2291 is ready'].map((s) => (
      <div key={s} className={chip}>{s}</div>
    ))}
  </div>
);
const VisualTracker = (
  <div className="flex items-center gap-4 text-white">
    <Eye size={44} className="text-white/40" />
    <div className="space-y-1 text-[13px]">
      <p className="font-semibold">3 trackers blocked</p>
      <p className="text-white/60">Images hidden until you choose</p>
    </div>
  </div>
);
const VisualTwoFactor = (
  <div className="text-center text-white">
    <div className="flex gap-1.5">
      {['4', '8', '1', '·', '·', '·'].map((d, i) => (
        <span key={i} className="flex h-10 w-8 items-center justify-center rounded-lg bg-white/10 font-display text-lg font-bold">{d}</span>
      ))}
    </div>
    <p className="mt-3 text-[13px] text-white/60">Code from your authenticator app</p>
  </div>
);
const VisualTasks = (
  <div className="w-full max-w-[230px] space-y-2">
    {[['Send the rollout plan', true], ['Review invoices', false], ['Book offsite', false]].map(([t, d]) => (
      <div key={String(t)} className={`${chip} flex items-center gap-3`}>
        <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${d ? 'border-signal bg-signal' : 'border-white/50'}`}>
          {d ? <Check size={10} className="text-sea" /> : null}
        </span>
        <span className={d ? 'text-white/50 line-through' : ''}>{String(t)}</span>
      </div>
    ))}
  </div>
);
const VisualSearch = (
  <div className="w-full max-w-[240px] space-y-2">
    <div className={`${chip} flex items-center gap-2`}>
      <Search size={14} /> invoice november
    </div>
    <div className={chip}>Invoice 2291 is ready</div>
    <p className="text-[12px] text-white/55">Searched on this device. Nothing sent to us.</p>
  </div>
);

const FEATURES = [
  { visual: VisualDomain, title: 'Make the business truly yours', body: 'Everyone sends and receives as name@yourcompany.com, with sending authenticated through SPF and DKIM.', status: 'soon' },
  { visual: VisualCalendar, title: 'Shared and team calendars', body: 'See when colleagues are free and book a meeting from the conversation that started it.', status: 'soon' },
  { visual: VisualAdmin, title: 'One place to manage people', body: 'Add a new starter or close a leaver from an admin console, so access follows your team as it changes.', status: 'soon' },
  { visual: VisualInbox, title: 'An inbox that stays calm', body: 'Focused and Other sorting, flags and snooze keep important mail on top and the rest out of the way.', status: 'now' },
  { visual: VisualTracker, title: 'Trackers blocked, links cleaned', body: 'Senders cannot see when your team opens mail, and tracking is stripped from every link.', status: 'now' },
  { visual: VisualTwoFactor, title: 'Two-factor sign-in', body: 'An authenticator code on top of the password, enforced by the database itself.', status: 'now' },
  { visual: VisualTasks, title: 'Tasks beside your mail', body: 'My Day, due dates and notes sit next to the inbox, so follow-ups do not live in a separate app.', status: 'now' },
  { visual: VisualSearch, title: 'Search that stays on your device', body: 'Search runs in the browser over mail it has already decrypted. Your queries never reach our servers.', status: 'now' },
] as const;

const SECURITY = [
  { icon: Lock, title: 'Isolated accounts', body: 'Every message, contact and event belongs to one account. Access rules run inside the database, so one customer cannot open another’s mail.' },
  { icon: ShieldCheck, title: 'Two-factor sign-in', body: 'Turn on one-time codes from any authenticator app. A stolen password alone cannot open a mailbox.' },
  { icon: Eye, title: 'Tracker and image blocking', body: 'Remote images stay hidden until chosen, and loaded images are fetched through our server, so senders never see your team’s IP addresses.' },
  { icon: FileText, title: 'Your data, your call', body: 'Export all mail, contacts and calendar as one file. Deleting an account removes the data, not just the access.' },
  { icon: BadgeCheck, title: 'No ad business', body: 'We sell mailboxes, not attention. There is no ad profile built from your team’s messages.' },
  { icon: Search, title: 'Plain about the limits', body: 'We publish what is and is not encrypted today, including that outside mail passes through our sending provider.' },
] as const;

const FAQS = [
  { question: 'What do I get with Business?', answer: 'Everything in Personal, plus your own domain, shared and team calendars, an admin console, 50 GB of storage per user and priority email support.' },
  { question: 'Is Business available today?', answer: 'Typhoonpost is in early access. The features marked Available now work today. Custom domains, shared calendars and the admin console are being built, and joining the list tells us your team is waiting for them.' },
  { question: 'What does it cost?', answer: 'Business is billed per user, per month, billed yearly. Use the calculator above for your team size. The early-access price may change before general availability.' },
  { question: 'Can admins read my team’s mail?', answer: 'The admin console is for adding and removing people, not for reading mail. We will publish exactly what admins can and cannot see before Business opens.' },
  { question: 'Can we move over from Microsoft 365 or Google Workspace?', answer: 'Import tools are on the roadmap. Until then, forward mail from the old address while your team switches over.' },
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-sea text-white">
        <Isobars className="pointer-events-none absolute inset-0 h-full w-full opacity-30" />
        <div className="container-x relative pb-20 pt-16 text-center lg:pb-28 lg:pt-24">
          <p className="text-[15px] font-semibold text-signal">Typhoonpost Business</p>
          <h1 className="mx-auto mt-4 max-w-[16ch] text-[clamp(2.6rem,6vw,5rem)] font-bold leading-[1] tracking-[-0.035em]">
            Private email for your whole team.
          </h1>
          <p className="mx-auto mt-6 max-w-[52ch] text-[19px] leading-relaxed text-white/75">
            Mail, calendar and tasks on your own domain, with trackers blocked, no ads and one admin console for the people on your team.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/early-access?plan=business" className="btn-light">
              {plan?.cta_label ?? 'Get Business'}
            </Link>
            <Link href="/pricing" className="btn-ghost-dark">
              See pricing
            </Link>
          </div>
          <p className="mt-5 text-[14px] text-white/55">
            In early access. Features marked “Available now” work today; the rest are on the way.
          </p>
          <div className="mx-auto mt-14 max-w-[960px] text-left text-sea">
            <InboxMock />
          </div>
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="biz-features" className="py-24 lg:py-32">
        <div className="container-x">
          <h2 id="biz-features" className="mx-auto max-w-[22ch] text-center text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.03em]">
            Everything your team needs to stay private and productive.
          </h2>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <Tile key={f.title} visual={f.visual} title={f.title} body={f.body} status={f.status} />
            ))}
          </div>
        </div>
      </section>

      {/* Cost */}
      <section className="bg-sea py-20 lg:py-28">
        <div className="container-x">
          <TeamCost pricePerUser={price} />
        </div>
      </section>

      {/* Security */}
      <section aria-labelledby="biz-security" className="py-24 lg:py-32">
        <div className="container-x">
          <h2 id="biz-security" className="mx-auto max-w-[20ch] text-center text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.03em]">
            A secure foundation for business email.
          </h2>
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SECURITY.map(({ icon: I, title, body }) => (
              <li key={title} className="rounded-3xl border border-sea/10 bg-white p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-squall-soft text-squall">
                  <I size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[19px] font-bold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-ink">{body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <Link href="/security" className="font-semibold text-squall underline-offset-4 hover:underline">
              Read the full security page
            </Link>
          </p>
        </div>
      </section>

      {/* Switching */}
      <section aria-labelledby="biz-switch" className="border-y border-sea/10 bg-white py-20">
        <div className="container-x grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <h2 id="biz-switch" className="max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              Moving from another provider?
            </h2>
            <p className="mt-4 max-w-[50ch] text-[17px] leading-relaxed text-slate-ink">
              Import tools for Microsoft 365 and Google Workspace are on the roadmap. Until they ship, forward mail from your old address while your team switches over, and tell us which provider you use so we build that one first.
            </p>
          </div>
          <div>
            <Link href="/early-access?plan=business" className="btn-primary">
              Join the Business list
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="biz-faq" className="py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <h2 id="biz-faq" className="max-w-[12ch] text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.03em]">
            Business questions.
          </h2>
          <Faq items={FAQS} />
        </div>
      </section>

      {/* Final call */}
      <section aria-labelledby="biz-cta" className="bg-squall py-24 text-white">
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
