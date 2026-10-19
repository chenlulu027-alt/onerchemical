'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useQuote } from '@/context/QuoteContext';

export function QuoteModal() {
  const { open, prefill, closeQuote } = useQuote();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuote();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeQuote]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');
    setErrMsg('');

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Request failed (${res.status})`);
      }
      setStatus('ok');
      form.reset();
    } catch (err: unknown) {
      setStatus('err');
      setErrMsg(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Request a sample"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={closeQuote}
        >
          <motion.div
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <h2 className="font-serif text-xl text-ink-900">Request a sample</h2>
              <button
                type="button"
                onClick={closeQuote}
                aria-label="Close"
                className="text-ink-500 hover:text-ink-900"
              >
                ✕
              </button>
            </div>

            {status === 'ok' ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md bg-brand-50 p-4 text-sm text-brand-900"
              >
                Thanks — your request is in. We reply within one business day.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" name="_hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <input type="hidden" name="productSlug" defaultValue={prefill.productSlug ?? ''} />
                <input type="hidden" name="topic" defaultValue={prefill.topic ?? ''} />

                <Field label="Name" name="name" required />
                <Field label="Company" name="company" required />
                <Field label="Business email" name="email" type="email" required />
                <Field label="Country" name="country" required />
                <div>
                  <label className="mb-1 block text-sm text-ink-700" htmlFor="message">
                    What you&apos;re looking for
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    defaultValue={prefill.message ?? ''}
                    className="w-full rounded-md border border-ink-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
                    required
                  />
                </div>

                {status === 'err' && (
                  <p className="text-sm text-red-700">{errMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-md bg-brand-800 px-4 py-2 text-sm text-white transition hover:bg-brand-900 disabled:opacity-60"
                >
                  {submitting ? 'Sending…' : 'Send request'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm text-ink-700" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-ink-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
      />
    </div>
  );
}
