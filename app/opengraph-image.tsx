import { ImageResponse } from 'next/og';

export const alt = 'Typhoonpost: mail that holds steady';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  const rings = [110, 190, 270, 350, 430, 510];
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#EDF2F3',
          color: '#0A1C26',
          position: 'relative',
        }}
      >
        {rings.map((r) => (
          <div
            key={r}
            style={{
              position: 'absolute',
              right: 140 - r,
              top: 315 - r * 0.7,
              width: r * 2,
              height: r * 1.4,
              borderRadius: '50%',
              border: '2px solid #9FB8C2',
              display: 'flex',
            }}
          />
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 13, background: '#0F6CBD', display: 'flex' }} />
          <div style={{ fontSize: 36, fontWeight: 700, display: 'flex' }}>Typhoonpost</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 760 }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1, letterSpacing: -3, display: 'flex' }}>
            Mail that holds steady.
          </div>
          <div style={{ fontSize: 32, marginTop: 28, color: '#4B6674', display: 'flex' }}>
            Private email, calendar and contacts.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
