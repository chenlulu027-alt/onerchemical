'use client';

import { useMemo, useState } from 'react';

type PhBand = 'low' | 'neutral' | 'alkaline';
type OilBand = 'low' | 'mid' | 'high';
type Pack = 'airless' | 'jar' | 'tube' | 'pump';
type Market = 'eu' | 'us' | 'cn' | 'jp' | 'kr';

interface SystemRec {
  id: string;
  name: string;
  philosophy: 'A' | 'B' | 'C' | 'A/C hybrid' | 'B/C';
  useLevel: string;
  phWindow: [number, number];
  oilFits: OilBand[];
  packFits: Pack[];
  marketNotes: Partial<Record<Market, string>>;
  bestFor: string;
  warn?: string;
}

const SYSTEMS: SystemRec[] = [
  {
    id: 'pe-ehg-edta',
    name: 'Phenoxyethanol + Ethylhexylglycerin + EDTA',
    philosophy: 'A',
    useLevel: '0.8% + 0.3% + 0.1%',
    phWindow: [3, 9],
    oilFits: ['low', 'mid'],
    packFits: ['airless', 'jar', 'tube', 'pump'],
    marketNotes: { cn: 'All ingredients IECIC-listed', eu: 'Within SCCS 1618/20 limits' },
    bestFor: 'Universal lotion / cream baseline',
  },
  {
    id: 'pe-benz-sorb',
    name: 'Phenoxyethanol + Sodium Benzoate + Potassium Sorbate + Phytate',
    philosophy: 'B',
    useLevel: '0.5% + 0.4% + 0.25% + 0.1%',
    phWindow: [4.5, 5.2],
    oilFits: ['low', 'mid'],
    packFits: ['airless', 'tube', 'pump'],
    marketNotes: { eu: 'Benzoate/sorbate Annex V-compliant', cn: 'All actives IECIC-listed' },
    bestFor: 'Low-pH actives (vitamin C derivatives, AHA)',
    warn: 'Lose coverage above pH 5.5',
  },
  {
    id: 'hex-cha-cg',
    name: '1,2-Hexanediol + Caprylhydroxamic Acid + Caprylyl Glycol + Phytate',
    philosophy: 'C',
    useLevel: '4.0% + 0.15% + 0.4% + 0.1%',
    phWindow: [4, 6],
    oilFits: ['low', 'mid'],
    packFits: ['airless', 'tube', 'pump'],
    marketNotes: {
      eu: 'None in Annex V — “preservative-free” claim defensible with ISO 11930 data',
      cn: 'CHA requires NMPA new-ingredient filing — check lot status',
    },
    bestFor: '“Preservative-free” claim lotions',
    warn: 'Weak against Pseudomonas without perfect chelation',
  },
  {
    id: 'pe-hex-ehg',
    name: 'Phenoxyethanol + 1,2-Hexanediol + EHG + EDTA',
    philosophy: 'A/C hybrid',
    useLevel: '0.5% + 2.0% + 0.3% + 0.1%',
    phWindow: [3, 8],
    oilFits: ['mid', 'high'],
    packFits: ['airless', 'jar', 'tube', 'pump'],
    marketNotes: { eu: 'SCCS 1618/20 PE cap OK', us: 'MoCRA-compliant' },
    bestFor: 'High oil-phase (>25%) emulsions',
  },
  {
    id: 'chlor-pe',
    name: 'Chlorphenesin + Phenoxyethanol + EHG + EDTA',
    philosophy: 'A',
    useLevel: '0.3% + 0.5% + 0.3% + 0.1%',
    phWindow: [4, 8],
    oilFits: ['low', 'mid'],
    packFits: ['airless', 'tube', 'pump'],
    marketNotes: { jp: 'Chlorphenesin positive-listed', eu: 'Annex V entry 69' },
    bestFor: 'Cationic conditioner systems (BTMS)',
  },
  {
    id: 'geogard-221',
    name: 'Dehydroacetic Acid + Benzyl Alcohol (Geogard 221) + Phytate',
    philosophy: 'C',
    useLevel: '1.0% + 0.1%',
    phWindow: [3, 8],
    oilFits: ['low', 'mid'],
    packFits: ['airless', 'jar', 'tube', 'pump'],
    marketNotes: { eu: 'COSMOS-approved; Annex V entries 29 and 34' },
    bestFor: 'COSMOS / Ecocert certified lotions',
  },
  {
    id: 'benz-dha-glda',
    name: 'Benzoic Acid + Dehydroacetic Acid + GLDA',
    philosophy: 'B/C',
    useLevel: '0.3% + 0.5% + 0.15%',
    phWindow: [3.5, 4.8],
    oilFits: ['low'],
    packFits: ['airless', 'tube', 'pump'],
    marketNotes: { eu: 'Natural-positioned low-pH, Annex V compliant' },
    bestFor: 'Fermented / probiotic lotions',
    warn: 'Narrow pH window and low-oil only',
  },
];

function phToBand(ph: number): PhBand {
  if (ph < 5.5) return 'low';
  if (ph < 7.5) return 'neutral';
  return 'alkaline';
}

function oilToBand(oil: number): OilBand {
  if (oil < 15) return 'low';
  if (oil < 25) return 'mid';
  return 'high';
}

export default function EmulsionPreservationSelector() {
  const [ph, setPh] = useState<number>(5.5);
  const [oil, setOil] = useState<number>(20);
  const [pack, setPack] = useState<Pack>('airless');
  const [market, setMarket] = useState<Market>('eu');

  const recs = useMemo(() => {
    const oilBand = oilToBand(oil);
    const matches = SYSTEMS
      .filter((s) => ph >= s.phWindow[0] && ph <= s.phWindow[1])
      .filter((s) => s.oilFits.includes(oilBand))
      .filter((s) => s.packFits.includes(pack))
      .slice(0, 3);
    return { oilBand, phBand: phToBand(ph), matches };
  }, [ph, oil, pack]);

  return (
    <div className="my-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
        Emulsion Preservation Selector — Onerchemical
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium">Final pH: <span className="tabular-nums">{ph.toFixed(1)}</span></span>
          <input
            type="range"
            min={3}
            max={9}
            step={0.1}
            value={ph}
            onChange={(e) => setPh(parseFloat(e.target.value))}
            className="mt-2 w-full"
            aria-label="Final emulsion pH"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Oil-phase %: <span className="tabular-nums">{oil}%</span></span>
          <input
            type="range"
            min={5}
            max={45}
            step={1}
            value={oil}
            onChange={(e) => setOil(parseInt(e.target.value, 10))}
            className="mt-2 w-full"
            aria-label="Oil-phase percentage"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Primary packaging</span>
          <select
            value={pack}
            onChange={(e) => setPack(e.target.value as Pack)}
            className="mt-2 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 text-sm"
          >
            <option value="airless">Airless pump</option>
            <option value="pump">Standard pump bottle</option>
            <option value="tube">Tube</option>
            <option value="jar">Jar (open-dip)</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium">Primary target market</span>
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value as Market)}
            className="mt-2 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 text-sm"
          >
            <option value="eu">EU (27)</option>
            <option value="us">United States</option>
            <option value="cn">China (NMPA)</option>
            <option value="jp">Japan</option>
            <option value="kr">Korea</option>
          </select>
        </label>
      </div>

      <div className="mt-6">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Profile: <span className="font-medium">pH {recs.phBand}</span> ·{' '}
          <span className="font-medium">{recs.oilBand} oil load</span> ·{' '}
          <span className="font-medium">{pack}</span> packaging ·{' '}
          <span className="font-medium uppercase">{market}</span>
        </p>

        {recs.matches.length === 0 ? (
          <p className="mt-3 text-sm rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 p-3">
            No system in the standard matrix matches these constraints simultaneously. Open-dip jars at pH above 7, or oil-phase above 40%, usually require a bespoke pairing — contact the Onerchemical preservation desk with your full formulation.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {recs.matches.map((s) => (
              <li
                key={s.id}
                className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{s.name}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Philosophy {s.philosophy} · Use level {s.useLevel} · pH {s.phWindow[0]}–{s.phWindow[1]}
                    </p>
                  </div>
                </div>
                <p className="text-sm mt-2">
                  <span className="font-medium">Best for:</span> {s.bestFor}
                </p>
                {s.marketNotes[market] && (
                  <p className="text-sm mt-1 text-slate-600 dark:text-slate-400">
                    <span className="font-medium uppercase">{market}:</span> {s.marketNotes[market]}
                  </p>
                )}
                {s.warn && (
                  <p className="text-xs mt-2 text-amber-700 dark:text-amber-400">⚠ {s.warn}</p>
                )}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-xs text-slate-500">
          Recommendations are a starting point. Run ISO 11930:2019 Criterion A on your actual batch before shipping.
        </p>
      </div>
    </div>
  );
}
