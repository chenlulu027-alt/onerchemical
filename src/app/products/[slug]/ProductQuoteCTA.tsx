'use client';

import { useQuote } from '@/context/QuoteContext';

export function ProductQuoteCTA({ slug }: { slug: string }) {
  const { openQuote } = useQuote();
  return (
    <button
      type="button"
      onClick={() => openQuote({ productSlug: slug })}
      className="w-full rounded-md bg-brand-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-900"
    >
      Request sample
    </button>
  );
}
