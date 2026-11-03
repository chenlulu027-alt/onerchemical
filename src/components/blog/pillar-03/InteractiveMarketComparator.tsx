'use client';

import { useMemo, useState } from 'react';

type MarketKey = 'eu' | 'us' | 'cn' | 'jp' | 'kr';
type StatusKey = 'allowed' | 'restricted' | 'prohibited' | 'unlisted';

interface MarketEntry {
  status: StatusKey;
  limit: string;
  productRestriction: string;
  reference: string;
  referenceUrl?: string;
  note?: string;
}

interface PreservativeData {
  slug: string;
  name: string;
  inci: string;
  cas: string;
  markets: Record<MarketKey, MarketEntry>;
}

const MARKET_LABELS: Record<MarketKey, string> = {
  eu: 'EU',
  us: 'US (MoCRA)',
  cn: 'China (NMPA)',
  jp: 'Japan (MHLW)',
  kr: 'Korea (MFDS)',
};

const STATUS_META: Record<StatusKey, { label: string; bg: string; border: string; dot: string; text: string }> = {
  allowed: {
    label: 'Allowed',
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    dot: 'bg-emerald-500',
    text: 'text-emerald-900',
  },
  restricted: {
    label: 'Restricted / conditional',
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    dot: 'bg-amber-500',
    text: 'text-amber-900',
  },
  prohibited: {
    label: 'Prohibited',
    bg: 'bg-red-50',
    border: 'border-red-300',
    dot: 'bg-red-500',
    text: 'text-red-900',
  },
  unlisted: {
    label: 'Unlisted / multifunctional',
    bg: 'bg-slate-100',
    border: 'border-slate-300',
    dot: 'bg-slate-500',
    text: 'text-slate-900',
  },
};

const DATA: PreservativeData[] = [
  {
    slug: 'phenoxyethanol',
    name: 'Phenoxyethanol',
    inci: 'Phenoxyethanol',
    cas: '122-99-6',
    markets: {
      eu: {
        status: 'allowed',
        limit: '1.0% max',
        productRestriction: 'All cosmetic categories',
        reference: 'Annex V entry 29',
        referenceUrl: 'https://ec.europa.eu/growth/tools-databases/cosing/',
      },
      us: {
        status: 'allowed',
        limit: 'No federal limit',
        productRestriction: 'Safety substantiation under MoCRA',
        reference: 'MoCRA 2022; CIR safe at 1%',
        note: 'California Prop 65 monitoring for 1,4-dioxane trace',
      },
      cn: {
        status: 'allowed',
        limit: '1.0% max',
        productRestriction: 'All cosmetic categories',
        reference: 'STSC 2015 Table 4 serial 55',
      },
      jp: {
        status: 'allowed',
        limit: '1.0% max',
        productRestriction: 'Cosmetics; quasi-drug: separate JSQI entry',
        reference: 'Cosmetics Standard positive list',
      },
      kr: {
        status: 'allowed',
        limit: '1.0% max',
        productRestriction: 'All cosmetic categories',
        reference: '화장품 안전기준, Notice 2026-19',
      },
    },
  },
  {
    slug: 'ethylhexylglycerin',
    name: 'Ethylhexylglycerin (EHG)',
    inci: 'Ethylhexylglycerin',
    cas: '70445-33-9',
    markets: {
      eu: {
        status: 'unlisted',
        limit: 'Not on Annex V',
        productRestriction: 'Legal as skin-conditioning / deodorizing; preservative-function claim is non-compliant',
        reference: 'Not listed on Annex V',
        note: 'Marketing-claim scrutiny if used at preservative concentrations',
      },
      us: {
        status: 'allowed',
        limit: 'No federal limit',
        productRestriction: 'All cosmetic categories; safety substantiation',
        reference: 'MoCRA 2022; CIR advisory',
      },
      cn: {
        status: 'unlisted',
        limit: 'Not on STSC Table 4',
        productRestriction: 'Must be in IECIC List I/II; non-preservative function',
        reference: 'IECIC List I (CAS 70445-33-9)',
      },
      jp: {
        status: 'unlisted',
        limit: 'Not on positive list',
        productRestriction: 'Entrepreneurial-responsibility principle; usable if safety substantiated',
        reference: 'Not on Cosmetics Standard positive list',
      },
      kr: {
        status: 'unlisted',
        limit: 'Not on preservative list',
        productRestriction: 'Legal as multifunctional; preservative-function claim challenged',
        reference: 'Not on 화장품 안전기준 preservative Annex',
      },
    },
  },
  {
    slug: 'hexanediol',
    name: '1,2-Hexanediol',
    inci: 'Hexylene Glycol (Hexanediol)',
    cas: '6920-22-5',
    markets: {
      eu: {
        status: 'unlisted',
        limit: 'Not on Annex V',
        productRestriction: 'Legal as humectant / skin-conditioning; preservative claim non-compliant',
        reference: 'Not listed on Annex V',
      },
      us: {
        status: 'allowed',
        limit: 'No federal limit',
        productRestriction: 'Safety substantiation under MoCRA',
        reference: 'MoCRA 2022',
      },
      cn: {
        status: 'unlisted',
        limit: 'Not on STSC Table 4',
        productRestriction: 'In IECIC List I; multifunctional',
        reference: 'IECIC List I (CAS 6920-22-5)',
      },
      jp: {
        status: 'unlisted',
        limit: 'Not on positive list',
        productRestriction: 'Entrepreneurial responsibility',
        reference: 'Not on Cosmetics Standard positive list',
      },
      kr: {
        status: 'unlisted',
        limit: 'Not on preservative list',
        productRestriction: 'Multifunctional',
        reference: 'Not on 화장품 안전기준 preservative Annex',
      },
    },
  },
  {
    slug: 'caprylhydroxamic-acid',
    name: 'Caprylhydroxamic Acid (CHA)',
    inci: 'Caprylhydroxamic Acid',
    cas: '7377-03-9',
    markets: {
      eu: {
        status: 'unlisted',
        limit: 'Not on Annex V',
        productRestriction: 'Marketed as hurdle / chelator; preservative claim non-compliant',
        reference: 'Not listed on Annex V',
      },
      us: {
        status: 'allowed',
        limit: 'No federal limit',
        productRestriction: 'Safety substantiation under MoCRA',
        reference: 'MoCRA 2022',
      },
      cn: {
        status: 'unlisted',
        limit: 'Not on STSC Table 4',
        productRestriction: 'In IECIC; non-preservative function',
        reference: 'IECIC List I (CAS 7377-03-9)',
      },
      jp: {
        status: 'unlisted',
        limit: 'Not on positive list',
        productRestriction: 'Entrepreneurial responsibility',
        reference: 'Not on Cosmetics Standard positive list',
      },
      kr: {
        status: 'unlisted',
        limit: 'Not on preservative list',
        productRestriction: 'Multifunctional / hurdle',
        reference: 'Not on 화장품 안전기준 preservative Annex',
      },
    },
  },
  {
    slug: 'methylparaben',
    name: 'Methylparaben',
    inci: 'Methylparaben',
    cas: '99-76-3',
    markets: {
      eu: {
        status: 'allowed',
        limit: '0.4% single ester; 0.8% sum of parabens',
        productRestriction: 'All cosmetic categories',
        reference: 'Annex V entry 12',
      },
      us: {
        status: 'allowed',
        limit: 'No federal limit',
        productRestriction: 'CIR safe as used',
        reference: 'MoCRA 2022; CIR advisory',
      },
      cn: {
        status: 'allowed',
        limit: '0.4% single; 0.8% sum',
        productRestriction: 'All cosmetic categories',
        reference: 'STSC 2015 Table 4',
      },
      jp: {
        status: 'allowed',
        limit: '1.0% max',
        productRestriction: 'Cosmetics',
        reference: 'Cosmetics Standard positive list',
      },
      kr: {
        status: 'allowed',
        limit: '0.4% single; 0.8% sum',
        productRestriction: 'All cosmetic categories',
        reference: '화장품 안전기준, Notice 2026-19',
      },
    },
  },
  {
    slug: 'butylparaben',
    name: 'Butylparaben',
    inci: 'Butylparaben',
    cas: '94-26-8',
    markets: {
      eu: {
        status: 'restricted',
        limit: '0.14% single; 0.8% sum of parabens',
        productRestriction: 'Prohibited in leave-on products for children under 3 from 2027-02 (Omnibus Act IX entry 12b)',
        reference: 'Annex V entry 12a → 12b (Omnibus Act IX, WTO 2026-07)',
        note: 'Compliance deadline 2027-02-01 for CMR-driven amendments',
      },
      us: {
        status: 'allowed',
        limit: 'No federal limit',
        productRestriction: 'CIR safe at concentrations in use',
        reference: 'MoCRA 2022',
      },
      cn: {
        status: 'restricted',
        limit: '0.14% single; 0.8% sum',
        productRestriction: 'Not for leave-on child products',
        reference: 'STSC 2015 Table 4',
      },
      jp: {
        status: 'allowed',
        limit: '0.4% max',
        productRestriction: 'Cosmetics',
        reference: 'Cosmetics Standard positive list',
      },
      kr: {
        status: 'restricted',
        limit: '0.14% single; 0.8% sum',
        productRestriction: 'Not for leave-on child products',
        reference: '화장품 안전기준, Notice 2026-19',
      },
    },
  },
  {
    slug: 'mit',
    name: 'Methylisothiazolinone (MIT)',
    inci: 'Methylisothiazolinone',
    cas: '2682-20-4',
    markets: {
      eu: {
        status: 'restricted',
        limit: '0.0015% (15 ppm)',
        productRestriction: 'Rinse-off ONLY; prohibited in leave-on',
        reference: 'Annex V entry 57',
      },
      us: {
        status: 'allowed',
        limit: 'No federal limit',
        productRestriction: 'CIR safe in rinse-off at ≤100 ppm; leave-on cautioned',
        reference: 'MoCRA 2022; CIR advisory',
      },
      cn: {
        status: 'restricted',
        limit: '0.0015% (15 ppm)',
        productRestriction: 'Rinse-off ONLY',
        reference: 'STSC 2015 Table 4 serial 51',
      },
      jp: {
        status: 'restricted',
        limit: '0.01% leave-on; 0.1% rinse-off',
        productRestriction: 'Limits differ by category',
        reference: 'Cosmetics Standard positive list',
      },
      kr: {
        status: 'restricted',
        limit: '0.0015% (15 ppm)',
        productRestriction: 'Rinse-off ONLY',
        reference: '화장품 안전기준, Notice 2026-19',
      },
    },
  },
  {
    slug: 'formaldehyde',
    name: 'Formaldehyde (free form)',
    inci: 'Formaldehyde',
    cas: '50-00-0',
    markets: {
      eu: {
        status: 'prohibited',
        limit: 'Prohibited as added preservative',
        productRestriction: 'Formaldehyde-releaser labeling threshold dropped to 0.001% effective 2026-07-31',
        reference: 'Annex II; Regulation (EU) 2022/1181',
      },
      us: {
        status: 'restricted',
        limit: 'Allowed with warning labeling in some products',
        productRestriction: 'FDA cosmetics guidance; state restrictions (CA, MN)',
        reference: 'MoCRA 2022; state Prop 65',
      },
      cn: {
        status: 'prohibited',
        limit: 'Prohibited since 2021',
        productRestriction: 'NMPA Announcement No. 74 of 2021',
        reference: 'STSC prohibited list',
      },
      jp: {
        status: 'restricted',
        limit: 'Releasers only, no free formaldehyde',
        productRestriction: 'Cosmetics Standard restricted use',
        reference: 'Cosmetics Standard restricted',
      },
      kr: {
        status: 'restricted',
        limit: 'Rinse-off conditional',
        productRestriction: 'Only via releasers',
        reference: '화장품 안전기준, Notice 2026-19',
      },
    },
  },
  {
    slug: 'zinc-pyrithione',
    name: 'Zinc Pyrithione',
    inci: 'Zinc Pyrithione',
    cas: '13463-41-7',
    markets: {
      eu: {
        status: 'allowed',
        limit: '1.0% max in anti-dandruff rinse-off',
        productRestriction: 'Hair products rinse-off (anti-dandruff)',
        reference: 'Annex V entry 8',
      },
      us: {
        status: 'allowed',
        limit: 'OTC drug monograph',
        productRestriction: 'Anti-dandruff OTC category',
        reference: 'OTC Drug Monograph (not MoCRA preservative)',
      },
      cn: {
        status: 'prohibited',
        limit: 'Prohibited from 2028-01-01',
        productRestriction: 'NMPA Announcement No. 6 of 2026 — removed from Table 4, moved to prohibited list',
        reference: 'STSC 2015 Table 4 (removed)',
        note: 'Was permitted 1.0% rinse-off before 2026-01',
      },
      jp: {
        status: 'restricted',
        limit: '1.0% rinse-off',
        productRestriction: 'Quasi-drug for anti-dandruff claims',
        reference: 'Cosmetics Standard + JSQI',
      },
      kr: {
        status: 'restricted',
        limit: '0.5% rinse-off; prohibited in leave-on',
        productRestriction: 'Rinse-off only',
        reference: '화장품 안전기준, Notice 2026-19',
      },
    },
  },
  {
    slug: 'benzoic-acid',
    name: 'Benzoic Acid / Sodium Benzoate',
    inci: 'Benzoic Acid; Sodium Benzoate',
    cas: '65-85-0 / 532-32-1',
    markets: {
      eu: {
        status: 'allowed',
        limit: '2.5% leave-on; 1.7% rinse-off (acid eq.)',
        productRestriction: 'Depends on pH (effective below 5.0)',
        reference: 'Annex V entry 1',
      },
      us: {
        status: 'allowed',
        limit: 'No federal limit',
        productRestriction: 'CIR safe as used',
        reference: 'MoCRA 2022',
      },
      cn: {
        status: 'allowed',
        limit: '2.5% leave-on; 1.7% rinse-off',
        productRestriction: 'pH-dependent efficacy',
        reference: 'STSC 2015 Table 4',
      },
      jp: {
        status: 'allowed',
        limit: '1.0% max',
        productRestriction: 'Cosmetics',
        reference: 'Cosmetics Standard positive list',
      },
      kr: {
        status: 'allowed',
        limit: '2.5% leave-on; 1.7% rinse-off',
        productRestriction: 'pH-dependent',
        reference: '화장품 안전기준, Notice 2026-19',
      },
    },
  },
  {
    slug: 'sorbic-acid',
    name: 'Sorbic Acid / Potassium Sorbate',
    inci: 'Sorbic Acid; Potassium Sorbate',
    cas: '110-44-1 / 24634-61-5',
    markets: {
      eu: {
        status: 'allowed',
        limit: '0.6% (acid eq.)',
        productRestriction: 'pH-dependent (effective below 5.5)',
        reference: 'Annex V entry 4',
      },
      us: {
        status: 'allowed',
        limit: 'No federal limit',
        productRestriction: 'CIR safe as used',
        reference: 'MoCRA 2022',
      },
      cn: {
        status: 'allowed',
        limit: '0.6%',
        productRestriction: 'pH-dependent',
        reference: 'STSC 2015 Table 4',
      },
      jp: {
        status: 'allowed',
        limit: '0.5% max',
        productRestriction: 'Cosmetics',
        reference: 'Cosmetics Standard positive list',
      },
      kr: {
        status: 'allowed',
        limit: '0.6%',
        productRestriction: 'pH-dependent',
        reference: '화장품 안전기준, Notice 2026-19',
      },
    },
  },
  {
    slug: 'dha',
    name: 'Dehydroacetic Acid / Na-DHA',
    inci: 'Dehydroacetic Acid; Sodium Dehydroacetate',
    cas: '520-45-6 / 4418-26-2',
    markets: {
      eu: {
        status: 'allowed',
        limit: '0.6% acid eq.; prohibited in aerosols',
        productRestriction: 'All categories except aerosol',
        reference: 'Annex V entry 33',
      },
      us: {
        status: 'allowed',
        limit: 'No federal limit',
        productRestriction: 'Safety substantiation',
        reference: 'MoCRA 2022',
      },
      cn: {
        status: 'allowed',
        limit: '0.6%',
        productRestriction: 'All cosmetic categories',
        reference: 'STSC 2015 Table 4',
      },
      jp: {
        status: 'allowed',
        limit: '0.5% max',
        productRestriction: 'Cosmetics',
        reference: 'Cosmetics Standard positive list',
      },
      kr: {
        status: 'allowed',
        limit: '0.6%',
        productRestriction: 'All categories',
        reference: '화장품 안전기준, Notice 2026-19',
      },
    },
  },
  {
    slug: 'chlorphenesin',
    name: 'Chlorphenesin',
    inci: 'Chlorphenesin',
    cas: '104-29-0',
    markets: {
      eu: {
        status: 'allowed',
        limit: '0.3% max',
        productRestriction: 'All cosmetic categories',
        reference: 'Annex V entry 42',
      },
      us: {
        status: 'allowed',
        limit: 'No federal limit',
        productRestriction: 'Safety substantiation',
        reference: 'MoCRA 2022',
      },
      cn: {
        status: 'allowed',
        limit: '0.3%',
        productRestriction: 'All categories',
        reference: 'STSC 2015 Table 4',
      },
      jp: {
        status: 'allowed',
        limit: '0.3% max',
        productRestriction: 'Cosmetics',
        reference: 'Cosmetics Standard positive list',
      },
      kr: {
        status: 'allowed',
        limit: '0.3%',
        productRestriction: 'All categories',
        reference: '화장품 안전기준, Notice 2026-19',
      },
    },
  },
  {
    slug: 'caprylyl-glycol',
    name: 'Caprylyl Glycol',
    inci: 'Caprylyl Glycol',
    cas: '1117-86-8',
    markets: {
      eu: {
        status: 'unlisted',
        limit: 'Not on Annex V',
        productRestriction: 'Legal as skin-conditioning / humectant; preservative claim non-compliant',
        reference: 'Not listed on Annex V',
      },
      us: {
        status: 'allowed',
        limit: 'No federal limit',
        productRestriction: 'Safety substantiation',
        reference: 'MoCRA 2022; CIR safe',
      },
      cn: {
        status: 'unlisted',
        limit: 'Not on STSC Table 4',
        productRestriction: 'In IECIC List I; multifunctional',
        reference: 'IECIC List I (CAS 1117-86-8)',
      },
      jp: {
        status: 'unlisted',
        limit: 'Not on positive list',
        productRestriction: 'Entrepreneurial responsibility',
        reference: 'Not on Cosmetics Standard positive list',
      },
      kr: {
        status: 'unlisted',
        limit: 'Not on preservative list',
        productRestriction: 'Multifunctional',
        reference: 'Not on 화장품 안전기준 preservative Annex',
      },
    },
  },
  {
    slug: 'salicylic-acid',
    name: 'Salicylic Acid',
    inci: 'Salicylic Acid',
    cas: '69-72-7',
    markets: {
      eu: {
        status: 'restricted',
        limit: '0.5% preservative function (Annex V); up to 2% as cosmetic active (Annex III)',
        productRestriction: 'Dual-annex status; children-under-3 restrictions for leave-on; mandatory label warnings',
        reference: 'Annex V entry 3; Annex III entry 98',
      },
      us: {
        status: 'allowed',
        limit: '0.5-2% OTC drug monograph (acne)',
        productRestriction: 'OTC drug if claim is anti-acne',
        reference: 'MoCRA + OTC Drug Monograph',
      },
      cn: {
        status: 'allowed',
        limit: '0.5% preservative',
        productRestriction: 'All cosmetic categories; child restrictions',
        reference: 'STSC 2015 Table 4',
      },
      jp: {
        status: 'restricted',
        limit: 'Varies by category',
        productRestriction: 'If anti-acne claim: quasi-drug approval',
        reference: 'Cosmetics Standard + JSQI if quasi-drug',
      },
      kr: {
        status: 'allowed',
        limit: '0.5% preservative; functional cosmetic at higher',
        productRestriction: 'Functional cosmetic registration for actives',
        reference: '화장품 안전기준 + 기능성 화장품',
      },
    },
  },
];

export default function InteractiveMarketComparator() {
  const [selectedPreservative, setSelectedPreservative] = useState<string>('phenoxyethanol');
  const [selectedMarket, setSelectedMarket] = useState<MarketKey>('eu');

  const current = useMemo(
    () => DATA.find((d) => d.slug === selectedPreservative) ?? DATA[0],
    [selectedPreservative],
  );

  const marketData = current.markets[selectedMarket];
  const statusStyle = STATUS_META[marketData.status];

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Preservative
          </label>
          <select
            value={selectedPreservative}
            onChange={(e) => setSelectedPreservative(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            {DATA.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Target market
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(MARKET_LABELS) as MarketKey[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setSelectedMarket(m)}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition ${
                  selectedMarket === m
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400'
                }`}
              >
                {MARKET_LABELS[m]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h3 className="text-base font-semibold text-slate-900">
            {current.name} <span className="text-slate-500">in {MARKET_LABELS[selectedMarket]}</span>
          </h3>
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}
          >
            <span className={`h-2 w-2 rounded-full ${statusStyle.dot}`} aria-hidden="true" />
            {statusStyle.label}
          </span>
        </div>

        <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
          <span><strong>INCI:</strong> {current.inci}</span>
          <span><strong>CAS:</strong> {current.cas}</span>
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">Concentration limit</dt>
            <dd className="mt-0.5 text-slate-900">{marketData.limit}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">Product-category restriction</dt>
            <dd className="mt-0.5 text-slate-900">{marketData.productRestriction}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">Canonical reference</dt>
            <dd className="mt-0.5 text-slate-900">
              {marketData.referenceUrl ? (
                <a
                  href={marketData.referenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-700 underline"
                >
                  {marketData.reference}
                </a>
              ) : (
                marketData.reference
              )}
            </dd>
          </div>
          {marketData.note && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">Note</dt>
              <dd className="mt-0.5 text-slate-700 italic">{marketData.note}</dd>
            </div>
          )}
        </dl>

        <p className="mt-4 text-xs text-slate-500">
          As of 2026-11. Verify against the regulator&apos;s live reference before submission. For Korea, the canonical Korean source governs; English translations are partial.
        </p>
      </div>
    </div>
  );
}
