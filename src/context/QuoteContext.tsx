'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type Prefill = {
  productSlug?: string;
  topic?: string;
  message?: string;
};

type QuoteContextValue = {
  open: boolean;
  prefill: Prefill;
  openQuote: (prefill?: Prefill) => void;
  closeQuote: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<Prefill>({});

  const openQuote = useCallback((p: Prefill = {}) => {
    setPrefill(p);
    setOpen(true);
  }, []);
  const closeQuote = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ open, prefill, openQuote, closeQuote }), [open, prefill, openQuote, closeQuote]);
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used inside <QuoteProvider>');
  return ctx;
}
