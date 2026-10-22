'use client';

import { useState } from 'react';

type Blend = {
  id: string;
  name: string;
  supplier: 'Inolex' | 'Herbarie';
  inci: string;
  useLevel: string;
  phRange: string;
  bestFor: string[];
  claims: string[];
  challengeTests: string[];
  biobased: boolean;
  iecicListed: boolean;
};

const BLENDS: Blend[] = [
  {
    id: 'spectrastat',
    name: 'Spectrastat',
    supplier: 'Inolex',
    inci: 'Caprylhydroxamic Acid / Caprylyl Glycol / Glycerin',
    useLevel: '0.8–1.5 %',
    phRange: 'pH 4–8',
    bestFor: ['Emulsions', 'Creams', 'Lotions', 'Shower gels', 'Facial cleansers', 'Shampoos'],
    claims: ['Vegan & cruelty-free', 'Clean Beauty Preferred', 'Non-palm derived', 'Biodegradable'],
    challengeTests: ['EP-A', 'USP 51', 'PCPC'],
    biobased: true,
    iecicListed: true,
  },
  {
    id: 'spectrastat-bhl',
    name: 'Spectrastat BHL',
    supplier: 'Inolex',
    inci: 'Caprylhydroxamic Acid / 1,2-Hexanediol / Butylene Glycol',
    useLevel: '1.5–3.0 %',
    phRange: 'pH 4–8',
    bestFor: ['Surfactant systems', 'Emulsions', 'Sunscreens', 'Wipes', 'Mask juices'],
    claims: ['Water-soluble', 'Cold-processable', 'Non-irritating'],
    challengeTests: ['EP-A', 'USP 51', 'PCPC'],
    biobased: false,
    iecicListed: false,
  },
  {
    id: 'spectrastat-ol',
    name: 'Spectrastat OL',
    supplier: 'Inolex',
    inci: 'Caprylhydroxamic Acid / Caprylyl Glycol / Propanediol',
    useLevel: '1.0–2.0 %',
    phRange: 'pH 4–8',
    bestFor: ['Wet wipes', 'Baby wipes', 'Cleansing wipes', 'Creams', 'Lotions', 'Color cosmetics'],
    claims: ['Cold-processable', 'Liquid at low temp', 'Homogenous'],
    challengeTests: ['EP-A', 'EP-B', 'USP 51', 'PCPC'],
    biobased: false,
    iecicListed: false,
  },
  {
    id: 'spectrastat-phl',
    name: 'Spectrastat PHL',
    supplier: 'Inolex',
    inci: 'Caprylhydroxamic Acid / 1,2-Hexanediol / Propanediol',
    useLevel: '1.5–3.0 %',
    phRange: 'pH 4–8',
    bestFor: ['Surfactant systems', 'Emulsions', 'Wipes'],
    claims: ['Hexanediol-based alternative', 'Water-soluble'],
    challengeTests: ['EP-A', 'USP 51'],
    biobased: false,
    iecicListed: false,
  },
  {
    id: 'spectrastat-g2',
    name: 'Spectrastat G2 Natural MB',
    supplier: 'Inolex',
    inci: 'Caprylhydroxamic Acid / Glyceryl Caprylate / Glycerin',
    useLevel: '1.0–2.0 %',
    phRange: 'pH 4–8',
    bestFor: ['Natural-claim creams', 'Lotions', 'Baby care', 'Face serums'],
    claims: ['USDA 100 % biobased', 'Natural', 'Vegan'],
    challengeTests: ['EP-A', 'USP 51'],
    biobased: true,
    iecicListed: false,
  },
  {
    id: 'aromastat',
    name: 'Aromastat',
    supplier: 'Inolex',
    inci: 'Caprylhydroxamic Acid / Phenethyl Alcohol / Glycerin',
    useLevel: '1.0–1.5 %',
    phRange: 'pH 4–8',
    bestFor: ['Emulsions', 'Creams', 'Lotions', 'Shower gels', 'Fragranced products'],
    claims: ['Soft floral note', 'Broad spectrum', 'Approved in Canada'],
    challengeTests: ['EP-A', 'USP 51', 'PCPC'],
    biobased: false,
    iecicListed: false,
  },
  {
    id: 'natural-synergy',
    name: 'Natural Synergy',
    supplier: 'Herbarie',
    inci: 'Caprylhydroxamic Acid / Glyceryl Caprylate / Glycerin',
    useLevel: '1.0–2.0 %',
    phRange: 'pH 3–8',
    bestFor: ['Natural formulations', 'Serums', 'Lotions', 'Hair products'],
    claims: ['100 % natural', 'Non-GMO vegetable', 'Biodegradable'],
    challengeTests: ['USP 51', 'Reported pass per supplier'],
    biobased: true,
    iecicListed: false,
  },
  {
    id: 'natural-synergy-system',
    name: 'Natural Synergy System (2-part)',
    supplier: 'Herbarie',
    inci: 'Caprylhydroxamic Acid / Propanediol (2 containers)',
    useLevel: '0.6–1.5 % + partner',
    phRange: 'pH 3–8',
    bestFor: ['Advanced formulators', 'Hurdle customization'],
    claims: ['Flexible dosing', '100 % natural', 'Non-GMO'],
    challengeTests: ['USP 51 (per combination)'],
    biobased: true,
    iecicListed: false,
  },
];

export default function SpectrastatComparator() {
  const [selected, setSelected] = useState<string>('spectrastat');
  const active = BLENDS.find((b) => b.id === selected) ?? BLENDS[0];

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
      aria-label="Commercial CHA blend comparator"
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
        8 commercial caprylhydroxamic acid pre-blended systems — side by side
      </div>

      <div
        role="tablist"
        aria-label="Select a CHA blend"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          padding: '0.75rem',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc',
        }}
      >
        {BLENDS.map((b) => {
          const isActive = b.id === selected;
          return (
            <button
              key={b.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelected(b.id)}
              style={{
                padding: '0.4rem 0.75rem',
                border: isActive ? '1px solid #4f46e5' : '1px solid #cbd5e1',
                background: isActive ? '#4f46e5' : '#fff',
                color: isActive ? '#fff' : '#1e293b',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: isActive ? 600 : 500,
                transition: 'all 0.15s',
              }}
            >
              {b.name}
            </button>
          );
        })}
      </div>

      <div style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F2D6B' }}>{active.name}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Supplier: {active.supplier}</div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {active.biobased && (
              <span style={{ padding: '0.2rem 0.6rem', background: '#ecfdf5', color: '#065f46', border: '1px solid #6ee7b7', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600 }}>Biobased</span>
            )}
            {active.iecicListed && (
              <span style={{ padding: '0.2rem 0.6rem', background: '#eef2ff', color: '#3730a3', border: '1px solid #c7d2fe', borderRadius: 4, fontSize: '0.75rem', fontWeight: 600 }}>IECIC-listed</span>
            )}
          </div>
        </div>

        <dl
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(140px, 180px) 1fr',
            gap: '0.5rem 1rem',
            margin: '1rem 0 0',
            fontSize: '0.9rem',
          }}
        >
          <dt style={{ fontWeight: 600, color: '#475569' }}>Full INCI</dt>
          <dd style={{ margin: 0, color: '#1e293b' }}>{active.inci}</dd>

          <dt style={{ fontWeight: 600, color: '#475569' }}>Recommended use level</dt>
          <dd style={{ margin: 0, color: '#1e293b', fontWeight: 500 }}>{active.useLevel}</dd>

          <dt style={{ fontWeight: 600, color: '#475569' }}>Active pH range</dt>
          <dd style={{ margin: 0, color: '#1e293b' }}>{active.phRange}</dd>

          <dt style={{ fontWeight: 600, color: '#475569' }}>Best for</dt>
          <dd style={{ margin: 0, color: '#1e293b' }}>
            {active.bestFor.map((item, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-block',
                  padding: '0.15rem 0.5rem',
                  margin: '0.1rem 0.25rem 0.1rem 0',
                  background: '#f1f5f9',
                  borderRadius: 4,
                  fontSize: '0.82rem',
                }}
              >
                {item}
              </span>
            ))}
          </dd>

          <dt style={{ fontWeight: 600, color: '#475569' }}>Marketing claims</dt>
          <dd style={{ margin: 0, color: '#1e293b' }}>
            {active.claims.map((item, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-block',
                  padding: '0.15rem 0.5rem',
                  margin: '0.1rem 0.25rem 0.1rem 0',
                  background: '#fefce8',
                  color: '#713f12',
                  border: '1px solid #fde047',
                  borderRadius: 4,
                  fontSize: '0.78rem',
                }}
              >
                {item}
              </span>
            ))}
          </dd>

          <dt style={{ fontWeight: 600, color: '#475569' }}>Published Challenge Test passes</dt>
          <dd style={{ margin: 0, color: '#1e293b' }}>{active.challengeTests.join(' · ')}</dd>
        </dl>
      </div>

      <div
        style={{
          padding: '0.6rem 1rem',
          background: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          fontSize: '0.75rem',
          color: '#64748b',
        }}
      >
        Source: Supplier technical data sheets as of 2026-10 (Inolex Spectrastat family + Herbarie Natural Synergy family). Confirm current spec with supplier before formulation lock.
      </div>
    </div>
  );
}
