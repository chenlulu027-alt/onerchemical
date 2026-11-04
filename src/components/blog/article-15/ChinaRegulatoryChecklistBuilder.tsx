'use client';

import { useMemo, useState } from 'react';

type Category = 'ordinary-no-claim' | 'ordinary-with-claim' | 'special-cosmetic';
type Origin = 'domestic' | 'imported';
type ClaimType = 'none' | 'moisturizing-basic' | 'anti-aging' | 'repair-barrier' | 'infant-child';

interface ChecklistItem {
  id: string;
  title: string;
  deadline: string;
  severity: 'critical' | 'high' | 'medium';
  detail: string;
}

const CATEGORY_LABELS: Record<Category, string> = {
  'ordinary-no-claim': 'Ordinary cosmetic, no efficacy claim (cleanser, toner, basic moisturizer)',
  'ordinary-with-claim': 'Ordinary cosmetic, with additional efficacy claim (anti-aging, repair, soothing)',
  'special-cosmetic': 'Special cosmetic (hair dye / perm / whitening / sunscreen / anti-hair-loss)',
};

const ORIGIN_LABELS: Record<Origin, string> = {
  domestic: 'Manufactured in China (provincial MPA filing)',
  imported: 'Imported from overseas (NMPA national filing)',
};

const CLAIM_LABELS: Record<ClaimType, string> = {
  none: 'No specific efficacy claim',
  'moisturizing-basic': 'Basic moisturizing / cleansing only',
  'anti-aging': 'Anti-aging / anti-wrinkle claim',
  'repair-barrier': 'Barrier repair / soothing claim',
  'infant-child': 'Infant or child product (0-12 years)',
};

function buildChecklist(
  category: Category,
  origin: Origin,
  claim: ClaimType,
): ChecklistItem[] {
  const items: ChecklistItem[] = [];

  // Common items for all paths
  items.push(
    {
      id: 'iecic-check',
      title: 'Verify every ingredient (incl. preservatives) is on IECIC 2021',
      deadline: 'Before CBE notification or registration dossier submission',
      severity: 'critical',
      detail: 'Any ingredient not on IECIC 2021 requires new-ingredient notification or registration before use. Preservatives in particular cannot typically use the 3-year safety monitoring notification path and require full new-ingredient registration.',
    },
    {
      id: 'stsc-annex-v',
      title: 'Cross-check preservatives against STSC Annex V',
      deadline: 'Before dossier submission',
      severity: 'critical',
      detail: 'A preservative used and labelled as such must be on STSC Annex V at the use concentration. A multifunctional ingredient on IECIC but not on STSC Annex V can be used for its non-preservative function.',
    },
    {
      id: 'chinese-label',
      title: 'Prepare Chinese-language labeling per Chinese labeling regulations',
      deadline: 'Before dossier submission',
      severity: 'critical',
      detail: 'Primary label, secondary packaging label, and insert (if applicable) in Chinese; ingredient list in standard Chinese names in descending weight order; net content, intended use, manufacturer and DRP information per China cosmetic labeling standard.',
    },
    {
      id: 'safety-assessment',
      title: 'Prepare Chinese safety assessment report signed by qualified Chinese safety assessor',
      deadline: 'Before dossier submission',
      severity: 'critical',
      detail: 'Per the 2021 Technical Guidelines for Cosmetic Safety Assessment. Accepts EU CPSR / US substantiation data as evidence base with format conversion and Chinese assessor sign-off.',
    },
    {
      id: 'challenge-test',
      title: 'Conduct Challenge Test per GB/T 38857-2020 or ISO 11930 (with China-acceptable lab provenance)',
      deadline: 'Before dossier submission; re-run on any formulation or supplier change',
      severity: 'critical',
      detail: 'ISO 11930 accepted; GB/T 38857-2020 is the preferred China national standard and accelerates review. Lab must be China-recognized or carry equivalent accreditation.',
    },
  );

  // Origin-specific
  if (origin === 'imported') {
    items.push(
      {
        id: 'drp-appointment',
        title: 'Appoint Domestic Responsible Person (DRP) in China',
        deadline: 'Before any CBE notification or registration can proceed',
        severity: 'critical',
        detail: 'Mandatory under CSAR Article 7. DRP must be a Chinese legal entity with physical office, Chinese legal representative, and business license covering cosmetic scope. Options: brand subsidiary, specialized consultancy, or Chinese contract manufacturer.',
      },
      {
        id: 'drp-authorization',
        title: 'Execute DRP authorization letter and submit DRP business license',
        deadline: 'Part of the notification/registration dossier',
        severity: 'critical',
        detail: 'Overseas manufacturer formally authorizes the DRP to represent the brand to NMPA. Must be notarized and apostilled for international recognition.',
      },
      {
        id: 'overseas-gmp',
        title: 'Overseas manufacturer GMP compliance evidence',
        deadline: 'Part of the dossier',
        severity: 'high',
        detail: 'ISO 22716 certificate or equivalent national cosmetic GMP certification. Must cover the manufacturing facility named on the product.',
      },
    );
  }

  if (origin === 'domestic') {
    items.push({
      id: 'domestic-gmp',
      title: 'Domestic manufacturing license and GMP',
      deadline: 'Pre-requisite for any manufacturing',
      severity: 'critical',
      detail: 'Chinese cosmetic manufacturing license from the provincial MPA; GMP compliance per the 2022 Good Manufacturing Practice guidelines for cosmetics.',
    });
  }

  // Category-specific
  if (category === 'ordinary-no-claim' || category === 'ordinary-with-claim') {
    items.push({
      id: 'cbe-filing',
      title: 'Submit CBE notification through the Cosmetic Registration and Notification Information Service Platform',
      deadline: '3-10 business days processing from complete dossier submission',
      severity: 'critical',
      detail: 'Domestic: provincial platform. Imported: national (NMPA) platform. Dossier includes product identity, ingredient list with preservative concentration ranges, manufacturing info, safety assessment, test reports, labeling.',
    });
  }

  if (category === 'ordinary-with-claim') {
    items.push({
      id: 'efficacy-substantiation',
      title: 'Efficacy claim substantiation per 2021 Technical Guidelines',
      deadline: 'Part of the CBE notification dossier',
      severity: 'high',
      detail: 'Claims beyond basic cleansing/moisturizing (anti-aging, repair, soothing, whitening-adjacent but non-registration) require efficacy test evidence on the finished product or on an equivalent base.',
    });
  }

  if (category === 'special-cosmetic') {
    items.push(
      {
        id: 'special-registration',
        title: 'Submit special-cosmetic registration to NMPA',
        deadline: '6-12 months processing from complete dossier',
        severity: 'critical',
        detail: 'Full technical review by NMPA with scientific experts. Dossier more extensive than CBE notification; includes full toxicological assessment, efficacy substantiation on the specific category claim, clinical or human trial evidence where required.',
      },
      {
        id: 'registration-renewal',
        title: 'Renew special-cosmetic registration before 5-year validity expires',
        deadline: 'Before validity expiration',
        severity: 'high',
        detail: 'Registration is valid for 5 years. Renewal requires updated safety and efficacy evidence.',
      },
    );
  }

  // Claim-specific
  if (claim === 'infant-child') {
    items.push({
      id: 'infant-restrictions',
      title: 'Infant/child product preservative restrictions and warning labels',
      deadline: 'Part of the dossier',
      severity: 'critical',
      detail: 'Several STSC Annex V preservatives restricted or prohibited for infant/child use (parabens with age caps, salicylic acid except shampoo, IPBC most categories). Child-product category tagged at CBE; mis-tagging triggers rejection.',
    });
  }

  if (claim === 'anti-aging') {
    items.push({
      id: 'anti-aging-substantiation',
      title: 'Anti-aging efficacy substantiation evidence',
      deadline: 'Part of the CBE dossier',
      severity: 'high',
      detail: 'Human evaluation (28-day or longer) measuring wrinkle depth, elasticity, or equivalent endpoint. Instrumental measurement preferred (Visia, cutometer, TEWL).',
    });
  }

  // Common final items
  items.push(
    {
      id: 'safety-file-retention',
      title: 'Maintain product safety file for 10 years after last batch production',
      deadline: 'Ongoing',
      severity: 'high',
      detail: 'DRP (imported) or manufacturer (domestic) retains the product technical requirements document, supplier CoAs, test reports, and change-control records for 10 years.',
    },
    {
      id: 'adverse-event-reporting',
      title: 'Adverse event monitoring and reporting',
      deadline: 'Ongoing; specific-timeframe for serious events',
      severity: 'high',
      detail: 'Under the 2022 Measures for Supervision and Administration of Cosmetic Adverse Reaction Monitoring. Serious adverse events reported to provincial MPA within specified window; records retained.',
    },
    {
      id: 'labeling-accuracy',
      title: 'Ongoing labeling-to-notification match verification',
      deadline: 'Per production batch; on every label revision',
      severity: 'high',
      detail: 'Any labeling change (ingredient order, concentration range disclosure, claim text, warning statement) must be reflected in a CBE notification update.',
    },
  );

  return items;
}

const SEVERITY_COLORS: Record<ChecklistItem['severity'], string> = {
  critical: 'border-rose-400 bg-rose-50 dark:border-rose-700 dark:bg-rose-950/40',
  high: 'border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/40',
  medium: 'border-blue-400 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/40',
};

const SEVERITY_LABELS: Record<ChecklistItem['severity'], string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
};

const SEVERITY_BADGE: Record<ChecklistItem['severity'], string> = {
  critical: 'bg-rose-600 text-white',
  high: 'bg-amber-600 text-white',
  medium: 'bg-blue-600 text-white',
};

export default function ChinaRegulatoryChecklistBuilder() {
  const [category, setCategory] = useState<Category>('ordinary-no-claim');
  const [origin, setOrigin] = useState<Origin>('imported');
  const [claim, setClaim] = useState<ClaimType>('none');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const items = useMemo(() => buildChecklist(category, origin, claim), [category, origin, claim]);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = items.filter((i) => checked[i.id]).length;

  return (
    <div className="my-8 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        China CSAR Regulatory Checklist Builder
      </h3>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        Select product category, origin, and claim type. The checklist shows the specific
        CSAR / STSC action items with NMPA processing timelines.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Product category
          </span>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as Category);
              setChecked({});
            }}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(CATEGORY_LABELS) as Category[]).map((k) => (
              <option key={k} value={k}>
                {CATEGORY_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Origin
          </span>
          <select
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value as Origin);
              setChecked({});
            }}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(ORIGIN_LABELS) as Origin[]).map((k) => (
              <option key={k} value={k}>
                {ORIGIN_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Claim type
          </span>
          <select
            value={claim}
            onChange={(e) => {
              setClaim(e.target.value as ClaimType);
              setChecked({});
            }}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(CLAIM_LABELS) as ClaimType[]).map((k) => (
              <option key={k} value={k}>
                {CLAIM_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 rounded-md bg-neutral-50 p-3 text-xs text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
        {completedCount} of {items.length} items checked
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item) => {
          const isChecked = !!checked[item.id];
          return (
            <div
              key={item.id}
              className={`rounded-md border p-3 transition ${
                isChecked
                  ? 'border-emerald-400 bg-emerald-50 opacity-70 dark:border-emerald-700 dark:bg-emerald-950/40'
                  : SEVERITY_COLORS[item.severity]
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(item.id)}
                  className="mt-1 h-4 w-4 cursor-pointer accent-emerald-600"
                  aria-label={`Mark ${item.title} complete`}
                />
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${SEVERITY_BADGE[item.severity]}`}
                    >
                      {SEVERITY_LABELS[item.severity]}
                    </span>
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {item.detail}
                  </p>
                  <p className="mt-2 text-[11px] font-medium text-neutral-600 dark:text-neutral-400">
                    Timeline: {item.deadline}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-500">
        Checklist state is per-viewer in this browser only. Export a copy for your DRP or
        regulatory team by printing this section or copying the items into your change-control
        register.
      </p>
    </div>
  );
}
