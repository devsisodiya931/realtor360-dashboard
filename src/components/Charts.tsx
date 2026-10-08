// SVG charts drawn in card-local coordinates measured from the 1440px design,
// so each viewBox maps 1:1 onto its card at desktop width.
const GOLD = '#d4af37'
const MID = '#eedfaf'
const LIGHT = '#f6efd7'
const TEXT = '#2c2c2c'
const AXIS = '#555'

function arc(cx: number, cy: number, R: number, r: number, a0: number, a1: number) {
  const p = (rad: number, a: number) => {
    const t = ((a - 90) * Math.PI) / 180
    return `${cx + rad * Math.cos(t)} ${cy + rad * Math.sin(t)}`
  }
  const large = a1 - a0 > 180 ? 1 : 0
  return `M${p(R, a0)} A${R} ${R} 0 ${large} 1 ${p(R, a1)} L${p(r, a1)} A${r} ${r} 0 ${large} 0 ${p(r, a0)}Z`
}

const leadSources = [
  { label: 'Inbound Call', value: '9 (37.87%)', pct: 37.87, color: LIGHT },
  { label: 'Reference', value: '1 (30.6%)', pct: 30.6, color: GOLD },
  { label: 'Facebook', value: '1 (6.78%)', pct: 6.78, color: '#ebd17d' },
  { label: 'Website', value: '10 (24.83%)', pct: 24.72, color: MID },
]

function Arrow({ d }: { d: string }) {
  return <path d={d} fill="none" stroke={AXIS} strokeWidth="1.5" markerEnd="url(#head)" />
}

function Label({ x, y, a, b }: { x: number; y: number; a: string; b: string }) {
  return (
    <text x={x} y={y} fontSize="10" fill={AXIS} textAnchor="middle">
      <tspan x={x}>{a}</tspan>
      <tspan x={x} dy="12">{b}</tspan>
    </text>
  )
}

/** Donut with curved call-out arrows. `inner` = 0 draws a pie. */
export function Donut({ className, inner = 46, box = '0 0 535 334' }: { className?: string; inner?: number; box?: string }) {
  let a = -12
  return (
    <svg className={className} viewBox={box} role="img" aria-label="Deals by lead source">
      <defs>
        <marker id="head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <path d="M1 1L8 5L1 9" fill="none" stroke={AXIS} strokeWidth="1.3" />
        </marker>
      </defs>
      {leadSources.map((s) => {
        const d = arc(267, 182, 115, inner, a, a + s.pct * 3.6)
        a += s.pct * 3.6
        return <path key={s.label} d={d} fill={s.color} />
      })}
      <Arrow d="M186 113 C165 100 138 102 124 124" />
      <Arrow d="M342 108 C356 94 378 92 392 99" />
      <Arrow d="M180 236 C172 256 150 263 124 263" />
      <Arrow d="M329 272 C352 284 388 284 409 270" />
      <Label x={98} y={143} a="Website" b={leadSources[3].value} />
      <Label x={428} y={112} a="Inbound Call" b={leadSources[0].value} />
      <Label x={85} y={250} a="Facebook" b={leadSources[2].value} />
      <Label x={446} y={252} a="Reference" b={leadSources[1].value} />
    </svg>
  )
}

function Legend({ y, xs }: { y: number; xs: number[] }) {
  return (
    <g fontSize="12" fill={TEXT}>
      {[
        ['Angel Plaza', GOLD],
        ['Angel Garden', MID],
        ['None', LIGHT],
      ].map(([label, c], i) => (
        <g key={label}>
          <circle cx={xs[i]} cy={y} r="7" fill={c} />
          <text x={xs[i] + 14} y={y + 4}>{label}</text>
        </g>
      ))}
    </g>
  )
}

// [angel plaza, angel garden, none] cumulative tops per stage
const stages: [string, number, number, number][] = [
  ['Interested', 2.9, 5.6, 7.9],
  ['Site Visit Done', 3.7, 7.1, 10],
  ['Unit Shortlisted', 3.5, 6.6, 9.3],
  ['Contracts Signed', 3.7, 7.1, 10],
  ['Offer Initiated', 3.1, 5.9, 8.4],
  ['Offer Accepted', 3.7, 7.1, 10],
]

function topRounded(x: number, y: number, w: number, h: number, r: number) {
  return `M${x} ${y + h}V${y + r}Q${x} ${y} ${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h}Z`
}

/** Stacked vertical bars. `single` renders one light series (Create Chart preview). */
export function StageBars({ className, single, legend = true, box = '0 0 535 334' }: { className?: string; single?: boolean; legend?: boolean; box?: string }) {
  const y0 = 205
  const k = 14.7
  return (
    <svg className={className} viewBox={box} role="img" aria-label="Deals by stages by development">
      <g fontSize="12" fill={AXIS} textAnchor="end">
        {[0, 2.5, 5, 7.5, 10].map((t) => (
          <g key={t}>
            <text x={62} y={y0 - t * k + 4}>{t}</text>
            <line x1={69} x2={459} y1={y0 - t * k} y2={y0 - t * k} stroke="#ccc" />
          </g>
        ))}
      </g>
      {stages.map(([name, a, b, c], i) => {
        const x = 89 + i * 62
        return (
          <g key={name}>
            {single ? (
              <path d={topRounded(x, y0 - c * k, 32, c * k, 3)} fill={LIGHT} />
            ) : (
              <>
                <path d={topRounded(x, y0 - c * k, 32, (c - b) * k + 4, 8)} fill={LIGHT} />
                <path d={topRounded(x, y0 - b * k, 32, (b - a) * k + 4, 8)} fill={MID} />
                <path d={topRounded(x, y0 - a * k, 32, a * k, 3)} fill={GOLD} />
              </>
            )}
            <text x={x + 16} y={218} fontSize="10" fill={AXIS} textAnchor="end" transform={`rotate(-40 ${x + 16} 218)`}>
              {name}
            </text>
          </g>
        )
      })}
      <text x={268} y={288} fontSize="14" fill={AXIS} textAnchor="middle">Stage</text>
      <text x={0} y={0} fontSize="14" fill={AXIS} textAnchor="middle" transform="translate(31 130) rotate(-90)">Record Count</text>
      {legend && <Legend y={312} xs={[28, 139, 261]} />}
    </svg>
  )
}

/** Horizontal stacked bars: deals by sales person. */
export function SalesBars({ className, box = '0 0 535 196' }: { className?: string; box?: string }) {
  const x0 = 49
  const k = 22.45
  const rows = [
    [4.9, 11, 17.7],
    [2.3, 7.8, 12.1],
  ]
  return (
    <svg className={className} viewBox={box} role="img" aria-label="Deals by sales people">
      {[0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20].map((t) => (
        <g key={t}>
          <line x1={x0 + t * k} x2={x0 + t * k} y1={46} y2={123} stroke="#ccc" />
          <text x={x0 + t * k} y={138} fontSize="12" fill={AXIS} textAnchor="middle">{t}</text>
        </g>
      ))}
      {rows.map(([a, b, c], i) => {
        const y = 52 + i * 36
        return (
          <g key={i}>
            <rect x={x0} y={y} width={c * k} height={27} rx={6} fill={LIGHT} />
            <rect x={x0} y={y} width={b * k} height={27} rx={6} fill={MID} />
            <rect x={x0} y={y} width={a * k} height={27} rx={6} fill={GOLD} />
          </g>
        )
      })}
      <text x={268} y={158} fontSize="14" fill={AXIS} textAnchor="middle">Record Count</text>
      <text fontSize="14" fill={AXIS} textAnchor="middle" transform="translate(31 86) rotate(-90)">Deal Owner</text>
      <Legend y={180} xs={[30, 141, 263]} />
    </svg>
  )
}
