import { useState, type CSSProperties } from 'react'
import { Donut, SalesBars, StageBars } from '../components/Charts'
import { Icon } from '../components/Icon'

const kpis = [
  { title: 'Active Listing', value: '23', delta: '-12%', up: false, icon: 'k_listing' },
  { title: 'Active Leads', value: '120', delta: '+12%', up: true, icon: 'k_leads' },
  { title: 'Total Closed', value: '42', delta: '+12%', up: true, icon: 'k_closed' },
  { title: 'Total Revenue', value: 'Rs.22Cr.', delta: '+12%', up: true, icon: 'k_revenue' },
]

const listings = [
  { name: 'Maplewood House', img: 'maplewood', type: 'House', units: 12, price: 'Rs.85L', leads: 35, views: 125, status: '8/12 Occupied' },
  { name: 'Serenity Villa', img: 'serenity', type: 'Villa', units: 9300, price: 'Rs.2.8Cr', leads: 40, views: 930, status: 'Available' },
  { name: 'Rosehill Cottage', img: 'rosehill', type: 'House', units: 25, price: 'Rs.1.1Cr', leads: 15, views: 355, status: 'Available' },
  { name: 'Skyline Edge', img: 'skyline', type: 'Apartment', units: 17, price: 'Rs.75L', leads: 11, views: 425, status: 'Sold Out' },
]

const leadContacts = [
  ['John Doe', 'New York', 'john'],
  ['Jessica Chen', 'California, LA', 'jessica'],
  ['Evan Chris', 'New York', 'evan'],
  ['Jack B.', 'Ohio, Columbus', 'jack'],
  ['Emily Paris', 'California, LA', 'emily'],
]

const reminders = [
  ['Submit Final Offer- Villa Deal', 'Finalize and send offer documents.'],
  ['Review Contract with Legal', 'Ensure attorney reviews apartment deal contract today.'],
  ['Call Jessica Chen – Follow-up', 'Discuss her feedback after site visit to Angel Plaza.'],
]

const TEAL = '#0eeabe'
const PINK = '#e192ad'
const YELLOW = '#ffe100'
const schedule = [
  ['Visit Client- Angel Plaza', ' Sector 45, Gurugram, Haryana', TEAL],
  ['Visit Client – Site Walkthrough', 'Whitefield Road, Bengaluru, Karnataka', TEAL],
  ['Follow Up – Jessica Chen', 'jessica.chen@email.com', PINK],
  ['Follow Up – Roger Bouchard', 'roger.bouchard@clientmail.com', PINK],
  ['Submit Final Offer – Villa Deal', 'Finalize and send offer documents.', YELLOW],
  ['Submit Internal Review – Apartment PricingFinal Offer – Villa Deal', 'Update CRM with latest market rates.', YELLOW],
]

// Days with scheduled items get a colour underline, as in the design.
const marks: Record<string, string> = { '2025-6-10': TEAL, '2025-6-11': YELLOW, '2025-6-14': PINK }
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function Calendar() {
  const [m, setM] = useState({ y: 2025, mo: 6 })
  const first = new Date(m.y, m.mo, 1).getDay()
  const days = new Date(m.y, m.mo + 1, 0).getDate()
  const shift = (d: number) => setM(({ y, mo }) => ({ y: y + Math.floor((mo + d) / 12), mo: (mo + d + 12) % 12 }))
  return (
    <>
      <div className="cal-head">
        <h2>{MONTHS[m.mo]} {m.y}</h2>
        <button onClick={() => shift(-1)} aria-label="Previous month"><Icon name="left" size={30} /></button>
        <button onClick={() => shift(1)} aria-label="Next month"><Icon name="right" size={30} /></button>
      </div>
      <div className="cal-grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i}>{d}</span>)}
        {Array.from({ length: first }, (_, i) => <span key={'e' + i} />)}
        {Array.from({ length: days }, (_, i) => {
          const c = marks[`${m.y}-${m.mo}-${i + 1}`]
          const today = m.y === 2025 && m.mo === 6 && i === 7
          return (
            <span key={i} className={(today ? 'today' : '') + (c ? ' mark' : '')} style={c ? ({ '--c': c } as CSSProperties) : undefined}>
              {i + 1}
            </span>
          )
        })}
      </div>
    </>
  )
}

export default function Home() {
  return (
    <div className="home">
      <div className="home-main">
        {kpis.map((k) => (
          <div key={k.title} className="card kpi">
            <div className="kpi-head">
              <img src={`img/${k.icon}.png`} alt="" />
              {k.title}
            </div>
            <div className="kpi-val">
              {k.value}
              <span className={'pill ' + (k.up ? 'up' : 'down')}>
                {k.delta} <Icon name={k.up ? 'ne' : 'se'} size={10} />
              </span>
            </div>
          </div>
        ))}

        <div className="card chart-card span2">
          <div className="card-title">Deals by Lead Source</div>
          <Donut className="fill" />
        </div>
        <div className="card chart-card span2" style={{ paddingLeft: 20 }}>
          <div className="card-title">Deals by Stages by Development</div>
          <StageBars className="fill" />
        </div>

        <div className="card chart-card span2">
          <div className="card-title">Deals by Sales People by Development</div>
          <SalesBars className="fill" />
        </div>
        <div className="card chart-card span2" style={{ gridRow: 'span 2', paddingLeft: 22, paddingRight: 26 }}>
          <div className="card-title">Deals in Pipeline by Development</div>
          <Pipeline />
        </div>
        <div className="card chart-card span2">
          <div className="card-title">Total Deals Closed</div>
          <ClosedBar />
        </div>

        <div className="last-row">
          <div className="card listing">
            <div className="card-title">Active Listing</div>
            <table>
              <thead>
                <tr>{['Property', 'Type', 'Units', 'Price', 'Active Leads', 'Views', 'Status'].map((h) => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {listings.map((l) => (
                  <tr key={l.name}>
                    <td style={{ width: 128 }}>
                      <div className="prop"><img src={`img/${l.img}.png`} alt="" />{l.name}</div>
                    </td>
                    <td style={{ width: 98 }}>{l.type}</td>
                    <td style={{ width: 97 }}>{l.units}</td>
                    <td style={{ width: 100 }}>{l.price}</td>
                    <td style={{ width: 153 }}>
                      <div className="stack"><img src="img/leadpair.png" alt="" /><span>+{l.leads}</span></div>
                    </td>
                    <td style={{ width: 77 }}>{l.views}</td>
                    <td><span className={'st ' + (l.status === 'Sold Out' ? 'no' : 'ok')}>{l.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card contacts">
            <div className="card-title">Leads Contacts</div>
            <a className="expand" href="#/leads" aria-label="All leads"><Icon name="ne" size={12} /></a>
            {leadContacts.map(([n, city, img]) => (
              <div key={n} className="contact-row">
                <img className="avatar" src={`img/lc_${img}.png`} width={36} height={36} alt="" />
                <div><b>{n}</b><small>{city}</small></div>
                <button className="call" aria-label={`Call ${n}`}><Icon name="phone" size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="home-side">
        <div className="card reminder">
          <div className="card-title" style={{ paddingLeft: 4 }}>Reminder</div>
          <div className="follow">
            <b>Follow-Ups</b>
            <small>15 leads need to be followed up.</small>
            <div className="stack"><img src="img/followups.png" alt="" /><span>+11</span></div>
          </div>
          {reminders.map(([t, s]) => (
            <div key={t} className="rem-item"><b>{t}</b><small>{s}</small></div>
          ))}
        </div>
        <div className="card calendar">
          <Calendar />
          <div className="sched">
            <h3>My Schedule</h3>
            {schedule.map(([t, s, c]) => (
              <div key={t} className="sched-item" style={{ '--c': c } as CSSProperties}>
                <b>{t}</b><small>{s}</small>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}

export function Pipeline() {
  return (
    <table className="pipeline">
      <thead><tr><th>Development Name</th><th>Record Count</th></tr></thead>
      <tbody>
        {[['None', 14], ['Angel Plaza', 3], ['Angel Garden', 1]].map(([n, c]) => (
          <tr key={n}><td>{n}</td><td>{c}</td></tr>
        ))}
      </tbody>
    </table>
  )
}

export function ClosedBar() {
  return (
    <>
      <div className="closed-bar"><div style={{ width: '42.5%' }} /></div>
      <div className="closed-foot">
        <span>42<small>Closed Deals</small></span>
        <span>132<small>On Progress</small></span>
      </div>
    </>
  )
}
