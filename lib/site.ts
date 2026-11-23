export const SITE = {
  name: 'Typhoonpost',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://typhoonpost.com').replace(/\/$/, ''),
  appUrl: (process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.typhoonpost.com').replace(/\/$/, ''),
  title: 'Typhoonpost: private email, calendar and contacts',
  description:
    'Typhoonpost is a private, fast email, calendar and contacts workspace for individuals and teams. Use your own domain, skip the ads and keep your inbox under control.',
} as const;

export const NAV = [
  { href: '/#features', label: 'Features' },
  { href: '/security', label: 'Security' },
  { href: '/pricing', label: 'Pricing' },
] as const;
