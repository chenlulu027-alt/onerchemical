'use client';

import { useMemo, useState } from 'react';

type Volume = 'under-500kg' | '500kg-5t' | '5t-container' | 'container-plus';
type Market = 'EU' | 'US' | 'CN' | 'JP' | 'KR';
type Audit = 'none' | 'remote' | 'on-site';
type Risk = 'low' | 'medium' | 'high';

type Tier = {
  key: 'commodity' | 'trader' | 'pharma' | 'branded';
  name: string;
  priceBand: string;
  strengths: string[];
  risks: string[];
  vettingQuestions: string[];
  fitScore: (v: Volume, m: Market, a: Audit, r: Risk) => number;
};

const TIERS: Tier[] = [
  {
    key: 'commodity',
    name: 'Tier 1 — Chinese commodity (direct manufacturer)',
    priceBand: 'USD 3.5–14 /kg (molecule-dependent, FOB China @100kg)',
    strengths: [
      'Lowest unit cost for recurring container-load pulls',
      'Direct batch-site traceability when the plant is real',
      'Simplest paperwork chain (no middle-layer repack)',
    ],
    risks: [
      'CoA completeness varies — field for isomer purity or 1,4-dioxane often missing',
      'MOQ typically 500 kg → 1 T; <500 kg orders get deprioritized or quoted at trader prices',
      'Export documentation (REACH, CPNP support letters) may require a secondary agent',
    ],
    vettingQuestions: [
      'Can you share the GMP ISO 22716 certificate with the production-line address matching the invoice address?',
      'What is the typical variance range across the last 3 batches on assay, phenol residue, and heavy metals?',
      'What is your change-notification lead time if the raw-material source plant changes?',
    ],
    fitScore: (v, _m, a, r) => {
      let s = 50;
      if (v === '5t-container' || v === 'container-plus') s += 30;
      if (v === 'under-500kg') s -= 25;
      if (a === 'on-site' || a === 'remote') s += 15;
      if (r === 'low') s -= 10;
      return s;
    },
  },
  {
    key: 'trader',
    name: 'Tier 2 — Dongguan / HK trader (repack & consolidation)',
    priceBand: 'USD 4.5–18 /kg (10–30% premium over commodity for ≤400 kg orders)',
    strengths: [
      '100 kg MOQ is a real option, not a courtesy quote',
      'Faster English-language response and sample turnaround (3–5 days)',
      'Mixed-container consolidation across 3–5 molecules in one shipment',
    ],
    risks: [
      'Source plant can change batch-to-batch without notification',
      'Repacked drums may lose original manufacturer batch IDs',
      'Isomer-blend substitution risk (e.g. 1,2-hexanediol with 3–4% 1,6-isomer tail)',
    ],
    vettingQuestions: [
      'Will the CoA show both the original manufacturer batch ID and your repack lot?',
      'Can you commit in writing that the source plant will not change without 60-day notice?',
      'What is your retention-sample policy — do you keep sealed samples per batch for 24 months?',
    ],
    fitScore: (v, _m, _a, r) => {
      let s = 50;
      if (v === 'under-500kg') s += 35;
      if (v === '500kg-5t') s += 10;
      if (v === 'container-plus') s -= 25;
      if (r === 'low') s -= 20;
      return s;
    },
  },
  {
    key: 'pharma',
    name: 'Tier 3 — Korean / Japanese pharma-adjacent',
    priceBand: 'USD 6–22 /kg (40–80% premium over commodity)',
    strengths: [
      'Tighter batch-to-batch consistency (CoA field variance typically <2%)',
      'Pharma-grade documentation standards translate well to EU/MoCRA audits',
      'Established INCI naming and regulatory dossiers for JP/KR markets',
    ],
    risks: [
      'Lead time 6–10 weeks against China 2–4 weeks',
      'MOQ often 200–500 kg; container pulls require advance allocation',
      'Branded SKU names (BESTCARE500, Nagase grades) sometimes confused with EU brands',
    ],
    vettingQuestions: [
      'Is this the pharma-grade spec or a cosmetic variant with relaxed residual-solvent limits?',
      'What is the allocation lead time for a 1 T recurring quarterly pull?',
      'Which specific Japanese quasi-drug or Korean KFDA registration numbers apply?',
    ],
    fitScore: (v, m, a, r) => {
      let s = 50;
      if (m === 'JP' || m === 'KR') s += 25;
      if (r === 'low') s += 20;
      if (a === 'on-site') s += 10;
      if (v === 'under-500kg') s -= 10;
      return s;
    },
  },
  {
    key: 'branded',
    name: 'Tier 4 — Branded EU (Symrise / Schülke / Clariant / Minasolve)',
    priceBand: 'USD 15–90 /kg (3–6x commodity, SKU-dependent)',
    strengths: [
      'Regulatory dossier is audit-bulletproof across all 5 major markets',
      'Reformulation support, stability data library, pre-registered INCI',
      'Marketing claim defensibility (brand name on finished-product CoA chain)',
    ],
    risks: [
      'Unit price makes it uneconomic below USD 50 /kg finished-product cost',
      'Allocation during Q4 can slip 4–8 weeks',
      'Hidden by distributor markup — direct-brand pricing often not available under 1 T',
    ],
    vettingQuestions: [
      'Are we buying directly from the brand owner or through a regional distributor?',
      'What is the dossier access scope — do we get the full Safety Data Package or a summary?',
      'What is the branded-SKU minimum for direct allocation vs distributor quote?',
    ],
    fitScore: (v, m, _a, r) => {
      let s = 40;
      if (m === 'EU' || m === 'US') s += 20;
      if (r === 'low') s += 25;
      if (v === 'container-plus') s += 15;
      if (v === 'under-500kg') s -= 15;
      return s;
    },
  },
];

export default function SupplierTypeDecoder() {
  const [volume, setVolume] = useState<Volume>('500kg-5t');
  const [market, setMarket] = useState<Market>('EU');
  const [audit, setAudit] = useState<Audit>('remote');
  const [risk, setRisk] = useState<Risk>('medium');

  const ranked = useMemo(() => {
    return [...TIERS]
      .map((t) => ({ ...t, score: Math.max(0, Math.min(100, t.fitScore(volume, market, audit, risk))) }))
      .sort((a, b) => b.score - a.score);
  }, [volume, market, audit, risk]);

  const top = ranked[0];
  const runner = ranked[1];

  return (
    <section className="my-10 rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm">
      <header className="mb-5">
        <h3 className="text-xl font-semibold text-slate-900">Supplier Tier Decoder</h3>
        <p className="mt-1 text-sm text-slate-600">
          Four inputs → recommended tier shortlist with the exact questions your RFQ needs to carry.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Annual volume
          <select
            value={volume}
            onChange={(e) => setVolume(e.target.value as Volume)}
            className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="under-500kg">Under 500 kg</option>
            <option value="500kg-5t">500 kg – 5 T</option>
            <option value="5t-container">5 T – container</option>
            <option value="container-plus">Container-plus (20 T+)</option>
          </select>
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Primary market
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value as Market)}
            className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="EU">EU (Regulation 1223/2009)</option>
            <option value="US">US (MoCRA)</option>
            <option value="CN">China (IECIC 2021)</option>
            <option value="JP">Japan (quasi-drug)</option>
            <option value="KR">Korea (KFDA)</option>
          </select>
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Audit maturity
          <select
            value={audit}
            onChange={(e) => setAudit(e.target.value as Audit)}
            className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="none">No audit program yet</option>
            <option value="remote">Remote / document audit only</option>
            <option value="on-site">On-site or third-party PSI capable</option>
          </select>
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Risk tolerance
          <select
            value={risk}
            onChange={(e) => setRisk(e.target.value as Risk)}
            className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="low">Low (brand-safety first)</option>
            <option value="medium">Medium (balanced)</option>
            <option value="high">High (price first, cold-chain tolerant)</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {[top, runner].map((t, idx) => (
          <article
            key={t.key}
            className={`rounded-xl border p-5 ${
              idx === 0 ? 'border-emerald-300 bg-emerald-50/50' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-base font-semibold text-slate-900">{t.name}</h4>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  idx === 0 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                Fit {t.score}
              </span>
            </div>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
              {t.priceBand}
            </p>
            <div className="mt-3 grid gap-3 text-sm text-slate-700">
              <div>
                <p className="font-semibold text-slate-800">Strengths</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {t.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Risks to budget for</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {t.risks.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800">RFQ questions to carry forward</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {t.vettingQuestions.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Scoring is directional, not predictive. Published supplier benchmarks and dossier scope vary quarterly;
        always re-validate against your own three-batch sample program.
      </p>
    </section>
  );
}
