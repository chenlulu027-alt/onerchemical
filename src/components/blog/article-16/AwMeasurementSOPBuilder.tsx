'use client';

import { useMemo, useState } from 'react';

type ProductArchetype =
  | 'anhydrous-balm'
  | 'low-water-serum'
  | 'o-w-emulsion'
  | 'w-o-emulsion'
  | 'surfactant-cleanser'
  | 'hydrogel-mask';

type Stage = 'r-and-d' | 'batch-release' | 'stability' | 'consumer-use-sim';

interface SOPStep {
  n: number;
  title: string;
  detail: string;
  critical: boolean;
}

const ARCHETYPE_LABELS: Record<ProductArchetype, string> = {
  'anhydrous-balm': 'Anhydrous balm, stick, or oil-based product',
  'low-water-serum': 'Low-water serum (high humectant)',
  'o-w-emulsion': 'O/W emulsion (lotion, cream)',
  'w-o-emulsion': 'W/O emulsion (sunscreen, hair mask)',
  'surfactant-cleanser': 'Surfactant-based cleanser',
  'hydrogel-mask': 'Hydrogel sheet mask serum',
};

const STAGE_LABELS: Record<Stage, string> = {
  'r-and-d': 'R&D formulation iteration',
  'batch-release': 'Production batch release QC',
  'stability': 'Stability study timepoint',
  'consumer-use-sim': 'Consumer-use simulation (open-jar, long-term)',
};

function buildSOP(archetype: ProductArchetype, stage: Stage): SOPStep[] {
  const steps: SOPStep[] = [];

  // Sample size and container
  const highOilSample = archetype === 'anhydrous-balm' || archetype === 'w-o-emulsion';
  steps.push({
    n: 1,
    title: 'Sample selection and container',
    detail: highOilSample
      ? 'Take 10-15 g representative sample from the batch midpoint (not surface, not bottom). Use a purpose-made disposable sample cup compatible with oil-phase samples. Fill cup to the maximum fill line (typically 7-10 g for cosmetic cups).'
      : 'Take 5-10 g representative sample from the batch midpoint. Use a purpose-made disposable sample cup. Fill cup to maximum fill line (typically 5-8 g for aqueous samples).',
    critical: true,
  });

  // Temperature equilibration
  if (stage === 'stability') {
    steps.push({
      n: 2,
      title: 'Temperature equilibration (stability sample)',
      detail: 'Pull sample from stability chamber (25°C, 40°C, or 50°C condition). Allow 2-4 hours equilibration at ambient 25.0°C before measurement. Do NOT measure immediately on a hot sample — the reading is systematically low and misleading.',
      critical: true,
    });
  } else {
    steps.push({
      n: 2,
      title: 'Temperature equilibration',
      detail: 'Equilibrate sample at 25.0°C ± 0.5°C for 30-60 minutes before measurement. Chilled-mirror instruments with built-in temperature control (AquaLab 4TEV) can accept samples at near-ambient without pre-equilibration.',
      critical: true,
    });
  }

  // Instrument check
  steps.push({
    n: 3,
    title: 'Instrument calibration verification',
    detail: 'Verify instrument calibration against a saturated salt reference solution appropriate to the expected Aw range (K2SO4 for 0.97, NaCl for 0.75, MgCl2 for 0.33, LiCl for 0.11). Reference reading must fall within ±0.005 Aw of the published value. If out of range, re-calibrate per manufacturer SOP before proceeding.',
    critical: true,
  });

  // Measurement
  steps.push({
    n: 4,
    title: 'Measurement (chilled-mirror dewpoint)',
    detail: 'Place sample cup in instrument chamber, close chamber, initiate measurement. Chilled-mirror: 5-10 minutes to reach dewpoint stability. Capacitive: 15-30 minutes to reach equilibrium. Accept reading only after three consecutive readings within ±0.002 Aw of each other.',
    critical: true,
  });

  // Replicates
  if (stage === 'batch-release' || stage === 'stability') {
    steps.push({
      n: 5,
      title: 'Replicate measurement',
      detail: 'Measure three replicate samples from the same batch, each in a fresh disposable cup. Take the mean. If any replicate deviates more than 0.01 Aw from the mean, measure a fourth and use the median of four.',
      critical: true,
    });
  } else {
    steps.push({
      n: 5,
      title: 'Replicate measurement (R&D stage)',
      detail: 'Measure two replicate samples. If the two replicates deviate more than 0.01 Aw, measure a third and use the median.',
      critical: false,
    });
  }

  // Record
  steps.push({
    n: 6,
    title: 'Record and documentation',
    detail: stage === 'batch-release'
      ? 'Record Aw mean and individual replicate values on the batch record. Flag any batch with Aw outside the specification range for investigation and holding decision.'
      : stage === 'stability'
      ? 'Record Aw on the stability study logbook with timepoint, storage condition, and operator initials. Compare to T0 — drift more than 0.02 Aw flags investigation.'
      : stage === 'consumer-use-sim'
      ? 'Record Aw at T0, T30, T60, T90 of the simulation. Open-jar sample stored at 25°C / 65% RH with daily jar opening simulating consumer use.'
      : 'Record Aw on formulation development worksheet alongside batch number, operator initials, and date.',
    critical: false,
  });

  // Stage-specific steps
  if (stage === 'consumer-use-sim') {
    steps.push({
      n: 7,
      title: 'Open-jar consumer-use protocol',
      detail: 'Place sample in the final production packaging (jar, pump, tube) at 25°C / 65% RH. Open the package once daily simulating consumer use, record ambient RH on each opening day. Measure Aw at T0 (fresh batch), T30, T60, T90 days. Aw drift above 0.10 units from T0 flags the preservation claim as not defensible.',
      critical: true,
    });
  }

  if (stage === 'stability' && archetype === 'anhydrous-balm') {
    steps.push({
      n: 7,
      title: 'Accelerated moisture-pickup condition',
      detail: 'Add a 30°C / 85% RH stability condition specifically for anhydrous products to over-represent tropical consumer use. Measure Aw at T0, T30, T60, T90 days. Aw rise above 0.60 in this accelerated condition flags the anhydrous claim for packaging-barrier or preservation-system intervention.',
      critical: true,
    });
  }

  return steps;
}

export default function AwMeasurementSOPBuilder() {
  const [archetype, setArchetype] = useState<ProductArchetype>('o-w-emulsion');
  const [stage, setStage] = useState<Stage>('batch-release');

  const steps = useMemo(() => buildSOP(archetype, stage), [archetype, stage]);

  return (
    <div className="my-8 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        Aw Measurement SOP Builder
      </h3>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        Select product archetype and measurement stage. The SOP steps update to show the specific
        workflow, acceptance criteria, and documentation requirements.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Product archetype
          </span>
          <select
            value={archetype}
            onChange={(e) => setArchetype(e.target.value as ProductArchetype)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(ARCHETYPE_LABELS) as ProductArchetype[]).map((k) => (
              <option key={k} value={k}>
                {ARCHETYPE_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-400">
            Measurement stage
          </span>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value as Stage)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          >
            {(Object.keys(STAGE_LABELS) as Stage[]).map((k) => (
              <option key={k} value={k}>
                {STAGE_LABELS[k]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 space-y-3">
        {steps.map((step) => (
          <div
            key={step.n}
            className={`rounded-md border p-3 ${
              step.critical
                ? 'border-rose-400 bg-rose-50 dark:border-rose-700 dark:bg-rose-950/40'
                : 'border-blue-400 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/40'
            }`}
          >
            <div className="mb-1 flex items-center gap-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-800 text-xs font-bold text-white">
                {step.n}
              </span>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {step.title}
              </h4>
              {step.critical && (
                <span className="inline-flex rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                  Critical
                </span>
              )}
            </div>
            <p className="pl-10 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
              {step.detail}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-500">
        SOP is a working aid. Final SOP for regulatory and audit purposes must be reviewed by
        your QC manager, signed by a qualified individual, and version-controlled in your QMS.
      </p>
    </div>
  );
}
