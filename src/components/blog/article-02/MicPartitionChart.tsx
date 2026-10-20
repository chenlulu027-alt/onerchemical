"use client";

/**
 * MicPartitionChart
 * Visualises how a 1.0% phenoxyethanol label dose redistributes between
 * aqueous phase (bioavailable to microbes) and oil phase / micelles
 * (functionally lost) in a typical O/W emulsion.
 *
 * Pure SVG, no runtime deps.
 */

export function MicPartitionChart() {
  return (
    <figure className="my-10">
      <svg
        viewBox="0 0 760 360"
        role="img"
        aria-labelledby="mic-partition-title mic-partition-desc"
        className="w-full h-auto rounded-xl border border-slate-200 bg-white"
      >
        <title id="mic-partition-title">
          Phenoxyethanol aqueous vs oil-phase partition at 1.0% label dose
        </title>
        <desc id="mic-partition-desc">
          Horizontal bar chart comparing the labelled 1.0% phenoxyethanol
          dose against the ~0.65% that remains functionally available in
          the water phase of a typical O/W emulsion after partition into
          oil droplets and surfactant micelles.
        </desc>

        {/* chart title */}
        <text x="30" y="36" fontSize="18" fontWeight="700" fill="#0F2D6B">
          Where does 1.0% phenoxyethanol actually go in an O/W emulsion?
        </text>
        <text x="30" y="58" fontSize="13" fill="#475569">
          Typical 20% oil-phase formula. Partition estimate from Log P 1.16 (PubChem CID 31236).
        </text>

        {/* Label row 1: Label dose */}
        <text x="30" y="118" fontSize="13" fontWeight="600" fill="#1e293b">
          Label dose on INCI
        </text>
        <rect x="30" y="130" width="640" height="34" rx="6" fill="#4f46e5" />
        <text x="650" y="152" fontSize="13" fontWeight="700" fill="#ffffff" textAnchor="end">
          1.00%
        </text>

        {/* Label row 2: Functional partition */}
        <text x="30" y="208" fontSize="13" fontWeight="600" fill="#1e293b">
          Functional aqueous-phase concentration (bioavailable)
        </text>
        <rect x="30" y="220" width="416" height="34" rx="6" fill="#059669" />
        <text x="436" y="242" fontSize="13" fontWeight="700" fill="#ffffff" textAnchor="end">
          ~0.65%
        </text>

        {/* Lost to oil */}
        <rect x="446" y="220" width="224" height="34" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
        <text x="558" y="242" fontSize="12" fontWeight="600" fill="#92400e" textAnchor="middle">
          ~0.35% in oil / micelles
        </text>

        {/* Callout line */}
        <line x1="446" y1="256" x2="446" y2="300" stroke="#d97706" strokeWidth="1" strokeDasharray="3 3" />
        <text x="446" y="316" fontSize="11" fill="#92400e">
          Not available to attack microbes in the aqueous phase
        </text>

        {/* Published MIC reference */}
        <line x1="190" y1="270" x2="190" y2="340" stroke="#dc2626" strokeWidth="1" strokeDasharray="4 3" />
        <text x="195" y="286" fontSize="11" fontWeight="600" fill="#dc2626">
          Published MIC vs Pseudomonas ≈ 0.5%
        </text>
        <text x="195" y="302" fontSize="11" fill="#475569">
          Functional margin shrinks to ~0.15 pp
        </text>
      </svg>
      <figcaption className="mt-3 text-sm text-slate-600 italic">
        Figure 1 — Why Challenge Test can still fail at a "safe" 1.0% dose.
        Partition shifts the useful concentration into a narrow margin above the published MIC.
      </figcaption>
    </figure>
  );
}
