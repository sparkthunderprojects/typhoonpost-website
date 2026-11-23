'use client';

import { useActionState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { joinEarlyAccess, type LeadState } from '@/app/early-access/actions';

const INITIAL: LeadState = { status: 'idle', message: '' };

export function LeadForm({ source = 'website', dark = false }: { source?: string; dark?: boolean }) {
  const [state, action, pending] = useActionState(joinEarlyAccess, INITIAL);

  if (state.status === 'ok') {
    return (
      <p
        role="status"
        className={`flex items-start gap-3 rounded-2xl p-5 text-[16px] font-medium ${dark ? 'bg-white/15 text-white' : 'bg-white text-sea shadow-lift'}`}
      >
        <CheckCircle2 className="mt-0.5 shrink-0 text-signal" size={22} aria-hidden="true" />
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${source}`}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          aria-invalid={state.status === 'error'}
          aria-describedby={state.status === 'error' ? `err-${source}` : undefined}
          className="h-[50px] flex-1 rounded-full border border-sea/20 bg-white px-6 text-[16px] text-sea placeholder:text-slate-muted/70 focus-visible:border-squall"
        />
        <input type="hidden" name="source" value={source} />
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button type="submit" disabled={pending} className={`${dark ? 'btn-light' : 'btn-primary'} h-[50px] disabled:opacity-60`}>
          {pending ? 'Joining…' : 'Get early access'}
        </button>
      </div>
      <p
        id={`err-${source}`}
        role="alert"
        className={`mt-3 min-h-5 pl-2 text-[14px] ${state.status === 'error' ? (dark ? 'text-white' : 'text-[#B3261E]') : ''}`}
      >
        {state.status === 'error' ? state.message : ''}
      </p>
    </form>
  );
}
