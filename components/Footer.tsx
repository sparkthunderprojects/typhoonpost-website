import Link from 'next/link';
import { Logo } from './Logo';
import { SITE } from '@/lib/site';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { href: '/#features', label: 'Features' },
      { href: '/security', label: 'Security' },
      { href: '/pricing', label: 'Pricing' },
    ],
  },
  {
    title: 'Get started',
    links: [
      { href: '/early-access', label: 'Early access' },
      { href: SITE.appUrl, label: 'Sign in', external: true },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-sea text-white/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/65">
            Email, calendar and contacts in one calm workspace. Private by default.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="font-display text-[15px] font-semibold text-white">{col.title}</p>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  {'external' in l ? (
                    <a href={l.href} className="text-[15px] text-white/65 transition-colors hover:text-white">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-[15px] text-white/65 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-white/50 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Typhoonpost. All rights reserved.</p>
          <p>Typhoonpost is in early access.</p>
        </div>
      </div>
    </footer>
  );
}
