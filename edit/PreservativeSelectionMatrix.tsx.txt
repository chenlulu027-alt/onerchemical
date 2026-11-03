'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Row = {
  archetype: string;
  phRange: string;
  typicalPackaging: string;
  recommendedSystem: string;
  useLevel: string;
  notes: string;
  deepLink?: { href: string; label: string };
};

const ROWS: Row[] = [
  {
    archetype: 'Leave-on skincare serum',
    phRange: 'pH 4.0–6.0',
    typicalPackaging: 'Airless pump, 30–50 ml',
    recommendedSystem: 'Phenoxyethanol 0.7% + Ethylhexylglycerin 0.3%',
    useLevel: '1.0% total',
    notes: 'Pre-blended PE+EHG at 1.0% gives the same effect with simpler QC.',
    deepLink: {
      href: '/blog/phenoxyethanol-ethylhexylglycerin-combination',
      label: 'PE+EHG combination economics',
    },
  },
  {
    archetype: 'O/W cream / lotion',
    phRange: 'pH 5.0–6.5',
    typicalPackaging: 'Jar or tube, 50–150 ml',
    recommendedSystem: 'Phenoxyethanol 0.8% + EHG 0.3% + EDTA 0.05%',
    useLevel: '1.15% total + chelator',
    notes:
      'Oil phase 15–25% partitions preservative — raise dose by 10–15% vs toner at same pH.',
    deepLink: {
      href: '/blog/how-to-preserve-cosmetic-emulsion',
      label: 'Full emulsion preservation protocol',
    },
  },
  {
    archetype: 'Rinse-off cleanser / shampoo',
    phRange: 'pH 5.0–7.0',
    typicalPackaging: 'Bottle with cap, 200–500 ml',
    recommendedSystem: '1,2-Hexanediol 2.0% + Caprylhydroxamic Acid 0.1%',
    useLevel: '2.1% total',
    notes:
      'Non-Annex V hurdle system — supports preservative-free label claim where market permits.',
    deepLink: {
      href: '/blog/1-2-hexanediol-technical-guide',
      label: '1,2-Hexanediol applications',
    },
  },
  {
    archetype: 'Wet wipes',
    phRange: 'pH 4.5–6.0',
    typicalPackaging: 'Flow pack with reseal',
    recommendedSystem: 'Phenoxyethanol 0.9% + EHG 0.4% + Caprylyl Glycol 0.3%',
    useLevel: '1.6% total',
    notes:
      'Nonwoven substrate adsorbs 15–25% of preservative — Challenge Test on finished wipe, not bulk fluid.',
  },
  {
    archetype: 'Baby skincare (leave-on)',
    phRange: 'pH 5.0–6.5',
    typicalPackaging: 'Tube or pump, 100–200 ml',
    recommendedSystem: '1,2-Hexanediol SG 2.5% + Caprylyl Glycol 0.3%',
    useLevel: '2.8% total',
    notes:
      'SG grade with ≥99.5% 1,2-isomer purity. Must pass ISO 11930 Criterion A.',
    deepLink: {
      href: '/blog/1-2-hexanediol-supplier-guide',
      label: 'SG vs TG sourcing decision',
    },
  },
  {
    archetype: 'Eye-area formula',
    phRange: 'pH 5.5–7.0',
    typicalPackaging: 'Airless pump, 15–20 ml',
    recommendedSystem:
      'Caprylhydroxamic Acid 0.1% + Caprylyl Glycol 0.4% + Glyceryl Caprylate 0.3%',
    useLevel: '0.8% total (Spectrastat archetype)',
    notes: 'pH-flexible hurdle system. Criterion A required by SCCS for eye-area.',
    deepLink: {
      href: '/blog/caprylhydroxamic-acid-technical-guide',
      label: 'CHA + Spectrastat decoder',
    },
  },
  {
    archetype: 'Anhydrous balm / oil',
    phRange: 'n/a (A_w &lt; 0.6)',
    typicalPackaging: 'Jar or stick',
    recommendedSystem: 'Antioxidant only (Tocopherol 0.1–0.5%) — no preservative required',
    useLevel: 'Preservation not required',
    notes:
      'Confirm with water-activity measurement at batch release. If any humectant pulls A_w above 0.75, add preservative.',
  },
];

type Filter = 'all' | 'leave-on' | 'rinse-off' | 'sensitive';

export default function PreservativeSelectionMatrix() {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return ROWS;
    if (filter === 'leave-on')
      return ROWS.filter((r) =>
        /serum|cream|lotion|balm|baby|eye/i.test(r.archetype),
      );
    if (filter === 'rinse-off')
      return ROWS.filter((r) => /cleanser|shampoo|wipes/i.test(r.archetype));
    return ROWS.filter((r) => /baby|eye/i.test(r.archetype));
  }, [filter]);

  const btnBase =
    'px-3 py-1.5 text-sm font-semibold rounded-md border transition cursor-pointer';
  const btnCls = (f: Filter) =>
    `${btnBase} ${
      filter === f
        ? 'bg-indigo-600 text-white border-indigo-600'
        : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400'
    }`;

  return (
    <div className="my-6">
      <div className="flex flex-wrap gap-2 mb-4">
        <button type="button" className={btnCls('all')} onClick={() => setFilter('all')}>
          All formula types
        </button>
        <button type="button" className={btnCls('leave-on')} onClick={() => setFilter('leave-on')}>
          Leave-on
        </button>
        <button type="button" className={btnCls('rinse-off')} onClick={() => setFilter('rinse-off')}>
          Rinse-off
        </button>
        <button type="button" className={btnCls('sensitive')} onClick={() => setFilter('sensitive')}>
          Sensitive / Baby / Eye-area
        </button>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="text-left p-3 font-semibold">Formula archetype</th>
              <th className="text-left p-3 font-semibold">pH range</th>
              <th className="text-left p-3 font-semibold">Recommended system</th>
              <th className="text-left p-3 font-semibold">Use level</th>
              <th className="text-left p-3 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr
                key={r.archetype}
                className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
              >
                <td className="p-3 align-top font-semibold text-slate-900">
                  {r.archetype}
                  <div className="text-xs font-normal text-slate-500 mt-1">
                    {r.typicalPackaging}
                  </div>
                </td>
                <td className="p-3 align-top text-slate-700">{r.phRange}</td>
                <td className="p-3 align-top text-slate-700">{r.recommendedSystem}</td>
                <td className="p-3 align-top text-slate-700">{r.useLevel}</td>
                <td className="p-3 align-top text-slate-600 text-xs">
                  {r.notes}
                  {r.deepLink && (
                    <div className="mt-2">
                      <Link
                        href={r.deepLink.href}
                        className="text-indigo-700 font-semibold underline"
                      >
                        {r.deepLink.label} &rarr;
                      </Link>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 mt-3">
        Starting points only — your specific pH, surfactant mix, oil phase % and packaging
        will shift optimal dose by &plusmn;20%. Validate every system with ISO 11930 Challenge
        Test.
      </p>
    </div>
  );
}
