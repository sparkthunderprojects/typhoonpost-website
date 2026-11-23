/**
 * Site content. Read from the Supabase tables `site_features`, `site_plans` and `site_faqs`
 * (edit them in the Supabase dashboard to change the website without a deploy; pages refresh
 * every few minutes). If the database is unreachable the built-in copy below is used, so the
 * site always renders.
 */

export interface Feature {
  section: 'feature' | 'security';
  eyebrow: string;
  title: string;
  body: string;
  icon: string;
  sort_order: number;
}

export interface Plan {
  slug: string;
  name: string;
  tagline: string;
  price_monthly: number;
  price_note: string;
  cta_label: string;
  highlighted: boolean;
  features: string[];
  sort_order: number;
}

export interface Faq {
  question: string;
  answer: string;
  sort_order: number;
}

const REVALIDATE_SECONDS = 300;

async function rest<T>(table: string, fallback: T[]): Promise<T[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return fallback;
  try {
    const res = await fetch(`${url}/rest/v1/${table}?select=*&order=sort_order.asc`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return fallback;
    const data = (await res.json()) as T[];
    return Array.isArray(data) && data.length > 0 ? data : fallback;
  } catch {
    return fallback;
  }
}

export const getFeatures = () => rest<Feature>('site_features', FALLBACK_FEATURES);
export const getPlans = () => rest<Plan>('site_plans', FALLBACK_PLANS);
export const getFaqs = () => rest<Faq>('site_faqs', FALLBACK_FAQS);

const FALLBACK_FEATURES: Feature[] = [
  { section: 'feature', eyebrow: 'Mail', title: 'An inbox that stays out of your way', body: 'Focused and Other sorting, flags, snooze and categories keep the messages that matter on top, so you can get through your day instead of through your inbox.', icon: 'inbox', sort_order: 1 },
  { section: 'feature', eyebrow: 'Calendar', title: 'Your schedule, one click from your mail', body: 'Turn a conversation into a meeting without leaving the page. Day, week and month views live right next to your inbox.', icon: 'calendar', sort_order: 2 },
  { section: 'feature', eyebrow: 'People', title: 'Contacts that know who you talk to', body: 'Frequent contacts, groups and stars are built in, and sender cards show you the person behind every message.', icon: 'users', sort_order: 3 },
  { section: 'feature', eyebrow: 'Speed', title: 'Fast enough to feel instant', body: 'Realtime delivery, a command palette and full keyboard shortcuts mean most actions take a keystroke, not a trip through menus.', icon: 'zap', sort_order: 4 },
  { section: 'security', eyebrow: 'Private by default', title: 'Your mail is yours alone', body: 'Every message is locked to your account at the database level. Other users and other tenants can never read it, even by accident.', icon: 'lock', sort_order: 1 },
  { section: 'security', eyebrow: 'Safe to open', title: 'Hostile HTML gets stripped', body: 'Incoming messages are sanitised before they are displayed, so scripts, tracking tricks and unsafe links do not get a chance to run.', icon: 'shield', sort_order: 2 },
  { section: 'security', eyebrow: 'Trusted delivery', title: 'Authenticated sending', body: 'Mail goes out through verified SPF and DKIM on your own domain, which keeps your messages out of junk folders.', icon: 'badge', sort_order: 3 },
  { section: 'security', eyebrow: 'No ad business', title: 'We sell mailboxes, not attention', body: 'There is no ad profile built from your messages. Typhoonpost is paid for by the people who use it.', icon: 'eye', sort_order: 4 },
  { section: 'security', eyebrow: 'Your domain', title: 'Custom domains for your team', body: 'Bring your own domain and give everyone a professional address that you control.', icon: 'globe', sort_order: 5 },
  { section: 'security', eyebrow: 'Transparent', title: 'Open about how it works', body: 'Plain-language policies and a public roadmap, so you always know what is happening with your data.', icon: 'file', sort_order: 6 },
];

const FALLBACK_PLANS: Plan[] = [
  { slug: 'starter', name: 'Starter', tagline: 'For individuals trying Typhoonpost', price_monthly: 0, price_note: 'Free during early access', cta_label: 'Join early access', highlighted: false, features: ['1 mailbox on typhoonpost.com', 'Mail, calendar and contacts', '5 GB storage', 'Community support'], sort_order: 1 },
  { slug: 'business', name: 'Business', tagline: 'For small teams that live in email', price_monthly: 6, price_note: 'per user / month, billed yearly', cta_label: 'Start free trial', highlighted: true, features: ['Custom domain', 'Shared and team calendars', '50 GB storage per user', 'Priority email support', 'Admin console'], sort_order: 2 },
  { slug: 'enterprise', name: 'Enterprise', tagline: 'For organisations with extra requirements', price_monthly: 14, price_note: 'per user / month, billed yearly', cta_label: 'Talk to us', highlighted: false, features: ['Everything in Business', 'Unlimited aliases', 'Audit logs and retention rules', 'SSO and directory sync', 'Dedicated success manager'], sort_order: 3 },
];

const FALLBACK_FAQS: Faq[] = [
  { question: 'What is Typhoonpost?', answer: 'Typhoonpost is a modern email, calendar and contacts workspace. It is built for people who want the polish of the big suites without the clutter or the ads.', sort_order: 1 },
  { question: 'Is it ready to use today?', answer: 'Typhoonpost is in early access. You can create an account, send and receive mail, and use the calendar and contacts while we finish the remaining features.', sort_order: 2 },
  { question: 'Can I use my own domain?', answer: 'Yes. Business plans let you use your own domain, with sending authenticated through SPF and DKIM.', sort_order: 3 },
  { question: 'Who can read my email?', answer: 'Only you. Messages are stored per account with database-level access rules, and nobody else on the platform can open them.', sort_order: 4 },
  { question: 'Do you show ads or sell my data?', answer: 'No. Typhoonpost does not build ad profiles from your messages and does not sell your data.', sort_order: 5 },
  { question: 'Can I move over from another provider?', answer: 'Import tools are on the roadmap. In the meantime you can forward mail from your old address while you switch over.', sort_order: 6 },
  { question: 'How much does it cost?', answer: 'Starter is free during early access. Business and Enterprise plans are billed per user, and you can see the details on the pricing page.', sort_order: 7 },
];
