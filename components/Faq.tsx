import { Plus } from 'lucide-react';
import type { Faq as FaqItem } from '@/lib/content';

/** Native <details> keeps the accordion working without JavaScript and keeps answers in the HTML for crawlers. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-sea/10 border-y border-sea/10">
      {items.map((f) => (
        <details key={f.question} className="group py-1">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left">
            <h3 className="font-display text-[19px] font-semibold leading-snug">{f.question}</h3>
            <Plus size={22} aria-hidden="true" className="faq-plus shrink-0 text-squall transition-transform duration-200" />
          </summary>
          <p className="max-w-[62ch] pb-6 text-[16px] leading-relaxed text-slate-ink">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
