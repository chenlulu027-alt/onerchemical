'use client';

import { useQuote } from '@/context/QuoteContext';

type Props = {
  title: string;
  body: string;
  cta?: string;
  topic?: string;
};

export function LeadMagnetCTA({ title, body, cta = 'Request a technical dossier', topic }: Props) {
  const { openQuote } = useQuote();
  return (
    <aside className="my-12 rounded-lg bg-paper p-6 md:p-8">
      <h3 className="mb-2 font-serif text-xl text-ink-900">{title}</h3>
      <p className="mb-5 text-[15px] leading-relaxed text-ink-700">{body}</p>
      <button
        type="button"
        onClick={() => openQuote({ topic })}
        className="rounded-md border border-brand-800 bg-white px-5 py-2 text-sm font-medium text-brand-800 hover:bg-brand-800 hover:text-white"
      >
        {cta}
      </button>
    </aside>
  );
}
