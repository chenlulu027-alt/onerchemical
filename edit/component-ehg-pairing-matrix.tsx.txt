'use client';

import { useState } from 'react';

type Verdict = 'ship' | 'consult' | 'refuse';

type Pairing = {
  partner: string;
  commercialName: string;
  verdict: Verdict;
  phRange: string;
  formulationFit: string;
  trueDoseWithEHG: string;
  rationale: string;
};

const PAIRINGS: Pairing[] = [
  {
    partner: 'Phenoxyethanol',
    commercialName: 'Euxyl PE 9010 pattern',
    verdict: 'ship',
    phRange: '3.0–8.0',
    formulationFit: 'Emulsion, serum, lotion, shampoo — broad-spectrum',
    trueDoseWithEHG: 'Phenoxyethanol 0.6–0.9% + EHG 0.5–1.0%',
    rationale: 'MIC against E. coli roughly halves at 0.5% EHG; classic Schülke-published combination.',
  },
  {
    partner: '1,2-Hexanediol',
    commercialName: 'Preservative-free positioning',
    verdict: 'ship',
    phRange: '3.0–9.0',
    formulationFit: 'Serum, emulsion — ideal for “free-from preservatives” claims',
    trueDoseWithEHG: '1,2-Hexanediol 2.0–3.0% + EHG 0.5–0.7%',
    rationale: 'Neither on Annex V; both widen each other’s microbial spectrum (hexanediol favours yeast/mould, EHG lifts bacterial coverage).',
  },
  {
    partner: 'Caprylyl Glycol',
    commercialName: 'Optiphen family',
    verdict: 'ship',
    phRange: '4.0–8.0',
    formulationFit: 'Serum, lotion, roll-on — skin-feel-forward systems',
    trueDoseWithEHG: 'Caprylyl Glycol 0.3–0.5% + EHG 0.3–0.5%',
    rationale: 'Both membrane-active; synergistic against gram-positive bacteria; routinely used as a Phenoxyethanol-free bridge.',
  },
  {
    partner: 'Benzyl Alcohol',
    commercialName: 'Natural-leaning blends',
    verdict: 'ship',
    phRange: '3.0–6.0 (narrow)',
    formulationFit: 'Low-pH toner, essence, natural-positioning serum',
    trueDoseWithEHG: 'Benzyl Alcohol 0.5–1.0% + EHG 0.3–0.5%',
    rationale: 'Boosts Benzyl Alcohol’s otherwise narrow gram-negative coverage; stays within COSMOS-adjacent natural positioning.',
  },
  {
    partner: 'Caprylhydroxamic Acid (CHA)',
    commercialName: 'Spectrastat family (CHA + Caprylyl Glycol + EHG blends)',
    verdict: 'ship',
    phRange: '4.0–7.0',
    formulationFit: 'Water-rich emulsion, essence — yeast/mould gap filler',
    trueDoseWithEHG: 'CHA 0.1–0.2% + EHG 0.3–0.5% + a glycol',
    rationale: 'EHG lifts CHA’s weak bacterial coverage; required third ingredient (glycol) to meet ISO 11930 criterion A.',
  },
  {
    partner: 'High-cationic quaternary (CAPB-free systems, &gt;2% quat)',
    commercialName: 'Hair conditioner, cationic emulsion',
    verdict: 'consult',
    phRange: '4.0–6.5',
    formulationFit: 'Hair conditioner, 2-in-1 rinse-off',
    trueDoseWithEHG: 'EHG provides no cost-effective boost vs cheaper diols',
    rationale: 'Non-ionic membrane disruption gives no synergy with cationic quats; a Caprylyl Glycol-only route is usually cheaper and equally effective.',
  },
  {
    partner: 'Anhydrous system (aₘ &lt; 0.6)',
    commercialName: 'Oil cleanser, balm, stick (non-deodorant)',
    verdict: 'refuse',
    phRange: 'N/A',
    formulationFit: 'Oil cleanser, lipstick, balm',
    trueDoseWithEHG: 'Preservation already physical; EHG spend wasted',
    rationale: 'Water activity below 0.6 inhibits microbial growth without chemical preservation; a true preservative + EHG booster is unnecessary cost.',
  },
];

const VERDICT_STYLE: Record<Verdict, string> = {
  ship: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  consult: 'bg-amber-100 text-amber-800 border-amber-200',
  refuse: 'bg-rose-100 text-rose-800 border-rose-200',
};

const VERDICT_LABEL: Record<Verdict, string> = {
  ship: 'Ship',
  consult: 'Consult',
  refuse: 'Refuse',
};

export default function EHGPairingMatrix() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="my-8 rounded-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-100 px-4 py-3 border-b border-slate-200">
        <p className="text-sm font-medium text-slate-700">
          EHG pairing map — Onerchemical procurement verdict · As of 2026-10
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Click a row to see pH, formulation fit, true-preservative dose with EHG, and rationale.
        </p>
      </div>
      <ul className="divide-y divide-slate-100">
        {PAIRINGS.map((p, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className="bg-white">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-slate-50"
                aria-expanded={isOpen}
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium text-slate-800"
                    dangerouslySetInnerHTML={{ __html: '+ ' + p.partner }}
                  />
                  <p className="text-xs text-slate-500">{p.commercialName}</p>
                </div>
                <span
                  className={
                    'shrink-0 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ' +
                    VERDICT_STYLE[p.verdict]
                  }
                >
                  {VERDICT_LABEL[p.verdict]}
                </span>
                <svg
                  className={
                    'w-4 h-4 text-slate-400 transition-transform ' +
                    (isOpen ? 'rotate-180' : '')
                  }
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-sm text-slate-600 bg-slate-50/60 border-t border-slate-100">
                  <dl className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-4 gap-y-2 mt-2">
                    <dt className="font-medium text-slate-700">pH range</dt>
                    <dd dangerouslySetInnerHTML={{ __html: p.phRange }} />
                    <dt className="font-medium text-slate-700">Formulation fit</dt>
                    <dd>{p.formulationFit}</dd>
                    <dt className="font-medium text-slate-700">Dose with EHG</dt>
                    <dd>{p.trueDoseWithEHG}</dd>
                    <dt className="font-medium text-slate-700">Rationale</dt>
                    <dd>{p.rationale}</dd>
                  </dl>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <p className="px-4 py-3 text-xs text-slate-500 border-t border-slate-100 bg-slate-50">
        Verdicts are Onerchemical’s shipping policy, not regulatory classifications. &ldquo;Ship&rdquo; = routinely sold into this pairing with full technical note. &ldquo;Consult&rdquo; = we quote but attach an alternative-ingredient proposal. &ldquo;Refuse&rdquo; = we decline the order and explain why.
      </p>
    </div>
  );
}
