/* ─── Desi SVG & Decorative React Components ─────────────────── */

/* Marigold flower SVG inline component */
export function MarigoldFlower({ size = 32, color = '#E8900A', opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ opacity }}>
      {/* petals */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
        <ellipse key={i}
          cx={32} cy={32}
          rx={5} ry={13}
          fill={i % 2 === 0 ? color : '#F5A623'}
          opacity={0.85}
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
      {/* center */}
      <circle cx={32} cy={32} r={8} fill="#F5A623" />
      <circle cx={32} cy={32} r={4} fill="#C47408" />
    </svg>
  )
}

/* Mango leaf SVG */
export function MangoLeaf({ size = 40, color = '#2E6B3E', flipped = false }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" fill="none"
      style={{ transform: flipped ? 'scaleX(-1)' : 'none' }}>
      <path d="M4 20 Q20 4 40 20 Q20 36 4 20Z" fill={color} opacity={0.85} />
      <path d="M4 20 Q40 20 76 20" stroke="#1a4a28" strokeWidth="1" opacity={0.4} />
    </svg>
  )
}

/* Lotus SVG */
export function LotusIcon({ size = 36, color = '#E8900A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M32 48 Q20 36 20 24 Q32 16 44 24 Q44 36 32 48Z" fill={color} opacity={0.9} />
      <path d="M32 48 Q12 38 14 24 Q20 18 28 22 Q20 30 32 48Z" fill={color} opacity={0.65} />
      <path d="M32 48 Q52 38 50 24 Q44 18 36 22 Q44 30 32 48Z" fill={color} opacity={0.65} />
      <path d="M32 48 Q6 44 8 30 Q14 22 22 28 Q12 36 32 48Z" fill={color} opacity={0.4} />
      <path d="M32 48 Q58 44 56 30 Q50 22 42 28 Q52 36 32 48Z" fill={color} opacity={0.4} />
      <ellipse cx={32} cy={50} rx={10} ry={3} fill="#2E6B3E" opacity={0.5} />
    </svg>
  )
}

/* Marigold garland strip — decorative divider */
export function MangoLeafGarland({ count = 8 }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 4, padding: '4px 0', overflow: 'hidden',
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{
          fontSize: i % 3 === 1 ? '1.1rem' : '0.9rem',
          transform: i % 2 === 0 ? 'rotate(-20deg)' : 'rotate(20deg)',
          display: 'inline-block',
          color: i % 3 === 0 ? '#E8900A' : i % 3 === 1 ? '#2E6B3E' : '#C47408',
          animation: `sway ${1.5 + i * 0.2}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.1}s`,
        }}>
          {i % 4 === 0 ? '🌼' : i % 4 === 1 ? '🍃' : i % 4 === 2 ? '🌸' : '🌿'}
        </span>
      ))}
    </div>
  )
}

/* Kolam dot row */
export function KolamDots({ count = 9, color = '#E8900A' }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: i === Math.floor(count / 2) ? 8 : 4,
          height: i === Math.floor(count / 2) ? 8 : 4,
          borderRadius: '50%',
          background: i % 2 === 0 ? color : '#2E6B3E',
          opacity: 0.6 + (i === Math.floor(count / 2) ? 0.4 : 0),
        }} />
      ))}
    </div>
  )
}

/* Om symbol text */
export function OmSymbol({ size = 20, color = '#E8900A' }) {
  return (
    <span style={{
      fontFamily: 'serif', fontSize: size, color, lineHeight: 1,
      display: 'inline-block',
    }}>ॐ</span>
  )
}

/* Swastik — traditional auspicious symbol */
export function AuspiciousSymbol({ size = 16, color = '#E8900A' }) {
  return (
    <span style={{ fontSize: size, color, display: 'inline-block', lineHeight: 1 }}>꩜</span>
  )
}
