import { Clock, Search, Star } from 'lucide-react';
import type { ReactNode } from 'react';

/** Product windows drawn in HTML so they stay sharp, load instantly and can be indexed. */

function Window({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`overflow-hidden rounded-2xl border border-sea/10 bg-white shadow-window ${className}`}
    >
      {children}
    </div>
  );
}

const AVATARS = ['bg-[#0F6CBD]', 'bg-[#2E7D6B]', 'bg-[#B4572E]', 'bg-[#6B4FA0]', 'bg-[#33607A]'];

function Avatar({ name, i, size = 34 }: { name: string; i: number; size?: number }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white ${AVATARS[i % AVATARS.length]}`}
      style={{ width: size, height: size }}
    >
      {name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)}
    </span>
  );
}

const MESSAGES = [
  { from: 'Maya Okafor', subject: 'Q4 launch checklist', preview: 'Final pass on the rollout plan is attached…', time: '9:41', unread: true },
  { from: 'Studio Ledger', subject: 'Invoice 2291 is ready', preview: 'Your invoice for November is attached…', time: '9:12', unread: true },
  { from: 'Dev Patel', subject: 'Re: Rollout timing', preview: 'Thursday works. I will move the review…', time: '8:30', unread: false },
  { from: 'Harbor & Pine', subject: 'Your itinerary for Lisbon', preview: 'Flights, hotel and the airport transfer…', time: 'Mon', unread: false },
  { from: 'Noor Haddad', subject: 'Lunch Thursday?', preview: 'There is a new place by the river…', time: 'Mon', unread: false },
];

/** Hero: the whole inbox. */
export function InboxMock({ className = '' }: { className?: string }) {
  return (
    <Window label="The Typhoonpost inbox showing a list of messages and a message being read" className={className}>
      <div className="flex items-center gap-3 border-b border-sea/10 bg-fog/60 px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-squall text-white">
          <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
            <path d="M7 11.5c3.5-3.5 11-4 14.5-.5 2.8 2.8 2.2 7-1 8.6-2.6 1.3-5.6.3-6.4-2-.6-1.8.6-3.4 2.3-3.5M25 20.5c-3.5 3.5-11 4-14.5.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          </svg>
        </span>
        <div className="flex h-8 flex-1 items-center gap-2 rounded-md border border-sea/10 bg-white px-3 text-[13px] text-slate-muted">
          <Search size={14} aria-hidden="true" /> Search mail
        </div>
        <span className="hidden rounded-md bg-squall px-3 py-1.5 text-[12px] font-semibold text-white sm:block">New mail</span>
      </div>
      <div className="grid grid-cols-[1fr] sm:grid-cols-[46%_54%]">
        <div className="border-sea/10 sm:border-r">
          <div className="flex gap-4 border-b border-sea/10 px-4 pt-3 text-[13px] font-semibold">
            <span className="border-b-2 border-squall pb-2 text-squall">Focused</span>
            <span className="pb-2 text-slate-muted">Other</span>
          </div>
          {MESSAGES.map((m, i) => (
            <div
              key={m.subject}
              className={`flex gap-3 px-4 py-3 ${i === 0 ? 'bg-squall-soft/70' : ''} ${i > 0 ? 'border-t border-sea/5' : ''}`}
            >
              <Avatar name={m.from} i={i} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className={`truncate text-[13.5px] ${m.unread ? 'font-bold' : 'font-medium'}`}>{m.from}</p>
                  <span className="shrink-0 text-[11.5px] text-slate-muted">{m.time}</span>
                </div>
                <p className={`truncate text-[13px] ${m.unread ? 'font-semibold text-squall' : 'text-slate-ink'}`}>{m.subject}</p>
                <p className="truncate text-[12.5px] text-slate-muted">{m.preview}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden p-5 sm:block">
          <p className="font-display text-[18px] font-bold leading-snug">Q4 launch checklist</p>
          <div className="mt-3 flex items-center gap-3">
            <Avatar name="Maya Okafor" i={0} size={38} />
            <div>
              <p className="text-[13.5px] font-semibold">Maya Okafor</p>
              <p className="text-[12px] text-slate-muted">to me, Dev Patel</p>
            </div>
          </div>
          <div className="mt-4 space-y-2.5 text-[13px] leading-relaxed text-slate-ink">
            <p>Hi team, the final pass on the rollout plan is attached.</p>
            <p>Three things still need an owner before Thursday: the status page copy, the support macros and the customer email.</p>
            <p>Can each of you reply with the one you are taking?</p>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-sea/10 bg-fog/60 px-3 py-2 text-[12.5px] font-medium">
            <span className="h-6 w-6 rounded bg-[#C6453A]" aria-hidden="true" />
            rollout-plan-q4.pdf
          </div>
        </div>
      </div>
    </Window>
  );
}

/** Mail feature: focused sorting + snooze. */
export function FocusMock() {
  return (
    <Window label="Focused and Other tabs with a snooze menu open on a message">
      <div className="flex gap-4 border-b border-sea/10 px-5 pt-4 text-[14px] font-semibold">
        <span className="border-b-2 border-squall pb-2.5 text-squall">Focused</span>
        <span className="pb-2.5 text-slate-muted">Other</span>
      </div>
      <div className="relative">
        {MESSAGES.slice(0, 4).map((m, i) => (
          <div key={m.subject} className={`flex items-center gap-3 px-5 py-3.5 ${i ? 'border-t border-sea/5' : ''}`}>
            <Avatar name={m.from} i={i} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold">{m.from}</p>
              <p className="truncate text-[13px] text-slate-muted">{m.subject}</p>
            </div>
            {i === 1 && <Star size={16} className="fill-signal text-signal" aria-hidden="true" />}
            <span className="text-[12px] text-slate-muted">{m.time}</span>
          </div>
        ))}
        <div className="absolute right-5 top-14 w-52 rounded-xl border border-sea/10 bg-white p-1.5 shadow-lift">
          <p className="flex items-center gap-2 px-3 py-2 text-[12.5px] font-semibold text-slate-muted">
            <Clock size={14} aria-hidden="true" /> Snooze until
          </p>
          {['Later today, 4:00 PM', 'Tomorrow, 8:00 AM', 'This weekend', 'Next week'].map((t, i) => (
            <p key={t} className={`rounded-lg px-3 py-2 text-[13px] ${i === 1 ? 'bg-squall-soft font-semibold text-squall' : ''}`}>
              {t}
            </p>
          ))}
        </div>
      </div>
    </Window>
  );
}

const DAYS = ['Mon 24', 'Tue 25', 'Wed 26', 'Thu 27', 'Fri 28'];
const EVENTS = [
  { day: 0, top: 18, h: 26, label: 'Team stand-up', c: 'bg-squall-soft text-squall-dark border-squall' },
  { day: 1, top: 40, h: 34, label: 'Design review', c: 'bg-[#E3F2EC] text-[#1F5E4E] border-[#2E7D6B]' },
  { day: 2, top: 12, h: 22, label: 'Launch sync', c: 'bg-squall-soft text-squall-dark border-squall' },
  { day: 2, top: 58, h: 28, label: 'Lunch with Noor', c: 'bg-[#FFF1D1] text-[#7A5200] border-signal' },
  { day: 3, top: 30, h: 40, label: 'Customer call', c: 'bg-[#EEE8F7] text-[#4B3480] border-[#6B4FA0]' },
  { day: 4, top: 22, h: 24, label: 'Planning', c: 'bg-squall-soft text-squall-dark border-squall' },
];

export function CalendarMock() {
  return (
    <Window label="A week view of the Typhoonpost calendar with meetings">
      <div className="grid grid-cols-5 border-b border-sea/10 bg-fog/60 text-center text-[12.5px] font-semibold">
        {DAYS.map((d, i) => (
          <p key={d} className={`py-3 ${i === 2 ? 'text-squall' : 'text-slate-ink'}`}>
            {d}
          </p>
        ))}
      </div>
      <div className="relative grid h-72 grid-cols-5">
        {DAYS.map((d, i) => (
          <div key={d} className={`relative ${i ? 'border-l border-sea/5' : ''}`}>
            {[1, 2, 3, 4].map((n) => (
              <span key={n} className="absolute inset-x-0 border-t border-sea/5" style={{ top: `${n * 20}%` }} />
            ))}
            {EVENTS.filter((e) => e.day === i).map((e) => (
              <div
                key={e.label}
                className={`absolute inset-x-1.5 overflow-hidden rounded-md border-l-[3px] px-2 py-1 text-[11.5px] font-semibold leading-tight ${e.c}`}
                style={{ top: `${e.top}%`, height: `${e.h}%` }}
              >
                {e.label}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Window>
  );
}

export function PeopleMock() {
  return (
    <Window label="A contact card with details and group tags">
      <div className="grid sm:grid-cols-[42%_58%]">
        <div className="border-sea/10 sm:border-r">
          {['Maya Okafor', 'Dev Patel', 'Noor Haddad', 'Studio Ledger'].map((n, i) => (
            <div key={n} className={`flex items-center gap-3 px-4 py-3 ${i === 0 ? 'bg-squall-soft/70' : ''} ${i ? 'border-t border-sea/5' : ''}`}>
              <Avatar name={n} i={i} size={32} />
              <p className="truncate text-[13.5px] font-semibold">{n}</p>
            </div>
          ))}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4">
            <Avatar name="Maya Okafor" i={0} size={56} />
            <div>
              <p className="font-display text-[18px] font-bold">Maya Okafor</p>
              <p className="text-[13px] text-slate-muted">Head of Operations, Harbor &amp; Pine</p>
            </div>
          </div>
          <dl className="mt-5 space-y-3 text-[13.5px]">
            <div>
              <dt className="text-[12px] text-slate-muted">Email</dt>
              <dd className="font-medium">maya@harborandpine.example</dd>
            </div>
            <div>
              <dt className="text-[12px] text-slate-muted">Phone</dt>
              <dd className="font-medium">+44 20 7946 0321</dd>
            </div>
          </dl>
          <div className="mt-5 flex gap-2">
            {['Work', 'Frequent', 'Starred'].map((g) => (
              <span key={g} className="rounded-full bg-fog px-3 py-1 text-[12px] font-semibold text-slate-ink">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}

export function PaletteMock() {
  const rows = [
    { t: 'New mail', k: 'N' },
    { t: 'Go to Calendar', k: 'G C' },
    { t: 'Switch to dark theme', k: 'T' },
    { t: 'Search mail', k: '/' },
  ];
  return (
    <Window label="The command palette listing quick actions and their keyboard shortcuts">
      <div className="bg-sea-2 px-6 py-8">
        <div className="mx-auto max-w-sm overflow-hidden rounded-xl bg-white shadow-lift">
          <div className="flex items-center gap-2 border-b border-sea/10 px-4 py-3 text-[14px]">
            <Search size={15} aria-hidden="true" className="text-slate-muted" />
            <span className="font-medium">Type a command</span>
            <span className="ml-0.5 h-4 w-px animate-pulse bg-squall" aria-hidden="true" />
          </div>
          {rows.map((r, i) => (
            <div key={r.t} className={`flex items-center justify-between px-4 py-2.5 text-[13.5px] ${i === 0 ? 'bg-squall-soft font-semibold text-squall-dark' : ''}`}>
              <span>{r.t}</span>
              <kbd className="rounded border border-sea/15 bg-fog px-1.5 py-0.5 font-sans text-[11.5px] font-semibold text-slate-ink">{r.k}</kbd>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}

export function MockFor({ icon }: { icon: string }) {
  switch (icon) {
    case 'inbox':
      return <FocusMock />;
    case 'calendar':
      return <CalendarMock />;
    case 'users':
      return <PeopleMock />;
    default:
      return <PaletteMock />;
  }
}
