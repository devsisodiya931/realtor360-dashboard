import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'

const links = [
  ['Home', '/'],
  ['Developments', '/developments'],
  ['Buildings', '/buildings'],
  ['Units', '/units'],
  ['Leads', '/leads'],
  ['Companies', '/companies'],
  ['Contacts', '/contacts'],
  ['Deals', '/deals'],
  ['Activities', '/activities'],
  ['Attorney Firms', '/attorney-firms'],
  ['Reports', '/reports'],
] as const

export function Logo() {
  return (
    <a href="#/" className="logo">
      <img src="img/logo.png" alt="" />
      REALTOR360
    </a>
  )
}

// Closes a popover when clicking anywhere outside `ref`.
export function useOutside(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const on = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && close()
    document.addEventListener('mousedown', on)
    return () => document.removeEventListener('mousedown', on)
  }, [open, close])
  return ref
}

export function Navbar({ path }: { path: string }) {
  const [open, setOpen] = useState(false)
  const ref = useOutside(open, () => setOpen(false))
  const section = path === '/dashboard' ? '/' : '/' + path.split('/')[1]
  // Sub-pages without a nav tab (offer form, stacking plan) swap the "···" for a round chevron, as in the design.
  const deep = /offer-form|deal-sheet|stacking-plan/.test(path)

  return (
    <header className="nav">
      <Logo />
      <nav className="nav-links">
        {links.map(([label, to]) => (
          <a key={to} href={'#' + to} className={'nav-link' + (section === to ? ' active' : '')}>
            {label}
          </a>
        ))}
        <a href="#/dashboard" className={'nav-more' + (deep ? ' circle' : '')} title="Dashboard">
          <Icon name={deep ? 'down' : 'more'} size={deep ? 16 : 20} />
        </a>
      </nav>
      <label className="nav-search">
        <input placeholder="Search..." />
        <Icon name="search" />
      </label>
      <div className="nav-user" ref={ref}>
        <button onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: 6 }} aria-label="Account menu">
          <img className="avatar" src="img/me.png" width={36} height={36} alt="" />
          <Icon name={open ? 'caretUp' : 'caret'} />
        </button>
        {open && (
          <div className="menu" onClick={() => setOpen(false)}>
            <button><Icon name="person" size={20} /> User Profile</button>
            <a href="#/settings"><Icon name="gear" size={20} /> Settings</a>
            <button><Icon name="logout" size={20} /> Sign out</button>
          </div>
        )}
      </div>
    </header>
  )
}
