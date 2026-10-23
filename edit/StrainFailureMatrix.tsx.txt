'use client';

import { useState } from 'react';

type Strain = {
  id: string;
  shortName: string;
  binomial: string;
  atcc: string;
  category: 'bacteria' | 'yeast' | 'mold';
  colorClass: string;
  pillClass: string;
  revealsFailure: string;
  formulatorFootprint: string;
  typicalRemediation: string;
};

const STRAINS: Strain[] = [
  {
    id: 'ec',
    shortName: 'E. coli',
    binomial: 'Escherichia coli',
    atcc: 'ATCC 8739',
    category: 'bacteria',
    colorClass: 'bg-rose-50 border-rose-300',
    pillClass: 'bg-rose-600 text-white',
    revealsFailure: 'Weak overall preservation at near-neutral pH — Gram-negative benchmark.',
    formulatorFootprint: 'Formulas pH 5.5-7 that lean on organic acids alone (benzoic, sorbic) often fail here because the acids lose dissociation at pH > 5.5.',
    typicalRemediation: 'Add a Gram-negative-active co-preservative: Phenoxyethanol 0.6-0.8%, or a chelator like Tetrasodium Glutamate Diacetate 0.1-0.2% to disrupt the outer membrane.',
  },
  {
    id: 'pa',
    shortName: 'P. aeruginosa',
    binomial: 'Pseudomonas aeruginosa',
    atcc: 'ATCC 9027',
    category: 'bacteria',
    colorClass: 'bg-orange-50 border-orange-300',
    pillClass: 'bg-orange-600 text-white',
    revealsFailure: 'Biofilm-forming water contamination — the most common real-world water-system failure.',
    formulatorFootprint: 'Formulas using recycled or stored DI water, or packaging with narrow airless-pump tubing, see Pseudomonas regrowth at D14-D28 even when the system passed USP <51> at D7.',
    typicalRemediation: 'Chelator pairing (EDTA, GLDA, or Phytate 0.1-0.3%) + validate incoming water Aw and bioburden; Pseudomonas tolerates many preservatives but collapses under iron starvation.',
  },
  {
    id: 'sa',
    shortName: 'S. aureus',
    binomial: 'Staphylococcus aureus',
    atcc: 'ATCC 6538',
    category: 'bacteria',
    colorClass: 'bg-amber-50 border-amber-300',
    pillClass: 'bg-amber-600 text-white',
    revealsFailure: 'Hand- and skin-flora contamination — the "finger-dip" scenario in jars and open pumps.',
    formulatorFootprint: 'Jar packaging, dropper serums, and refillable formats carry the highest Staph risk; failing this strain means in-use contamination will likely occur on-shelf.',
    typicalRemediation: 'Non-ionic preservatives like Caprylhydroxamic Acid or Ethylhexylglycerin pair well with the primary preservative to lift Gram-positive activity; also consider airless packaging as a formulation-adjacent fix.',
  },
  {
    id: 'ca',
    shortName: 'C. albicans',
    binomial: 'Candida albicans',
    atcc: 'ATCC 10231',
    category: 'yeast',
    colorClass: 'bg-indigo-50 border-indigo-300',
    pillClass: 'bg-indigo-600 text-white',
    revealsFailure: 'Yeast tolerance of mild preservation systems — common failure for "natural" or acid-only systems.',
    formulatorFootprint: 'Products using only Leucidal, Geogard ECT, or glycol-based "preservative-free" systems often clear bacteria but fail Candida at D14 or D28.',
    typicalRemediation: 'Add Caprylhydroxamic Acid 0.1-0.3% (yeast/mold-selective) or Dehydroacetic Acid 0.3-0.6% to cover the fungal gap; natural systems rarely clear ISO 11930 Criterion A without a conventional co-preservative.',
  },
  {
    id: 'ab',
    shortName: 'A. brasiliensis',
    binomial: 'Aspergillus brasiliensis',
    atcc: 'ATCC 16404',
    category: 'mold',
    colorClass: 'bg-emerald-50 border-emerald-300',
    pillClass: 'bg-emerald-600 text-white',
    revealsFailure: 'Mold spore survival — the strain with the longest kill curve and the most forgiving ISO 11930 target.',
    formulatorFootprint: 'Botanical extracts (hydrosols, aloe juice, fruit extracts) seed the formula with Aspergillus spores at the raw-material stage; failing this strain usually points upstream at supplier bioburden.',
    typicalRemediation: 'Audit botanical COAs for Total Mold Count (<10 CFU/g target); add Potassium Sorbate 0.2-0.3% or Benzoic Acid 0.2% for mold control; raise formula temperature briefly during manufacturing if raw-material heat tolerance allows.',
  },
];

export default function StrainFailureMatrix() {
  const [activeId, setActiveId] = useState<string>('pa');
  const active = STRAINS.find((s) => s.id === activeId) ?? STRAINS[0];

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="mb-1 text-lg font-semibold text-slate-900">
          The ISO 11930 5-Strain Panel — What Each Strain Exposes
        </h3>
        <p className="text-sm text-slate-600">
          Click any strain to see which formulation weakness it typically uncovers, what packaging and raw-material patterns the failure maps to, and the pairing move that most often fixes it.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {STRAINS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveId(s.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              s.id === activeId
                ? s.pillClass
                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {s.shortName}
          </button>
        ))}
      </div>

      <div className={`rounded-xl border ${active.colorClass} p-5`}>
        <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-lg font-bold italic text-slate-900">{active.binomial}</span>
          <span className="rounded bg-white px-2 py-0.5 text-xs font-mono text-slate-700 ring-1 ring-slate-300">
            {active.atcc}
          </span>
          <span className="text-xs uppercase tracking-wide text-slate-500">
            {active.category}
          </span>
        </div>

        <dl className="space-y-4 text-sm">
          <div>
            <dt className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              What a failure here reveals
            </dt>
            <dd className="text-slate-800">{active.revealsFailure}</dd>
          </div>
          <div>
            <dt className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Which formulations trip it
            </dt>
            <dd className="text-slate-800">{active.formulatorFootprint}</dd>
          </div>
          <div>
            <dt className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Typical remediation move
            </dt>
            <dd className="text-slate-800">{active.typicalRemediation}</dd>
          </div>
        </dl>
      </div>

      <p className="mt-4 text-xs italic text-slate-500">
        Strain assignments and ATCC references per ISO 11930:2019 Clause 5. Remediation patterns reflect Onerchemical procurement observations across indie-brand challenge test reports as of 2026-10; a lab repeat and formulation audit remain the governing diagnostic for a specific failure.
      </p>
    </div>
  );
}
