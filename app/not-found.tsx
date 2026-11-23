import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-x py-32">
      <h1 className="max-w-[14ch] text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1] tracking-[-0.035em]">
        That page has blown away.
      </h1>
      <p className="mt-6 max-w-[44ch] text-[18px] leading-relaxed text-slate-ink">
        The link may be old or mistyped. Head back to the home page and try again.
      </p>
      <Link href="/" className="btn-primary mt-9">
        Back to home
      </Link>
    </section>
  );
}
