import type { Metadata } from 'next';
import { AudiencePage, type AudienceContent } from '@/components/AudiencePage';
import { getPlans } from '@/lib/content';
import { SITE } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Typhoonpost Business',
  description: 'Private email for teams: your own domain, shared calendars, an admin console and priority support, billed per user.',
  alternates: { canonical: '/business' },
  openGraph: { url: `${SITE.url}/business`, title: 'Typhoonpost Business' },
};

const CONTENT: AudienceContent = {
  slug: 'business',
  headline: 'Private email for your whole team.',
  intro: 'Business gives every person on your team a mailbox on your own domain, with shared calendars and one place to add and remove people. Same privacy protections as Personal, built for teams.',
  sections: [
    { icon: 'globe', title: 'Your own domain', body: 'Everyone sends and receives as name@yourcompany.com, with sending authenticated through SPF and DKIM so your mail is trusted.' },
    { icon: 'calendar', title: 'Shared and team calendars', body: 'See when colleagues are free and book meetings from the conversation that started them.' },
    { icon: 'badge', title: 'Admin console', body: 'Add a new starter or close a leaver in one place, so access follows your team as it changes.' },
    { icon: 'lock', title: 'Privacy for every mailbox', body: 'Trackers are blocked, links are cleaned and two-factor sign-in is available for every person on the team.' },
  ],
  faqs: [
    { question: 'What do I get with Business?', answer: 'Everything in Personal, plus your own domain, shared and team calendars, an admin console, 50 GB of storage per user and priority email support.' },
    { question: 'What does it cost?', answer: 'Business is billed per user, per month, billed yearly. The early-access price is shown on this page and may change before general availability.' },
    { question: 'Is Business available today?', answer: 'Typhoonpost is in early access. Custom domains, shared calendars and the admin console are not live yet. Join the list and we will tell you when your team can start.' },
    { question: 'Can admins read my team’s mail?', answer: 'The admin console is for adding and removing people, not for reading mail. We will publish exactly what admins can and cannot see before Business opens.' },
  ],
  other: { href: '/personal', label: 'See Personal for one person' },
  ctaTitle: 'Bring your team on board.',
};

export default async function BusinessPage() {
  const plan = (await getPlans()).find((p) => p.slug === 'business');
  return <AudiencePage content={CONTENT} plan={plan} />;
}
