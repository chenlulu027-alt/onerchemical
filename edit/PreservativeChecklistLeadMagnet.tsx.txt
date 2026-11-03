'use client';

import { useState, FormEvent } from 'react';

type State = 'idle' | 'submitting' | 'success' | 'error';

export default function PreservativeChecklistLeadMagnet() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('submitting');
    setMessage('');
    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          company,
          resource: 'preservative-procurement-checklist',
          source: 'pillar-01-cosmetic-preservatives',
        }),
      });
      if (!res.ok) throw new Error('submit failed');
      setState('success');
      setMessage(
        'Check your inbox — the checklist PDF is on its way. If it does not arrive within 10 minutes, check spam or email yang@onerchemical.com.',
      );
    } catch {
      setState('error');
      setMessage(
        'Something went wrong. You can also download the checklist directly at /downloads/onerchemical-preservative-procurement-checklist.pdf',
      );
    }
  };

  if (state === 'success') {
    return (
      <div className="my-5 p-5 bg-emerald-50 border-2 border-emerald-300 rounded-xl">
        <div className="text-emerald-900 font-semibold">Checklist sent.</div>
        <p className="text-sm text-emerald-800 m-0 mt-2">{message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="my-5 p-5 md:p-6 bg-slate-900 text-white rounded-xl grid gap-4"
    >
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-amber-300 mb-1">
          Free download &middot; 1-page PDF
        </div>
        <div className="text-lg font-bold leading-snug">
          Preservative Procurement Readiness Checklist
        </div>
        <p className="text-sm text-slate-300 m-0 mt-1">
          14 documentation fields and verification steps your supplier must satisfy before you
          place a 100 kg+ order.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          className="px-3 py-2 rounded-md text-slate-900 border border-slate-300"
          disabled={state === 'submitting'}
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company (optional)"
          className="px-3 py-2 rounded-md text-slate-900 border border-slate-300"
          disabled={state === 'submitting'}
        />
      </div>
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="justify-self-start px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-md transition disabled:opacity-50"
      >
        {state === 'submitting' ? 'Sending…' : 'Email me the checklist'}
      </button>
      {state === 'error' && <p className="text-sm text-amber-200 m-0">{message}</p>}
      <p className="text-xs text-slate-400 m-0">
        We email the PDF once. No marketing sequence, no sharing of your email. If you want
        pricing on 100 kg+ orders, reply to the delivery email.
      </p>
    </form>
  );
}
