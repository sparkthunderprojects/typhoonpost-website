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
  { section: 'security', eyebrow: 'Tracker blocking', title: 'Senders cannot see when you open their mail', body: 'Remote images stay hidden until you choose to load them, and known tracking pixels are removed outright. When you do load an image it is fetched through our server, so the sender sees us, not your IP address or browser.', icon: 'eye', sort_order: 1 },
  { section: 'security', eyebrow: 'Clean links', title: 'Tracking is stripped from every link', body: 'Tracking parameters such as utm_ and fbclid are removed from links before you click. If a link says one address but goes to another, we mark it and ask before you open it.', icon: 'shield', sort_order: 2 },
  { section: 'security', eyebrow: 'Two-factor sign-in', title: 'An authenticator code on top of your password', body: 'Turn on a one-time code from any authenticator app. It is enforced by the database itself, so a stolen password alone cannot open your mail.', icon: 'lock', sort_order: 3 },
  { section: 'security', eyebrow: 'Isolated accounts', title: 'Your mail is locked to your account', body: "Every message, contact and event belongs to one account, and access rules run inside the database. A bug in the app cannot hand one customer another customer's mail.", icon: 'badge', sort_order: 4 },
  { section: 'security', eyebrow: 'Your data, your call', title: 'Export everything, delete everything', body: 'Download all your mail, contacts and calendar as one file whenever you like. Deleting your account removes your data, not just your access to it.', icon: 'file', sort_order: 5 },
  { section: 'security', eyebrow: 'No ad business', title: 'We sell mailboxes, not attention', body: 'There is no ad profile built from your messages. Typhoonpost is paid for by the people who use it.', icon: 'globe', sort_order: 6 },
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
  { question: 'Who can read my email?', answer: 'Messages are stored per account behind database-level access rules, so other customers cannot open them, and connections are encrypted with TLS. Today, mail is not yet end-to-end or zero-access encrypted at rest, which means the operators of the service can technically access stored mail. We do not read it, and we are working toward encryption that removes that access. You can read exactly what we log and keep on our privacy page.', sort_order: 4 },
  { question: 'Do you show ads or sell my data?', answer: 'No. Typhoonpost does not build ad profiles from your messages and does not sell your data. Remote images and tracking pixels in incoming mail are blocked by default, and you can export or delete your data at any time.', sort_order: 5 },
  { question: 'Can I move over from another provider?', answer: 'Import tools are on the roadmap. In the meantime you can forward mail from your old address while you switch over.', sort_order: 6 },
  { question: 'How much does it cost?', answer: 'Starter is free during early access. Business and Enterprise plans are billed per user, and you can see the details on the pricing page.', sort_order: 7 },
];
