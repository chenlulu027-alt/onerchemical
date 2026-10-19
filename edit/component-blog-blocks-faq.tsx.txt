export type FAQItem = { question: string; answer: string };

type Props = { items: FAQItem[]; heading?: string; id?: string };

export function FAQ({ items, heading = 'Frequently asked questions', id }: Props) {
  return (
    <section className="my-12">
      {heading && (
        <h2 id={id} className="mb-6 font-serif text-2xl font-normal text-ink-900">
          {heading}
        </h2>
      )}
      <dl className="divide-y divide-ink-100 border-y border-ink-100">
        {items.map((item, i) => (
          <details key={i} className="group py-4">
            <summary className="flex cursor-pointer items-start justify-between gap-4 text-[15px] font-medium text-ink-900 marker:hidden">
              <span>{item.question}</span>
              <span className="mt-0.5 shrink-0 text-ink-500 transition group-open:rotate-45">+</span>
            </summary>
            <div className="mt-3 text-[15px] leading-relaxed text-ink-700">{item.answer}</div>
          </details>
        ))}
      </dl>
    </section>
  );
}
