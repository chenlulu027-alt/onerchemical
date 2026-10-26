'use client';

type Verdict = 'ok' | 'caution' | 'avoid';

interface Row {
  preservative: string;
  anionic: Verdict;
  nonionic: Verdict;
  cationic: Verdict;
  silicone: Verdict;
  note: string;
}

const ROWS: Row[] = [
  {
    preservative: 'Phenoxyethanol',
    anionic: 'caution',
    nonionic: 'ok',
    cationic: 'ok',
    silicone: 'ok',
    note: 'Partitions into non-ionic micelles above 4% emulsifier — raise aqueous-phase target by 15–25%.',
  },
  {
    preservative: 'Ethylhexylglycerin (EHG)',
    anionic: 'caution',
    nonionic: 'ok',
    cationic: 'ok',
    silicone: 'ok',
    note: 'Boosts phenoxyethanol by weakening microbial membranes; sensitive to anionic charge density.',
  },
  {
    preservative: '1,2-Hexanediol',
    anionic: 'ok',
    nonionic: 'ok',
    cationic: 'ok',
    silicone: 'ok',
    note: 'Solvent-type behaviour — broadly compatible, but weak against Pseudomonas alone.',
  },
  {
    preservative: 'Caprylhydroxamic Acid (CHA)',
    anionic: 'caution',
    nonionic: 'ok',
    cationic: 'ok',
    silicone: 'ok',
    note: 'Chelator-type action; competes with EDTA for divalent cations — use Phytate instead.',
  },
  {
    preservative: 'Sodium Benzoate',
    anionic: 'ok',
    nonionic: 'ok',
    cationic: 'avoid',
    silicone: 'ok',
    note: 'Cations flip the salt to free benzoic acid — crashes out and loses coverage.',
  },
  {
    preservative: 'Potassium Sorbate',
    anionic: 'ok',
    nonionic: 'ok',
    cationic: 'avoid',
    silicone: 'ok',
    note: 'Same salt-swap failure mode as benzoate in cationic systems.',
  },
  {
    preservative: 'Dehydroacetic Acid (DHA)',
    anionic: 'ok',
    nonionic: 'ok',
    cationic: 'caution',
    silicone: 'ok',
    note: 'DHA sodium salt behaves like benzoate; free DHA (via benzyl alcohol carrier) is more tolerant.',
  },
  {
    preservative: 'Chlorphenesin',
    anionic: 'ok',
    nonionic: 'ok',
    cationic: 'ok',
    silicone: 'ok',
    note: 'The go-to auxiliary when the base is cationic (BTMS, Behentrimonium Chloride).',
  },
  {
    preservative: 'Benzyl Alcohol',
    anionic: 'ok',
    nonionic: 'ok',
    cationic: 'ok',
    silicone: 'caution',
    note: 'Can soften some elastomer gels at >0.5%; test with your silicone network.',
  },
];

function VerdictPill({ v }: { v: Verdict }) {
  const map: Record<Verdict, { label: string; cls: string }> = {
    ok: {
      label: 'OK',
      cls: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200',
    },
    caution: {
      label: 'Caution',
      cls: 'bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200',
    },
    avoid: {
      label: 'Avoid',
      cls: 'bg-rose-100 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200',
    },
  };
  const { label, cls } = map[v];
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${cls}`}>
      {label}
    </span>
  );
}

export default function EmulsifierCompatibilityGrid() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
        Preservative × Emulsifier Compatibility Grid — Onerchemical
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left">
              <th className="border-b border-slate-200 dark:border-slate-800 p-2">Preservative</th>
              <th className="border-b border-slate-200 dark:border-slate-800 p-2">Anionic<br /><span className="text-xs font-normal text-slate-500">GSE, soap</span></th>
              <th className="border-b border-slate-200 dark:border-slate-800 p-2">Non-ionic<br /><span className="text-xs font-normal text-slate-500">Olivem, Montanov</span></th>
              <th className="border-b border-slate-200 dark:border-slate-800 p-2">Cationic<br /><span className="text-xs font-normal text-slate-500">BTMS, Beh. Cl</span></th>
              <th className="border-b border-slate-200 dark:border-slate-800 p-2">Silicone<br /><span className="text-xs font-normal text-slate-500">PEG-10 dim.</span></th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.preservative} className="align-top">
                <td className="border-b border-slate-100 dark:border-slate-900 p-2">
                  <p className="font-medium">{r.preservative}</p>
                  <p className="text-xs text-slate-500 mt-1">{r.note}</p>
                </td>
                <td className="border-b border-slate-100 dark:border-slate-900 p-2"><VerdictPill v={r.anionic} /></td>
                <td className="border-b border-slate-100 dark:border-slate-900 p-2"><VerdictPill v={r.nonionic} /></td>
                <td className="border-b border-slate-100 dark:border-slate-900 p-2"><VerdictPill v={r.cationic} /></td>
                <td className="border-b border-slate-100 dark:border-slate-900 p-2"><VerdictPill v={r.silicone} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Verdicts reflect general-case behaviour at typical emulsion loads (3–6% emulsifier, 15–25% oil). High-load specialty systems may shift — request a sample pack for your specific base.
      </p>
    </div>
  );
}
