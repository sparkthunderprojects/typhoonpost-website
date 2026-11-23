import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { getFeatures } from '@/lib/content';
import { SITE } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Security and privacy',
  description:
    'How Typhoonpost protects your email: account-level isolation, sanitised message display, authenticated sending with SPF and DKIM, and no ad profiling.',
  alternates: { canonical: '/security' },
  openGraph: { url: `${SITE.url}/security`, title: 'Typhoonpost security and privacy' },
};

const DETAILS = [
  {
    title: 'Isolation enforced by the database',
    body: 'Each message, contact and calendar event belongs to one account. Access rules run inside the database itself, so even a bug in the app cannot hand one customer another customer\'s mail.',
  },
  {
    title: 'Messages are cleaned before they are shown',
    body: 'HTML in incoming mail is sanitised in your browser before display. Scripts, embedded forms and unsafe links are removed so a hostile message cannot act on your behalf.',
  },
  {
    title: 'Mail that proves where it came from',
    body: 'Outgoing mail is signed with DKIM and sent from servers authorised by SPF on your domain. Receivers can verify it really came from you, which protects your reputation and your recipients.',
  },
  {
    title: 'Encrypted in transit',
    body: 'Connections between your browser, the application and the database use TLS, so messages cannot be read or altered on the way.',
  },
] as const;

export default async function SecurityPage() {
  const features = (await getFeatures()).filter((f) => f.section === 'security');

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
            { '@type': 'ListItem', position: 2, name: 'Security', item: `${SITE.url}/security` },
          ],
        }}
      />
      <section className="container-x pb-16 pt-16 lg:pt-24">
        <h1 className="max-w-[16ch] text-[clamp(2.5rem,5.6vw,4.5rem)] font-bold leading-[1] tracking-[-0.035em]">
          Built so only you can read your mail.
        </h1>
        <p className="mt-6 max-w-[54ch] text-[18px] leading-relaxed text-slate-ink">
          Your inbox is the key to your accounts, your clients and your calendar. Here is how Typhoonpost keeps it protected.
        </p>
      </section>

      <section aria-label="How it works" className="container-x pb-24">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-sea/10 bg-sea/10 md:grid-cols-2">
          {DETAILS.map((d) => (
            <div key={d.title} className="bg-white p-8 lg:p-10">
              <h2 className="font-display text-[22px] font-bold leading-snug">{d.title}</h2>
              <p className="mt-3 max-w-[48ch] text-[16px] leading-relaxed text-slate-ink">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="principles" className="bg-sea py-24 text-white">
        <div className="container-x">
          <h2 id="principles" className="max-w-[16ch] text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.03] tracking-[-0.03em]">
            What we promise.
          </h2>
          <ul className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {features.map((s) => (
              <li key={s.title} className="flex gap-5">
                <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/8 text-signal">
                  <Icon name={s.icon} size={22} />
                </span>
                <div>
                  <h3 className="font-display text-[20px] font-semibold">{s.title}</h3>
                  <p className="mt-2 max-w-[44ch] text-[16px] leading-relaxed text-white/68">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
