'use client';

import { useState } from 'react';

/**
 * Article-specific interactive — a two-question selector that recommends
 * either phenoxyethanol alone or the phenoxyethanol+ethylhexylglycerin
 * combination based on product form and target pH. Illustrates the
 * "article-NN/" convention: each article owns its own interactive module.
 */

type ProductForm = 'leave-on-emulsion' | 'rinse-off' | 'anhydrous' | 'aqueous-serum';
type PHBucket = 'below-4' | '4-to-6' | '6-to-7-5' | 'above-7-5';

const FORM_LABEL: Record<ProductForm, string> = {
  'leave-on-emulsion': 'Leave-on emulsion (cream, lotion)',
  'rinse-off': 'Rinse-off (cleanser, shampoo)',
  anhydrous: 'Anhydrous (oil, balm, powder)',
  'aqueous-serum': 'Aqueous serum / toner',
};

const PH_LABEL: Record<PHBucket, string> = {
  'below-4': 'Below 4 (acidic)',
  '4-to-6': '4.0 – 6.0',
  '6-to-7-5': '6.0 – 7.5',
  'above-7-5': 'Above 7.5 (alkaline)',
};

function recommend(form: ProductForm, ph: PHBucket): { verdict: string; reasoning: string } {
  if (form === 'anhydrous') {
    return {
      verdict: 'Neither — preservative likely unnecessary',
      reasoning:
        'Anhydrous systems have water activity below 0.6 and generally do not support microbial growth. Validate with a challenge test before omitting a preservative entirely.',
    };
  }
  if (form === 'rinse-off' && ph !== 'above-7-5') {
    return {
      verdict: 'Phenoxyethanol alone (0.5–1.0%)',
      reasoning:
        'Rinse-off products at pH 4–7.5 face limited contamination risk; phenoxyethanol as a single preservative is typically sufficient. Reserve the ethylhexylglycerin booster for leave-on where biofilm risk is higher.',
    };
  }
  if (form === 'leave-on-emulsion' || form === 'aqueous-serum') {
    if (ph === 'above-7-5') {
      return {
        verdict: 'Combination is justified, but consider alternatives',
        reasoning:
          'Phenoxyethanol loses efficacy above pH 7.5 against gram-negative bacteria. Ethylhexylglycerin boosts activity, but at alkaline pH an entirely different system (e.g. benzyl alcohol + salicylic acid, or a chelator-boosted system) often outperforms.',
      };
    }
    return {
      verdict: 'Phenoxyethanol + ethylhexylglycerin combination recommended',
      reasoning:
        'Leave-on products at pH 4–7.5 benefit from the broader gram-negative coverage ethylhexylglycerin provides as a secondary surfactant-disrupting booster. Typical: 0.7% phenoxyethanol + 0.3% ethylhexylglycerin.',
    };
  }
  return {
    verdict: 'Phenoxyethanol alone (0.5–1.0%)',
    reasoning:
      'In this configuration, phenoxyethanol single-system suffices. Document the decision with a challenge-test pass.',
  };
}

export function PhenoxyDecisionTree() {
  const [form, setForm] = useState<ProductForm | ''>('');
  const [ph, setPh] = useState<PHBucket | ''>('');

  const rec = form && ph ? recommend(form, ph) : null;

  return (
    <div className="my-10 rounded-lg border border-ink-100 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <div className="mb-1 text-[11px] font-medium uppercase tracking-[1.5px] text-brand-800">
          Interactive
        </div>
        <h3 className="font-serif text-xl text-ink-900">Which system fits your formulation?</h3>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-500">
            Product form
          </span>
          <select
            value={form}
            onChange={(e) => setForm(e.target.value as ProductForm)}
            className="w-full rounded-md border border-ink-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
          >
            <option value="">Select…</option>
            {(Object.keys(FORM_LABEL) as ProductForm[]).map((k) => (
              <option key={k} value={k}>
                {FORM_LABEL[k]}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-500">
            Target pH
          </span>
          <select
            value={ph}
            onChange={(e) => setPh(e.target.value as PHBucket)}
            className="w-full rounded-md border border-ink-300 bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
          >
            <option value="">Select…</option>
            {(Object.keys(PH_LABEL) as PHBucket[]).map((k) => (
              <option key={k} value={k}>
                {PH_LABEL[k]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {rec && (
        <div className="mt-6 border-t border-ink-100 pt-5">
          <div className="mb-1 text-xs uppercase tracking-wider text-ink-500">Recommendation</div>
          <div className="mb-2 font-serif text-lg text-brand-900">{rec.verdict}</div>
          <p className="text-sm leading-relaxed text-ink-700">{rec.reasoning}</p>
          <p className="mt-3 text-xs italic text-ink-500">
            Guidance only — always validate with ISO 11930 or USP 51 challenge testing on the final
            matrix.
          </p>
        </div>
      )}
    </div>
  );
}
