'use client';

import { useState } from 'react';

type Row = {
  partner: string;
  ratio: string;
  gain: string;
  mechanism: string;
  note: string;
};

const ROWS: Row[] = [
  {
    partner: 'Caprylyl Glycol',
    ratio: '1.0–2.0% HD + 0.3–0.5% CG',
    gain: 'Yeast / mold reinforcement',
    mechanism: 'Medium + longer-chain diol synergy',
    note: 'Levy & Dulichan 2008 safety profile verified in 227-subject RIPT (J Am Acad Dermatol).',
  },
  {
    partner: 'Ethylhexylglycerin (EHG)',
    ratio: '0.5–1.0% HD + 0.3–0.5% EHG',
    gain: 'Gram+/- reinforcement',
    mechanism: 'Surfactant-like membrane disruption',
    note: 'Core of Schülke’s Sensiva® PA 20 commercial blend; strong against resistant Gram-negative strains.',
  },
  {
    partner: 'Phenoxyethanol',
    ratio: '1.0% HD + 0.5–0.7% PE',
    gain: 'Broad spectrum',
    mechanism: 'HD boosts PE efficacy and lowers PE load',
    note: 'pH 4–8 emulsions; PE remains the EU Annex V-compliant anchor. Most common hurdle pairing globally.',
  },
  {
    partner: 'Caprylhydroxamic Acid (CHA) + chelator',
    ratio: '1.0% HD + 0.5% CHA + 0.1% EDTA/GLDA',
    gain: 'Yeast / mold + bacteria',
    mechanism: 'Hurdle action + divalent-cation chelation',
    note: 'Natural-claim compatible (Spectrastat-style stack). Chelator is non-optional for CHA to perform.',
  },
];

export default function CompatibilityMatrix() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="my-8">
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="text-left px-3 py-2 border-b border-slate-200">Partner</th>
              <th className="text-left px-3 py-2 border-b border-slate-200">Typical ratio</th>
              <th className="text-left px-3 py-2 border-b border-slate-200">Microbial gain</th>
              <th className="text-left px-3 py-2 border-b border-slate-200">Mechanism</th>
              <th className="text-left px-3 py-2 border-b border-slate-200 w-24">Details</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => {
              const isOpen = expanded === i;
              return (
                <>
                  <tr
                    key={`row-${i}`}
                    className="hover:bg-emerald-50/40 transition-colors border-b border-slate-100 last:border-b-0"
                  >
                    <td className="px-3 py-3 font-medium text-slate-900">{row.partner}</td>
                    <td className="px-3 py-3 text-slate-700 whitespace-nowrap">{row.ratio}</td>
                    <td className="px-3 py-3 text-slate-700">{row.gain}</td>
                    <td className="px-3 py-3 text-slate-700">{row.mechanism}</td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : i)}
                        className="text-xs font-medium text-emerald-700 hover:text-emerald-900 underline underline-offset-2"
                        aria-expanded={isOpen}
                        aria-controls={`compat-note-${i}`}
                      >
                        {isOpen ? 'Hide' : 'Note'}
                      </button>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr key={`note-${i}`} className="bg-emerald-50/30">
                      <td colSpan={5} id={`compat-note-${i}`} className="px-3 py-3 text-sm text-slate-700 border-b border-slate-100">
                        <strong className="text-slate-900">Mechanism note:</strong> {row.note}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 mt-2">
        Click &ldquo;Note&rdquo; to view the mechanism and sourcing basis for each pairing. Data compiled from supplier TDS (INOLEX Lexgard® H, Schülke Sensiva®, Connect Chemicals Elixi-CARE HD) and Onerchemical bench panel observations.
      </p>
    </div>
  );
}
