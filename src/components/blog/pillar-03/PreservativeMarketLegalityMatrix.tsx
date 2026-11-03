'use client';

import { useMemo, useState } from 'react';

type MarketKey = 'eu' | 'us' | 'cn' | 'jp' | 'kr';
type StatusKey = 'allowed' | 'restricted' | 'prohibited' | 'unlisted';
type FilterKey = 'all' | 'rinse-off' | 'leave-on' | 'child-safe' | 'natural-claim';

interface MatrixCell {
  status: StatusKey;
  short: string;
  tooltip: string;
}

interface MatrixRow {
  name: string;
  cas: string;
  cells: Record<MarketKey, MatrixCell>;
  rinseOffOnly: Record<MarketKey, boolean>;
  childRestricted: Record<MarketKey, boolean>;
  naturalCompatible: boolean;
}

const MARKET_LABELS: Record<MarketKey, string> = {
  eu: 'EU',
  us: 'US',
  cn: 'China',
  jp: 'Japan',
  kr: 'Korea',
};

const STATUS_STYLES: Record<StatusKey, { bg: string; text: string; label: string }> = {
  allowed: { bg: 'bg-emerald-100', text: 'text-emerald-900', label: 'Allowed' },
  restricted: { bg: 'bg-amber-100', text: 'text-amber-900', label: 'Restricted' },
  prohibited: { bg: 'bg-red-100', text: 'text-red-900', label: 'Prohibited' },
  unlisted: { bg: 'bg-slate-200', text: 'text-slate-800', label: 'Unlisted/multifunctional' },
};

const ROWS: MatrixRow[] = [
  {
    name: 'Phenoxyethanol',
    cas: '122-99-6',
    cells: {
      eu: { status: 'allowed', short: '1.0%', tooltip: 'Annex V entry 29; 1.0% max all categories' },
      us: { status: 'allowed', short: 'no limit', tooltip: 'MoCRA safety substantiation; CIR safe at 1%' },
      cn: { status: 'allowed', short: '1.0%', tooltip: 'STSC 2015 Table 4 serial 55; 1.0% max' },
      jp: { status: 'allowed', short: '1.0%', tooltip: 'Cosmetics Standard positive list 1.0%' },
      kr: { status: 'allowed', short: '1.0%', tooltip: 'MFDS Notice 2026-19; 1.0% max' },
    },
    rinseOffOnly: { eu: false, us: false, cn: false, jp: false, kr: false },
    childRestricted: { eu: false, us: false, cn: false, jp: false, kr: false },
    naturalCompatible: false,
  },
  {
    name: 'Ethylhexylglycerin',
    cas: '70445-33-9',
    cells: {
      eu: { status: 'unlisted', short: 'n/a Annex V', tooltip: 'Not on Annex V; legal as skin-conditioning' },
      us: { status: 'allowed', short: 'no limit', tooltip: 'MoCRA; CIR advisory' },
      cn: { status: 'unlisted', short: 'IECIC only', tooltip: 'Not on STSC Table 4; in IECIC List I' },
      jp: { status: 'unlisted', short: 'entrepr.', tooltip: 'Entrepreneurial responsibility' },
      kr: { status: 'unlisted', short: 'non-list', tooltip: 'Not on preservative Annex' },
    },
    rinseOffOnly: { eu: false, us: false, cn: false, jp: false, kr: false },
    childRestricted: { eu: false, us: false, cn: false, jp: false, kr: false },
    naturalCompatible: false,
  },
  {
    name: '1,2-Hexanediol',
    cas: '6920-22-5',
    cells: {
      eu: { status: 'unlisted', short: 'n/a Annex V', tooltip: 'Not on Annex V; INCI Hexylene Glycol' },
      us: { status: 'allowed', short: 'no limit', tooltip: 'MoCRA safety substantiation' },
      cn: { status: 'unlisted', short: 'IECIC only', tooltip: 'IECIC List I; multifunctional' },
      jp: { status: 'unlisted', short: 'entrepr.', tooltip: 'Entrepreneurial responsibility' },
      kr: { status: 'unlisted', short: 'non-list', tooltip: 'Not on preservative Annex' },
    },
    rinseOffOnly: { eu: false, us: false, cn: false, jp: false, kr: false },
    childRestricted: { eu: false, us: false, cn: false, jp: false, kr: false },
    naturalCompatible: true,
  },
  {
    name: 'Caprylhydroxamic Acid',
    cas: '7377-03-9',
    cells: {
      eu: { status: 'unlisted', short: 'n/a Annex V', tooltip: 'Not on Annex V; marketed as hurdle/chelator' },
      us: { status: 'allowed', short: 'no limit', tooltip: 'MoCRA' },
      cn: { status: 'unlisted', short: 'IECIC only', tooltip: 'IECIC List I' },
      jp: { status: 'unlisted', short: 'entrepr.', tooltip: 'Entrepreneurial responsibility' },
      kr: { status: 'unlisted', short: 'non-list', tooltip: 'Not on preservative Annex' },
    },
    rinseOffOnly: { eu: false, us: false, cn: false, jp: false, kr: false },
    childRestricted: { eu: false, us: false, cn: false, jp: false, kr: false },
    naturalCompatible: true,
  },
  {
    name: 'Methylparaben',
    cas: '99-76-3',
    cells: {
      eu: { status: 'allowed', short: '0.4/0.8%', tooltip: 'Annex V entry 12; 0.4% single, 0.8% sum' },
      us: { status: 'allowed', short: 'no limit', tooltip: 'CIR safe as used' },
      cn: { status: 'allowed', short: '0.4/0.8%', tooltip: 'STSC 2015 Table 4' },
      jp: { status: 'allowed', short: '1.0%', tooltip: 'Cosmetics Standard; 1.0% max' },
      kr: { status: 'allowed', short: '0.4/0.8%', tooltip: 'MFDS Notice 2026-19' },
    },
    rinseOffOnly: { eu: false, us: false, cn: false, jp: false, kr: false },
    childRestricted: { eu: false, us: false, cn: false, jp: false, kr: false },
    naturalCompatible: false,
  },
  {
    name: 'Butylparaben',
    cas: '94-26-8',
    cells: {
      eu: { status: 'restricted', short: '0.14% +child', tooltip: 'Annex V 12a → new 12b from 2027-02 (Omnibus Act IX); banned in leave-on for children under 3' },
      us: { status: 'allowed', short: 'no limit', tooltip: 'CIR safe at concentrations in use' },
      cn: { status: 'restricted', short: '0.14%', tooltip: 'STSC 2015 Table 4; not for leave-on child products' },
      jp: { status: 'allowed', short: '0.4%', tooltip: 'Cosmetics Standard positive list' },
      kr: { status: 'restricted', short: '0.14%', tooltip: 'MFDS Notice 2026-19; child restrictions' },
    },
    rinseOffOnly: { eu: false, us: false, cn: false, jp: false, kr: false },
    childRestricted: { eu: true, us: false, cn: true, jp: false, kr: true },
    naturalCompatible: false,
  },
  {
    name: 'Methylisothiazolinone',
    cas: '2682-20-4',
    cells: {
      eu: { status: 'restricted', short: '15 ppm rinse', tooltip: 'Annex V entry 57; rinse-off only, 0.0015%' },
      us: { status: 'allowed', short: 'CIR cautioned', tooltip: 'CIR safe in rinse-off ≤100 ppm; leave-on cautioned' },
      cn: { status: 'restricted', short: '15 ppm rinse', tooltip: 'STSC Table 4 serial 51; rinse-off only' },
      jp: { status: 'restricted', short: '0.01/0.1%', tooltip: 'Cosmetics Standard: 0.01% leave-on, 0.1% rinse-off' },
      kr: { status: 'restricted', short: '15 ppm rinse', tooltip: 'MFDS Notice 2026-19; rinse-off only' },
    },
    rinseOffOnly: { eu: true, us: false, cn: true, jp: false, kr: true },
    childRestricted: { eu: false, us: false, cn: false, jp: false, kr: false },
    naturalCompatible: false,
  },
  {
    name: 'Formaldehyde (free)',
    cas: '50-00-0',
    cells: {
      eu: { status: 'prohibited', short: 'banned', tooltip: 'Annex II; releaser labeling threshold 0.001% from 2026-07-31' },
      us: { status: 'restricted', short: 'label req.', tooltip: 'FDA cosmetics guidance; state restrictions (CA, MN)' },
      cn: { status: 'prohibited', short: 'banned', tooltip: 'NMPA Announcement No. 74 of 2021; prohibited list' },
      jp: { status: 'restricted', short: 'releasers only', tooltip: 'Cosmetics Standard restricted use' },
      kr: { status: 'restricted', short: 'rinse-off only', tooltip: 'MFDS Notice 2026-19; conditional' },
    },
    rinseOffOnly: { eu: false, us: false, cn: false, jp: false, kr: true },
    childRestricted: { eu: false, us: false, cn: false, jp: false, kr: false },
    naturalCompatible: false,
  },
  {
    name: 'Zinc Pyrithione',
    cas: '13463-41-7',
    cells: {
      eu: { status: 'allowed', short: '1.0% rinse', tooltip: 'Annex V entry 8; 1.0% rinse-off anti-dandruff' },
      us: { status: 'allowed', short: 'OTC drug', tooltip: 'OTC Drug Monograph (anti-dandruff)' },
      cn: { status: 'prohibited', short: 'ban 2028-01', tooltip: 'NMPA Announcement No. 6 of 2026; prohibited from 2028-01-01' },
      jp: { status: 'restricted', short: '1.0% rinse', tooltip: 'Quasi-drug anti-dandruff' },
      kr: { status: 'restricted', short: '0.5% rinse', tooltip: 'MFDS Notice 2026-19; rinse-off only; leave-on prohibited' },
    },
    rinseOffOnly: { eu: true, us: true, cn: false, jp: true, kr: true },
    childRestricted: { eu: false, us: false, cn: false, jp: false, kr: false },
    naturalCompatible: false,
  },
  {
    name: 'Benzoic Acid / Na-Benzoate',
    cas: '65-85-0',
    cells: {
      eu: { status: 'allowed', short: '2.5/1.7%', tooltip: 'Annex V entry 1; 2.5% leave-on, 1.7% rinse-off' },
      us: { status: 'allowed', short: 'no limit', tooltip: 'CIR safe as used' },
      cn: { status: 'allowed', short: '2.5/1.7%', tooltip: 'STSC 2015 Table 4; pH-dependent efficacy' },
      jp: { status: 'allowed', short: '1.0%', tooltip: 'Cosmetics Standard; 1.0% max' },
      kr: { status: 'allowed', short: '2.5/1.7%', tooltip: 'MFDS Notice 2026-19' },
    },
    rinseOffOnly: { eu: false, us: false, cn: false, jp: false, kr: false },
    childRestricted: { eu: false, us: false, cn: false, jp: false, kr: false },
    naturalCompatible: true,
  },
  {
    name: 'Sorbic Acid / K-Sorbate',
    cas: '110-44-1',
    cells: {
      eu: { status: 'allowed', short: '0.6%', tooltip: 'Annex V entry 4; 0.6% acid eq.' },
      us: { status: 'allowed', short: 'no limit', tooltip: 'CIR safe as used' },
      cn: { status: 'allowed', short: '0.6%', tooltip: 'STSC 2015 Table 4' },
      jp: { status: 'allowed', short: '0.5%', tooltip: 'Cosmetics Standard; 0.5% max' },
      kr: { status: 'allowed', short: '0.6%', tooltip: 'MFDS Notice 2026-19' },
    },
    rinseOffOnly: { eu: false, us: false, cn: false, jp: false, kr: false },
    childRestricted: { eu: false, us: false, cn: false, jp: false, kr: false },
    naturalCompatible: true,
  },
  {
    name: 'Dehydroacetic Acid',
    cas: '520-45-6',
    cells: {
      eu: { status: 'allowed', short: '0.6% no aero', tooltip: 'Annex V entry 33; 0.6%; prohibited in aerosols' },
      us: { status: 'allowed', short: 'no limit', tooltip: 'MoCRA safety substantiation' },
      cn: { status: 'allowed', short: '0.6%', tooltip: 'STSC 2015 Table 4' },
      jp: { status: 'allowed', short: '0.5%', tooltip: 'Cosmetics Standard; 0.5% max' },
      kr: { status: 'allowed', short: '0.6%', tooltip: 'MFDS Notice 2026-19' },
    },
    rinseOffOnly: { eu: false, us: false, cn: false, jp: false, kr: false },
    childRestricted: { eu: false, us: false, cn: false, jp: false, kr: false },
    naturalCompatible: true,
  },
  {
    name: 'Chlorphenesin',
    cas: '104-29-0',
    cells: {
      eu: { status: 'allowed', short: '0.3%', tooltip: 'Annex V entry 42; 0.3% max' },
      us: { status: 'allowed', short: 'no limit', tooltip: 'MoCRA safety substantiation' },
      cn: { status: 'allowed', short: '0.3%', tooltip: 'STSC 2015 Table 4' },
      jp: { status: 'allowed', short: '0.3%', tooltip: 'Cosmetics Standard positive list' },
      kr: { status: 'allowed', short: '0.3%', tooltip: 'MFDS Notice 2026-19' },
    },
    rinseOffOnly: { eu: false, us: false, cn: false, jp: false, kr: false },
    childRestricted: { eu: false, us: false, cn: false, jp: false, kr: false },
    naturalCompatible: false,
  },
  {
    name: 'Caprylyl Glycol',
    cas: '1117-86-8',
    cells: {
      eu: { status: 'unlisted', short: 'n/a Annex V', tooltip: 'Not on Annex V; skin-conditioning/humectant' },
      us: { status: 'allowed', short: 'no limit', tooltip: 'MoCRA; CIR safe' },
      cn: { status: 'unlisted', short: 'IECIC only', tooltip: 'IECIC List I; multifunctional' },
      jp: { status: 'unlisted', short: 'entrepr.', tooltip: 'Entrepreneurial responsibility' },
      kr: { status: 'unlisted', short: 'non-list', tooltip: 'Not on preservative Annex' },
    },
    rinseOffOnly: { eu: false, us: false, cn: false, jp: false, kr: false },
    childRestricted: { eu: false, us: false, cn: false, jp: false, kr: false },
    naturalCompatible: true,
  },
  {
    name: 'Salicylic Acid',
    cas: '69-72-7',
    cells: {
      eu: { status: 'restricted', short: '0.5% +child', tooltip: 'Annex V entry 3 (0.5% preservative) + Annex III entry 98; child-under-3 leave-on restrictions' },
      us: { status: 'allowed', short: 'OTC drug', tooltip: 'OTC Drug Monograph for anti-acne 0.5-2%' },
      cn: { status: 'allowed', short: '0.5%', tooltip: 'STSC 2015 Table 4; child restrictions' },
      jp: { status: 'restricted', short: 'quasi-drug', tooltip: 'If active claim: quasi-drug approval required' },
      kr: { status: 'allowed', short: '0.5% + func', tooltip: 'MFDS; functional cosmetic registration for higher conc.' },
    },
    rinseOffOnly: { eu: false, us: false, cn: false, jp: false, kr: false },
    childRestricted: { eu: true, us: false, cn: true, jp: false, kr: false },
    naturalCompatible: false,
  },
];

export default function PreservativeMarketLegalityMatrix() {
  const [filter, setFilter] = useState<FilterKey>('all');

  const filteredRows = useMemo(() => {
    if (filter === 'all') return ROWS;
    if (filter === 'natural-claim') return ROWS.filter((r) => r.naturalCompatible);
    if (filter === 'rinse-off') {
      return ROWS.filter((r) =>
        Object.values(r.rinseOffOnly).some((v) => v === true),
      );
    }
    if (filter === 'leave-on') {
      return ROWS.filter((r) =>
        Object.values(r.rinseOffOnly).every((v) => v === false),
      );
    }
    if (filter === 'child-safe') {
      return ROWS.filter((r) =>
        Object.values(r.childRestricted).every((v) => v === false) &&
        Object.values(r.cells).every((c) => c.status !== 'prohibited'),
      );
    }
    return ROWS;
  }, [filter]);

  const filters: Array<{ key: FilterKey; label: string }> = [
    { key: 'all', label: `All (${ROWS.length})` },
    { key: 'rinse-off', label: 'Rinse-off restricted somewhere' },
    { key: 'leave-on', label: 'Leave-on OK everywhere allowed' },
    { key: 'child-safe', label: 'No child-product restrictions' },
    { key: 'natural-claim', label: 'Natural-claim compatible' },
  ];

  return (
    <div className="my-8">
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
              filter === f.key
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-indigo-400'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-700">
              <th className="sticky left-0 z-10 bg-slate-100 p-3">Preservative</th>
              <th className="p-3">CAS</th>
              {(Object.keys(MARKET_LABELS) as MarketKey[]).map((m) => (
                <th key={m} className="p-3 text-center">{MARKET_LABELS[m]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.name} className="border-t border-slate-200 even:bg-slate-50/50">
                <td className="sticky left-0 z-10 bg-inherit p-3 font-medium text-slate-900">
                  {row.name}
                </td>
                <td className="p-3 text-xs text-slate-600">{row.cas}</td>
                {(Object.keys(MARKET_LABELS) as MarketKey[]).map((m) => {
                  const cell = row.cells[m];
                  const style = STATUS_STYLES[cell.status];
                  return (
                    <td key={m} className="p-2 text-center">
                      <span
                        className={`inline-block min-w-[90px] rounded-md px-2 py-1 text-xs font-semibold ${style.bg} ${style.text}`}
                        title={cell.tooltip}
                      >
                        {cell.short}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-sm italic text-slate-500">
                  No preservatives match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        {(Object.keys(STATUS_STYLES) as StatusKey[]).map((s) => (
          <span
            key={s}
            className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-medium ${STATUS_STYLES[s].bg} ${STATUS_STYLES[s].text}`}
          >
            {STATUS_STYLES[s].label}
          </span>
        ))}
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Hover any cell for full regulatory context. As of 2026-11. Verify against the regulator&apos;s live reference text before any submission.
      </p>
    </div>
  );
}
