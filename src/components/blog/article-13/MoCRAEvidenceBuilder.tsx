'use client';

import { useMemo, useState } from 'react';

type ProductType =
  | 'leave-on-face'
  | 'rinse-off-body'
  | 'eye-area'
  | 'long-wear-color'
  | 'rinse-off-hair'
  | 'baby-leave-on';

type MarketScope = 'us-only' | 'us-plus-eu' | 'us-plus-asia' | 'us-plus-global';

type BusinessSize = 'small-exempt' | 'small-carveout' | 'standard' | 'large';

type EvidenceItem = {
  layer: 'challenge-test' | 'stability' | 'toxicology' | 'labeling' | 'batch-record' | 'facility' | 'state';
  label: string;
  detail: string;
  cadence: string;
};

const PRODUCT_LABELS: Record<ProductType, string> = {
  'leave-on-face': 'Leave-on face skincare',
  'rinse-off-body': 'Rinse-off body cleanser',
  'eye-area': 'Eye-area product (mascara, liner, eye cream)',
  'long-wear-color': 'Long-wear color cosmetic (>24h)',
  'rinse-off-hair': 'Rinse-off hair care',
  'baby-leave-on': 'Baby leave-on skincare',
};

const MARKET_LABELS: Record<MarketScope, string> = {
  'us-only': 'US only',
  'us-plus-eu': 'US + EU',
  'us-plus-asia': 'US + Asia (China / Japan / Korea)',
  'us-plus-global': 'US + Global multi-market',
};

const SIZE_LABELS: Record<BusinessSize, string> = {
  'small-exempt': 'Small business (<USD 1M US sales, exempt category)',
  'small-carveout': 'Small business (<USD 1M US sales, carveout product)',
  'standard': 'Standard (USD 1M to USD 50M US sales)',
  'large': 'Large (USD 50M+ US sales)',
};

const BASE_EVIDENCE: EvidenceItem[] = [
  {
    layer: 'challenge-test',
    label: 'ISO 11930 or USP <51> Challenge Test',
    detail: 'Five-strain inoculum, 28-day timepoints, Criterion A for eye-area and baby products, Criterion B minimum for other categories. Qualified lab, signed report.',
    cadence: 'Every 24 months or on any formulation change affecting preservation',
  },
  {
    layer: 'stability',
    label: 'Stability study with preservative assay at T0 and T-end',
    detail: 'Shelf life plus one use cycle. Preservative concentration measured by HPLC or GC. Target: less than 10% loss at T-end.',
    cadence: 'Every 24 months or on packaging / formulation change',
  },
  {
    layer: 'toxicology',
    label: 'Toxicological assessment for each ingredient',
    detail: 'Cross-reference to published toxicology (SCCS opinions, CIR reviews, GRAS determinations). Exposure calculation for leave-on products.',
    cadence: 'Every 60 months or on ingredient change',
  },
  {
    layer: 'labeling',
    label: 'Label-to-listing match verification',
    detail: 'Ingredient list order matches formulation weight order; preservative concentration range on label brackets actual use level; warning statements present where required.',
    cadence: 'On every label change or listing update',
  },
  {
    layer: 'batch-record',
    label: 'Batch records with preservative lot traceability',
    detail: 'Each finished-product batch cross-references preservative supplier CoA lot number. Retained sample held for shelf life plus 12 months.',
    cadence: 'Per production batch',
  },
  {
    layer: 'facility',
    label: 'Facility registration currency check',
    detail: 'FDA cosmetic facility registration number active in FDA Industry Systems. Biennial renewal before December 31 of even years.',
    cadence: 'Quarterly verification; biennial renewal filing',
  },
];

function buildEvidence(product: ProductType, market: MarketScope, size: BusinessSize): EvidenceItem[] {
  const items: EvidenceItem[] = [];
  const small = size === 'small-exempt';
  const smallCarveout = size === 'small-carveout';

  if (!small) {
    items.push(...BASE_EVIDENCE);
  } else {
    items.push(
      {
        layer: 'challenge-test',
        label: 'ISO 11930 or USP <51> Challenge Test (recommended)',
        detail: 'Small-business facility registration exemption does NOT exempt from adequate substantiation of safety. Challenge Test is the industry-standard evidence.',
        cadence: 'Every 24 months or on formulation change',
      },
      {
        layer: 'toxicology',
        label: 'Toxicological assessment for each ingredient',
        detail: 'Required under section 608 regardless of small-business exemption from registration / listing.',
        cadence: 'Every 60 months or on ingredient change',
      },
      {
        layer: 'labeling',
        label: 'Label compliance per 21 CFR 701',
        detail: 'Ingredient list, net quantity, identity statement, name and place of business of manufacturer, packer or distributor.',
        cadence: 'On every label change',
      },
    );
  }

  if (smallCarveout) {
    items.push({
      layer: 'facility',
      label: 'Facility registration TRIGGERED by carveout product',
      detail: 'Products that contact mucous membrane of the eye, are injected, are intended for internal use, or alter appearance for more than 24 hours trigger full registration even below USD 1M US sales.',
      cadence: 'Biennial renewal from first US distribution date',
    });
  }

  if (product === 'eye-area' || product === 'baby-leave-on') {
    items.push({
      layer: 'challenge-test',
      label: 'Challenge Test Criterion A required',
      detail: 'Eye-area and baby-skincare categories require the stricter Criterion A log-reduction thresholds. Criterion B alone is insufficient evidence for these categories.',
      cadence: 'Every 24 months; re-run on supplier change',
    });
  }

  if (product === 'long-wear-color') {
    items.push({
      layer: 'facility',
      label: 'Small-business carveout APPLIES',
      detail: 'Products intended to alter appearance for more than 24 hours and not removed by the consumer are a carveout category — facility registration required even below USD 1M US sales.',
      cadence: 'Biennial renewal',
    });
  }

  if (market === 'us-plus-eu' || market === 'us-plus-global') {
    items.push({
      layer: 'toxicology',
      label: 'EU CPSR Part A and Part B (for EU distribution)',
      detail: 'EU requires a signed Safety Assessor CPSR in addition to MoCRA substantiation records. Shared evidence base; separate document.',
      cadence: 'On formulation change; reviewed annually',
    });
  }

  if (market === 'us-plus-asia' || market === 'us-plus-global') {
    items.push({
      layer: 'toxicology',
      label: 'China NMPA / IECIC 2021 alignment',
      detail: 'China requires ingredient alignment with IECIC 2021 inventory and finished-product notification. Shared safety data; separate notification.',
      cadence: 'On formulation change; annual confirmation',
    });
  }

  items.push({
    layer: 'state',
    label: 'California Prop 65 and Safe Cosmetics Program screening',
    detail: 'Check preservative ingredients against the Prop 65 list and California Safe Cosmetics Program Designated List. Report to CDPH if any Designated List ingredient is present.',
    cadence: 'On formulation change; annual confirmation',
  });

  items.push({
    layer: 'state',
    label: 'Washington Toxic-Free Cosmetics Act screening',
    detail: 'Check for intentionally added formaldehyde / formaldehyde-releasers above WA thresholds, specific parabens, and PFAS. Distribution into WA prohibited above thresholds.',
    cadence: 'On formulation change',
  });

  if (product !== 'rinse-off-hair' && product !== 'rinse-off-body') {
    items.push({
      layer: 'state',
      label: 'New York 1,4-dioxane 1 ppm cap compliance',
      detail: 'Residual 1,4-dioxane in phenoxyethanol-preserved products must be below 1 ppm in the finished product for NY distribution. Supplier CoA audit required.',
      cadence: 'Per supplier lot; annual confirmation',
    });
  }

  return items;
}

const LAYER_COLORS: Record<EvidenceItem['layer'], string> = {
  'challenge-test': 'bg-blue-50 border-blue-300 text-blue-900 dark:bg-blue-950/40 dark:border-blue-700 dark:text-blue-100',
  'stability': 'bg-indigo-50 border-indigo-300 text-indigo-900 dark:bg-indigo-950/40 dark:border-indigo-700 dark:text-indigo-100',
  'toxicology': 'bg-violet-50 border-violet-300 text-violet-900 dark:bg-violet-950/40 dark:border-violet-700 dark:text-violet-100',
  'labeling': 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-100',
  'batch-record': 'bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/40 dark:border-amber-700 dark:text-amber-100',
  'facility': 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-950/40 dark:border-rose-700 dark:text-rose-100',
  'state': 'bg-teal-50 border-teal-300 text-teal-900 dark:bg-teal-950/40 dark:border-teal-700 dark:text-teal-100',
};

const LAYER_LABELS: Record<EvidenceItem['layer'], string> = {
  'challenge-test': 'Challenge Test',
  'stability': 'Stability',
  'toxicology': 'Toxicology',
  'labeling': 'Labeling',
  'batch-record': 'Batch Record',
  'facility': 'Facility',
  'state': 'State Overlay',
};

export default function MoCRAEvidenceBuilder() {
  const [product, setProduct] = useState<ProductType>('leave-on-face');
  const [market, setMarket] = useState<MarketScope>('us-only');
  const [size, setSize] = useState<BusinessSize>('standard');

  const evidence = useMemo(() => buildEvidence(product, market, size), [product, market, size]);

  return (
    <div className="my-8 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        MoCRA Safety Substantiation Evidence Builder
      </h3>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        Select product type, market scope and business size. The evidence stack updates to show
        what FDA cosmetic inspectors expect to find on record under section 608.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
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
            onChange={(e) => setMarket(e.target.value as MarketScope)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(MARKET_LABELS) as MarketScope[]).map((k) => (
              <option key={k} value={k}>
                {MARKET_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Business size
          </span>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as BusinessSize)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(SIZE_LABELS) as BusinessSize[]).map((k) => (
              <option key={k} value={k}>
                {SIZE_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 space-y-3">
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          {evidence.length} evidence records required. All must be current at the time of FDA
          inspection and available within 15 business days of FDA request.
        </p>
        {evidence.map((item, idx) => (
          <div
            key={`${item.layer}-${idx}`}
            className={`rounded-md border p-3 ${LAYER_COLORS[item.layer]}`}
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="inline-flex rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide dark:bg-black/30">
                {LAYER_LABELS[item.layer]}
              </span>
              <h4 className="text-sm font-semibold">{item.label}</h4>
            </div>
            <p className="text-xs leading-relaxed opacity-90">{item.detail}</p>
            <p className="mt-2 text-[11px] font-medium opacity-80">
              Cadence: {item.cadence}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-500">
        Evidence list is a working audit aid, not a legal substitute. Final determination of
        adequate substantiation under FD&amp;C section 608 rests with the qualified individual
        signing off on the safety substantiation record for each product.
      </p>
    </div>
  );
}
