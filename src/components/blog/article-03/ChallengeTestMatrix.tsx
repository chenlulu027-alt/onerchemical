'use client';

import { useState } from 'react';

type Verdict = 'ok' | 'borderline' | 'risk' | 'na';

type Cell = {
  verdict: Verdict;
  label: string;
  assumption: string;
};

type Row = {
  system: string;
  aw: string;
  ph: string;
  cells: [Cell, Cell, Cell];
};

const COL_HEADS = ['1,2-HD alone', 'HD + Caprylyl Glycol', 'HD + Phenoxyethanol'];

const ROWS: Row[] = [
  {
    system: 'Anhydrous balm / oil serum',
    aw: 'Aw <0.6',
    ph: 'n/a',
    cells: [
      { verdict: 'ok', label: '2.0% often sufficient', assumption: 'Low water activity constrains microbial growth; HD acts as humectant + mild antimicrobial.' },
      { verdict: 'na', label: 'Not required', assumption: 'Over-preservation in anhydrous systems; adds cost without microbial benefit.' },
      { verdict: 'na', label: 'Not required', assumption: 'Same — anhydrous systems rarely need a hurdle pair.' },
    ],
  },
  {
    system: 'Low-pH toner',
    aw: 'Aw 0.95+',
    ph: 'pH 3.5–4.5',
    cells: [
      { verdict: 'borderline', label: '3.0% borderline', assumption: 'Low pH gives natural assist; yeast/mold risk remains on long open-use cycles.' },
      { verdict: 'ok', label: '2.0% + 0.3% CG — reliable', assumption: 'Caprylyl Glycol closes the yeast/mold gap. Pairing documented in Levy & Dulichan 2008.' },
      { verdict: 'ok', label: '1.0% + 0.5% PE — reliable', assumption: 'PE anchors Annex V compliance; HD boosts efficacy and lowers PE load.' },
    ],
  },
  {
    system: 'O/W lotion',
    aw: 'Aw 0.95+',
    ph: 'pH 5–6',
    cells: [
      { verdict: 'risk', label: '3.0% high failure rate', assumption: 'Classic swap failure zone. Most common Challenge Test defeat for indie brands dropping PE.' },
      { verdict: 'ok', label: '2.0% + 0.5% CG — reliable', assumption: 'Hurdle synergy covers Gram+/-, yeast, mold. Standard natural-leaning stack.' },
      { verdict: 'ok', label: '1.0% + 0.7% PE — reliable', assumption: 'Industry workhorse. PE at 0.7% stays well below 1% Annex V ceiling.' },
    ],
  },
  {
    system: 'Surfactant cleanser',
    aw: 'Aw 0.95+',
    ph: 'pH 5–6',
    cells: [
      { verdict: 'borderline', label: '2.0% borderline', assumption: 'Rinse-off reduces exposure risk but in-use contamination (loofah, pump) persists.' },
      { verdict: 'ok', label: '1.5% + 0.3% CG — reliable', assumption: 'Compatible with anionic surfactants (SLES, SCI); avoid high-dose cationic systems.' },
      { verdict: 'ok', label: '1.0% + 0.5% PE — reliable', assumption: 'Standard shower-gel preservation pattern; stable across pH 4–8.' },
    ],
  },
  {
    system: 'Water-rich mist',
    aw: 'Aw 0.98+',
    ph: 'pH 6–7',
    cells: [
      { verdict: 'risk', label: 'Not recommended standalone', assumption: 'High Aw + near-neutral pH + spray contamination = highest microbial pressure zone.' },
      { verdict: 'borderline', label: '2.0% + 0.5% CG — borderline', assumption: 'May pass ISO 11930 Criterion B but not Criterion A in Phase 2 extended re-challenge.' },
      { verdict: 'ok', label: '1.5% + 0.7% PE — reliable', assumption: 'PE at 0.7% + HD boost consistently passes USP 51 in mist systems.' },
    ],
  },
];

const VERDICT_STYLE: Record<Verdict, string> = {
  ok: 'bg-emerald-50 text-emerald-900 border-emerald-200',
  borderline: 'bg-amber-50 text-amber-900 border-amber-200',
  risk: 'bg-rose-50 text-rose-900 border-rose-200',
  na: 'bg-slate-50 text-slate-500 border-slate-200',
};

export default function ChallengeTestMatrix() {
  const [open, setOpen] = useState<{ r: number; c: number } | null>(null);

  return (
    <div className="my-8">
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="text-left px-3 py-2 border-b border-slate-200">Formulation system</th>
              {COL_HEADS.map((h) => (
                <th key={h} className="text-left px-3 py-2 border-b border-slate-200">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, ri) => (
              <>
                <tr key={`crow-${ri}`} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-3 py-3 align-top">
                    <div className="font-medium text-slate-900">{row.system}</div>
                    <div className="text-xs text-slate-500 mt-1">{row.aw} &middot; {row.ph}</div>
                  </td>
                  {row.cells.map((cell, ci) => {
                    const isOpen = open?.r === ri && open?.c === ci;
                    return (
                      <td key={`cell-${ri}-${ci}`} className="px-3 py-3 align-top">
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : { r: ri, c: ci })}
                          className={`w-full text-left px-2 py-1.5 rounded border text-xs font-medium transition hover:brightness-95 ${VERDICT_STYLE[cell.verdict]}`}
                          aria-expanded={isOpen}
                        >
                          {cell.label}
                        </button>
                      </td>
                    );
                  })}
                </tr>
                {open?.r === ri && (
                  <tr key={`asm-${ri}`} className="bg-slate-50/50">
                    <td colSpan={4} className="px-3 py-3 text-sm text-slate-700 border-b border-slate-100">
                      <strong className="text-slate-900">{COL_HEADS[open.c]} — {row.system}:</strong> {row.cells[open.c].assumption}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-3 mt-3 text-xs text-slate-600 flex-wrap">
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded border border-emerald-200 bg-emerald-50 inline-block" /> Reliable</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded border border-amber-200 bg-amber-50 inline-block" /> Borderline</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded border border-rose-200 bg-rose-50 inline-block" /> High failure risk</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded border border-slate-200 bg-slate-50 inline-block" /> Not applicable</span>
      </div>
      <p className="text-xs text-slate-500 mt-2">
        Reference matrix for ISO 11930 Criterion A. Click any cell to view assumptions. Challenge Test outcomes vary with inoculum strain, container closure, and extract contamination — always confirm on final production batch.
      </p>
    </div>
  );
}
