'use client';

import { useMemo, useState } from 'react';

type Tier = 'commodity' | 'trader' | 'korean-japanese' | 'branded-eu';
type Quantity = '25' | '100' | '500' | '1000';

interface PriceCell {
  low: number;
  high: number;
  notes: string;
}

const TIER_LABELS: Record<Tier, string> = {
  commodity: 'Chinese commodity (Jiangsu/Shandong direct)',
  trader: 'Trader / repack (Dongguan, Shanghai)',
  'korean-japanese': 'Korean / Japanese pharma-adjacent',
  'branded-eu': 'Branded EU (Hydrolite 6, Minasolve)',
};

const QUANTITY_LABELS: Record<Quantity, string> = {
  '25': '25 kg (single pail)',
  '100': '100 kg (indie sweet spot)',
  '500': '500 kg (mid-brand)',
  '1000': '1000 kg+ (direct-plant threshold)',
};

// 2026 Q4 FOB China cosmetic-grade benchmark (USD/kg)
const PRICE_MATRIX: Record<Tier, Record<Quantity, PriceCell>> = {
  commodity: {
    '25': { low: 16, high: 19, notes: 'Repack premium; traders usually source here' },
    '100': { low: 12, high: 14, notes: 'Direct-plant minimum; 7-10 day lead time' },
    '500': { low: 10, high: 12, notes: 'Volume break; dossier overhead begins' },
    '1000': { low: 9, high: 11, notes: 'Direct-plant price; requires annual contract' },
  },
  trader: {
    '25': { low: 18, high: 22, notes: 'Flex MOQ, warehouse stock; USD 50-80 sample charge' },
    '100': { low: 14, high: 18, notes: 'Best indie-brand economics; ISO 22716 repack' },
    '500': { low: 13, high: 16, notes: 'Trader margin thins; direct-plant becomes competitive' },
    '1000': { low: 12, high: 15, notes: 'Rarely competitive vs direct at this volume' },
  },
  'korean-japanese': {
    '25': { low: 24, high: 28, notes: 'Pharma-adjacent facility; 99.5% min GC assay' },
    '100': { low: 18, high: 22, notes: 'Documented isomer separation; REACH pack included' },
    '500': { low: 16, high: 19, notes: 'Full dossier for retailer audit; 15-20 day lead time' },
    '1000': { low: 15, high: 18, notes: 'Annual-contract pricing; distributor network' },
  },
  'branded-eu': {
    '25': { low: 55, high: 75, notes: 'Pail minimum via Symrise distributor' },
    '100': { low: 45, high: 70, notes: 'Hydrolite 6; Ecocert/COSMOS options; brand file on retailer desks' },
    '500': { low: 42, high: 65, notes: 'Price holds; buying brand recognition, not cheaper molecule' },
    '1000': { low: 40, high: 62, notes: 'Direct Symrise contract; minimal further break' },
  },
};

export default function HexanediolPriceBenchmarkTable() {
  const [tierFilter, setTierFilter] = useState<Tier | 'all'>('all');
  const [quantityFilter, setQuantityFilter] = useState<Quantity | 'all'>('all');

  const rows = useMemo(() => {
    const tiers: Tier[] =
      tierFilter === 'all'
        ? (['commodity', 'trader', 'korean-japanese', 'branded-eu'] as Tier[])
        : [tierFilter];
    const quantities: Quantity[] =
      quantityFilter === 'all' ? (['25', '100', '500', '1000'] as Quantity[]) : [quantityFilter];

    const out: Array<{ tier: Tier; quantity: Quantity; cell: PriceCell }> = [];
    for (const tier of tiers) {
      for (const quantity of quantities) {
        out.push({ tier, quantity, cell: PRICE_MATRIX[tier][quantity] });
      }
    }
    return out;
  }, [tierFilter, quantityFilter]);

  return (
    <div className="my-8 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            2026 Q4 1,2-Hexanediol FOB China Price Benchmark
          </h3>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Cosmetic-grade only. Excludes freight &amp; import duties. Verified against supplier
            quotes October 2026.
          </p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Supplier tier
          </span>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value as Tier | 'all')}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            <option value="all">All tiers</option>
            <option value="commodity">Chinese commodity (direct plant)</option>
            <option value="trader">Trader / repack</option>
            <option value="korean-japanese">Korean / Japanese pharma-adjacent</option>
            <option value="branded-eu">Branded EU (Hydrolite 6)</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Order quantity
          </span>
          <select
            value={quantityFilter}
            onChange={(e) => setQuantityFilter(e.target.value as Quantity | 'all')}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            <option value="all">All quantities</option>
            <option value="25">25 kg</option>
            <option value="100">100 kg (indie sweet spot)</option>
            <option value="500">500 kg</option>
            <option value="1000">1000 kg+</option>
          </select>
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-left dark:border-neutral-800 dark:bg-neutral-900">
              <th className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-300">
                Tier
              </th>
              <th className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-300">
                Quantity
              </th>
              <th className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-300">
                Price (USD/kg)
              </th>
              <th className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-300">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={`${row.tier}-${row.quantity}`}
                className={
                  idx % 2 === 0
                    ? 'border-b border-neutral-200 dark:border-neutral-800'
                    : 'border-b border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/40'
                }
              >
                <td className="px-3 py-2 align-top text-neutral-800 dark:text-neutral-200">
                  {TIER_LABELS[row.tier]}
                </td>
                <td className="px-3 py-2 align-top text-neutral-700 dark:text-neutral-300">
                  {QUANTITY_LABELS[row.quantity]}
                </td>
                <td className="px-3 py-2 align-top font-mono text-neutral-900 dark:text-neutral-100">
                  USD {row.cell.low}&ndash;{row.cell.high}/kg
                </td>
                <td className="px-3 py-2 align-top text-xs text-neutral-600 dark:text-neutral-400">
                  {row.cell.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-500">
        Price bands reflect the typical 85th-percentile range of serious cosmetic-grade quotes;
        quotes below the band usually fail one of the seven CoA red flags described below.
      </p>
    </div>
  );
}
