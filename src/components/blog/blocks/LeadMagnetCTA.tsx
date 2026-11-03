// Replaces: src/components/blog/blocks/LeadMagnetCTA.tsx
// Backward-compatible update: adds `topic` to the POST body sent to /api/lead-magnet.
// Pillar #1 / #2 pass topic as a tracking slug (e.g. "preservative-selection", "preservative-sourcing")
// — the updated route defaults these to procurement checklist, unchanged from current behaviour.
// Pillar #3 passes topic="regulatory" and gets the 5-market compliance checklist.
//
// If Albar's current LeadMagnetCTA already POSTs { email, topic }, this is a no-op; diff before replacing.

'use client';

import { useState } from 'react';

interface LeadMagnetCTAProps {
  title: string;
  body: string;
  cta?: string;
  topic?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function LeadMagnetCTA({
  title,
  body,
  cta = 'Request a technical dossier',
  topic,
}: LeadMagnetCTAProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, topic: topic ?? 'procurement' }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? 'Request failed');
      }
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Request failed');
    }
  }

  if (status === 'success') {
    return (
      <aside className="my-8 rounded-xl border border-emerald-300 bg-emerald-50 p-6">
        <p className="text-base font-semibold text-emerald-900">Checklist sent.</p>
        <p className="mt-1 text-sm text-emerald-800">
          Check your inbox in the next minute. If it does not arrive, check spam, or reply to any Onerchemical email and we will send it manually.
        </p>
      </aside>
    );
  }

  return (
    <aside className="my-8 rounded-xl border border-indigo-200 bg-indigo-50 p-6">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">Free download</p>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mb-4 text-sm text-slate-700">{body}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="lead-magnet-email" className="sr-only">
          Email address
        </label>
        <input
          id="lead-magnet-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourcompany.com"
          className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          disabled={status === 'submitting'}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : cta}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-xs text-red-700">{errorMsg}</p>
      )}
      <p className="mt-3 text-xs text-slate-500">
        One checklist, no newsletter spam. You can unsubscribe by replying &ldquo;unsubscribe&rdquo; to any Onerchemical email.
      </p>
    </aside>
  );
}
