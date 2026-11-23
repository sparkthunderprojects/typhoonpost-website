import type { Metadata } from 'next';
import { LeadForm } from '@/components/LeadForm';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Get early access',
  description: 'Join the Typhoonpost early access list and get a mailbox on typhoonpost.com as soon as your invite is ready.',
  alternates: { canonical: '/early-access' },
  openGraph: { url: `${SITE.url}/early-access`, title: 'Get early access to Typhoonpost' },
};

const PLANS = new Set(['starter', 'business', 'enterprise']);

export default async function EarlyAccessPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams;
  const source = plan && PLANS.has(plan) ? plan : 'website';

  return (
    <section className="container-x grid min-h-[70vh] items-center gap-12 py-20 lg:grid-cols-2 lg:gap-24">
      <div>
        <h1 className="max-w-[14ch] text-[clamp(2.5rem,5.4vw,4.25rem)] font-bold leading-[1] tracking-[-0.035em]">
          Get your mailbox on typhoonpost.com.
        </h1>
        <p className="mt-6 max-w-[44ch] text-[18px] leading-relaxed text-slate-ink">
          Early access is free. Leave your email and we will send your invite as soon as your spot opens.
        </p>
      </div>
      <div>
        <LeadForm source={source} />
        <p className="mt-4 pl-2 text-[14px] text-slate-muted">
          Already have an account?{' '}
          <a href={SITE.appUrl} className="font-semibold text-squall underline-offset-4 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </section>
  );
}
