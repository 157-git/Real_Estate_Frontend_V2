/* ═══════════════════════════════════════════════════════════════
   DesiSVG.jsx — all inline SVG decorations for Narayani Realtors
   No emojis. No external assets. Pure SVG.
   ═══════════════════════════════════════════════════════════════ */

/* ── Diya (oil lamp) ── */
export function DiyaSVG({ width = 44, height = 52, style = {} }) {
  return (
    <svg width={width} height={height} viewBox="0 0 44 52" fill="none" style={style}>
      {/* flame */}
      <g className="diya-flame">
        <path d="M22 4 Q26 10 24 18 Q22 14 20 18 Q18 10 22 4Z" fill="#FF6B00" opacity="0.92"/>
        <path d="M22 6 Q25 11 23 17 Q22 13 21 17 Q19 11 22 6Z" fill="#FFD700" opacity="0.88"/>
        <path d="M22 9 Q24 13 23 16 Q22 14 21 16 Q20 13 22 9Z" fill="#fff" opacity="0.62"/>
        {/* inner glow */}
        <ellipse cx="22" cy="13" rx="5" ry="7" fill="rgba(255,180,0,0.18)"/>
      </g>
      {/* wick */}
      <line x1="22" y1="19" x2="22" y2="23" stroke="#6b4c11" strokeWidth="1.5"/>
      {/* oil bowl outer */}
      <path d="M9 24 Q9 19 22 19 Q35 19 35 24 L33 37 Q33 41 22 41 Q11 41 11 37Z"
        fill="#D4A017"/>
      {/* rim highlight */}
      <path d="M9 24 Q9 19 22 19 Q35 19 35 24"
        fill="none" stroke="#FFD700" strokeWidth="1.6" strokeLinecap="round"/>
      {/* oil fill */}
      <path d="M12 26 Q12 23 22 23 Q32 23 32 26 L31 36 Q31 39 22 39 Q13 39 13 36Z"
        fill="#E8900A" opacity="0.72"/>
      {/* oil shine */}
      <ellipse cx="19" cy="25" rx="3.5" ry="1" fill="rgba(255,230,100,0.3)" transform="rotate(-10 19 25)"/>
      {/* base / stand */}
      <path d="M13 41 L11 48 L33 48 L31 41Z" fill="#B8860B"/>
      <path d="M11 48 L33 48" stroke="#8B6914" strokeWidth="1.2"/>
      {/* base ring decoration */}
      <path d="M14 44 Q22 42 30 44" stroke="rgba(255,220,80,0.35)" strokeWidth="0.8" fill="none"/>
    </svg>
  )
}

/* ── Marigold flower ── */
export function MarigoldSVG({
  size = 26,
  outerColor = '#E8900A',
  innerColor = '#FFD700',
  style = {}
}) {
  const petals = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
      {petals.map((deg, i) => (
        <ellipse key={i}
          cx="16" cy="16" rx="3.5" ry="9"
          fill={i % 2 === 0 ? outerColor : innerColor}
          opacity="0.88"
          transform={`rotate(${deg} 16 16)`}
        />
      ))}
      {/* centre disk */}
      <circle cx="16" cy="16" r="5.5" fill={innerColor} />
      <circle cx="16" cy="16" r="3"   fill={outerColor} />
      {/* centre dot */}
      <circle cx="16" cy="16" r="1.2" fill="#fff" opacity="0.5" />
    </svg>
  )
}

/* ── Mango leaf ── */
export function MangoLeafSVG({ width = 18, height = 34, color = '#2E6B3E', flip = false, style = {} }) {
  return (
    <svg
      width={width} height={height} viewBox="0 0 18 34" fill="none"
      style={{ display: 'block', transform: flip ? 'scaleX(-1)' : 'none', ...style }}
    >
      {/* leaf body */}
      <path d="M9 2 Q17 9 15 19 Q13 28 9 32 Q5 28 3 19 Q1 9 9 2Z"
        fill={color} opacity="0.9"/>
      {/* midrib */}
      <path d="M9 2 Q9 14 9 32"
        stroke="rgba(0,60,0,0.35)" strokeWidth="0.9"/>
      {/* lateral veins */}
      <path d="M9 9  Q14 13 15 19" stroke="rgba(0,60,0,0.2)" strokeWidth="0.55"/>
      <path d="M9 9  Q4  13 3  19" stroke="rgba(0,60,0,0.2)" strokeWidth="0.55"/>
      <path d="M9 16 Q13 19 15 24" stroke="rgba(0,60,0,0.15)" strokeWidth="0.45"/>
      <path d="M9 16 Q5  19 3  24" stroke="rgba(0,60,0,0.15)" strokeWidth="0.45"/>
      {/* petiole */}
      <path d="M9 2 Q9 0 9 0" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

/* ── Small 5-petal flower ── */
export function SmallFlowerSVG({ size = 18, petalColor = '#FFB6C1', centerColor = '#FFD700', style = {} }) {
  const petals = [0, 72, 144, 216, 288]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      {petals.map((deg, i) => (
        <ellipse key={i}
          cx="12" cy="12" rx="3" ry="7"
          fill={petalColor} opacity="0.85"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="3.5" fill={centerColor} opacity="0.95"/>
      <circle cx="12" cy="12" r="1.5" fill="#fff"         opacity="0.5"/>
    </svg>
  )
}

/* ── Lotus (logo centrepiece) ── */
export function LotusSVG({ width = 80, height = 76, style = {} }) {
  return (
    <svg width={width} height={height} viewBox="0 0 80 76" fill="none" style={style}>
      {/* far outer petals */}
      <path d="M40 68 Q2  62 4  42 Q12 28 24 36 Q8  50 40 68Z" fill="#E8900A" opacity="0.26"/>
      <path d="M40 68 Q78 62 76 42 Q68 28 56 36 Q72 50 40 68Z" fill="#E8900A" opacity="0.26"/>
      {/* outer petals */}
      <path d="M40 68 Q6  58 8  36 Q18 24 28 32 Q14 46 40 68Z" fill="#E8900A" opacity="0.48"/>
      <path d="M40 68 Q74 58 72 36 Q62 24 52 32 Q66 46 40 68Z" fill="#E8900A" opacity="0.48"/>
      {/* side petals */}
      <path d="M40 68 Q14 56 16 36 Q24 24 32 30 Q20 42 40 68Z" fill="#FFD700" opacity="0.72"/>
      <path d="M40 68 Q66 56 64 36 Q56 24 48 30 Q60 42 40 68Z" fill="#FFD700" opacity="0.72"/>
      {/* centre main petal */}
      <path d="M40 68 Q24 52 24 34 Q40 22 56 34 Q56 52 40 68Z" fill="#FFD700" opacity="0.97"/>
      {/* petal veins */}
      <path d="M40 68 Q40 50 40 28" stroke="rgba(160,100,0,0.28)" strokeWidth="0.9"/>
      <path d="M40 68 Q30 48 26 34" stroke="rgba(160,100,0,0.18)" strokeWidth="0.6"/>
      <path d="M40 68 Q50 48 54 34" stroke="rgba(160,100,0,0.18)" strokeWidth="0.6"/>
      {/* water surface */}
      <ellipse cx="40" cy="72" rx="16" ry="3.5" fill="#2E6B3E" opacity="0.42"/>
      {/* stamen disk */}
      <circle cx="40" cy="34" r="6.5" fill="#FFA500" opacity="0.88"/>
      <circle cx="40" cy="34" r="3.5" fill="#FFD700" opacity="0.95"/>
      <circle cx="40" cy="34" r="1.4" fill="#fff"    opacity="0.55"/>
    </svg>
  )
}

/* ── Mandala ring (background corner decoration) ── */
export function MandalaSVG({ size = 220, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={style}>
      {/* concentric rings */}
      {[90, 72, 54, 36, 18].map((r, i) => (
        <circle key={i} cx="100" cy="100" r={r}
          stroke="#FFD700" strokeWidth={i === 0 ? 0.5 : 0.4} opacity="0.7"/>
      ))}
      {/* centre */}
      <circle cx="100" cy="100" r="8" fill="#FFD700" opacity="0.35"/>
      {/* 8 spokes */}
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x2 = 100 + 90 * Math.cos(rad)
        const y2 = 100 + 90 * Math.sin(rad)
        return <line key={i} x1="100" y1="100" x2={x2.toFixed(1)} y2={y2.toFixed(1)}
          stroke="#FFD700" strokeWidth="0.35" opacity="0.55"/>
      })}
      {/* petal shapes at 4 cardinal points */}
      <path d="M100 18 Q112 55 100 100 Q88 55 100 18Z"   fill="#FFD700" opacity="0.10"/>
      <path d="M100 182 Q112 145 100 100 Q88 145 100 182Z" fill="#FFD700" opacity="0.10"/>
      <path d="M18 100 Q55 112 100 100 Q55 88 18 100Z"   fill="#FFD700" opacity="0.10"/>
      <path d="M182 100 Q145 112 100 100 Q145 88 182 100Z" fill="#FFD700" opacity="0.10"/>
      {/* diagonal petals */}
      <path d="M45 45 Q70 70 100 100 Q68 68 45 45Z"     stroke="#FFD700" strokeWidth="0.3" opacity="0.4"/>
      <path d="M155 45 Q130 70 100 100 Q132 68 155 45Z"   stroke="#FFD700" strokeWidth="0.3" opacity="0.4"/>
      <path d="M45 155 Q70 130 100 100 Q68 132 45 155Z"   stroke="#FFD700" strokeWidth="0.3" opacity="0.4"/>
      <path d="M155 155 Q130 130 100 100 Q132 132 155 155Z" stroke="#FFD700" strokeWidth="0.3" opacity="0.4"/>
      {/* dot ring at r=54 */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x = 100 + 54 * Math.cos(rad)
        const y = 100 + 54 * Math.sin(rad)
        return <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="2"
          fill="#FFD700" opacity="0.3"/>
      })}
    </svg>
  )
}

/* ── Falling petal shapes (used for animation) ── */
export const PETAL_SVGS = [
  // golden elongated petal
  <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
    <path d="M7 1 Q13 7 11 14 Q9 19 7 19 Q5 19 3 14 Q1 7 7 1Z" fill="#FFD700" opacity="0.78"/>
    <path d="M7 1 Q7 9 7 19" stroke="rgba(180,120,0,0.3)" strokeWidth="0.6"/>
  </svg>,
  // orange petal
  <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
    <path d="M6 1 Q11 6 9 12 Q7 17 6 17 Q5 17 3 12 Q1 6 6 1Z" fill="#E8900A" opacity="0.72"/>
    <path d="M6 1 Q6 8 6 17" stroke="rgba(140,70,0,0.3)" strokeWidth="0.5"/>
  </svg>,
  // pink petal
  <svg width="13" height="17" viewBox="0 0 13 17" fill="none">
    <path d="M6.5 1 Q12 6 10 12 Q8 16 6.5 16 Q5 16 3 12 Q1 6 6.5 1Z" fill="#FFB6C1" opacity="0.68" transform="rotate(15 6.5 9)"/>
  </svg>,
  // round golden
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <ellipse cx="6" cy="6" rx="5" ry="5" fill="#FFD700" opacity="0.62"/>
  </svg>,
  // green leaf fragment
  <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
    <path d="M5 1 Q9 5 8 10 Q6 15 5 15 Q4 15 2 10 Q1 5 5 1Z" fill="#2E6B3E" opacity="0.52" transform="rotate(8 5 8)"/>
  </svg>,
]
