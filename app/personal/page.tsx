import type { Metadata } from 'next';
import { AudiencePage, type AudienceContent } from '@/components/AudiencePage';
import { getPlans } from '@/lib/content';
import { SITE } from '@/lib/site';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Typhoonpost Personal',
  description: 'One private mailbox for you: mail, calendar, contacts and tasks, with trackers blocked and no ads. Free during early access.',
  alternates: { canonical: '/personal' },
  openGraph: { url: `${SITE.url}/personal`, title: 'Typhoonpost Personal' },
};

const CONTENT: AudienceContent = {
  slug: 'personal',
  headline: 'Your own inbox, kept private.',
  intro: 'Personal is one mailbox on typhoonpost.com for one person. Mail, calendar, contacts and tasks sit together, and nobody builds an ad profile from your messages.',
  sections: [
    { icon: 'inbox', title: 'Mail', body: 'Focused and Other sorting, flags and snooze keep the messages that matter on top, so the rest can wait.' },
    { icon: 'eye', title: 'Trackers blocked', body: 'Senders cannot see when you open their mail. Remote images stay hidden until you choose to load them, and tracking is stripped from links.' },
    { icon: 'calendar', title: 'Calendar and tasks', body: 'Day, week and month views, plus a to-do list with My Day, due dates and notes, right next to your inbox.' },
    { icon: 'users', title: 'Contacts', body: 'Frequent contacts, groups and stars are built in, so the person behind every message is one click away.' },
  ],
  faqs: [
    { question: 'What do I get with Personal?', answer: 'One mailbox on typhoonpost.com with mail, calendar, contacts and tasks, 5 GB of storage and the same privacy protections as every Typhoonpost account.' },
    { question: 'What does it cost?', answer: 'Personal is free during early access. Prices may change before general availability, and we will tell you before they do.' },
    { question: 'Can I use my own domain?', answer: 'Not on Personal. Your address is on typhoonpost.com. If you want your own domain, Business includes it.' },
    { question: 'Can I move to Business later?', answer: 'That is the plan. Moving a Personal mailbox to a team is not built yet, so tell us at sign-up if you expect to need it.' },
  ],
  other: { href: '/business', label: 'See Business for teams' },
  ctaTitle: 'Get your own mailbox.',
};

export default async function PersonalPage() {
  const plan = (await getPlans()).find((p) => p.slug === 'personal');
  return <AudiencePage content={CONTENT} plan={plan} />;
}
