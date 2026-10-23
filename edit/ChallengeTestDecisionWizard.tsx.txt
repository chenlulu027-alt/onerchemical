'use client';

import { useState, useMemo } from 'react';

type ProductType = 'leave-on' | 'rinse-off' | 'anhydrous' | 'wipe';
type Market = 'eu' | 'us' | 'global' | 'china' | 'japan';
type Audience = 'adult-general' | 'child-under-3' | 'ocular-mucous' | 'sensitive-skin';

type Verdict = {
  standard: string;
  criterion: 'A' | 'B' | 'A+B' | 'customised';
  protocolAdds: string[];
  rationale: string[];
  flag: 'green' | 'amber' | 'red';
};

const PRODUCT_LABEL: Record<ProductType, string> = {
  'leave-on': 'Leave-on (cream, serum, lotion, SPF)',
  'rinse-off': 'Rinse-off (cleanser, shampoo, body wash)',
  'anhydrous': 'Anhydrous (oil, balm, stick)',
  'wipe': 'Wet wipe / impregnated applicator',
};

const MARKET_LABEL: Record<Market, string> = {
  eu: 'EU / UK (Regulation 1223/2009)',
  us: 'US (MoCRA + FDA)',
  global: 'Multi-market (EU + US + ROW)',
  china: 'China (NMPA / IECIC)',
  japan: 'Japan (Quasi-drug route optional)',
};

const AUDIENCE_LABEL: Record<Audience, string> = {
  'adult-general': 'Adult, general use',
  'child-under-3': 'Child under 3 / baby care',
  'ocular-mucous': 'Eye-area or mucous-membrane contact',
  'sensitive-skin': 'Marketed to sensitive / compromised-barrier skin',
};

function decide(product: ProductType, market: Market, audience: Audience): Verdict {
  const adds: string[] = [];
  const why: string[] = [];
  let flag: Verdict['flag'] = 'green';
  let standard = 'ISO 11930:2019';
  let criterion: Verdict['criterion'] = 'A';

  if (product === 'anhydrous') {
    adds.push('Water activity (Aw) measurement first — if Aw < 0.75, ISO 11930 Microbial Risk Assessment (MRA, Annex A) may substitute for the full challenge test.');
    why.push('Anhydrous systems with Aw below 0.75 are considered low-risk under ISO 11930 Annex A; a documented MRA is often accepted in lieu of a 28-day challenge, but lab + CPSR assessor must sign off case by case.');
    flag = 'amber';
  }

  if (product === 'wipe') {
    adds.push('Switch from the standard inoculation protocol to the ISO 11930 wipe protocol — individual wipes are inoculated and tested separately.');
    why.push('Wet wipes carry a different contamination mode (surface + applicator transfer); the standard dip-and-stir inoculation misses the real-world exposure path.');
  }

  if (audience === 'child-under-3' || audience === 'ocular-mucous') {
    criterion = 'A';
    adds.push('Default to Criterion A — no fallback to Criterion B regardless of market.');
    why.push('Both EU and US frameworks tighten preservation expectations for infant care and eye/mucous-contact products; a Criterion B pass alone will not satisfy a CPSR safety assessor for this audience.');
    flag = 'amber';
  }

  if (market === 'us' || market === 'global') {
    adds.push('Run USP <51> Antimicrobial Effectiveness Testing (AET) alongside ISO 11930 — the two use the same 5 strains but different log-reduction criteria and timelines.');
    why.push('As of 2026-10, MoCRA does not mandate a specific challenge test, but US big-box retailers (Target, Ulta, Sephora) still request USP <51> on the specification sheet; shipping only ISO 11930 to the US delays onboarding.');
    standard = 'ISO 11930:2019 + USP <51>';
  }

  if (market === 'china') {
    adds.push('China 《化妆品安全技术规范》(2015 版) does not require ISO 11930 explicitly — but an NMPA-filed importer-of-record will usually ask for either CTFA M-3 or ISO 11930 as supporting data.');
    why.push('NMPA primarily audits the product safety assessment report; a documented ISO 11930 pass + preservative Annex V-equivalent IECIC compliance usually clears the technical dossier review.');
  }

  if (market === 'japan') {
    adds.push('If pursuing quasi-drug (医薬部外品) route, add a 3-week extended protocol per the Pharmaceutical Society of Japan guideline; general cosmetic route accepts ISO 11930 alone.');
    why.push('Quasi-drug route carries higher preservation evidence burden but allows anti-acne / brightening claims unavailable in general cosmetics.');
  }

  if (product === 'rinse-off' && audience === 'adult-general') {
    adds.push('Criterion B is defensible for most rinse-off adult formulas — but confirm with your CPSR assessor before relying on it; some assessors require Criterion A universally.');
    why.push('ISO 11930 Criterion B exists specifically for products where usage patterns limit microbial exposure risk (short contact time, dilution, rinsing); it allows a lower log-reduction target in exchange for additional supporting evidence like production-batch controls.');
    criterion = audience === 'adult-general' ? 'B' : 'A';
  }

  if (audience === 'sensitive-skin') {
    adds.push('Even with a Criterion A pass, add in-use preservation testing (in-use challenge) with real consumer handling simulated — tiny dip-finger contamination over 30 days.');
    why.push('Sensitive-skin claims make the brand liable for a lower contamination threshold in real use; marketing claims drive legal exposure.');
    flag = 'amber';
  }

  if (adds.length === 0) {
    why.push('Standard ISO 11930 Criterion A protocol, no special add-ons required for this profile.');
  }

  return {
    standard,
    criterion,
    protocolAdds: adds,
    rationale: why,
    flag,
  };
}

export default function ChallengeTestDecisionWizard() {
  const [product, setProduct] = useState<ProductType>('leave-on');
  const [market, setMarket] = useState<Market>('eu');
  const [audience, setAudience] = useState<Audience>('adult-general');

  const verdict = useMemo(() => decide(product, market, audience), [product, market, audience]);

  const flagStyle = {
    green: 'border-emerald-300 bg-emerald-50',
    amber: 'border-amber-300 bg-amber-50',
    red: 'border-rose-300 bg-rose-50',
  }[verdict.flag];

  const flagChip = {
    green: 'bg-emerald-600 text-white',
    amber: 'bg-amber-600 text-white',
    red: 'bg-rose-600 text-white',
  }[verdict.flag];

  const flagLabel = {
    green: 'STANDARD PROTOCOL',
    amber: 'ADD-ONS REQUIRED',
    red: 'CUSTOM PROTOCOL',
  }[verdict.flag];

  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="mb-1 text-lg font-semibold text-slate-900">
          Challenge Test Decision Wizard
        </h3>
        <p className="text-sm text-slate-600">
          Choose your product profile — the wizard returns the test standard, ISO 11930 criterion, and protocol add-ons your CPSR assessor is likely to expect.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Product type
          </span>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value as ProductType)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            {(Object.keys(PRODUCT_LABEL) as ProductType[]).map((k) => (
              <option key={k} value={k}>{PRODUCT_LABEL[k]}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Target market
          </span>
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value as Market)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            {(Object.keys(MARKET_LABEL) as Market[]).map((k) => (
              <option key={k} value={k}>{MARKET_LABEL[k]}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Target audience
          </span>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value as Audience)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            {(Object.keys(AUDIENCE_LABEL) as Audience[]).map((k) => (
              <option key={k} value={k}>{AUDIENCE_LABEL[k]}</option>
            ))}
          </select>
        </label>
      </div>

      <div className={`mt-6 rounded-xl border ${flagStyle} p-5`}>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${flagChip}`}>
            {flagLabel}
          </span>
          <span className="text-sm text-slate-700">
            Standard: <strong className="text-slate-900">{verdict.standard}</strong>
          </span>
          <span className="text-sm text-slate-700">
            Criterion: <strong className="text-slate-900">{verdict.criterion}</strong>
          </span>
        </div>

        {verdict.protocolAdds.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-semibold text-slate-900">Protocol add-ons</h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
              {verdict.protocolAdds.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>
        )}

        <div>
          <h4 className="mb-2 text-sm font-semibold text-slate-900">Why this verdict</h4>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            {verdict.rationale.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      </div>

      <p className="mt-4 text-xs italic text-slate-500">
        Decision guidance based on ISO 11930:2019 current scope + Onerchemical procurement experience with contract labs supplying indie brands in the EU, US, and China markets as of 2026-10. CPSR assessor sign-off remains the governing authority for a specific product.
      </p>
    </div>
  );
}
