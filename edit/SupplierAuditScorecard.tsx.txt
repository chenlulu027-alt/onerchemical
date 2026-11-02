'use client';
import { useState, useMemo } from 'react';

const DIMENSIONS = [
  { key: 'coa_fields', label: 'CoA field completeness (all 7 fields present)', hint: 'Including method citation + reference-standard lot' },
  { key: 'drift', label: 'Shewhart drift status (last 10 batches)', hint: 'In control = 10 / warning = 5 / action = 0' },
  { key: 'change_notif', label: '60-day change-notification compliance', hint: 'Zero undisclosed changes in last 12 months = 10' },
  { key: 'retest', label: 'Independent retest agreement (last audit cycle)', hint: 'All annual retests passed = 10' },
  { key: 'docs', label: 'Compliance dossier completeness (SDS/TDS/REACH/GMP/ISO 22716)', hint: 'All current = 10' },
  { key: 'leadtime', label: 'Lead-time reliability (on-time delivery rate)', hint: '>95% = 10 / 90-95% = 7 / <90% = 4' },
  { key: 'audit', label: 'Site audit readiness (last 24 months)', hint: 'Hosted audit with no major finding = 10' },
];

export default function SupplierAuditScorecard() {
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(DIMENSIONS.map((d) => [d.key, 7]))
  );

  const total = useMemo(
    () => DIMENSIONS.reduce((sum, d) => sum + (scores[d.key] || 0), 0),
    [scores]
  );
  const pct = (total / (DIMENSIONS.length * 10)) * 100;

  const status =
    pct >= 80
      ? { label: 'APPROVED', color: '#059669', note: 'Continue standard annual review cadence.' }
      : pct >= 60
      ? { label: 'CONDITIONAL', color: '#d97706', note: '90-day remediation window; open dual-source RFQ in parallel.' }
      : { label: 'REJECTED', color: '#dc2626', note: 'Suspend new POs until remediation plan agreed and verified.' };

  return (
    <div className="my-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 space-y-4">
        {DIMENSIONS.map((d) => (
          <div key={d.key}>
            <div className="flex items-baseline justify-between">
              <label className="text-sm font-medium text-slate-800">{d.label}</label>
              <span className="text-sm font-mono text-slate-600">{scores[d.key]}/10</span>
            </div>
            <p className="mb-1 text-xs text-slate-500">{d.hint}</p>
            <input
              type="range"
              min={0}
              max={10}
              value={scores[d.key]}
              onChange={(e) => setScores({ ...scores, [d.key]: parseInt(e.target.value, 10) })}
              className="w-full accent-slate-700"
              aria-label={d.label}
            />
          </div>
        ))}
      </div>

      <div className="rounded border border-slate-300 bg-slate-50 p-4">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">Composite score</div>
            <div className="text-2xl font-bold text-slate-900">
              {total}<span className="text-sm text-slate-500">/70 ({pct.toFixed(0)}%)</span>
            </div>
          </div>
          <div
            className="rounded px-3 py-1 text-sm font-semibold text-white"
            style={{ backgroundColor: status.color }}
          >
            {status.label}
          </div>
        </div>
        <p className="mt-2 text-sm text-slate-700">{status.note}</p>
      </div>
    </div>
  );
}
