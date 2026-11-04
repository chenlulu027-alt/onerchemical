'use client';

import { useMemo, useState } from 'react';

type WaterBand = '0-5' | '5-15' | '15-30' | '30-50' | '50-plus';
type HumectantLoad = 'none' | 'low' | 'medium' | 'high' | 'very-high';
type OilPhase = 'anhydrous' | 'low-oil' | 'medium-oil' | 'high-oil' | 'oil-only';
type Packaging = 'jar-open' | 'tube' | 'pump' | 'airless-pump' | 'sachet';

const WATER_LABELS: Record<WaterBand, string> = {
  '0-5': '0-5% water (anhydrous or near-anhydrous)',
  '5-15': '5-15% water (very low water)',
  '15-30': '15-30% water (low water)',
  '30-50': '30-50% water (medium water)',
  '50-plus': '50%+ water (standard aqueous)',
};

const HUMECTANT_LABELS: Record<HumectantLoad, string> = {
  'none': 'No humectants',
  'low': 'Low (<5% glycerin/PG/BG equivalent)',
  'medium': 'Medium (5-15% humectant load)',
  'high': 'High (15-25% humectant load)',
  'very-high': 'Very high (25%+ humectant load)',
};

const OIL_LABELS: Record<OilPhase, string> = {
  'anhydrous': 'Anhydrous oil-only (balm, serum oil)',
  'low-oil': 'Low oil (0-10%)',
  'medium-oil': 'Medium oil (10-25% O/W)',
  'high-oil': 'High oil (25-40% O/W)',
  'oil-only': '100% oil-only formula',
};

const PACKAGING_LABELS: Record<Packaging, string> = {
  'jar-open': 'Open jar (daily finger contact)',
  'tube': 'Soft tube with snap cap',
  'pump': 'Standard pump dispenser',
  'airless-pump': 'Airless pump (moisture barrier)',
  'sachet': 'Single-use sachet',
};

interface Prediction {
  predictedAw: string;
  awRange: [number, number];
  path: 'self-preserving' | 'low-dose-hurdle' | 'standard' | 'full';
  pathLabel: string;
  pathColor: string;
  rationale: string;
  risk: string;
}

function predict(
  water: WaterBand,
  humectant: HumectantLoad,
  oil: OilPhase,
  packaging: Packaging,
): Prediction {
  // Base Aw from water content
  const baseAw: Record<WaterBand, number> = {
    '0-5': 0.35,
    '5-15': 0.75,
    '15-30': 0.88,
    '30-50': 0.93,
    '50-plus': 0.97,
  };
  let aw = baseAw[water];

  // Humectant binding — glycerin and PG bind water, lowering Aw
  const humectantAdj: Record<HumectantLoad, number> = {
    'none': 0,
    'low': -0.03,
    'medium': -0.10,
    'high': -0.18,
    'very-high': -0.28,
  };
  aw += humectantAdj[humectant];

  // Oil phase partitioning — oil reduces effective aqueous Aw slightly
  const oilAdj: Record<OilPhase, number> = {
    'anhydrous': 0,
    'low-oil': -0.02,
    'medium-oil': -0.04,
    'high-oil': -0.06,
    'oil-only': -0.20,
  };
  aw += oilAdj[oil];

  // Packaging — affects moisture pickup risk, not T0 Aw
  const packagingRisk: Record<Packaging, string> = {
    'jar-open': 'HIGH moisture-pickup risk — Aw may rise 0.10-0.20 over 60-90 days consumer use',
    'tube': 'Medium moisture-pickup risk — Aw may rise 0.05-0.10 over shelf life',
    'pump': 'Low moisture-pickup risk — Aw typically stable',
    'airless-pump': 'Very low moisture-pickup risk — airless pump excludes atmospheric exposure',
    'sachet': 'Negligible moisture-pickup — single use eliminates headspace equilibration',
  };

  // Clamp Aw
  aw = Math.max(0.15, Math.min(1.0, aw));

  // Round to 0.05 and set range
  const low = Math.max(0.15, Math.round((aw - 0.05) * 100) / 100);
  const high = Math.min(1.0, Math.round((aw + 0.05) * 100) / 100);

  let path: Prediction['path'];
  let pathLabel: string;
  let pathColor: string;
  let rationale: string;

  if (aw < 0.60) {
    path = 'self-preserving';
    pathLabel = 'Self-preserving / anhydrous claim possible';
    pathColor = 'border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40';
    rationale = 'Below Scott 1957 threshold for bacterial and most fungal growth. Measure Aw at T0 and across stability window to confirm; a claim is defensible if Aw stays under 0.60 through consumer-use simulation.';
  } else if (aw < 0.75) {
    path = 'low-dose-hurdle';
    pathLabel = 'Low-dose hurdle preservation or self-preserving with strong hurdle';
    pathColor = 'border-blue-400 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/40';
    rationale = 'Xerophilic molds can grow but conventional bacterial contamination inhibited. Options: hurdle approach (low pH + chelator + minor antimicrobial), reduced-dose Phenoxyethanol 0.3-0.5%, or airless packaging with single preservative.';
  } else if (aw < 0.85) {
    path = 'standard';
    pathLabel = 'Standard preservation; self-preserving claim difficult';
    pathColor = 'border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/40';
    rationale = 'Yeasts and most molds can grow. Standard-dose preservation to pass ISO 11930 Criterion B. Self-preserving claim requires strong additional hurdles (low pH plus multiple antimicrobial ingredients) and defensible evidence.';
  } else {
    path = 'full';
    pathLabel = 'Full conventional preservation required';
    pathColor = 'border-rose-400 bg-rose-50 dark:border-rose-700 dark:bg-rose-950/40';
    rationale = 'Most bacteria and all fungi grow freely. Full conventional preservation to pass ISO 11930 Criterion B (Criterion A for infant and eye-area). A self-preserving claim is not defensible at this Aw.';
  }

  return {
    predictedAw: aw.toFixed(2),
    awRange: [low, high],
    path,
    pathLabel,
    pathColor,
    rationale,
    risk: packagingRisk[packaging],
  };
}

export default function WaterActivityThresholdExplorer() {
  const [water, setWater] = useState<WaterBand>('30-50');
  const [humectant, setHumectant] = useState<HumectantLoad>('medium');
  const [oil, setOil] = useState<OilPhase>('medium-oil');
  const [packaging, setPackaging] = useState<Packaging>('pump');

  const result = useMemo(
    () => predict(water, humectant, oil, packaging),
    [water, humectant, oil, packaging],
  );

  return (
    <div className="my-8 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        Water Activity Threshold Explorer
      </h3>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        Directional prediction only. Measured Aw always overrides predicted Aw. Use as starting
        point for preservation strategy scoping and Challenge Test design.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Water content
          </span>
          <select
            value={water}
            onChange={(e) => setWater(e.target.value as WaterBand)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(WATER_LABELS) as WaterBand[]).map((k) => (
              <option key={k} value={k}>
                {WATER_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Humectant load
          </span>
          <select
            value={humectant}
            onChange={(e) => setHumectant(e.target.value as HumectantLoad)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(HUMECTANT_LABELS) as HumectantLoad[]).map((k) => (
              <option key={k} value={k}>
                {HUMECTANT_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Oil phase
          </span>
          <select
            value={oil}
            onChange={(e) => setOil(e.target.value as OilPhase)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(OIL_LABELS) as OilPhase[]).map((k) => (
              <option key={k} value={k}>
                {OIL_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Packaging type
          </span>
          <select
            value={packaging}
            onChange={(e) => setPackaging(e.target.value as Packaging)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(PACKAGING_LABELS) as Packaging[]).map((k) => (
              <option key={k} value={k}>
                {PACKAGING_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={`mt-5 rounded-md border p-4 ${result.pathColor}`}>
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            Predicted Aw: {result.predictedAw}
            <span className="ml-2 font-normal text-xs text-neutral-700 dark:text-neutral-300">
              (range {result.awRange[0].toFixed(2)}&ndash;{result.awRange[1].toFixed(2)})
            </span>
          </h4>
        </div>
        <p className="mb-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {result.pathLabel}
        </p>
        <p className="text-xs leading-relaxed text-neutral-800 dark:text-neutral-200">
          {result.rationale}
        </p>
        <p className="mt-3 border-t border-neutral-300 pt-2 text-xs italic text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
          <strong>Packaging risk:</strong> {result.risk}
        </p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-left dark:border-neutral-800 dark:bg-neutral-900">
              <th className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-300">
                Aw range
              </th>
              <th className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-300">
                Preservation path
              </th>
              <th className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-300">
                Representative products
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <td className="px-3 py-2 align-top font-mono text-neutral-900 dark:text-neutral-100">
                &lt; 0.60
              </td>
              <td className="px-3 py-2 align-top text-neutral-800 dark:text-neutral-200">
                Self-preserving / anhydrous
              </td>
              <td className="px-3 py-2 align-top text-xs text-neutral-600 dark:text-neutral-400">
                Balms, oils, stick foundations, lipsticks, waterless serums
              </td>
            </tr>
            <tr className="border-b border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/40">
              <td className="px-3 py-2 align-top font-mono text-neutral-900 dark:text-neutral-100">
                0.60 &ndash; 0.75
              </td>
              <td className="px-3 py-2 align-top text-neutral-800 dark:text-neutral-200">
                Low-dose hurdle
              </td>
              <td className="px-3 py-2 align-top text-xs text-neutral-600 dark:text-neutral-400">
                High-glycerin serums, honey-based lip products, humectant-rich essences
              </td>
            </tr>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <td className="px-3 py-2 align-top font-mono text-neutral-900 dark:text-neutral-100">
                0.75 &ndash; 0.85
              </td>
              <td className="px-3 py-2 align-top text-neutral-800 dark:text-neutral-200">
                Standard preservation
              </td>
              <td className="px-3 py-2 align-top text-xs text-neutral-600 dark:text-neutral-400">
                Light emulsions, surfactant cleansers, hydrogel masks
              </td>
            </tr>
            <tr className="bg-neutral-50/50 dark:bg-neutral-900/40">
              <td className="px-3 py-2 align-top font-mono text-neutral-900 dark:text-neutral-100">
                &gt; 0.85
              </td>
              <td className="px-3 py-2 align-top text-neutral-800 dark:text-neutral-200">
                Full conventional preservation
              </td>
              <td className="px-3 py-2 align-top text-xs text-neutral-600 dark:text-neutral-400">
                Toners, lotions, creams, low-humectant serums, hair products
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-500">
        Prediction model uses Scott 1957 microbial-growth thresholds adjusted for typical
        cosmetic humectant and oil-phase interactions. Measurement by chilled-mirror dewpoint
        or capacitive sensor is required for regulatory and claim substantiation purposes.
      </p>
    </div>
  );
}
