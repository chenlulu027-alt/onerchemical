'use client';

import { useMemo, useState } from 'react';

type Tier = 'chinese-monomer' | 'trader-repack' | 'korean-japanese' | 'pre-blended';

interface TierProfile {
  key: Tier;
  label: string;
  short: string;
  // Scores 1-10 across each dimension; higher is better for the buyer
  priceScore: number;
  certScore: number;
  leadScore: number;
  traceScore: number;
  preBlendScore: number; // the 5th dimension unique to CHA
  summary: string;
}

const TIERS: TierProfile[] = [
  {
    key: 'chinese-monomer',
    label: 'Chinese cosmetic-grade monomer (Jiangsu direct)',
    short: 'Jiangsu direct',
    priceScore: 10,
    certScore: 5,
    leadScore: 7,
    traceScore: 6,
    preBlendScore: 1,
    summary:
      'Cheapest unit price for pure monomer; thin paperwork pack; 100 kg minimum; traceability depends on which specific Jiangsu plant you reach; no pre-blended convenience.',
  },
  {
    key: 'trader-repack',
    label: 'Trader / repack (Dongguan, Shanghai)',
    short: 'Trader repack',
    priceScore: 8,
    certScore: 6,
    leadScore: 9,
    traceScore: 7,
    preBlendScore: 3,
    summary:
      'Best indie-brand economics for monomer; flex MOQ 25-200 kg; ISO 22716 repack layer adds documentation defence; some traders offer low-end pre-blended options at modest premium over separate RFQ.',
  },
  {
    key: 'korean-japanese',
    label: 'Korean / Japanese pharma-adjacent',
    short: 'KR/JP pharma-adj',
    priceScore: 5,
    certScore: 9,
    leadScore: 6,
    traceScore: 9,
    preBlendScore: 4,
    summary:
      'Documented tautomer separation, Fe-chelation efficiency as mandatory CoA field, pharma-adjacent facility; 99.5% minimum HPLC; 15-20 day lead time; retailer-audit friendly for Japanese/Korean quasi-drug filings.',
  },
  {
    key: 'pre-blended',
    label: 'Pre-blended commercial systems (Inolex Spectrastat, Minasolve AromaStat, Ashland Optiphen MIT-free)',
    short: 'Pre-blended brand',
    priceScore: 2,
    certScore: 10,
    leadScore: 7,
    traceScore: 10,
    preBlendScore: 10,
    summary:
      'Three-component hurdle delivered as one SKU; pre-cleared ISO 11930 data pack; retailer-recognized brand file; 20 kg pail minimum; 3-4x unit CHA-equivalent cost but formulation-hours and audit-cycle savings usually offset.',
  },
];

export default function CHASupplierTierDecisionMatrix() {
  const [priceWeight, setPriceWeight] = useState(5);
  const [certWeight, setCertWeight] = useState(5);
  const [leadWeight, setLeadWeight] = useState(5);
  const [traceWeight, setTraceWeight] = useState(5);
  const [preBlendWeight, setPreBlendWeight] = useState(5);

  const ranked = useMemo(() => {
    const totalWeight =
      priceWeight + certWeight + leadWeight + traceWeight + preBlendWeight || 1;
    return [...TIERS]
      .map((t) => {
        const raw =
          t.priceScore * priceWeight +
          t.certScore * certWeight +
          t.leadScore * leadWeight +
          t.traceScore * traceWeight +
          t.preBlendScore * preBlendWeight;
        const normalized = Math.round((raw / (totalWeight * 10)) * 100);
        return { ...t, score: normalized };
      })
      .sort((a, b) => b.score - a.score);
  }, [priceWeight, certWeight, leadWeight, traceWeight, preBlendWeight]);

  const sliders: Array<{
    label: string;
    value: number;
    setter: (n: number) => void;
    hint: string;
  }> = [
    {
      label: 'Unit price matters',
      value: priceWeight,
      setter: setPriceWeight,
      hint: 'Cash-sensitive, early-stage, no retailer gate yet',
    },
    {
      label: 'Certification depth matters',
      value: certWeight,
      setter: setCertWeight,
      hint: 'Clean-beauty retailer audits, ECOCERT / COSMOS claims, EU PIF, Japanese quasi-drug',
    },
    {
      label: 'Lead time matters',
      value: leadWeight,
      setter: setLeadWeight,
      hint: 'Launch deadline close, limited runway for 20-day ocean freight',
    },
    {
      label: 'Traceability matters',
      value: traceWeight,
      setter: setTraceWeight,
      hint: 'Fe-chelation CoA consistency, plant-level origin, tautomer-purity defensibility',
    },
    {
      label: 'Pre-blend convenience matters',
      value: preBlendWeight,
      setter: setPreBlendWeight,
      hint: 'Pre-cleared ISO 11930 data pack, retailer brand file, single-SKU inventory simplicity',
    },
  ];

  return (
    <div className="my-8 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        CHA Supplier Tier Decision Matrix
      </h3>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        Slide each priority (0 = ignore, 10 = critical). The fifth dimension — pre-blend
        convenience — is unique to CHA procurement and often reorders tiers that look similar on
        price alone.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sliders.map((s) => (
          <div
            key={s.label}
            className="rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                {s.label}
              </label>
              <span className="font-mono text-sm text-neutral-900 dark:text-neutral-100">
                {s.value}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={s.value}
              onChange={(e) => s.setter(Number(e.target.value))}
              className="w-full accent-blue-600"
              aria-label={s.label}
            />
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{s.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {ranked.map((t, idx) => (
          <div
            key={t.key}
            className={`rounded-md border p-4 ${
              idx === 0
                ? 'border-blue-400 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/40'
                : 'border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950'
            }`}
          >
            <div className="mb-1 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    idx === 0
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                  }`}
                >
                  {idx + 1}
                </span>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {t.label}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <div
                    className={idx === 0 ? 'h-full bg-blue-600' : 'h-full bg-neutral-500'}
                    style={{ width: `${Math.max(5, t.score)}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-neutral-700 dark:text-neutral-300">
                  {t.score}
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">{t.summary}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-500">
        Scores normalized to 0-100. The pre-blend dimension often flips rankings in ways price
        alone cannot predict — a brand that needs Credo Beauty audit clearance on a 25 kg annual
        pull usually sees Tier 4 win even with price weight set at 10.
      </p>
    </div>
  );
}
