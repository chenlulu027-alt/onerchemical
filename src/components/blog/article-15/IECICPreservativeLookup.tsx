'use client';

import { useMemo, useState } from 'react';

interface Entry {
  cas: string;
  inci: string;
  chineseName: string;
  commonNames: string[];
  iecic2021: boolean;
  stscAnnexV: {
    listed: boolean;
    entryNumber?: string;
    maxConcentration?: string;
    productRestriction?: string;
    expressedAs?: string;
  };
  functionalRole: string;
  notes: string;
}

const ENTRIES: Entry[] = [
  {
    cas: '122-99-6',
    inci: 'Phenoxyethanol',
    chineseName: '苯氧乙醇',
    commonNames: ['PE', 'phenoxyethanol'],
    iecic2021: true,
    stscAnnexV: {
      listed: true,
      entryNumber: '31',
      maxConcentration: '1.0%',
      expressedAs: 'as phenoxyethanol',
    },
    functionalRole: 'Broad-spectrum preservative',
    notes: 'The most common EU/US/China broadly-accepted preservative; same 1.0% cap as EU Annex V entry 29.',
  },
  {
    cas: '6920-22-5',
    inci: '1,2-Hexanediol',
    chineseName: '1,2-己二醇',
    commonNames: ['hexanediol', 'Hydrolite 6'],
    iecic2021: true,
    stscAnnexV: {
      listed: false,
    },
    functionalRole: 'Humectant / skin-conditioning (non-preservative declaration)',
    notes: 'On IECIC 2021 but NOT on STSC Annex V. Legal as multifunctional; cannot be labelled as preservative.',
  },
  {
    cas: '7377-03-9',
    inci: 'Caprylhydroxamic Acid',
    chineseName: '辛酰羟肟酸',
    commonNames: ['CHA', 'caprylhydroxamic acid'],
    iecic2021: true,
    stscAnnexV: {
      listed: false,
    },
    functionalRole: 'Chelating agent (non-preservative declaration)',
    notes: 'On IECIC 2021, used as chelator; antimicrobial function justified in safety assessment.',
  },
  {
    cas: '70445-33-9',
    inci: 'Ethylhexylglycerin',
    chineseName: '乙基己基甘油',
    commonNames: ['EHG', 'Sensiva SC50'],
    iecic2021: true,
    stscAnnexV: {
      listed: false,
    },
    functionalRole: 'Skin-conditioning (non-preservative declaration)',
    notes: 'On IECIC 2021; typical booster use at 0.3-1.0%.',
  },
  {
    cas: '1117-86-8',
    inci: 'Caprylyl Glycol',
    chineseName: '辛二醇',
    commonNames: ['caprylyl glycol'],
    iecic2021: true,
    stscAnnexV: {
      listed: false,
    },
    functionalRole: 'Skin-conditioning / emollient (non-preservative declaration)',
    notes: 'On IECIC 2021; common Spectrastat / hurdle system component.',
  },
  {
    cas: '99-76-3',
    inci: 'Methylparaben',
    chineseName: '对羟基苯甲酸甲酯',
    commonNames: ['methyl paraben'],
    iecic2021: true,
    stscAnnexV: {
      listed: true,
      entryNumber: '14',
      maxConcentration: '0.4% single ester; 0.8% sum of parabens',
      expressedAs: 'as acid',
    },
    functionalRole: 'Preservative',
    notes: 'Same cap framework as EU Annex V entry 12.',
  },
  {
    cas: '120-47-8',
    inci: 'Ethylparaben',
    chineseName: '对羟基苯甲酸乙酯',
    commonNames: ['ethyl paraben'],
    iecic2021: true,
    stscAnnexV: {
      listed: true,
      entryNumber: '14',
      maxConcentration: '0.4% single ester; 0.8% sum of parabens',
      expressedAs: 'as acid',
    },
    functionalRole: 'Preservative',
    notes: 'Paired with methylparaben under paraben sum-of-mixtures rule.',
  },
  {
    cas: '110-44-1',
    inci: 'Sorbic Acid',
    chineseName: '山梨酸',
    commonNames: ['sorbic acid'],
    iecic2021: true,
    stscAnnexV: {
      listed: true,
      entryNumber: '5',
      maxConcentration: '0.6%',
      expressedAs: 'as acid (sum of free acid + salts)',
    },
    functionalRole: 'Preservative (organic acid)',
    notes: 'Potassium Sorbate interconverts to free acid for cap calculation.',
  },
  {
    cas: '65-85-0',
    inci: 'Benzoic Acid',
    chineseName: '苯甲酸',
    commonNames: ['benzoic acid', 'sodium benzoate'],
    iecic2021: true,
    stscAnnexV: {
      listed: true,
      entryNumber: '1',
      maxConcentration: '0.5% leave-on; 2.5% rinse-off hair',
      expressedAs: 'as acid (sum of free acid + salts)',
    },
    functionalRole: 'Preservative (organic acid)',
    notes: 'Similar framework to EU Annex V entry 1.',
  },
  {
    cas: '520-45-6',
    inci: 'Dehydroacetic Acid',
    chineseName: '脱氢乙酸',
    commonNames: ['DHA preservative', 'sodium dehydroacetate'],
    iecic2021: true,
    stscAnnexV: {
      listed: true,
      entryNumber: '12',
      maxConcentration: '0.6%',
      expressedAs: 'as acid',
    },
    functionalRole: 'Preservative (organic acid)',
    notes: 'Not permitted in aerosol products per STSC Annex V entry 12 notes.',
  },
  {
    cas: '104-29-0',
    inci: 'Chlorphenesin',
    chineseName: '氯苯甘醚',
    commonNames: ['chlorphenesin'],
    iecic2021: true,
    stscAnnexV: {
      listed: false,
    },
    functionalRole: 'Not on STSC Annex V as preservative; alternate function declaration required',
    notes: 'IMPORTANT DELTA: on EU Annex V entry 37 at 0.3% as preservative; China does NOT include on STSC Annex V. Legal in China cosmetics only when declared for a non-preservative function with substantiation.',
  },
  {
    cas: '2682-20-4',
    inci: 'Methylisothiazolinone',
    chineseName: '甲基异噻唑啉酮',
    commonNames: ['MIT', 'MI'],
    iecic2021: true,
    stscAnnexV: {
      listed: true,
      entryNumber: '48',
      maxConcentration: '0.0015% rinse-off only',
      productRestriction: 'Rinse-off only',
      expressedAs: 'as MIT',
    },
    functionalRole: 'Preservative (isothiazolinone)',
    notes: 'Mirror EU Annex V entry 39 rinse-off-only restriction; leave-on prohibited.',
  },
  {
    cas: '55965-84-9',
    inci: 'Methylchloroisothiazolinone + Methylisothiazolinone',
    chineseName: '甲基氯异噻唑啉酮和甲基异噻唑啉酮',
    commonNames: ['MCI/MIT', 'Kathon CG'],
    iecic2021: true,
    stscAnnexV: {
      listed: true,
      entryNumber: '50',
      maxConcentration: '0.0015% rinse-off only',
      productRestriction: 'Rinse-off only; cannot combine with standalone MIT',
      expressedAs: 'as MCI/MIT 3:1 ratio',
    },
    functionalRole: 'Preservative (isothiazolinone)',
    notes: 'Mirror EU Annex V entry 42.',
  },
  {
    cas: '70161-44-3',
    inci: 'Sodium Hydroxymethylglycinate',
    chineseName: '羟甲基甘氨酸钠',
    commonNames: ['Suttocide A'],
    iecic2021: true,
    stscAnnexV: {
      listed: true,
      entryNumber: '42',
      maxConcentration: '0.5%',
      expressedAs: 'as substance',
    },
    functionalRole: 'Preservative (formaldehyde-releaser)',
    notes: 'Mandatory warning label if free formaldehyde above 0.05%.',
  },
  {
    cas: '55406-53-6',
    inci: 'Iodopropynyl Butylcarbamate',
    chineseName: '碘丙炔基丁基氨基甲酸酯',
    commonNames: ['IPBC'],
    iecic2021: true,
    stscAnnexV: {
      listed: true,
      entryNumber: '56',
      maxConcentration: '0.02% leave-on; 0.1% rinse-off',
      productRestriction: 'Not for children under 3; multiple product-specific caps',
      expressedAs: 'as IPBC',
    },
    functionalRole: 'Preservative',
    notes: 'Mirror EU Annex V entry 46 restrictions.',
  },
  {
    cas: '141-94-6',
    inci: 'Hexetidine',
    chineseName: '海克替啶',
    commonNames: ['hexetidine'],
    iecic2021: false,
    stscAnnexV: {
      listed: false,
    },
    functionalRole: 'NOT on IECIC 2021; requires new-ingredient registration before any use',
    notes: 'IMPORTANT DELTA: on EU Annex V entry 55 as rinse-off preservative at 0.1%; China has not included on IECIC 2021 and NOT on STSC Annex V. Cannot be used in China cosmetics without new-ingredient registration.',
  },
];

export default function IECICPreservativeLookup() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'both-listed' | 'iecic-only' | 'neither'>('all');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ENTRIES.filter((e) => {
      // Text filter
      if (q) {
        const haystack = [
          e.cas,
          e.inci.toLowerCase(),
          e.chineseName,
          ...e.commonNames.map((n) => n.toLowerCase()),
        ].join(' ');
        if (!haystack.includes(q)) return false;
      }
      // Status filter
      if (filter === 'both-listed') return e.iecic2021 && e.stscAnnexV.listed;
      if (filter === 'iecic-only') return e.iecic2021 && !e.stscAnnexV.listed;
      if (filter === 'neither') return !e.iecic2021 && !e.stscAnnexV.listed;
      return true;
    });
  }, [query, filter]);

  return (
    <div className="my-8 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        IECIC 2021 and STSC Annex V Preservative Lookup
      </h3>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        Representative preservative subset. Search by CAS, INCI, Chinese name or common name.
        Working audit aid; final determination rests with the Domestic Responsible Person&apos;s
        safety assessment and the latest consolidated NMPA publications.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Search (CAS / INCI / Chinese name)
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. 122-99-6, phenoxyethanol, 苯氧乙醇"
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Status filter
          </span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            <option value="all">All entries</option>
            <option value="both-listed">On both IECIC 2021 AND STSC Annex V</option>
            <option value="iecic-only">On IECIC only (not on STSC Annex V)</option>
            <option value="neither">Not on either list</option>
          </select>
        </label>
      </div>

      <div className="mt-4 text-xs text-neutral-600 dark:text-neutral-400">
        Showing {results.length} of {ENTRIES.length} indexed entries.
      </div>

      <div className="mt-3 space-y-3">
        {results.length === 0 && (
          <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
            No match. Try a different term or confirm the CAS format (e.g. 7377-03-9 not 7377039).
          </div>
        )}
        {results.map((e) => {
          const bothListed = e.iecic2021 && e.stscAnnexV.listed;
          const iecicOnly = e.iecic2021 && !e.stscAnnexV.listed;
          const borderClass = bothListed
            ? 'border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/40'
            : iecicOnly
            ? 'border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/40'
            : 'border-rose-400 bg-rose-50 dark:border-rose-700 dark:bg-rose-950/40';
          return (
            <div key={e.cas} className={`rounded-md border p-4 ${borderClass}`}>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {e.inci}
                </h4>
                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                  / {e.chineseName}
                </span>
                <span className="rounded bg-neutral-200 px-2 py-0.5 font-mono text-[11px] text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                  CAS {e.cas}
                </span>
              </div>
              <div className="mb-2 flex flex-wrap gap-2 text-[11px]">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 font-semibold ${
                    e.iecic2021
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  IECIC 2021: {e.iecic2021 ? 'Listed' : 'NOT listed'}
                </span>
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 font-semibold ${
                    e.stscAnnexV.listed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  STSC Annex V: {e.stscAnnexV.listed ? `Entry ${e.stscAnnexV.entryNumber}` : 'Not listed'}
                </span>
                {e.stscAnnexV.listed && e.stscAnnexV.maxConcentration && (
                  <span className="inline-flex rounded-full bg-blue-600 px-2 py-0.5 font-semibold text-white">
                    Max: {e.stscAnnexV.maxConcentration}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-800 dark:text-neutral-200">
                <strong>Functional role:</strong> {e.functionalRole}
              </p>
              {e.stscAnnexV.productRestriction && (
                <p className="mt-1 text-xs text-neutral-800 dark:text-neutral-200">
                  <strong>Restriction:</strong> {e.stscAnnexV.productRestriction}
                </p>
              )}
              {e.stscAnnexV.expressedAs && (
                <p className="mt-1 text-xs text-neutral-800 dark:text-neutral-200">
                  <strong>Expressed as:</strong> {e.stscAnnexV.expressedAs}
                </p>
              )}
              <p className="mt-2 text-xs italic text-neutral-700 dark:text-neutral-300">
                {e.notes}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-500">
        Entry data reflects IECIC 2021 and STSC 2015 as of 2026-Q4 consolidation. STSC is under
        revision; confirm the latest NMPA publication before any production regulatory decision.
      </p>
    </div>
  );
}
