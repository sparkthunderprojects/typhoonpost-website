export const SITE = {
  name: 'Typhoonpost',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://typhoonpost.com').replace(/\/$/, ''),
  appUrl: (process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.typhoonpost.com').replace(/\/$/, ''),
  title: 'Typhoonpost: private email, calendar and contacts',
  description:
    'Typhoonpost is a private, fast email, calendar and contacts workspace. Personal is for individuals, Business is for teams with their own domain. No ads, and trackers blocked.',
} as const;

export const NAV = [
  { href: '/#features', label: 'Features' },
  { href: '/personal', label: 'Personal' },
  { href: '/business', label: 'Business' },
  { href: '/security', label: 'Security' },
  { href: '/pricing', label: 'Pricing' },
] as const;
