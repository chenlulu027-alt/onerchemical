"use client";

/**
 * RegulationMatrix — 5-market phenoxyethanol regulatory matrix.
 * Static table; no state.
 */

const ROWS = [
  {
    market: "European Union",
    cap: "1.0%",
    citation: "Regulation (EC) 1223/2009 Annex V entry 29 — latest amendment 2024/996",
    note:
      "As of 2026-10, Regulation 2024/996 adds a restriction for leave-on products intended for the diaper area of children under three.",
    status: "restricted-use",
  },
  {
    market: "China (mainland)",
    cap: "1.0%",
    citation: "IECIC 2021 — Inventory of Existing Cosmetic Ingredients",
    note:
      "Maximum historical use concentration 1.0%. No children's-product diaper-area restriction equivalent to the EU as of 2026-10.",
    status: "approved",
  },
  {
    market: "United States (MoCRA)",
    cap: "No numeric cap",
    citation: "FDA MoCRA framework; CIR Final Report Int J Toxicol 36(5_suppl2) 2017",
    note:
      "No federal concentration ceiling, but CIR safety assessment recommends ≤1.0%. The industry standard mirrors the EU cap.",
    status: "approved",
  },
  {
    market: "Japan",
    cap: "1.0%",
    citation: "Pharmaceutical and Medical Device Act — Positive List Notification No. 331",
    note:
      "Listed on the quasi-drug / cosmetic positive list. Standard use for leave-on and rinse-off at 1.0% cap.",
    status: "approved",
  },
  {
    market: "Korea",
    cap: "1.0%",
    citation: "화장품 안전기준 등에 관한 규정 별표2 (Cosmetic Safety Standards, Annex 2)",
    note: "KFDA cosmetic ingredient standard caps use at 1.0% for leave-on and rinse-off products.",
    status: "approved",
  },
];

export function RegulationMatrix() {
  return (
    <div className="my-10 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <caption className="sr-only">
          Phenoxyethanol regulatory status across EU, China, USA (MoCRA), Japan, and Korea as of 2026-10.
        </caption>
        <thead className="bg-[#0F2D6B] text-white">
          <tr>
            <th className="text-left px-4 py-3 font-semibold">Market</th>
            <th className="text-left px-4 py-3 font-semibold">Cap</th>
            <th className="text-left px-4 py-3 font-semibold">Primary citation</th>
            <th className="text-left px-4 py-3 font-semibold">Operational note (as of 2026-10)</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
            >
              <td className="px-4 py-4 font-semibold text-slate-900 align-top">
                {r.market}
                {r.status === "restricted-use" && (
                  <span className="ml-2 inline-block text-[10px] uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    restricted use
                  </span>
                )}
              </td>
              <td className="px-4 py-4 text-slate-900 font-semibold align-top whitespace-nowrap">
                {r.cap}
              </td>
              <td className="px-4 py-4 text-slate-700 align-top">{r.citation}</td>
              <td className="px-4 py-4 text-slate-700 align-top">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-4 py-3 text-xs text-slate-500 italic bg-slate-50 border-t border-slate-200">
        Table 1 — Phenoxyethanol regulatory matrix. Verified against primary texts on 2026-10-20.
        Preservative regulations update frequently; confirm the current amendment before each production run.
      </p>
    </div>
  );
}
