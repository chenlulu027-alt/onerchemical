'use client';

import Link from 'next/link';
import { useState } from 'react';

type Route = 'formulator' | 'procurement' | 'compliance' | null;

export default function PreservativeIdentityRouter() {
  const [route, setRoute] = useState<Route>(null);

  const routes: {
    key: Exclude<Route, null>;
    label: string;
    sub: string;
    tone: string;
  }[] = [
    {
      key: 'formulator',
      label: 'Still evaluating options',
      sub: 'Keep reading this guide — the 4-step framework and selection matrix below are built for you.',
      tone: 'indigo',
    },
    {
      key: 'procurement',
      label: 'Already using Phenoxyethanol or 1,2-Hexanediol',
      sub: 'Jump to our per-ingredient sourcing guides for batch-consistency and 100 kg procurement economics.',
      tone: 'green',
    },
    {
      key: 'compliance',
      label: 'Dealing with CoA failures or regulatory audits',
      sub: 'Jump to the CoA drift tracker and EU Annex V compliance guide — this pillar covers the strategic view, those cover the fire.',
      tone: 'amber',
    },
  ];

  const toneClass = (tone: string, selected: boolean) => {
    const map: Record<string, string> = {
      indigo: selected
        ? 'bg-indigo-50 border-indigo-400 shadow-sm'
        : 'bg-white border-slate-200 hover:border-indigo-300',
      green: selected
        ? 'bg-emerald-50 border-emerald-400 shadow-sm'
        : 'bg-white border-slate-200 hover:border-emerald-300',
      amber: selected
        ? 'bg-amber-50 border-amber-400 shadow-sm'
        : 'bg-white border-slate-200 hover:border-amber-300',
    };
    return map[tone] ?? '';
  };

  return (
    <div className="my-8 border border-slate-300 rounded-xl p-5 bg-slate-50">
      <div className="text-sm font-semibold tracking-wide uppercase text-slate-700 mb-3">
        Where are you in your preservation decision?
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {routes.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => setRoute(r.key)}
            className={`text-left border-2 rounded-lg p-4 transition ${toneClass(
              r.tone,
              route === r.key,
            )}`}
          >
            <div className="font-semibold text-slate-900 text-sm leading-snug">{r.label}</div>
          </button>
        ))}
      </div>

      {route === 'formulator' && (
        <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <p className="text-sm text-slate-700 m-0">
            {routes[0].sub} The{' '}
            <a href="#decision-framework" className="font-semibold text-indigo-700 underline">
              4-step decision framework
            </a>{' '}
            and the{' '}
            <a href="#selection-matrix" className="font-semibold text-indigo-700 underline">
              selection matrix
            </a>{' '}
            are the next sections to read.
          </p>
        </div>
      )}

      {route === 'procurement' && (
        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-sm text-slate-700 m-0 mb-2">{routes[1].sub}</p>
          <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1 m-0">
            <li>
              <Link href="/blog/phenoxyethanol-supplier-guide" className="text-emerald-700 font-semibold underline">
                Phenoxyethanol sourcing guide
              </Link>{' '}
              — 2026 Q4 FOB benchmarks, tier decoder, 7-field CoA audit
            </li>
            <li>
              <Link href="/blog/1-2-hexanediol-supplier-guide" className="text-emerald-700 font-semibold underline">
                1,2-Hexanediol sourcing guide
              </Link>{' '}
              — isomer purity red flags, SG vs TG decision, Korea/Japan vs China benchmarks
            </li>
            <li>
              <Link
                href="/blog/preservative-coa-batch-consistency"
                className="text-emerald-700 font-semibold underline"
              >
                CoA batch-consistency protocol
              </Link>{' '}
              — moving-average drift tracker and 7-field numeric audit
            </li>
          </ul>
        </div>
      )}

      {route === 'compliance' && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-slate-700 m-0 mb-2">{routes[2].sub}</p>
          <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1 m-0">
            <li>
              <Link
                href="/blog/eu-annex-v-preservative-compliance-guide"
                className="text-amber-700 font-semibold underline"
              >
                EU Annex V compliance guide
              </Link>{' '}
              — entry-by-entry decoder, 5 limit-reading traps, CPSR documentation
            </li>
            <li>
              <Link
                href="/blog/iso-11930-challenge-test-protocol"
                className="text-amber-700 font-semibold underline"
              >
                ISO 11930 Challenge Test protocol
              </Link>{' '}
              — 5-strain matrix, failure-mode remediation, Criterion A vs B
            </li>
            <li>
              <Link
                href="/blog/preservative-coa-batch-consistency"
                className="text-amber-700 font-semibold underline"
              >
                CoA batch-consistency protocol
              </Link>{' '}
              — root causes of batch drift, change-notification SOP
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
