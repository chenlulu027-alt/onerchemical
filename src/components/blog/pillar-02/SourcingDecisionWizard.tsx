'use client';

import { useMemo, useState } from 'react';

type Molecule =
  | 'phenoxyethanol'
  | '1,2-hexanediol'
  | 'ethylhexylglycerin'
  | 'caprylhydroxamic-acid'
  | 'other';
type Volume = 'under-100kg' | '100-500kg' | '500kg-5t' | '5t-plus';
type Market = 'EU' | 'US' | 'CN' | 'JP' | 'KR';
type Lead = 'under-4w' | '4-8w' | '8w-plus';
type AuditAvail = 'yes' | 'no';

const MOLECULE_LABELS: Record<Molecule, string> = {
  phenoxyethanol: 'Phenoxyethanol (CAS 122-99-6)',
  '1,2-hexanediol': '1,2-Hexanediol (CAS 6920-22-5)',
  ethylhexylglycerin: 'Ethylhexylglycerin (CAS 70445-33-9)',
  'caprylhydroxamic-acid': 'Caprylhydroxamic Acid (CAS 7377-03-9)',
  other: 'Other preservative (describe in RFQ)',
};

function recommend(mol: Molecule, vol: Volume, market: Market, lead: Lead, audit: AuditAvail) {
  const tiers: string[] = [];
  const redFlags: string[] = [];
  const rfqFields: string[] = [
    'Full molecule name + CAS + INCI exactly as it will appear on finished-product label',
    'Target monthly / quarterly / annual recurring volume with ramp curve',
    'Destination market + regulatory scheme (EU Annex V entry number if applicable)',
    'CoA field list required: assay, impurity profile, heavy metals (ICP-MS), residual solvents (GC-headspace), microbial panel, batch-site-date',
    'Preferred incoterm + port of discharge + packaging spec (drum / IBC / pail)',
    'Payment terms expectation (30/70 T/T is the baseline; 100% advance is a risk signal)',
    'Change-notification clause: 60-day lead time for source-plant or process changes',
  ];

  if (vol === 'under-100kg') {
    tiers.push('Tier 2 trader (primary) — only viable path under 100 kg for most molecules');
    redFlags.push('Any Tier 1 quote under 100 kg should be treated as trader-repack in disguise');
  } else if (vol === '100-500kg') {
    tiers.push('Tier 2 trader (primary) + Tier 1 shortlist as fallback for next tier up');
    redFlags.push('Compare trader quote vs direct quote on the SAME 500-kg basis — not sample vs bulk');
  } else if (vol === '500kg-5t') {
    tiers.push('Tier 1 commodity (primary) + Tier 2 trader as redundancy source');
    redFlags.push('Verify the Tier 1 is the real manufacturer, not another trader with better English');
  } else {
    tiers.push('Tier 1 commodity (primary) + Tier 3 pharma OR Tier 4 branded as dual-source');
    redFlags.push('At container-plus volume, single-sourcing is a documented continuity risk');
  }

  if (market === 'EU') {
    tiers.push('Tier 4 branded warrants a quote on at least one SKU for dossier bulletproofing');
    rfqFields.push('EU Annex V entry number + any concentration caps (e.g. Phenoxyethanol max 1.0%)');
  }
  if (market === 'JP' || market === 'KR') {
    tiers.push('Tier 3 Korean/Japanese pharma-adjacent moves to primary for home-market credibility');
  }
  if (market === 'US') {
    rfqFields.push('MoCRA facility registration number of the manufacturer');
  }
  if (market === 'CN') {
    rfqFields.push('IECIC 2021 listing confirmation + Chinese INCI name');
  }

  if (lead === 'under-4w') {
    redFlags.push('Lead time under 4 weeks on first order usually means existing stock — verify batch age');
  }
  if (lead === '8w-plus') {
    tiers.push('Allocation-model quarterly pulls are feasible — negotiate annual price lock');
  }

  if (audit === 'no') {
    redFlags.push('Without audit capability, insist on SGS/BV PSI (USD 300–450) before bulk shipment');
    rfqFields.push('Third-party PSI acceptance clause + release of retention sample for independent re-test');
  } else {
    rfqFields.push('On-site or video audit scheduling window (production + QC + warehouse)');
  }

  if (mol === '1,2-hexanediol') {
    redFlags.push('Isomer purity (1,2- vs 1,6- vs mixed diols) must be reported with GC method — missing this field = disqualify');
  }
  if (mol === 'phenoxyethanol') {
    redFlags.push('1,4-dioxane residual limit must be stated with method of analysis');
  }
  if (mol === 'caprylhydroxamic-acid') {
    redFlags.push('For monomer buy, confirm it is NOT a Spectrastat-family pre-blend relabelled');
  }

  return { tiers, redFlags, rfqFields };
}

export default function SourcingDecisionWizard() {
  const [molecule, setMolecule] = useState<Molecule>('phenoxyethanol');
  const [volume, setVolume] = useState<Volume>('500kg-5t');
  const [market, setMarket] = useState<Market>('EU');
  const [lead, setLead] = useState<Lead>('4-8w');
  const [audit, setAudit] = useState<AuditAvail>('no');

  const result = useMemo(
    () => recommend(molecule, volume, market, lead, audit),
    [molecule, volume, market, lead, audit],
  );

  return (
    <section className="my-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="mb-5">
        <h3 className="text-xl font-semibold text-slate-900">Sourcing Decision Wizard</h3>
        <p className="mt-1 text-sm text-slate-600">
          Describe the order; get the tier shortlist, RFQ fields, and the red flags to budget mitigation for.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Molecule
          <select
            value={molecule}
            onChange={(e) => setMolecule(e.target.value as Molecule)}
            className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            {Object.entries(MOLECULE_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Annual volume
          <select
            value={volume}
            onChange={(e) => setVolume(e.target.value as Volume)}
            className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="under-100kg">Under 100 kg</option>
            <option value="100-500kg">100 – 500 kg</option>
            <option value="500kg-5t">500 kg – 5 T</option>
            <option value="5t-plus">5 T +</option>
          </select>
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Destination market
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value as Market)}
            className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="EU">EU</option>
            <option value="US">US</option>
            <option value="CN">China</option>
            <option value="JP">Japan</option>
            <option value="KR">Korea</option>
          </select>
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Lead-time window
          <select
            value={lead}
            onChange={(e) => setLead(e.target.value as Lead)}
            className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="under-4w">Under 4 weeks</option>
            <option value="4-8w">4 – 8 weeks</option>
            <option value="8w-plus">8 weeks or allocation</option>
          </select>
        </label>
        <label className="flex flex-col text-sm font-medium text-slate-700">
          Audit capability
          <select
            value={audit}
            onChange={(e) => setAudit(e.target.value as AuditAvail)}
            className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="yes">Can run on-site or third-party PSI</option>
            <option value="no">Document audit only</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <article className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-800">Tier shortlist</h4>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-800">
            {result.tiers.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-xl border border-amber-200 bg-amber-50/60 p-5">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-amber-800">Red flags to mitigate</h4>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-800">
            {result.redFlags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">RFQ fields to send</h4>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-800">
            {result.rfqFields.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </article>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Outputs are a starting framework — not a replacement for the three-batch sample program every new supplier
        relationship should pass before first bulk purchase.
      </p>
    </section>
  );
}
