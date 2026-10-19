type Props = { data: unknown | unknown[] };

/**
 * Server component — inlines JSON-LD safely. Accepts a single object
 * or an array. Each object becomes its own <script type="application/ld+json">.
 */
export function JsonLd({ data }: Props) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify is enough; schema data is trusted (never user input)
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
