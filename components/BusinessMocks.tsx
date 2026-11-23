import { Check, Globe, Plus } from 'lucide-react';
import { Avatar, Window } from './Mocks';

const PEOPLE = [
  { name: 'Maya Okafor', email: 'maya@harborandpine.example', role: 'Admin' },
  { name: 'Dev Patel', email: 'dev@harborandpine.example', role: 'Member' },
  { name: 'Noor Haddad', email: 'noor@harborandpine.example', role: 'Member' },
  { name: 'Ana Lima', email: 'ana@harborandpine.example', role: 'Member' },
  { name: 'Sam Reid', email: 'sam@harborandpine.example', role: 'Member' },
];

/** Hero: the team's people on their own domain. Sized to sit where the inbox sits on the home page. */
export function TeamMock({ tall = false }: { tall?: boolean }) {
  return (
    <Window label="A team directory on a company domain, with roles and an Add person button" className={tall ? 'lg:flex lg:min-h-[518px] lg:flex-col' : ''}>
      <div className="flex items-center justify-between border-b border-sea/10 bg-fog/60 px-5 py-3.5">
        <div>
          <p className="font-display text-[16px] font-bold">Harbor &amp; Pine</p>
          <p className="text-[12.5px] text-slate-muted">harborandpine.example · 5 people</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-squall px-3 py-1.5 text-[12px] font-semibold text-white">
          <Plus size={13} aria-hidden="true" /> Add person
        </span>
      </div>
      {PEOPLE.map((p, i) => (
        <div key={p.email} className={`flex items-center gap-3.5 px-5 py-4 ${i ? 'border-t border-sea/5' : ''}`}>
          <Avatar name={p.name} i={i} size={38} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14.5px] font-semibold">{p.name}</p>
            <p className="truncate text-[13px] text-slate-muted">{p.email}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${p.role === 'Admin' ? 'bg-squall-soft text-squall-dark' : 'bg-fog text-slate-ink'}`}>
            {p.role}
          </span>
        </div>
      ))}
      <div className="mt-auto border-t border-sea/10 bg-fog/60 px-5 py-4 text-[13px] text-slate-ink">
        Ana joined this morning. Her mailbox was ready in one step.
      </div>
    </Window>
  );
}

/** Domain setup: records you add once, each marked as checked. */
export function DomainMock() {
  const rows = [
    ['MX', 'Receives your mail'],
    ['SPF', 'Says who may send as you'],
    ['DKIM', 'Signs every message you send'],
  ];
  return (
    <Window label="Domain setup showing three DNS records, each verified">
      <div className="flex items-center gap-3 border-b border-sea/10 bg-fog/60 px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-squall-soft text-squall">
          <Globe size={18} aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-[16px] font-bold">harborandpine.example</p>
          <p className="text-[12.5px] text-slate-muted">Ready to send and receive</p>
        </div>
      </div>
      {rows.map(([k, v], i) => (
        <div key={k} className={`flex items-center gap-4 px-5 py-4 ${i ? 'border-t border-sea/5' : ''}`}>
          <span className="w-14 font-display text-[14px] font-bold">{k}</span>
          <span className="flex-1 text-[14px] text-slate-ink">{v}</span>
          <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1F5E4E]">
            <Check size={15} aria-hidden="true" /> Verified
          </span>
        </div>
      ))}
    </Window>
  );
}

const HOURS = ['9', '10', '11', '12', '1', '2', '3'];
const BUSY: Record<string, number[]> = {
  'Maya Okafor': [0, 1, 4],
  'Dev Patel': [1, 2, 5],
  'Noor Haddad': [0, 3, 4],
  'Ana Lima': [2, 6],
};

/** Shared calendar: find the slot everyone has free. */
export function TeamCalendarMock() {
  return (
    <Window label="Four colleagues' availability across the day with one shared free slot highlighted">
      <div className="grid grid-cols-[110px_repeat(7,1fr)] border-b border-sea/10 bg-fog/60 text-center text-[12px] font-semibold text-slate-muted">
        <span className="py-3 text-left pl-5">Thu 27</span>
        {HOURS.map((h) => (
          <span key={h} className="py-3">{h}</span>
        ))}
      </div>
      {Object.entries(BUSY).map(([name, busy], r) => (
        <div key={name} className={`grid grid-cols-[110px_repeat(7,1fr)] items-center ${r ? 'border-t border-sea/5' : ''}`}>
          <span className="truncate py-3 pl-5 text-[13px] font-semibold">{name.split(' ')[0]}</span>
          {HOURS.map((h, c) => (
            <span key={h} className="px-0.5 py-2">
              <span className={`block h-7 rounded ${busy.includes(c) ? 'bg-squall-soft' : c === 3 ? 'bg-[#FFF1D1] ring-1 ring-signal' : 'bg-transparent'}`} />
            </span>
          ))}
        </div>
      ))}
      <p className="border-t border-sea/10 bg-fog/60 px-5 py-4 text-[13px] text-slate-ink">
        <span className="font-semibold">12:00</span> is the one hour all four are free.
      </p>
    </Window>
  );
}

/** People changes: a starter gets a mailbox, a leaver loses access. */
export function AccessMock() {
  return (
    <Window label="Two changes to the team: a new starter with a ready mailbox and a leaver whose access has ended">
      <div className="flex items-center gap-4 px-5 py-5">
        <Avatar name="Ana Lima" i={3} size={42} />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold">Ana Lima</p>
          <p className="text-[13px] text-slate-muted">Starts Monday</p>
        </div>
        <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1F5E4E]">
          <Check size={15} aria-hidden="true" /> Mailbox ready
        </span>
      </div>
      <div className="flex items-center gap-4 border-t border-sea/5 px-5 py-5">
        <span className="opacity-50">
          <Avatar name="Tom Weir" i={4} size={42} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-slate-muted line-through">Tom Weir</p>
          <p className="text-[13px] text-slate-muted">Left on Friday</p>
        </div>
        <span className="text-[13px] font-semibold text-slate-muted">Access ended</span>
      </div>
      <p className="border-t border-sea/10 bg-fog/60 px-5 py-4 text-[13px] text-slate-ink">
        Admins manage who has a mailbox. They cannot read anyone’s mail.
      </p>
    </Window>
  );
}
