import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'How we handle your data',
  description:
    'A plain-language account of what Typhoonpost stores, what it logs, who processes your data, and how you can export or delete it.',
  alternates: { canonical: '/privacy' },
  openGraph: { url: `${SITE.url}/privacy`, title: 'How Typhoonpost handles your data' },
};

const SECTIONS = [
  {
    id: 'store',
    title: 'What we store',
    body: [
      'Your account: your email address and a hashed password, plus your signature and settings.',
      'Your mail, contacts and calendar events, so the app can show them to you.',
      'If you join the early-access list on this website, the email address you enter and which page you entered it on.',
    ],
  },
  {
    id: 'log',
    title: 'What we log',
    body: [
      'Typhoonpost does not record which messages you open, what you search for, or which links you click.',
      'Our own functions that fetch images and send mail do not write the addresses or contents they handle to logs.',
      'The hosting platforms we rely on keep their own operational logs, such as request times and error records, and we do not control their contents. Those logs are for running the service, not for profiling you.',
    ],
  },
  {
    id: 'trackers',
    title: 'Trackers and images in incoming mail',
    body: [
      'Remote images are blocked until you choose to load them, and known tracking pixels are removed. If you load images, they are fetched through our server so the sender sees our server, not your IP address or browser. The sender can still tell that an image was requested.',
      'Tracking parameters are removed from links in the message. Links whose text points at one site while going to another are flagged before you open them.',
    ],
  },
  {
    id: 'processors',
    title: 'Who else handles your data',
    body: [
      'Supabase hosts our database and sign-in. Resend sends and receives mail on our behalf. Both process your data only to provide the service.',
      'We do not sell your data and we do not build advertising profiles from your messages.',
    ],
  },
  {
    id: 'encryption',
    title: 'What is not protected yet',
    body: [
      'Connections are encrypted with TLS. Stored mail is protected by access rules in the database, but it is not end-to-end or zero-access encrypted. That means the people who operate the service could technically reach stored mail. We do not read it, but you should not have to rely on that promise alone, which is why encryption that removes our access is our next major project.',
    ],
  },
  {
    id: 'control',
    title: 'Your control',
    body: [
      'Two-factor sign-in with an authenticator app is optional and enforced by the database when you turn it on.',
      'In Settings you can download everything we hold for you as one file at any time.',
      'In Settings you can delete your account. This removes your mail, contacts, events and profile, not just your access to them.',
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
            { '@type': 'ListItem', position: 2, name: 'Privacy', item: `${SITE.url}/privacy` },
          ],
        }}
      />
      <section className="container-x pb-12 pt-16 lg:pt-24">
        <h1 className="max-w-[18ch] text-[clamp(2.5rem,5.6vw,4.5rem)] font-bold leading-[1] tracking-[-0.035em]">
          How we handle your data.
        </h1>
        <p className="mt-6 max-w-[54ch] text-[18px] leading-relaxed text-slate-ink">
          This is a plain-language summary of what Typhoonpost stores, logs and shares. Typhoonpost is in early access, so this page describes what the service does today and we will update it as that changes.
        </p>
      </section>

      <section aria-label="Data handling" className="container-x pb-24">
        <div className="max-w-[68ch] space-y-14">
          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id}>
              <h2 className="font-display text-[26px] font-bold leading-snug tracking-[-0.02em]">{s.title}</h2>
              <div className="mt-4 space-y-4">
                {s.body.map((p) => (
                  <p key={p} className="text-[17px] leading-relaxed text-slate-ink">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
          <p className="text-[17px] leading-relaxed text-slate-ink">
            For the protections in the app itself, see <Link href="/security" className="font-semibold text-sea underline underline-offset-4">security</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
