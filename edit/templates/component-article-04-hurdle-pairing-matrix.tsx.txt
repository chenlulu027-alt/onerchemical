'use client';

type Rating = 'strong' | 'moderate' | 'weak' | 'caution';

type Pairing = {
  id: string;
  partner: string;
  partnerInci: string;
  tracksBlend: string;
  ratings: Record<string, Rating>;
  note: string;
};

const PRODUCT_FORMS = [
  { id: 'lotion', label: 'Emulsion lotion / cream' },
  { id: 'serum', label: 'Water-based serum' },
  { id: 'surfactant', label: 'Surfactant wash' },
  { id: 'anhydrous', label: 'Anhydrous balm / oil' },
  { id: 'highaw', label: 'High water-activity mist / toner' },
];

const PAIRINGS: Pairing[] = [
  {
    id: 'cha-cg',
    partner: 'Caprylyl Glycol',
    partnerInci: 'INCI: Caprylyl Glycol',
    tracksBlend: 'Spectrastat flagship',
    ratings: {
      lotion: 'strong',
      serum: 'strong',
      surfactant: 'moderate',
      anhydrous: 'weak',
      highaw: 'moderate',
    },
    note: 'Default pairing for leave-on skincare. CHA covers yeast and mold through chelation; caprylyl glycol disrupts bacterial membranes at 0.3–0.5 % use level.',
  },
  {
    id: 'cha-hexanediol',
    partner: '1,2-Hexanediol',
    partnerInci: 'INCI: 1,2-Hexanediol',
    tracksBlend: 'Spectrastat BHL / PHL',
    ratings: {
      lotion: 'moderate',
      serum: 'strong',
      surfactant: 'strong',
      anhydrous: 'weak',
      highaw: 'strong',
    },
    note: 'Preferred for surfactant systems and sunscreens. Hexanediol brings water solubility and skin-conditioning function; combination tolerates cold processing.',
  },
  {
    id: 'cha-phenethyl',
    partner: 'Phenethyl Alcohol',
    partnerInci: 'INCI: Phenethyl Alcohol',
    tracksBlend: 'Aromastat',
    ratings: {
      lotion: 'strong',
      serum: 'moderate',
      surfactant: 'strong',
      anhydrous: 'caution',
      highaw: 'moderate',
    },
    note: 'Carries a soft rose-floral note that reads as part of the fragrance in finished products. Not suitable for unscented or fragrance-sensitive lines.',
  },
  {
    id: 'cha-glyceryl-caprylate',
    partner: 'Glyceryl Caprylate',
    partnerInci: 'INCI: Glyceryl Caprylate',
    tracksBlend: 'Spectrastat G2 Natural MB / Herbarie Natural Synergy',
    ratings: {
      lotion: 'strong',
      serum: 'strong',
      surfactant: 'weak',
      anhydrous: 'moderate',
      highaw: 'moderate',
    },
    note: 'The go-to pairing for "100 % natural" and USDA biobased claims. Glyceryl caprylate carries skin-conditioning function and is derived from vegetable glycerin and caprylic acid.',
  },
];

const RATING_STYLE: Record<Rating, { label: string; bg: string; color: string; border: string }> = {
  strong: { label: 'Strong fit', bg: '#ecfdf5', color: '#065f46', border: '#6ee7b7' },
  moderate: { label: 'Moderate', bg: '#fefce8', color: '#713f12', border: '#fde047' },
  weak: { label: 'Weak fit', bg: '#fef2f2', color: '#7f1d1d', border: '#fca5a5' },
  caution: { label: 'Caution', bg: '#fff7ed', color: '#7c2d12', border: '#fdba74' },
};

export default function HurdlePairingMatrix() {
  return (
    <div
      style={{
        margin: '1.25rem 0 2rem',
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        overflow: 'hidden',
      }}
      role="region"
      aria-label="CHA hurdle pairing matrix"
    >
      <div
        style={{
          background: '#0F2D6B',
          color: '#fff',
          padding: '0.75rem 1rem',
          fontWeight: 700,
          fontSize: '0.95rem',
        }}
      >
        4 CHA hurdle pairings × 5 product forms
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', minWidth: 720 }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0', fontWeight: 700, color: '#0F2D6B', position: 'sticky', left: 0, background: '#f8fafc' }}>
                Pairing (CHA +)
              </th>
              {PRODUCT_FORMS.map((f) => (
                <th
                  key={f.id}
                  style={{
                    padding: '0.75rem',
                    textAlign: 'center',
                    border: '1px solid #e2e8f0',
                    fontWeight: 600,
                    color: '#1e293b',
                    fontSize: '0.82rem',
                  }}
                >
                  {f.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PAIRINGS.map((p) => (
              <tr key={p.id}>
                <td
                  style={{
                    padding: '0.75rem',
                    border: '1px solid #e2e8f0',
                    fontWeight: 600,
                    color: '#0F2D6B',
                    verticalAlign: 'top',
                    background: '#fff',
                  }}
                >
                  <div style={{ fontSize: '0.95rem' }}>{p.partner}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400, marginTop: 2 }}>
                    Tracks: {p.tracksBlend}
                  </div>
                </td>
                {PRODUCT_FORMS.map((f) => {
                  const rating = p.ratings[f.id];
                  const style = RATING_STYLE[rating];
                  return (
                    <td
                      key={f.id}
                      style={{
                        padding: '0.75rem',
                        textAlign: 'center',
                        border: '1px solid #e2e8f0',
                        background: style.bg,
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.2rem 0.5rem',
                          border: `1px solid ${style.border}`,
                          borderRadius: 4,
                          color: style.color,
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          background: '#fff',
                        }}
                      >
                        {style.label}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ padding: '1rem 1.25rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F2D6B', marginBottom: '0.5rem' }}>
          Formulator notes per pairing
        </div>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.85rem', lineHeight: 1.65, color: '#1e293b' }}>
          {PAIRINGS.map((p) => (
            <li key={p.id} style={{ margin: '0.4rem 0' }}>
              <strong style={{ color: '#312e81' }}>CHA + {p.partner}:</strong> {p.note}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          padding: '0.6rem 1rem',
          background: '#fff',
          borderTop: '1px solid #e2e8f0',
          fontSize: '0.75rem',
          color: '#64748b',
        }}
      >
        Ratings synthesized from Inolex Spectrastat family technical documentation, Herbarie formulation guides, and quote-stage patterns observed by the Onerchemical procurement desk as of 2026-10. Confirm against your own Challenge Test protocol before scale-up.
      </div>
    </div>
  );
}
