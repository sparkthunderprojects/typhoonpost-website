import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';
import { NAV, SITE } from '@/lib/site';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-sea/10 bg-fog/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" aria-label="Typhoonpost home" className="rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-slate-ink transition-colors hover:text-squall"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={SITE.appUrl}
            className="px-3 py-2 text-[15px] font-medium text-slate-ink transition-colors hover:text-squall"
          >
            Sign in
          </a>
          <Link href="/early-access" className="btn-primary !py-2.5">
            Get early access
          </Link>
        </div>

        <details className="relative md:hidden">
          <summary
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-sea/15"
            aria-label="Open menu"
          >
            <Menu size={20} aria-hidden="true" />
          </summary>
          <div className="absolute right-0 top-12 w-64 rounded-2xl border border-sea/10 bg-white p-3 shadow-lift">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2.5 text-[15px] font-medium hover:bg-fog"
              >
                {item.label}
              </Link>
            ))}
            <a href={SITE.appUrl} className="block rounded-lg px-3 py-2.5 text-[15px] font-medium hover:bg-fog">
              Sign in
            </a>
            <Link href="/early-access" className="btn-primary mt-2 w-full">
              Get early access
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
