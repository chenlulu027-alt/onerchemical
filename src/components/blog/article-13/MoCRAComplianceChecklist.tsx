'use client';

import { useMemo, useState } from 'react';

type Role =
  | 'brand-owner'
  | 'responsible-person'
  | 'contract-manufacturer'
  | 'importer'
  | 'distributor';

type Scope = 'single-product' | 'multi-sku-brand' | 'contract-manufacturing-portfolio';

type ChecklistItem = {
  id: string;
  title: string;
  deadline: string;
  severity: 'critical' | 'high' | 'medium';
  detail: string;
};

const ROLE_LABELS: Record<Role, string> = {
  'brand-owner': 'Brand owner (responsible person on label)',
  'responsible-person': 'Responsible person (named on label, not the manufacturer)',
  'contract-manufacturer': 'Contract manufacturer (facility operator)',
  'importer': 'US importer of finished cosmetic products',
  'distributor': 'US distributor (pure logistics, not labeled)',
};

const SCOPE_LABELS: Record<Scope, string> = {
  'single-product': 'Single product launch',
  'multi-sku-brand': 'Multi-SKU brand (5+ products)',
  'contract-manufacturing-portfolio': 'Contract manufacturing portfolio (multiple brands)',
};

function buildChecklist(role: Role, scope: Scope): ChecklistItem[] {
  const items: ChecklistItem[] = [];

  if (role === 'contract-manufacturer') {
    items.push(
      {
        id: 'reg-new',
        title: 'Register facility with FDA',
        deadline: 'Within 60 days of first production for US distribution',
        severity: 'critical',
        detail: 'FDA Industry Systems Cosmetic Direct portal. Facility owner or operator files. Foreign facilities require a US agent with physical US address.',
      },
      {
        id: 'reg-renewal',
        title: 'Renew facility registration biennially',
        deadline: 'December 31 of even-numbered years (next: December 31, 2026)',
        severity: 'critical',
        detail: 'Lapsed registration triggers import refusal under FD&C 801(a). No grace period, no automatic renewal.',
      },
      {
        id: 'us-agent',
        title: 'Maintain US agent contact information current (foreign facilities)',
        deadline: 'Update within 60 days of any change',
        severity: 'high',
        detail: 'US agent must be reachable during US business hours. Agent change requires registration update.',
      },
      {
        id: 'change-notice',
        title: 'Notify each responsible person of material process or source changes',
        deadline: 'Within 60 days of change effective date (contract-driven)',
        severity: 'high',
        detail: 'A supplier-facing 60-day change-notification clause is the default contract term. Clause absence is the single most common FDA inspection finding.',
      },
    );
  }

  if (
    role === 'brand-owner' ||
    role === 'responsible-person' ||
    role === 'importer'
  ) {
    items.push(
      {
        id: 'cpl-initial',
        title: 'File Cosmetic Product Listing (CPL)',
        deadline: 'Within 120 days of first US marketing (within 60 days for new SKUs added to an existing listing)',
        severity: 'critical',
        detail: 'Through FDA Industry Systems Cosmetic Direct. Includes product name, category, responsible person, facility registration numbers, ingredient list, preservative concentration ranges.',
      },
      {
        id: 'cpl-annual',
        title: 'Confirm or update Cosmetic Product Listing annually',
        deadline: 'Annual deadline tied to original listing date',
        severity: 'critical',
        detail: 'Annual refresh is mandatory regardless of whether formulation changed. Failure to refresh is misbranding under section 602.',
      },
      {
        id: 'cpl-material-change',
        title: 'Update CPL on material change',
        deadline: 'Within 60 days of change',
        severity: 'critical',
        detail: 'Triggered by change in ingredient identity, declared concentration range, label category, or manufacturing facility.',
      },
      {
        id: 'substantiation',
        title: 'Maintain safety substantiation records for each product',
        deadline: 'Available within 15 business days of FDA request',
        severity: 'critical',
        detail: 'Challenge Test, stability study, toxicological assessment, labeling verification. Qualified individual sign-off.',
      },
      {
        id: 'sae-reporting',
        title: 'Report serious adverse events to FDA',
        deadline: '15 business days from first awareness',
        severity: 'critical',
        detail: 'FDA MedWatch form 3500A. SAE defined per FD&C 603(5): death, life-threatening, hospitalization, disability, birth defect, or intervention to prevent any of these.',
      },
      {
        id: 'sae-records',
        title: 'Retain adverse event records (serious and non-serious)',
        deadline: '6 years (6 years past majority for minor involvement)',
        severity: 'high',
        detail: 'Consumer complaint intake, medical documentation if provided, internal investigation notes, laboratory analysis of retained product.',
      },
      {
        id: 'label-match',
        title: 'Verify product label matches CPL on every production run',
        deadline: 'Per production batch',
        severity: 'high',
        detail: 'Ingredient list in declining weight order per 21 CFR 701.3. Preservative concentration on label must bracket declared CPL range.',
      },
    );
  }

  if (role === 'importer') {
    items.push({
      id: 'importer-reg-check',
      title: 'Verify foreign manufacturing facility registration before each import',
      deadline: 'Per shipment',
      severity: 'critical',
      detail: 'Check FDA Industry Systems for active registration status. An expired registration triggers CBP hold under FD&C 801(a).',
    });
  }

  if (role === 'distributor') {
    items.push(
      {
        id: 'dist-label-check',
        title: 'Verify product labels match CPL for all products in distribution',
        deadline: 'At receipt from responsible person',
        severity: 'medium',
        detail: 'Pure logistics distributors not named on label carry no MoCRA listing obligation but have liability under misbranding if distributing a non-compliant product.',
      },
      {
        id: 'dist-chain',
        title: 'Maintain chain-of-custody records',
        deadline: 'Per shipment',
        severity: 'medium',
        detail: 'Lot-level traceability for recall response. Preservative-contamination recalls require 72-hour distribution trace.',
      },
    );
  }

  if (scope === 'multi-sku-brand' || scope === 'contract-manufacturing-portfolio') {
    items.push({
      id: 'change-control-register',
      title: 'Maintain centralized change-control register',
      deadline: 'Updated in real time; reviewed quarterly',
      severity: 'high',
      detail: 'Log every supplier change, process change, facility change, formulation change across all SKUs. Cross-reference to CPL update decisions and Challenge Test re-run decisions.',
    });
  }

  if (scope === 'contract-manufacturing-portfolio') {
    items.push({
      id: 'brand-matrix',
      title: 'Maintain brand matrix with per-brand responsible person contact',
      deadline: 'Updated on new brand, discontinued brand, or responsible person change',
      severity: 'high',
      detail: 'Required for coordinated SAE response and inspection liaison. Each brand\'s responsible person carries the listing obligation; the CMO carries the facility obligation.',
    });
  }

  items.push({
    id: 'state-screening',
    title: 'Run state-level compliance screening (CA / WA / NY)',
    deadline: 'On formulation change; annual confirmation',
    severity: 'medium',
    detail: 'California Prop 65 and Safe Cosmetics Program, Washington Toxic-Free Cosmetics Act, New York 1,4-dioxane 1 ppm cap. State requirements survive MoCRA preemption outside defined scope.',
  });

  items.push({
    id: 'gmp-readiness',
    title: 'ISO 22716 GMP operating practice (interim; FDA cosmetic GMP final rule expected 2027)',
    deadline: 'Ongoing',
    severity: 'medium',
    detail: 'FDA cosmetic GMP final rule under FD&C 606 is pending; ISO 22716 is the de facto industry standard FDA inspectors reference in the interim.',
  });

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

export default function MoCRAComplianceChecklist() {
  const [role, setRole] = useState<Role>('brand-owner');
  const [scope, setScope] = useState<Scope>('multi-sku-brand');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const items = useMemo(() => buildChecklist(role, scope), [role, scope]);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = items.filter((i) => checked[i.id]).length;

  return (
    <div className="my-8 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        MoCRA Compliance Checklist
      </h3>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        Select your role and scope. The checklist shows the specific MoCRA action items with FDA
        deadlines. Toggle items as you confirm readiness.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Your role
          </span>
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value as Role);
              setChecked({});
            }}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(ROLE_LABELS) as Role[]).map((k) => (
              <option key={k} value={k}>
                {ROLE_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Product scope
          </span>
          <select
            value={scope}
            onChange={(e) => {
              setScope(e.target.value as Scope);
              setChecked({});
            }}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(SCOPE_LABELS) as Scope[]).map((k) => (
              <option key={k} value={k}>
                {SCOPE_LABELS[k]}
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
                    Deadline: {item.deadline}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-500">
        Checklist state is per-viewer in this browser only. Export a copy for your compliance team
        by printing this section or copying the items into your change-control register.
      </p>
    </div>
  );
}
