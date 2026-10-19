type Row = { label: string; values: (string | number)[]; emphasize?: boolean };

type Props = {
  columns: string[]; // first column header is label column, following are compared items
  rows: Row[];
  caption?: string;
};

export function ComparisonTable({ columns, rows, caption }: Props) {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {columns.map((c, i) => (
                <th
                  key={i}
                  className={`border-b border-ink-300 py-2 text-left font-medium text-ink-900 ${
                    i === 0 ? 'pr-4' : 'px-3'
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={r.emphasize ? 'bg-brand-50/50' : ''}>
                <td className="border-b border-ink-100 py-2.5 pr-4 font-medium text-ink-900">{r.label}</td>
                {r.values.map((v, j) => (
                  <td key={j} className="border-b border-ink-100 px-3 py-2.5 text-ink-700">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs italic text-ink-500">{caption}</figcaption>
      )}
    </figure>
  );
}
