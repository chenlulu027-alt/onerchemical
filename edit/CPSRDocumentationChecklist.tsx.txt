'use client';

import { useMemo, useState } from 'react';

type ProductType =
  | 'leave-on-face'
  | 'rinse-off-body'
  | 'leave-on-child-over-3'
  | 'leave-on-child-under-3'
  | 'oral-care'
  | 'eye-area'
  | 'aerosol-spray';

type MarketStrictness = 'eu-only' | 'eu-plus-uk' | 'eu-plus-non-eu';

interface DocItem {
  id: string;
  label: string;
  partA: boolean; // relevant to CPSR Part A (safety information)
  partB: boolean; // relevant to CPSR Part B (assessment)
  mandatoryFor: ProductType[];
  marketStrictness?: MarketStrictness[];
  note: string;
}

const DOC_ITEMS: DocItem[] = [
  {
    id: 'supplier-coa-annex-v-entry',
    label: 'Supplier CoA with explicit Annex V entry number for each preservative',
    partA: true,
    partB: false,
    mandatoryFor: ['leave-on-face', 'rinse-off-body', 'leave-on-child-over-3', 'leave-on-child-under-3', 'oral-care', 'eye-area', 'aerosol-spray'],
    note: 'Most supplier CoAs omit the Annex V entry number. Specify it in the RFQ; a supplier that cannot add it to the CoA has no process to track the regulatory tie-up.',
  },
  {
    id: 'supplier-change-notification-clause',
    label: 'Signed 60-day change-notification clause (source / process / purity grade)',
    partA: true,
    partB: false,
    mandatoryFor: ['leave-on-face', 'rinse-off-body', 'leave-on-child-over-3', 'leave-on-child-under-3', 'oral-care', 'eye-area', 'aerosol-spray'],
    note: 'Required to discharge Article 5 of 1223/2009 obligation. Without it, you cannot prove to a competent authority that your PIF reflects current material.',
  },
  {
    id: 'challenge-test-iso-11930',
    label: 'ISO 11930 challenge test on finished product (within last 24 months)',
    partA: true,
    partB: true,
    mandatoryFor: ['leave-on-face', 'rinse-off-body', 'leave-on-child-over-3', 'leave-on-child-under-3', 'oral-care', 'eye-area'],
    note: 'Preservation efficacy evidence. Criterion A for leave-on and child; Criterion B acceptable for rinse-off with risk justification.',
  },
  {
    id: 'challenge-test-child-criterion-a',
    label: 'ISO 11930 Criterion A compliance explicitly cited (not Criterion B) for child-under-3',
    partA: true,
    partB: true,
    mandatoryFor: ['leave-on-child-under-3'],
    note: 'Criterion B is not defensible for child-under-3 products. Reviewers routinely flag this gap.',
  },
  {
    id: 'stability-study',
    label: 'Stability study covering shelf life + 1 use cycle, with preservative concentration measured at T0 and T-end',
    partA: true,
    partB: true,
    mandatoryFor: ['leave-on-face', 'rinse-off-body', 'leave-on-child-over-3', 'leave-on-child-under-3', 'oral-care', 'eye-area', 'aerosol-spray'],
    note: 'Preservative loss over time is a Part B assessor flag. Target: less than 10% loss at T-end.',
  },
  {
    id: 'sum-of-parabens-worksheet',
    label: 'Sum-of-parabens worksheet (entry 12) if two or more parabens used',
    partA: false,
    partB: true,
    mandatoryFor: ['leave-on-face', 'rinse-off-body', 'leave-on-child-over-3', 'oral-care', 'eye-area'],
    note: 'The 0.8% cap for mixtures is calculated as free acid, not as the sodium salt. Common assessor finding.',
  },
  {
    id: 'child-nappy-paraben-exclusion',
    label: 'Propyl/Butyl paraben exclusion certificate for leave-on nappy-area products under 3',
    partA: true,
    partB: true,
    mandatoryFor: ['leave-on-child-under-3'],
    note: 'Entry 12 restriction. Required even if product is not explicitly marketed for nappy area but could be used there.',
  },
  {
    id: 'formaldehyde-release-warning',
    label: 'Free formaldehyde measurement + warning label plan if above 0.05%',
    partA: true,
    partB: true,
    mandatoryFor: ['leave-on-face', 'rinse-off-body', 'leave-on-child-over-3', 'leave-on-child-under-3', 'oral-care', 'eye-area'],
    note: 'Applies to DMDM Hydantoin, Imidazolidinyl Urea, Sodium Hydroxymethylglycinate and other formaldehyde-releasers.',
  },
  {
    id: 'rinse-off-only-use-statement',
    label: 'Rinse-off-only product classification statement (for MIT, MCI/MIT, IPBC in applicable forms, etc.)',
    partA: true,
    partB: false,
    mandatoryFor: ['rinse-off-body'],
    note: 'Several Annex V entries are rinse-off-only. Leave-on use voids the preservative’s legal basis.',
  },
  {
    id: 'eye-area-safety-margin',
    label: 'Enhanced safety margin calculation (MoS) for eye-area products',
    partA: false,
    partB: true,
    mandatoryFor: ['eye-area'],
    note: 'Several Annex V preservatives have eye-area cautions (Benzalkonium above 0.0001%). Document the MoS explicitly.',
  },
  {
    id: 'aerosol-inhalation-assessment',
    label: 'Inhalation exposure assessment for aerosol/spray products',
    partA: false,
    partB: true,
    mandatoryFor: ['aerosol-spray'],
    note: 'Several Annex V entries (Ethyl Lauroyl Arginate, among others) restrict spray use.',
  },
  {
    id: 'oral-exposure-model',
    label: 'Oral exposure model (ingestion fraction) for oral care products',
    partA: false,
    partB: true,
    mandatoryFor: ['oral-care'],
    note: 'Specific sub-caps apply (Inorganic Sulphites 0.2% as SO2; Zinc Pyrithione excluded).',
  },
  {
    id: 'uk-opss-dual-file',
    label: 'UK SCPN notification parallel to EU CPNP (UK Office for Product Safety and Standards)',
    partA: false,
    partB: false,
    mandatoryFor: ['leave-on-face', 'rinse-off-body', 'leave-on-child-over-3', 'leave-on-child-under-3', 'oral-care', 'eye-area', 'aerosol-spray'],
    marketStrictness: ['eu-plus-uk'],
    note: 'Post-Brexit UK requires a separate notification via SCPN; MHRA and OPSS are the enforcement bodies.',
  },
  {
    id: 'non-eu-market-mapping',
    label: 'Non-EU market compliance mapping (MoCRA, NMPA, Japan quasi-drug, Korea KFDA) for the same formula',
    partA: false,
    partB: false,
    mandatoryFor: ['leave-on-face', 'rinse-off-body', 'leave-on-child-over-3', 'leave-on-child-under-3', 'oral-care', 'eye-area', 'aerosol-spray'],
    marketStrictness: ['eu-plus-non-eu'],
    note: 'Not Annex V itself, but a procurement reality for brands with multi-market SKUs. Keep the mapping in the PIF appendix.',
  },
];

const PRODUCT_LABELS: Record<ProductType, string> = {
  'leave-on-face': 'Leave-on face product',
  'rinse-off-body': 'Rinse-off body product',
  'leave-on-child-over-3': 'Leave-on, child 3+',
  'leave-on-child-under-3': 'Leave-on, child under 3',
  'oral-care': 'Oral care',
  'eye-area': 'Eye-area',
  'aerosol-spray': 'Aerosol / spray',
};

const MARKET_LABELS: Record<MarketStrictness, string> = {
  'eu-only': 'EU only',
  'eu-plus-uk': 'EU + UK',
  'eu-plus-non-eu': 'EU + non-EU markets',
};

export default function CPSRDocumentationChecklist() {
  const [product, setProduct] = useState<ProductType>('leave-on-face');
  const [market, setMarket] = useState<MarketStrictness>('eu-only');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const items = useMemo(() => {
    return DOC_ITEMS.filter((item) => {
      if (!item.mandatoryFor.includes(product)) return false;
      if (item.marketStrictness && !item.marketStrictness.includes(market)) return false;
      return true;
    });
  }, [product, market]);

  const partA = items.filter((i) => i.partA);
  const partB = items.filter((i) => i.partB);
  const other = items.filter((i) => !i.partA && !i.partB);
  const doneCount = items.filter((i) => checked[i.id]).length;

  return (
    <div className="my-8 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        CPSR Annex V Documentation Checklist
      </h3>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        Select product type and market scope. The checklist shows the Annex V evidence a competent authority or audit assessor expects in your Product Information File.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Product type
          </span>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value as ProductType)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(PRODUCT_LABELS) as ProductType[]).map((k) => (
              <option key={k} value={k}>
                {PRODUCT_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Market scope
          </span>
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value as MarketStrictness)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(MARKET_LABELS) as MarketStrictness[]).map((k) => (
              <option key={k} value={k}>
                {MARKET_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 text-xs text-neutral-600 dark:text-neutral-400">
        {doneCount} of {items.length} items checked.
      </div>

      <Section title="CPSR Part A (Safety Information)" items={partA} checked={checked} setChecked={setChecked} />
      <Section title="CPSR Part B (Safety Assessment)" items={partB} checked={checked} setChecked={setChecked} />
      {other.length > 0 ? (
        <Section title="Market-Scope Addenda" items={other} checked={checked} setChecked={setChecked} />
      ) : null}

      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-500">
        This checklist is a working audit aid, not a legal substitute. Final PIF content is signed off by your Responsible Person (RP) and, for Part B, the Safety Assessor.
      </p>
    </div>
  );
}

function Section({
  title,
  items,
  checked,
  setChecked,
}: {
  title: string;
  items: DocItem[];
  checked: Record<string, boolean>;
  setChecked: (fn: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mt-5">
      <h4 className="mb-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">{title}</h4>
      <ul className="space-y-2">
        {items.map((i) => (
          <li
            key={i.id}
            className="rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={!!checked[i.id]}
                onChange={(e) =>
                  setChecked((prev) => ({ ...prev, [i.id]: e.target.checked }))
                }
                className="mt-0.5 h-4 w-4 shrink-0"
              />
              <div>
                <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {i.label}
                </div>
                <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{i.note}</div>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
