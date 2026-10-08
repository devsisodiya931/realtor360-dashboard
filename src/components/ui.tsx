import { useState, type CSSProperties, type ReactNode } from 'react'
import { back } from '../router'
import { Icon } from './Icon'
import { useOutside } from './Navbar'

const tone: Record<string, string> = {
  Active: 'green', 'Closed Won': 'green', Completed: 'green', Interested: 'green',
  'In Progress': 'yellow', Booked: 'yellow',
  Cold: 'grey', 'Not Started': 'grey',
  Converted: 'blue', Sold: 'blue', Open: 'blue',
  'Not Interested': 'red', Inactive: 'red', 'Closed Lost': 'red', Missed: 'red',
}

export function Badge({ s, sm, style }: { s: string; sm?: boolean; style?: CSSProperties }) {
  return <span className={`badge b-${tone[s] ?? 'grey'}${sm ? ' sm' : ''}`} style={style}>{s}</span>
}

export function Pager() {
  const [p, setP] = useState(1)
  return (
    <div className="pager">
      <button className="muted" onClick={() => setP(Math.max(1, p - 1))}><Icon name="left" size={16} />Prev</button>
      <i>|</i>
      {[1, 2, 3].map((n) => (
        <span key={n} style={{ display: 'contents' }}>
          <button className={n === p ? 'cur' : ''} onClick={() => setP(n)}>{n}</button>
          <i>|</i>
        </span>
      ))}
      <button onClick={() => setP(Math.min(3, p + 1))} style={{ display: 'flex', alignItems: 'center' }}>Next<Icon name="right" size={16} /></button>
    </div>
  )
}

export type FilterGroup = { title: string; options?: string[]; range?: [string, string] }

export function Filters({ search, groups }: { search?: string; groups: FilterGroup[] }) {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const toggle = (k: string) => setChecked((s) => {
    const n = new Set(s)
    if (n.has(k)) n.delete(k)
    else n.add(k)
    return n
  })
  return (
    <aside className="side">
      <div className="side-title">Filters</div>
      {search && (
        <label className="fsearch">
          <input placeholder={search} />
          <Icon name="search" size={16} />
        </label>
      )}
      {groups.map((g) => (
        <div key={g.title} className="fgroup">
          <h4>{g.title}</h4>
          {g.options?.map((o) => {
            const k = g.title + o
            return (
              <label key={o} className="check">
                <input type="checkbox" checked={checked.has(k)} onChange={() => toggle(k)} />
                {o}
              </label>
            )
          })}
          {g.range && (
            <>
              <div className="range" />
              <div className="range-lbl"><span>Min.<br />{g.range[0]}</span><span>Max.<br />{g.range[1]}</span></div>
            </>
          )}
        </div>
      ))}
      <div className="side-btns">
        <button className="apply">Apply Filters</button>
        <button className="reset" onClick={() => setChecked(new Set())}>Reset Filters</button>
      </div>
    </aside>
  )
}

export function ListHeader({ title, create, search }: { title: string; create: string; search?: string }) {
  return (
    <div className="main-head">
      <h1>{title}</h1>
      <div className="toolbar">
        <button className="create"><span>+</span>{create}</button>
        {search && (
          <label className="lsearch">
            <input placeholder={search} />
            <Icon name="search" />
          </label>
        )}
        <button className="tool grid" aria-label="View"><Icon name="grid" /><Icon name="caret" size={18} /></button>
        <button className="tool actions">&nbsp;Actions<Icon name="caret" size={18} /></button>
      </div>
    </div>
  )
}

/** Generic dropdown: `trigger` gets the open state, menu closes on outside click or selection. */
export function Dropdown({ trigger, children, style }: { trigger: (open: boolean) => ReactNode; children: ReactNode; style?: CSSProperties }) {
  const [open, setOpen] = useState(false)
  const ref = useOutside(open, () => setOpen(false))
  return (
    <div className="dd" ref={ref}>
      <div onClick={() => setOpen(!open)}>{trigger(open)}</div>
      {open && <div className="dd-menu" style={style} onClick={() => setOpen(false)}>{children}</div>}
    </div>
  )
}

export function RelatedList({ items }: { items: (string | [string, number])[] }) {
  return (
    <aside className="side rel">
      <div className="side-title">Related List</div>
      {items.map((it) => {
        const [label, n] = typeof it === 'string' ? [it] : it
        return <button key={label}>{label}{n !== undefined && <span className="count">{n}</span>}</button>
      })}
      <button className="add">Add Related List</button>
    </aside>
  )
}

export function BackButton() {
  return <button className="back" onClick={back} aria-label="Back"><Icon name="back" /></button>
}

const TABS = ['Overview', 'Timeline', 'Notes', 'Activities', 'Attachments']

/** Detail page shell: related list + header + tab bar. Overview renders `children`, Notes renders the notes form. */
export function Detail({ related, header, children, tabsStyle, headH }: { related: (string | [string, number])[]; header: ReactNode; children: ReactNode; tabsStyle?: CSSProperties; headH?: number }) {
  const [tab, setTab] = useState('Overview')
  return (
    <div className="split">
      <RelatedList items={related} />
      <main className="main">
        <div className="dhead" style={headH ? { minHeight: headH } : undefined}>
          <BackButton />
          {header}
        </div>
        <div className="tabs" style={tabsStyle}>
          {TABS.map((t) => <button key={t} className={t === tab ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}
        </div>
        {tab === 'Overview' ? (
          <div className="sections">{children}</div>
        ) : tab === 'Notes' ? (
          <div className="notes">
            <div className="cap"><h3>Notes</h3><p style={{ fontSize: 16 }}>Additional remarks and observations</p></div>
            <textarea placeholder="Add a Note..." />
          </div>
        ) : (
          <div className="placeholder">No {tab.toLowerCase()} yet.</div>
        )}
      </main>
    </div>
  )
}

export function Section({ title, sub, children, style }: { title: string; sub: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <section className="section" style={style}>
      <div className="cap"><h3>{title}</h3><p>{sub}</p></div>
      <div>{children}</div>
    </section>
  )
}

type Pair = [string, ReactNode]

/**
 * Label/value grid. Left pairs fill columns 1-2, optional right pairs fill 3-4.
 * `w` = [left label, left value] column widths in px, tuned per section to match the design;
 * right labels size to content.
 */
export function KV({ left, right = [], w = [212, 194], gap = 22, style }: { left: Pair[]; right?: Pair[]; w?: number[]; gap?: number; style?: CSSProperties }) {
  const cell = (col: number, row: number, cls: string, content: ReactNode, key: string) => (
    <div key={key} className={cls} style={{ gridColumn: col, gridRow: row }}>{content}</div>
  )
  return (
    <div className="kv" style={{ gridTemplateColumns: `${w[0]}px ${w[1]}px 1fr`, rowGap: gap, ...style }}>
      {left.flatMap(([l, v], i) => [cell(1, i + 1, 'l', l, 'l' + i), cell(2, i + 1, 'v nw', v, 'v' + i)])}
      {/* right column is its own grid so a multi-line value doesn't stretch the left rows */}
      {right.length > 0 && (
        <div className="kv-right" style={{ gridColumn: 3, gridRow: `1 / ${left.length + 1}`, alignSelf: 'start', rowGap: gap }}>
          {right.flatMap(([l, v], i) => [<div key={'l' + i} className="l">{l}</div>, <div key={'v' + i} className="v">{v}</div>])}
        </div>
      )}
    </div>
  )
}

export function MiniTable({ head, rows, bold = false, tools = false, widths }: { head: string[]; rows: ReactNode[][]; bold?: boolean; tools?: boolean; widths?: number[] }) {
  return (
    <>
      {tools && (
        <div className="mini-tools">
          <button className="btn btn-soft">New</button>
          <button className="btn btn-soft">Edit</button>
        </div>
      )}
      <table className="mini">
        <thead><tr>{head.map((h, i) => <th key={i} style={{ width: widths?.[i] }}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j} className={bold && j === 0 ? 'b' : ''}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export function SendEdit({ extra }: { extra?: ReactNode }) {
  return (
    <div className="actions">
      <button className="btn btn-gold">Send Email</button>
      <button className="btn btn-soft">Edit</button>
      {extra}
    </div>
  )
}
