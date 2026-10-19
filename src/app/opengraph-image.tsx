import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Onerchemical — The science of cosmetic preservation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          padding: '72px',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: '#0C447C',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 22,
              fontFamily: 'Georgia, serif',
            }}
          >
            O
          </div>
          <div style={{ fontSize: 24, color: '#1a1a1a' }}>Onerchemical</div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            style={{
              fontSize: 15,
              textTransform: 'uppercase',
              letterSpacing: 2.5,
              color: '#888',
              marginBottom: 18,
            }}
          >
            Cosmetic Preservation Science
          </div>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.1,
              color: '#1a1a1a',
              fontFamily: 'Georgia, serif',
              maxWidth: 900,
            }}
          >
            The science of cosmetic preservation.
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 18, color: '#555' }}>
          Peer-reviewed guidance for formulators · onerchemical.com
        </div>
      </div>
    ),
    { ...size },
  );
}
