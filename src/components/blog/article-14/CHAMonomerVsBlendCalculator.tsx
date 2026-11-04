'use client';

import { useMemo, useState } from 'react';

type AnnualVolume = '10-25' | '25-75' | '75-150' | '150-plus';
type Complexity = 'single-product' | 'multi-sku-same-base' | 'multi-sku-varied';
type Experience = 'no-in-house-ct' | 'external-ct-lab' | 'in-house-ct';
type RetailerGate = 'no-gate' | 'one-gate' | 'multi-gate';

interface CostBreakdown {
  monomerTotal: number;
  blendTotal: number;
  monomerDetail: string;
  blendDetail: string;
}

interface Recommendation {
  pick: 'monomer' | 'blend' | 'close-call';
  score: number;
  headline: string;
  reasoning: string[];
  cost: CostBreakdown;
}

const ANNUAL_LABELS: Record<AnnualVolume, string> = {
  '10-25': '10-25 kg/year (first launch, 5-15 tonnes finished product)',
  '25-75': '25-75 kg/year (established indie, 15-50 tonnes finished product)',
  '75-150': '75-150 kg/year (scaling brand, 50-100 tonnes finished product)',
  '150-plus': '150+ kg/year (contract manufacturer or multi-brand portfolio)',
};

const COMPLEXITY_LABELS: Record<Complexity, string> = {
  'single-product': 'Single SKU (one formula)',
  'multi-sku-same-base': 'Multi-SKU, shared base formula (lotion family)',
  'multi-sku-varied': 'Multi-SKU, varied pH / oil / archetype',
};

const EXPERIENCE_LABELS: Record<Experience, string> = {
  'no-in-house-ct': 'No in-house Challenge Test capability',
  'external-ct-lab': 'External Challenge Test lab relationship',
  'in-house-ct': 'In-house Challenge Test + preservation chemistry',
};

const GATE_LABELS: Record<RetailerGate, string> = {
  'no-gate': 'Direct-to-consumer, no retailer gate',
  'one-gate': 'One clean-beauty retailer gate (Credo, Sephora Clean, etc.)',
  'multi-gate': 'Multiple retailer gates + EU + US multi-market',
};

// Representative 2026 Q4 prices (USD/kg)
const MONOMER_PRICE_PER_KG = 48; // Jiangsu trader, mid-tier
const SPECTRASTAT_PRICE_PER_KG = 95; // Inolex Spectrastat BHA, 20 kg pail distributor
const SPECTRASTAT_CHA_CONTENT = 0.15; // ~15% CHA in Spectrastat BHA
const CAPRYLYL_GLYCOL_PRICE_PER_KG = 12; // separate sourcing
const GLYCERYL_CAPRYLATE_PRICE_PER_KG = 16; // separate sourcing

function calcCost(volume: AnnualVolume): CostBreakdown {
  // Convert volume band to representative annual kg of CHA
  const kgMap: Record<AnnualVolume, number> = {
    '10-25': 18,
    '25-75': 50,
    '75-150': 110,
    '150-plus': 200,
  };
  const chaKg = kgMap[volume];

  // Monomer path: CHA + Caprylyl Glycol (4x CHA mass) + Glyceryl Caprylate (1.7x CHA mass)
  // Standard 15/60/25 Spectrastat ratio by mass
  const caprylylGlycolKg = chaKg * 4;
  const glycerylCaprylateKg = chaKg * 1.67;
  const monomerCost =
    chaKg * MONOMER_PRICE_PER_KG +
    caprylylGlycolKg * CAPRYLYL_GLYCOL_PRICE_PER_KG +
    glycerylCaprylateKg * GLYCERYL_CAPRYLATE_PRICE_PER_KG;

  // Blend path: equivalent blend to deliver the same CHA
  const blendKg = chaKg / SPECTRASTAT_CHA_CONTENT;
  const blendCost = blendKg * SPECTRASTAT_PRICE_PER_KG;

  return {
    monomerTotal: Math.round(monomerCost),
    blendTotal: Math.round(blendCost),
    monomerDetail: `${chaKg} kg CHA @ USD ${MONOMER_PRICE_PER_KG}/kg + ${caprylylGlycolKg.toFixed(0)} kg Caprylyl Glycol + ${glycerylCaprylateKg.toFixed(0)} kg Glyceryl Caprylate`,
    blendDetail: `${blendKg.toFixed(0)} kg Spectrastat BHA (or equivalent) @ USD ${SPECTRASTAT_PRICE_PER_KG}/kg`,
  };
}

function recommend(
  volume: AnnualVolume,
  complexity: Complexity,
  experience: Experience,
  gate: RetailerGate,
): Recommendation {
  const cost = calcCost(volume);

  // Scoring: positive leans monomer, negative leans blend
  let score = 0;
  const reasons: string[] = [];

  // Volume
  if (volume === '150-plus') { score += 3; reasons.push('150+ kg annual pull — monomer economics dominate even with triple-SKU overhead'); }
  else if (volume === '75-150') { score += 1; reasons.push('75-150 kg annual pull — monomer starts to beat blend on landed cost'); }
  else if (volume === '25-75') { score -= 1; reasons.push('25-75 kg annual pull — blend simplifies RFQ and inventory at modest premium'); }
  else { score -= 3; reasons.push('Under 25 kg annual pull — blend eliminates three-SKU inventory and audit overhead'); }

  // Complexity
  if (complexity === 'multi-sku-varied') { score += 1; reasons.push('Varied pH / archetype across SKUs — monomer flexibility beats fixed blend ratio'); }
  else if (complexity === 'single-product') { score -= 1; reasons.push('Single SKU — blend\'s pre-validated ratio is a one-decision win'); }

  // Experience
  if (experience === 'in-house-ct') { score += 2; reasons.push('In-house Challenge Test capability absorbs the self-blending validation burden'); }
  else if (experience === 'external-ct-lab') { score += 0; reasons.push('External lab relationship — either path works, cost dominates'); }
  else { score -= 2; reasons.push('No in-house Challenge Test — blend\'s pre-cleared ISO 11930 data pack is the safer path'); }

  // Retailer gate
  if (gate === 'multi-gate') { score -= 2; reasons.push('Multi-retailer gate — Spectrastat brand file clears audits 3-6 weeks faster per retailer'); }
  else if (gate === 'one-gate') { score -= 1; reasons.push('One retailer gate — brand file still accelerates first audit'); }
  else { score += 1; reasons.push('No retailer gate — no need to pay the brand-file premium'); }

  let pick: 'monomer' | 'blend' | 'close-call';
  let headline: string;
  if (score >= 3) {
    pick = 'monomer';
    headline = 'Monomer sourcing wins';
  } else if (score <= -3) {
    pick = 'blend';
    headline = 'Pre-blended Spectrastat / AromaStat wins';
  } else {
    pick = 'close-call';
    headline = 'Close call — run both quotes';
  }

  return { pick, score, headline, reasoning: reasons, cost };
}

export default function CHAMonomerVsBlendCalculator() {
  const [volume, setVolume] = useState<AnnualVolume>('25-75');
  const [complexity, setComplexity] = useState<Complexity>('multi-sku-same-base');
  const [experience, setExperience] = useState<Experience>('external-ct-lab');
  const [gate, setGate] = useState<RetailerGate>('one-gate');

  const result = useMemo(
    () => recommend(volume, complexity, experience, gate),
    [volume, complexity, experience, gate],
  );

  const pickColor =
    result.pick === 'monomer'
      ? 'border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40'
      : result.pick === 'blend'
      ? 'border-blue-400 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/40'
      : 'border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/40';

  return (
    <div className="my-8 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        CHA Monomer vs Spectrastat Pre-Blend Calculator
      </h3>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        Set your operating profile. The calculator returns the recommended path plus a 2026 Q4
        cost comparison. Prices are representative Jiangsu trader + Inolex distributor midpoints.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Annual CHA volume
          </span>
          <select
            value={volume}
            onChange={(e) => setVolume(e.target.value as AnnualVolume)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(ANNUAL_LABELS) as AnnualVolume[]).map((k) => (
              <option key={k} value={k}>
                {ANNUAL_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Formula complexity
          </span>
          <select
            value={complexity}
            onChange={(e) => setComplexity(e.target.value as Complexity)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(COMPLEXITY_LABELS) as Complexity[]).map((k) => (
              <option key={k} value={k}>
                {COMPLEXITY_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Challenge Test capability
          </span>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value as Experience)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(EXPERIENCE_LABELS) as Experience[]).map((k) => (
              <option key={k} value={k}>
                {EXPERIENCE_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Retailer gate exposure
          </span>
          <select
            value={gate}
            onChange={(e) => setGate(e.target.value as RetailerGate)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(GATE_LABELS) as RetailerGate[]).map((k) => (
              <option key={k} value={k}>
                {GATE_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={`mt-5 rounded-md border p-4 ${pickColor}`}>
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            {result.headline}
          </h4>
          <span className="font-mono text-xs text-neutral-700 dark:text-neutral-300">
            Score: {result.score > 0 ? '+' : ''}{result.score}
          </span>
        </div>
        <ul className="list-disc space-y-1 pl-5 text-xs text-neutral-800 dark:text-neutral-200">
          {result.reasoning.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-left dark:border-neutral-800 dark:bg-neutral-900">
              <th className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-300">
                Path
              </th>
              <th className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-300">
                Annual raw-material cost (USD)
              </th>
              <th className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-300">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              className={`border-b border-neutral-200 dark:border-neutral-800 ${
                result.pick === 'monomer' ? 'bg-emerald-50/70 dark:bg-emerald-950/30' : ''
              }`}
            >
              <td className="px-3 py-2 align-top font-medium text-neutral-900 dark:text-neutral-100">
                Monomer self-blend
              </td>
              <td className="px-3 py-2 align-top font-mono text-neutral-900 dark:text-neutral-100">
                USD {result.cost.monomerTotal.toLocaleString()}
              </td>
              <td className="px-3 py-2 align-top text-xs text-neutral-600 dark:text-neutral-400">
                {result.cost.monomerDetail}
              </td>
            </tr>
            <tr
              className={`${
                result.pick === 'blend' ? 'bg-blue-50/70 dark:bg-blue-950/30' : ''
              }`}
            >
              <td className="px-3 py-2 align-top font-medium text-neutral-900 dark:text-neutral-100">
                Spectrastat / AromaStat blend
              </td>
              <td className="px-3 py-2 align-top font-mono text-neutral-900 dark:text-neutral-100">
                USD {result.cost.blendTotal.toLocaleString()}
              </td>
              <td className="px-3 py-2 align-top text-xs text-neutral-600 dark:text-neutral-400">
                {result.cost.blendDetail}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-500">
        Raw-material cost only. Not shown: Challenge Test cost (equivalent across paths), formulation
        hours (1-3 hours per SKU saved by blend), retailer audit acceleration (blend typically
        saves 3-6 weeks per retailer gate). Blend path per-kg looks expensive; true landed cost
        parity depends on these soft factors.
      </p>
    </div>
  );
}
