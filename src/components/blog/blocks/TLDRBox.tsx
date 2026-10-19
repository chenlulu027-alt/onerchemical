import type { ReactNode } from 'react';

type Props = { children: ReactNode };

export function TLDRBox({ children }: Props) {
  return (
    <aside className="my-8 rounded-lg border-l-[3px] border-brand-800 bg-brand-50/60 p-5">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-[1.5px] text-brand-900">
        TL;DR
      </div>
      <div className="text-[15px] leading-relaxed text-ink-900 [&>p]:m-0 [&>p+p]:mt-2">{children}</div>
    </aside>
  );
}
