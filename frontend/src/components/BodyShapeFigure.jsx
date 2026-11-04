// A simple, abstract silhouette drawn from the measurements, so users can see
// how their proportions compare. Widths are proportional to circumferences.

function smoothPath(points) {
  // quadratic curves through the midpoints of each segment
  let d = `M ${points[0][0]} ${points[0][1]}`
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i]
    const [nx, ny] = points[i + 1]
    d += ` Q ${x} ${y} ${(x + nx) / 2} ${(y + ny) / 2}`
  }
  const last = points[points.length - 1]
  return `${d} L ${last[0]} ${last[1]}`
}

export default function BodyShapeFigure({ shoulders, bust, waist, hips, highHip, gender = 'women', highlight = true }) {
  const valid = [bust, waist, hips].every((v) => Number.isFinite(v) && v > 0)
  const b = valid ? bust : 36
  const w = valid ? waist : 29
  const h = valid ? hips : 38
  const hh = valid && Number.isFinite(highHip) && highHip > 0 ? highHip : (w + h) / 2

  const maxWidth = 120
  // shoulder circumference includes the upper arms, so it is drawn a little narrower
  const sh = valid && Number.isFinite(shoulders) && shoulders > 0 ? shoulders * 0.92 : b * (gender === 'men' ? 1.08 : 0.94)
  const scale = maxWidth / Math.max(sh, b, w, h, hh)
  const half = (c) => (c * scale) / 2
  const cx = 100

  const shoulder = half(sh)
  const left = [
    [cx - 14, 62],
    [cx - shoulder, 74],
    [cx - half(b), 104],
    [cx - half(w), 158],
    [cx - half(hh), 186],
    [cx - half(h), 214],
    [cx - half(h) * 0.82, 262],
    [cx - half(h) * 0.5, 330],
  ]
  const right = left.map(([x, y]) => [2 * cx - x, y]).reverse()
  const body = `${smoothPath(left)} L ${cx - 6} 330 L ${cx} 250 L ${cx + 6} 330 ${smoothPath(right).replace(/^M/, 'L')} Z`

  const line = (y, width, label) => (
    <g key={label}>
      <line x1={cx - width - 6} x2={cx + width + 6} y1={y} y2={y} stroke="#df6a8d" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={cx + maxWidth / 2 + 14} y={y + 4} fontSize="10" fill="#9f3a5a" fontFamily="Inter, sans-serif">
        {label}
      </text>
    </g>
  )

  return (
    <svg viewBox="0 0 240 340" className="h-full w-full" role="img" aria-label="Body proportion silhouette">
      <circle cx={cx} cy={34} r={20} fill="#f9d0dd" />
      <rect x={cx - 8} y={50} width={16} height={16} rx={4} fill="#f9d0dd" />
      <path d={body} fill="#f9d0dd" stroke="#ec8fa9" strokeWidth="2" strokeLinejoin="round" className="transition-all duration-500" />
      {highlight && valid && (
        <>
          {Number.isFinite(shoulders) && shoulders > 0 && line(74, shoulder, 'Shoulders')}
          {line(104, half(b), gender === 'men' ? 'Chest' : 'Bust')}
          {line(158, half(w), 'Waist')}
          {line(214, half(h), 'Hips')}
        </>
      )}
    </svg>
  )
}
