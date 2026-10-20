"use client";

/**
 * PairingDecisionTree — SVG decision tree mapping formula type to
 * recommended co-preservative pairing. Pure SVG, no runtime deps.
 */

export function PairingDecisionTree() {
  return (
    <figure className="my-10">
      <svg
        viewBox="0 0 900 540"
        role="img"
        aria-labelledby="pairing-tree-title pairing-tree-desc"
        className="w-full h-auto rounded-xl border border-slate-200 bg-white"
      >
        <title id="pairing-tree-title">
          Phenoxyethanol co-preservative pairing decision tree by formula type
        </title>
        <desc id="pairing-tree-desc">
          Decision tree starting from the question "what is the formula type?"
          branching through water-dominant, surfactant-based, high-oil, low-pH,
          and natural-certified paths, each leading to a recommended co-preservative
          pairing shipped by Onerchemical.
        </desc>

        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#4f46e5" />
          </marker>
        </defs>

        {/* Root */}
        <rect x="330" y="20" width="240" height="52" rx="10" fill="#0F2D6B" />
        <text x="450" y="44" fontSize="13" fontWeight="700" fill="#ffffff" textAnchor="middle">
          Start here
        </text>
        <text x="450" y="62" fontSize="12" fill="#eef2ff" textAnchor="middle">
          What is the formula type?
        </text>

        {/* 5 branches */}
        {[
          { x: 40, label: "Water-dominant" },
          { x: 215, label: "Surfactant / cleanser" },
          { x: 390, label: "High-oil cream" },
          { x: 565, label: "Low-pH actives" },
          { x: 740, label: "Natural-certified" },
        ].map((b, i) => (
          <g key={i}>
            <line
              x1="450"
              y1="72"
              x2={b.x + 65}
              y2="140"
              stroke="#4f46e5"
              strokeWidth="1.5"
              markerEnd="url(#arrow)"
            />
            <rect x={b.x} y="140" width="130" height="54" rx="8" fill="#eef2ff" stroke="#4f46e5" />
            <text x={b.x + 65} y="166" fontSize="12" fontWeight="700" fill="#0F2D6B" textAnchor="middle">
              {b.label}
            </text>
          </g>
        ))}

        {/* Recommendations */}
        {[
          { x: 40, dose: "Phenoxyethanol 0.8%", add: "+ EHG 0.3–0.5%", note: "or caprylyl glycol 0.3–0.5%" },
          { x: 215, dose: "Phenoxyethanol 0.6%", add: "+ Benzoic 0.3% + Sorbic 0.2%", note: "pH ≤ 5.5" },
          { x: 390, dose: "Phenoxyethanol 0.8%", add: "+ Chlorphenesin 0.3%", note: "or DHA 0.3%" },
          { x: 565, dose: "Phenoxyethanol 0.5%", add: "+ Sodium benzoate 0.3%", note: "pH 3.5–4.0" },
          { x: 740, dose: "No phenoxyethanol", add: "Benzyl alcohol + DHA", note: "0.6–1.0% total" },
        ].map((r, i) => (
          <g key={i}>
            <line
              x1={r.x + 65}
              y1="194"
              x2={r.x + 65}
              y2="260"
              stroke="#4f46e5"
              strokeWidth="1.5"
              markerEnd="url(#arrow)"
            />
            <rect
              x={r.x}
              y="260"
              width="130"
              height="110"
              rx="8"
              fill={i === 4 ? "#fef3c7" : "#ecfdf5"}
              stroke={i === 4 ? "#d97706" : "#059669"}
            />
            <text
              x={r.x + 65}
              y="286"
              fontSize="11"
              fontWeight="700"
              fill={i === 4 ? "#92400e" : "#065f46"}
              textAnchor="middle"
            >
              {r.dose}
            </text>
            <text
              x={r.x + 65}
              y="308"
              fontSize="11"
              fontWeight="600"
              fill={i === 4 ? "#92400e" : "#047857"}
              textAnchor="middle"
            >
              {r.add}
            </text>
            <text
              x={r.x + 65}
              y="330"
              fontSize="10"
              fill={i === 4 ? "#92400e" : "#065f46"}
              textAnchor="middle"
            >
              {r.note}
            </text>
          </g>
        ))}

        {/* Footer legend */}
        <rect x="40" y="420" width="820" height="90" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
        <text x="60" y="446" fontSize="12" fontWeight="700" fill="#0F2D6B">
          How to use this tree
        </text>
        <text x="60" y="468" fontSize="11" fill="#475569">
          1. Identify the dominant phase of your product.  2. Follow the branch to the recommended pairing.
        </text>
        <text x="60" y="486" fontSize="11" fill="#475569">
          3. Run a 28-day USP 51 Challenge Test before scale-up — no decision tree replaces real microbiological data.
        </text>
        <text x="60" y="504" fontSize="11" fontStyle="italic" fill="#64748b">
          All five pairings available as a 100kg combined order from Onerchemical.
        </text>
      </svg>
      <figcaption className="mt-3 text-sm text-slate-600 italic">
        Figure 2 — Phenoxyethanol pairing decision tree. Dose ranges reflect typical starting points; final doses are set after Challenge Test.
      </figcaption>
    </figure>
  );
}
