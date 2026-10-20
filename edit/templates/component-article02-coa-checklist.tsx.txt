"use client";

/**
 * CoAChecklist — seven procurement red flags for a phenoxyethanol COA.
 * Static presentational component; no state.
 */

const FLAGS = [
  {
    title: "Purity ≥99.5% claimed without a GC chromatogram attached",
    severity: "high",
    body:
      "High-purity claims verified by HPLC-UV alone can mask residual phenol and 2-chloroethanol. GC-FID or GC-MS with the raw chromatogram is the only route to confirm the purity statement.",
  },
  {
    title: "Phenol residual >10 ppm (EP/USP cap is 100 ppm, premium brands demand ≤10 ppm)",
    severity: "high",
    body:
      "Regulatory ceilings allow 100 ppm, but modern leave-on positioning (sensitive skin, baby care) expects single-digit ppm residual phenol. Ask for the lot-specific number, not the generic specification sheet.",
  },
  {
    title: "No water content specification",
    severity: "medium",
    body:
      "Phenoxyethanol is hygroscopic. Trace water above 0.5% changes refractive index and may precipitate on cold storage. A COA without a water content line often indicates test skipping.",
  },
  {
    title: "Batch number and manufacturing date in a non-standard format",
    severity: "medium",
    body:
      "Reputable manufacturers use ISO-style batch IDs tied to a production line. Hand-written or clearly post-dated batch IDs correlate with trader repack rather than factory lot.",
  },
  {
    title: "No Manufacturer's Original Analysis (MOA) — only the trader COA",
    severity: "high",
    body:
      "The MOA is the factory's own release document. A trader COA alone can be re-typed, re-dated, or stitched together from multiple lots. Insist on a scanned original MOA alongside any trader COA.",
  },
  {
    title: "Heavy metals reported only as a single 'total ≤10 ppm' line",
    severity: "medium",
    body:
      "EU and California Prop 65 require per-element data for Pb, As, Cd, Hg at minimum. A total-only report hides whether any single element is near its individual regulatory ceiling.",
  },
  {
    title: "Microbial testing of the preservative itself is missing",
    severity: "low",
    body:
      "It sounds paradoxical to test a preservative for microbes, but contaminated manufacturing water can leave viable organisms in the finished phenoxyethanol. Total plate count, yeast and mold count should both appear.",
  },
];

export function CoAChecklist() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
      <h4 className="text-base font-semibold text-slate-900 mb-5 uppercase tracking-wide">
        Phenoxyethanol COA — Seven Procurement Red Flags
      </h4>
      <ol className="space-y-5">
        {FLAGS.map((f, i) => {
          const dot =
            f.severity === "high"
              ? "bg-red-500"
              : f.severity === "medium"
              ? "bg-amber-500"
              : "bg-slate-400";
          const chip =
            f.severity === "high"
              ? "bg-red-100 text-red-700"
              : f.severity === "medium"
              ? "bg-amber-100 text-amber-800"
              : "bg-slate-200 text-slate-700";
          return (
            <li key={i} className="flex gap-4">
              <span
                className={`mt-1 h-6 w-6 rounded-full ${dot} text-white text-xs font-semibold flex items-center justify-center shrink-0`}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-semibold text-slate-900">{f.title}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full ${chip} uppercase tracking-wide font-semibold`}>
                    {f.severity}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{f.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
