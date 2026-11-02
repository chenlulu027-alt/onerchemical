'use client';

import { useMemo, useState } from 'react';

type Tier = 'commodity' | 'trader' | 'korean-japanese' | 'branded-eu';

interface TierProfile {
  key: Tier;
  label: string;
  short: string;
  // Scores 1-10 across each dimension; higher is better for the buyer
  priceScore: number; // higher = cheaper
  certScore: number; // higher = deeper paperwork
  leadScore: number; // higher = faster
  traceScore: number; // higher = more defensible origin story
  summary: string;
}

const TIERS: TierProfile[] = [
  {
    key: 'commodity',
    label: 'Chinese commodity (Jiangsu/Shandong direct)',
    short: 'Direct plant',
    priceScore: 10,
    certScore: 5,
    leadScore: 7,
    traceScore: 6,
    summary:
      'Cheapest unit price; thin paperwork pack; 100kg minimum; traceability depends on which specific plant you reach.',
  },
  {
    key: 'trader',
    label: 'Trader / repack (Dongguan, Shanghai)',
    short: 'Trader repack',
    priceScore: 8,
    certScore: 6,
    leadScore: 9,
    traceScore: 7,
    summary:
      'Best indie-brand economics; flex MOQ 25-200kg; ISO 22716 repack layer adds documentation defense; 10-15 day lead time from warehouse stock.',
  },
  {
    key: 'korean-japanese',
    label: 'Korean / Japanese pharma-adjacent',
    short: 'KR/JP pharma-adj',
    priceScore: 5,
    certScore: 9,
    leadScore: 6,
    traceScore: 9,
    summary:
      'Documented isomer separation; full REACH + non-animal pack; 99.5% minimum GC assay; 15-20 day lead time; retailer-audit friendly.',
  },
  {
    key: 'branded-eu',
    label: 'Branded EU (Hydrolite 6, Minasolve)',
    short: 'Branded EU',
    priceScore: 2,
    certScore: 10,
    leadScore: 5,
    traceScore: 10,
    summary:
      'European manufacturing; Ecocert/COSMOS options; brand file pre-cleared on major clean-beauty retailer desks; 3-4x unit price; shortcut through audit gates.',
  },
];

export default function HexanediolSupplierTierDecisionMatrix() {
  const [priceWeight, setPriceWeight] = useState(5);
  const [certWeight, setCertWeight] = useState(5);
  const [leadWeight, setLeadWeight] = useState(5);
  const [traceWeight, setTraceWeight] = useState(5);

  const ranked = useMemo(() => {
    const totalWeight = priceWeight + certWeight + leadWeight + traceWeight || 1;
    return [...TIERS]
      .map((t) => {
        const raw =
          t.priceScore * priceWeight +
          t.certScore * certWeight +
          t.leadScore * leadWeight +
          t.traceScore * traceWeight;
        const normalized = Math.round((raw / (totalWeight * 10)) * 100);
        return { ...t, score: normalized };
      })
      .sort((a, b) => b.score - a.score);
  }, [priceWeight, certWeight, leadWeight, traceWeight]);

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
      hint: 'Early-stage, cash-sensitive, no retailer gate yet',
    },
    {
      label: 'Certification depth matters',
      value: certWeight,
      setter: setCertWeight,
      hint: 'Clean-beauty retailer audits, Ecocert / COSMOS claims, EU PIF',
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
      hint: 'Brand story depends on plant-level origin, batch-to-batch isomer consistency',
    },
  ];

  return (
    <div className="my-8 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        Supplier Tier Decision Matrix
      </h3>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        Slide each priority (0 = ignore, 10 = critical). Tiers re-rank live.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sliders.map((s) => (
          <div key={s.label} className="rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900">
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
        Scores are normalized to 0-100. Ties are rare; where two tiers rank within 3 points, decide
        on the softer factors: existing supplier relationships, your freight-forwarder&apos;s China
        pickup capability, and whether your incoming QC can run GC in-house.
      </p>
    </div>
  );
}
