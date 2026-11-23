'use server';

export interface LeadState {
  status: 'idle' | 'ok' | 'error';
  message: string;
}

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const SOURCES = new Set(['website', 'home', 'starter', 'business', 'enterprise']);

export async function joinEarlyAccess(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Honeypot: real people never fill this in.
  if (String(formData.get('company') ?? '').length > 0) {
    return { status: 'ok', message: "You're on the list. We'll email you when your invite is ready." };
  }

  const email = String(formData.get('email') ?? '').trim();
  const rawSource = String(formData.get('source') ?? 'website');
  const source = SOURCES.has(rawSource) ? rawSource : 'website';

  if (!EMAIL.test(email) || email.length > 254) {
    return { status: 'error', message: 'Enter a valid email address, like name@example.com.' };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return { status: 'error', message: 'Sign-ups are not available right now. Please try again soon.' };
  }

  try {
    const res = await fetch(`${url}/rest/v1/site_leads`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ email, source }),
      signal: AbortSignal.timeout(6000),
    });
    // 409 means this address is already on the list, which is the outcome they wanted.
    if (res.ok || res.status === 409) {
      return { status: 'ok', message: "You're on the list. We'll email you when your invite is ready." };
    }
    return { status: 'error', message: 'We could not save your email. Please try again in a moment.' };
  } catch {
    return { status: 'error', message: 'We could not reach the server. Check your connection and try again.' };
  }
}
