'use client';

import { useState } from 'react';

type Mode = 'cosmetic' | 'deodorant';

const DATA: Record<
  Mode,
  {
    label: string;
    role: string;
    useLevel: string;
    pairedWith: string;
    regulatoryFrame: string;
    coaFocus: string;
    challengeTest: string;
  }
> = {
  cosmetic: {
    label: 'Cosmetic (serum / lotion / cleanser)',
    role: 'Preservative booster — lowers true-preservative MIC',
    useLevel: '0.3–1.0%',
    pairedWith: 'Phenoxyethanol / 1,2-Hexanediol / CHA / Benzyl Alcohol',
    regulatoryFrame: 'EU: skin conditioning agent (NOT Annex V). SCCS 1618/20 references 1.0% as safe band.',
    coaFocus: 'GC purity ≥ 99.0%, 2-ethylhexanol ≤ 0.5%, Hazen ≤ 30, water ≤ 0.5%',
    challengeTest: 'ISO 11930 of the finished formula (true preservative + EHG combination)',
  },
  deodorant: {
    label: 'Deodorant / antiperspirant (stick / roll-on)',
    role: 'Primary antimicrobial against Corynebacterium / S. epidermidis',
    useLevel: '1.0–3.0%',
    pairedWith: 'Standalone, or with Triethyl Citrate / Zinc Ricinoleate for odour neutralisation',
    regulatoryFrame: 'EU: deodorant active (NOT Annex V). Japan: antiperspirant &gt; threshold = quasi-drug (MHLW).',
    coaFocus: 'Same CoA parameters; plus odour re-test on each batch (sensory QC)',
    challengeTest: 'In-use antimicrobial efficacy against axillary microflora (brand-specific protocol)',
  },
};

export default function EHGUseCaseSplitter() {
  const [mode, setMode] = useState<Mode>('cosmetic');
  const d = DATA[mode];

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="flex border-b border-slate-200">
        {(['cosmetic', 'deodorant'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={
              'flex-1 px-4 py-3 text-sm font-medium transition-colors ' +
              (mode === m
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50')
            }
            aria-pressed={mode === m}
          >
            {DATA[m].label}
          </button>
        ))}
      </div>
      <dl className="divide-y divide-slate-100 text-sm">
        <Row label="Primary role">{d.role}</Row>
        <Row label="Typical use level">{d.useLevel}</Row>
        <Row label="Pairs with">{d.pairedWith}</Row>
        <Row label="Regulatory frame">
          <span dangerouslySetInnerHTML={{ __html: d.regulatoryFrame }} />
        </Row>
        <Row label="CoA focus">{d.coaFocus}</Row>
        <Row label="Efficacy test">{d.challengeTest}</Row>
      </dl>
      <p className="px-4 py-3 text-xs text-slate-500 border-t border-slate-100 bg-slate-50">
        Toggle use-case to see how dose, pairing, regulation, and CoA focus shift. Mixing the two mental models is the most common EHG formulator error.
      </p>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4 px-4 py-3">
      <dt className="font-medium text-slate-700">{label}</dt>
      <dd className="text-slate-600">{children}</dd>
    </div>
  );
}
