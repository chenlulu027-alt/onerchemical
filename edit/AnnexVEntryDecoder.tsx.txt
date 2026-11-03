'use client';

import { useMemo, useState } from 'react';

type ProductType = 'all' | 'leave-on' | 'rinse-off' | 'oral' | 'child-under-3';
type FunctionGroup =
  | 'all'
  | 'broad-spectrum'
  | 'organic-acid'
  | 'formaldehyde-releaser'
  | 'alcohol'
  | 'isothiazolinone'
  | 'quaternary'
  | 'other';

interface AnnexVEntry {
  entry: number;
  inci: string;
  cas?: string;
  maxPct: string;
  functionGroup: Exclude<FunctionGroup, 'all'>;
  restrictions: string;
  productRestriction: string;
}

// Representative subset of Annex V entries (current to EU 1223/2009 Omnibus
// amendments as of 2026-Q4). Full 59-entry list sourced from Annex V
// consolidated text; verify against the latest EUR-Lex consolidated version
// (document 02009R1223-YYYYMMDD) before any production regulatory decision.
const ANNEX_V: AnnexVEntry[] = [
  { entry: 1, inci: 'Benzoic Acid / Sodium Benzoate / Potassium Benzoate', cas: '65-85-0', maxPct: '0.5 (acid); 2.5 (rinse-off hair)', functionGroup: 'organic-acid', restrictions: 'Sum of free + salts expressed as acid; rinse-off bath/shower/shampoo 2.5%', productRestriction: 'Any' },
  { entry: 3, inci: 'Salicylic Acid', cas: '69-72-7', maxPct: '0.5 (leave-on); 3 (rinse-off hair)', functionGroup: 'organic-acid', restrictions: 'Not for children under 3 except shampoo; separate cosmetic restriction as skin-conditioning', productRestriction: 'Not under 3 (except shampoo)' },
  { entry: 4, inci: 'Sorbic Acid / Potassium Sorbate / Calcium Sorbate', cas: '110-44-1', maxPct: '0.6 (as acid)', functionGroup: 'organic-acid', restrictions: 'Sum of free + salts calculated as acid', productRestriction: 'Any' },
  { entry: 7, inci: 'Biphenyl-2-ol / Sodium o-Phenylphenate', cas: '90-43-7', maxPct: '0.2 (as phenol)', functionGroup: 'other', restrictions: 'Expressed as phenol', productRestriction: 'Any' },
  { entry: 8, inci: 'Zinc Pyrithione (rinse-off hair)', cas: '13463-41-7', maxPct: '1.0 (rinse-off hair); 0.5 (other rinse-off)', functionGroup: 'other', restrictions: 'Not permitted in oral care; caps vary by product type', productRestriction: 'Not oral; different caps' },
  { entry: 9, inci: 'Inorganic Sulphites and Hydrogen Sulphites', cas: 'various', maxPct: '0.2 (oral, as SO2); 0.67 (hair, as SO2); 0.45 (face/lip self-tan); 0.40 (other self-tan)', functionGroup: 'other', restrictions: 'Expressed as free SO2', productRestriction: 'Caps vary by application' },
  { entry: 12, inci: 'Methylparaben / Ethylparaben / Propylparaben / Butylparaben and salts', cas: '99-76-3 et al.', maxPct: '0.4 (single ester, as acid); 0.8 (mixtures, as acid)', functionGroup: 'other', restrictions: 'Propyl/Butyl banned in leave-on for under-3 nappy area; sum rule for mixtures', productRestriction: 'Propyl/Butyl: not in leave-on nappy under 3' },
  { entry: 16, inci: 'Sodium Iodate', cas: '7681-55-2', maxPct: '0.1', functionGroup: 'other', restrictions: 'Rinse-off only', productRestriction: 'Rinse-off only' },
  { entry: 17, inci: 'Sodium Hydroxymethylglycinate', cas: '70161-44-3', maxPct: '0.5', functionGroup: 'formaldehyde-releaser', restrictions: 'Warning label if free formaldehyde released above 0.05%', productRestriction: 'Any (with warning if applicable)' },
  { entry: 18, inci: 'Silver Chloride (deposited on TiO2 20/80 w/w)', maxPct: '0.004 (as AgCl)', functionGroup: 'other', restrictions: 'Not for products under 3; not oral; not eye/lip', productRestriction: 'Not under 3; not oral/eye/lip' },
  { entry: 19, inci: 'Benzethonium Chloride', cas: '121-54-0', maxPct: '0.1', functionGroup: 'quaternary', restrictions: 'Rinse-off only; not oral care', productRestriction: 'Rinse-off only; not oral' },
  { entry: 20, inci: 'Benzalkonium Chloride / Bromide / Saccharinate', cas: 'various', maxPct: '0.1 (as benzalkonium chloride)', functionGroup: 'quaternary', restrictions: 'Avoid eye contact above 0.0001% as preservative', productRestriction: 'Any; eye-area warnings' },
  { entry: 25, inci: 'Chlorhexidine and salts', cas: '55-56-1', maxPct: '0.3 (as chlorhexidine)', functionGroup: 'other', restrictions: 'As free base', productRestriction: 'Any' },
  { entry: 29, inci: 'Phenoxyethanol', cas: '122-99-6', maxPct: '1.0', functionGroup: 'broad-spectrum', restrictions: 'SCCS keeps under review for under-3 and nappy-area use', productRestriction: 'Any (under SCCS review)' },
  { entry: 34, inci: 'Benzyl Alcohol', cas: '100-51-6', maxPct: '1.0 (as preservative)', functionGroup: 'alcohol', restrictions: 'Allergen labelling above 0.001% leave-on / 0.01% rinse-off', productRestriction: 'Any; allergen label trigger' },
  { entry: 35, inci: 'Sodium Pyrithione (rinse-off hair)', maxPct: '0.5', functionGroup: 'other', restrictions: 'Rinse-off hair only', productRestriction: 'Rinse-off hair only' },
  { entry: 37, inci: 'Chlorphenesin', cas: '104-29-0', maxPct: '0.3', functionGroup: 'other', restrictions: 'None additional', productRestriction: 'Any' },
  { entry: 39, inci: 'Methylisothiazolinone (MIT)', cas: '2682-20-4', maxPct: '0.0015 (rinse-off only)', functionGroup: 'isothiazolinone', restrictions: 'Rinse-off only since 2017 ban in leave-on', productRestriction: 'Rinse-off only' },
  { entry: 40, inci: 'DMDM Hydantoin', cas: '6440-58-0', maxPct: '0.6', functionGroup: 'formaldehyde-releaser', restrictions: 'Warning if free formaldehyde above 0.05%', productRestriction: 'Any (with warning if applicable)' },
  { entry: 42, inci: 'Methylchloroisothiazolinone + Methylisothiazolinone (MCI/MIT 3:1)', cas: '55965-84-9', maxPct: '0.0015 (rinse-off only)', functionGroup: 'isothiazolinone', restrictions: 'Rinse-off only; cannot combine with standalone MIT', productRestriction: 'Rinse-off only' },
  { entry: 43, inci: 'Imidazolidinyl Urea', cas: '39236-46-9', maxPct: '0.6', functionGroup: 'formaldehyde-releaser', restrictions: 'Warning if free formaldehyde above 0.05%', productRestriction: 'Any (with warning if applicable)' },
  { entry: 45, inci: 'Benzyl Hemiformal', cas: '14548-60-8', maxPct: '0.15 (rinse-off only)', functionGroup: 'formaldehyde-releaser', restrictions: 'Rinse-off only; warning if free formaldehyde above 0.05%', productRestriction: 'Rinse-off only' },
  { entry: 46, inci: 'Iodopropynyl Butylcarbamate (IPBC)', cas: '55406-53-6', maxPct: '0.02 (leave-on); 0.1 (rinse-off); 0.0075 (leave-on deodorant/antiperspirant)', functionGroup: 'other', restrictions: 'Not under 3 (most forms); not lip; multiple product-specific caps', productRestriction: 'Complex; not under 3 (most forms)' },
  { entry: 49, inci: 'Climbazole', cas: '38083-17-9', maxPct: '0.5 (rinse-off hair); 0.2 (leave-on face / rinse-off body)', functionGroup: 'other', restrictions: 'Multiple caps by product subcategory', productRestriction: 'Complex; not under 3' },
  { entry: 50, inci: 'Ethyl Lauroyl Arginate HCl', cas: '60372-77-2', maxPct: '0.4', functionGroup: 'other', restrictions: 'Not lip; not oral; not spray', productRestriction: 'Not lip/oral/spray' },
  { entry: 55, inci: 'Hexetidine (rinse-off only)', cas: '141-94-6', maxPct: '0.1 (rinse-off only)', functionGroup: 'other', restrictions: 'Rinse-off only', productRestriction: 'Rinse-off only' },
  { entry: 57, inci: 'Phenylmercuric Salts (restricted eye-area only)', maxPct: '0.007 (eye-area only, as Hg)', functionGroup: 'other', restrictions: 'Eye make-up and eye make-up remover only; many Hg-based entries in phase-out status', productRestriction: 'Eye-area only' },
];

const PRODUCT_LABELS: Record<ProductType, string> = {
  all: 'All product types',
  'leave-on': 'Leave-on only',
  'rinse-off': 'Rinse-off only',
  oral: 'Oral care',
  'child-under-3': 'Child under 3 compatibility',
};

const FUNCTION_LABELS: Record<FunctionGroup, string> = {
  all: 'All function groups',
  'broad-spectrum': 'Broad-spectrum',
  'organic-acid': 'Organic acid',
  'formaldehyde-releaser': 'Formaldehyde releaser',
  alcohol: 'Alcohol-type',
  isothiazolinone: 'Isothiazolinone',
  quaternary: 'Quaternary ammonium',
  other: 'Other',
};

export default function AnnexVEntryDecoder() {
  const [productFilter, setProductFilter] = useState<ProductType>('all');
  const [functionFilter, setFunctionFilter] = useState<FunctionGroup>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ANNEX_V.filter((e) => {
      if (functionFilter !== 'all' && e.functionGroup !== functionFilter) return false;
      const pr = e.productRestriction.toLowerCase();
      if (productFilter === 'leave-on' && pr.includes('rinse-off only')) return false;
      if (productFilter === 'rinse-off' && pr.includes('leave-on only')) return false;
      if (productFilter === 'oral' && pr.includes('not oral')) return false;
      if (productFilter === 'child-under-3' && pr.includes('not under 3')) return false;
      if (q) {
        const hay = `${e.entry} ${e.inci} ${e.cas ?? ''} ${e.restrictions}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [productFilter, functionFilter, search]);

  return (
    <div className="my-8 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          Annex V Preservative Decoder (EU 1223/2009, as of 2026-Q4)
        </h3>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          Representative subset of the 59 Annex V entries. Always cross-check against the current Annex V consolidated text on EUR-Lex (document 02009R1223-latest) before any production regulatory decision.
        </p>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Product type
          </span>
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value as ProductType)}
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
            Function group
          </span>
          <select
            value={functionFilter}
            onChange={(e) => setFunctionFilter(e.target.value as FunctionGroup)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(FUNCTION_LABELS) as FunctionGroup[]).map((k) => (
              <option key={k} value={k}>
                {FUNCTION_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Search INCI, CAS or entry number
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. phenoxyethanol, 122-99-6, 29"
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </label>
      </div>

      <div className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">
        Showing {filtered.length} of {ANNEX_V.length} indexed entries.
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-left dark:border-neutral-800 dark:bg-neutral-900">
              <th className="px-2 py-2 font-semibold text-neutral-700 dark:text-neutral-300">Entry</th>
              <th className="px-2 py-2 font-semibold text-neutral-700 dark:text-neutral-300">INCI / Substance</th>
              <th className="px-2 py-2 font-semibold text-neutral-700 dark:text-neutral-300">CAS</th>
              <th className="px-2 py-2 font-semibold text-neutral-700 dark:text-neutral-300">Max %</th>
              <th className="px-2 py-2 font-semibold text-neutral-700 dark:text-neutral-300">Restrictions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, idx) => (
              <tr
                key={e.entry}
                className={
                  idx % 2 === 0
                    ? 'border-b border-neutral-200 dark:border-neutral-800'
                    : 'border-b border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/40'
                }
              >
                <td className="px-2 py-2 align-top font-mono text-xs text-neutral-900 dark:text-neutral-100">{e.entry}</td>
                <td className="px-2 py-2 align-top text-neutral-800 dark:text-neutral-200">{e.inci}</td>
                <td className="px-2 py-2 align-top font-mono text-xs text-neutral-700 dark:text-neutral-300">{e.cas ?? '—'}</td>
                <td className="px-2 py-2 align-top font-mono text-xs text-neutral-900 dark:text-neutral-100">{e.maxPct}</td>
                <td className="px-2 py-2 align-top text-xs text-neutral-600 dark:text-neutral-400">{e.restrictions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-500">
        This decoder indexes high-traffic Annex V entries for navigation. For the complete 59-entry text with all footnotes, salt-form expansions and most recent Omnibus amendments, cross-check against the Annex V consolidated version on EUR-Lex.
      </p>
    </div>
  );
}
