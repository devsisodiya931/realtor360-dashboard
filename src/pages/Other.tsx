import { useState, type ReactNode } from 'react'
import { Donut, SalesBars, StageBars } from '../components/Charts'
import { CallIcon, Icon } from '../components/Icon'
import { Logo } from '../components/Navbar'
import { BackButton, Badge, Dropdown, Filters, KV, ListHeader, Pager } from '../components/ui'
import { go } from '../router'
import { ClosedBar, Pipeline } from './Home'

/* ---------------- Activities ---------------- */
type Act = { kind: 'event' | 'call' | 'missed'; title: string; date: string; time?: string; late?: boolean; rows: [string, string][]; status: string; prio: string }

const follow = (status: string, prio: string, o: Partial<Act> = {}): Act => ({
  kind: 'event', title: 'Follow-up with John', date: '12/07/2025', status, prio,
  rows: [['Assigned To:', 'Mohit Verma'], ['Deal:', 'Sunrise Villa Sale'], ['Deal Value:', '₹1.45 Cr']], ...o,
})
const task = (title: string, status: string, prio: string, linked = 'Urban Build Group'): Act => ({
  kind: 'event', title, date: '12/07/2025', time: '2:30 PM', status, prio,
  rows: [['Title:', 'Virtual discussion with legal team'], ['Assigned To:', 'Jessica Chen'], ['Linked To:', linked]],
})
const call = (status: string, prio: string, missed = false): Act => ({
  kind: missed ? 'missed' : 'call', title: 'John Doe', date: '11/07/2025', time: '11:00 AM', late: missed, status, prio,
  rows: [['Title:', 'Broker call - Pricing negotiation'], ['Assigned To:', 'Mohit Verma'], ['Linked To:', 'Lotus Crest (Lead)']],
})

const activityTabs: Record<string, Act[]> = {
  Customers: [
    follow('Active', 'High'), follow('Not Interested', 'Low', { date: '10/07/2025', late: true }), follow('Active', 'High', { title: 'Initiate Contract with John' }), follow('In Progress', 'Medium'),
    follow('In Progress', 'High'), follow('Active', 'High'), follow('In Progress', 'High'), follow('In Progress', 'Medium'),
    follow('In Progress', 'Medium'), follow('In Progress', 'Medium', { title: 'Initiate Contract with John' }), follow('In Progress', 'Medium'), follow('In Progress', 'Medium'),
  ],
  'Open Deals': [
    task('Meeting', 'Completed', 'High'), task('Share More Info', 'In Progress', 'Medium'), task('Follow Up John', 'Not Started', 'Low'), task('Share Attorney Firm', 'In Progress', 'Medium'),
    task('Meeting', 'Completed', 'High'), task('Share More Info', 'In Progress', 'Medium'), task('Follow Up John', 'Not Started', 'Low'), task('Share Attorney Firm', 'In Progress', 'Medium'),
    task('Meeting', 'Completed', 'High'),
  ],
  'Leads/Contacts': [
    task('Test', 'Completed', 'High'), task('Follow Up John', 'In Progress', 'High'), task('Initiate Contract with John', 'Not Started', 'Low'), call('Completed', 'Low'),
    task('Test', 'Completed', 'High'), task('Follow Up John', 'In Progress', 'Medium'), task('Initiate Contract with John', 'Not Started', 'Medium'), call('Missed', 'Low', true),
    call('Completed', 'High'), call('Missed', 'Low', true),
  ],
  Others: [task('Site Visit Planning', 'In Progress', 'Medium', 'Sunrise Enclave'), call('Completed', 'Low'), task('Share Brochure', 'Not Started', 'Low', 'Aster Tower')],
}

function ActivityCard({ a }: { a: Act }) {
  return (
    <div className="act">
      <div className="act-top">
        {a.kind === 'event' ? <Icon name="event" size={22} /> : <CallIcon missed={a.kind === 'missed'} />}
        <b style={a.kind !== 'event' || a.title.length < 16 ? { paddingTop: 10 } : undefined}>{a.title}</b>
        <time className={a.late ? 'late' : ''}>{a.date}{a.time && <><br />{a.time}</>}</time>
      </div>
      <div className="act-rows">
        {a.rows.map(([k, v]) => (
          <div key={k} className="act-row"><span style={{ minWidth: k === 'Title:' ? 34 : undefined }}>{k}</span><span>{v}</span></div>
        ))}
      </div>
      <div className="act-foot">
        Status:<Badge s={a.status} sm /><i>{a.prio}</i>
      </div>
    </div>
  )
}

export function Activities() {
  const [tab, setTab] = useState('Customers')
  return (
    <div className="split">
      <Filters groups={[
        { title: 'Activity Type', options: ['Task', 'Meeting', 'Call'] },
        { title: 'Status', options: ['Active', 'Completed', 'In Progress', 'Missed', 'Not Interested'] },
        { title: 'Linked With', options: ['Deal', 'Contact', 'Lead', 'Company', 'Development'] },
        { title: 'Priority', options: ['High', 'Medium', 'Low'] },
        { title: 'Owner Name', options: ['Mohit Verma', 'Arjun Malhotra', 'Mohit Mehra', 'Shruti Reddy', 'Neha Desai'] },
      ]} />
      <main className="main">
        <div className="act-head">
          <h1>Activities</h1>
          {['Add Task', 'Add Call', 'Add Meeting'].map((b) => <button key={b} className="btn btn-soft"><Icon name="plus" size={14} /> {b}</button>)}
        </div>
        <div className="tabs act-tabs">
          {Object.keys(activityTabs).map((t) => <button key={t} className={t === tab ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}
        </div>
        <div className="act-grid">
          {activityTabs[tab].map((a, i) => <ActivityCard key={tab + i} a={a} />)}
        </div>
        <Pager />
      </main>
    </div>
  )
}

/* ---------------- Reports ---------------- */
const reports = [
  ['Lead by Source', 'Breaks down leads by source (e.g., Referral, Website, Walk-in).', ''],
  ['Lead Conversion Report', 'Tracks how many leads have been successfully converted into deals.', 'Leads Reports'],
  ['Leads by Status', 'Report showing all leads grouped by their current status.', 'Leads Reports'],
  ['Deal Status Summary', 'Overview of total deals categorized by current status.', 'Deals Reports'],
  ['Deals by Owner', 'Shows deals grouped by assigned sales agents or brokers.', 'Deals Reports'],
  ['Deals Closing This Month', 'List of deals expected to close in the current month.', 'Deals Reports'],
  ['Deal Value Trend (Monthly)', 'Monthly summary of total deal value.', 'Deals Reports'],
  ['Unit Sales Report', 'Units sold within selected timeframes, grouped by type or location.', 'Units Reports'],
  ['Unit Status Summary', 'Summary of unit statuses across all developments.', 'Units Reports'],
  ['Vacant Units Report', 'List of units that are currently unassigned or unsold.', 'Units Reports'],
  ['Assigned Matters by Firm', 'Number and types of legal cases handled by each attorney firm.', 'Attorney Firms Reports'],
  ['Company Deal Report', 'Shows companies associated with the most deals.', 'Company Reports'],
]

export function Reports() {
  const [starred, setStarred] = useState<Set<number>>(new Set())
  const toggle = (i: number) => setStarred((s) => {
    const n = new Set(s)
    if (n.has(i)) n.delete(i)
    else n.add(i)
    return n
  })
  return (
    <div className="split">
      <Filters groups={[{ title: 'Report Category', options: ['Deals Reports', 'Leads Reports', 'Units Reports', 'Contacts Reports', 'Hyderabad', 'Development Reports', 'Buildings Reports', 'Finance Reports', 'Attorney Firms Reports', 'Companies Reports', 'Activities Reports', 'Broker/Sales Agent Reports', 'Schedule Reports', 'Company Reports', 'Email Reports', 'Meeting Reports', 'Visit Reports'] }]} />
      <main className="main">
        <ListHeader title="All Reports" create="Create Reports" search="Search Report" />
        <div className="list-body">
          <table className="dtable rtable">
            <thead><tr><th style={{ width: 272 }}>Report Name</th><th style={{ width: 497 }}>Description</th><th style={{ width: 171 }}>Category</th><th>Last Run Date</th></tr></thead>
            <tbody>
              {reports.map(([n, d, c], i) => (
                <tr key={i} onClick={() => go('/reports/leads-by-source')}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '-3px 0' }}>
                      <button className={'star' + (starred.has(i) ? ' on' : '')} onClick={(e) => { e.stopPropagation(); toggle(i) }} aria-label="Favourite">
                        <Icon name="star" size={22} />
                      </button>
                      <b style={{ fontWeight: 600 }}>{n}</b>
                    </div>
                  </td>
                  <td>{d}</td><td>{c}</td><td>12 Jul 2025</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pager />
        </div>
      </main>
    </div>
  )
}

const leadRows = [
  ['Website (3)', 'Jessica Chen', 'Rohan Malhotra', 'Urban Spaces Pvt.', 'rohan@urbanspa\nces.com', '+91 98765 12345', '3 BHK Apartment', 'Interested', '₹1.25 Cr'],
  ['', 'Ayesha Khan', 'Kunal Bhatia', 'Luxe Realty', 'kunal@luxerealty\n.com', '+91 98765 12345', '2 BHK Apartment', 'Interested', '₹90 L'],
  ['', 'Deepak Rao', 'Meera Joshi', 'Joshi Associates', 'meera.joshi@em\nail.com', '+91 98765 12345', '3 BHK Penthouse', 'In Progress', '₹2.75 Cr'],
  ['Referral (1)', 'Rahul Verma', 'Priya Khanna', 'Khanna Realty', 'priya@khannare\nalty.com', '+91 98234 45678', '2 BHK Flat', 'In Progress', '₹85 L'],
  ['Walk-In (1)', 'Rohit Mehra', 'Manish Kapoor', 'Elite Homes', 'shweta@eliteho\nmes.com', '+91 99876 33221', '3 BHK Apartment', 'Converted', '₹1.40 Cr'],
  ['Google Ads (1)', 'Neha Gupta', 'Tarun Arora', '—', 'tarun.arora@ema\nil.com', '+91 90909 12345', '1 BHK Flat', 'Follow-up', '₹55 L'],
]

export function LeadsBySource() {
  return (
    <>
      <div className="page-head">
        <BackButton />
        <h1>Leads by Source <Icon name="caret" /></h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-gold">Send Email</button>
          <button className="btn btn-soft sm">Edit</button>
          <button className="btn btn-soft sm" onClick={() => go('/reports/create-chart')}>Create Chart</button>
        </div>
      </div>
      <div className="rgrid">
        <table>
          <thead>
            <tr>{['Lead Source', 'Lead Owner', 'Full Name', 'Company', 'Email', 'Mobile', <>Requirement<br />Type</>, 'Lead Status', 'Budget'].map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {leadRows.map((r, i) => (
              <tr key={i} className={leadRows[i + 1]?.[0] === '' ? 'gap' : ''}>
                {r.map((c, j) => (
                  <td key={j} className={(j === 4 ? 'l' : '') + (j === 0 && c === '' ? ' e' : '') + (j === 0 && leadRows[i + 1]?.[0] === '' ? ' e' : '')} style={j === 4 ? { whiteSpace: 'pre-line', width: 152 } : undefined}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="foot">Total Records in this Page: <b>6 Records</b></div>
      </div>
    </>
  )
}

/* ---------------- Create chart ---------------- */
const chartIcons: Record<string, ReactNode> = {
  'Vertical Bar': <path d="M5 20V12M10 20V6M15 20V10M20 20V4M3 21h19" />,
  'Horizontal Bar': <path d="M3 3v18M3 6h10M3 11h16M3 16h7" />,
  'Line Graph': <path d="M3 3v18h18M6 16l4-5 4 3 6-7" />,
  'Donut Graph': <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 4v5M19 14l-4-1" /></>,
  'Pie Chart': <path d="M12 3a9 9 0 1 0 9 9h-9zM14 2v8h8a8 8 0 0 0-8-8z" />,
  'Area Chart': <path d="M3 3v18h18M4 18l5-8 4 4 4-6 3 4v6H4z" />,
  'Funnel Chart': <path d="M3 4h18l-7 8v7l-4 2v-9z" />,
}

export function CreateChart() {
  const [type, setType] = useState<string>()
  const donut = type === 'Donut Graph' || type === 'Pie Chart'
  return (
    <>
      <div className="page-head"><BackButton /><h1 style={{ fontSize: 18 }}>Create Chart</h1></div>
      <div className="cc">
        <div className="cc-types">
          {Object.entries(chartIcons).map(([name, icon]) => (
            <button key={name} className={name === type ? 'on' : ''} onClick={() => setType(name)}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">{icon}</svg>
              {name}
            </button>
          ))}
        </div>
        <div className="cc-form">
          <div>
            <h4>Axis Values</h4>
            <input placeholder="Type X- axis value" />
            <input placeholder="Type Y- axis value" />
          </div>
          <div style={{ width: 300 }}>
            <h4>Add as Dashboard Widget</h4>
            <button className="btn btn-gold" disabled={!type} onClick={() => go('/dashboard')}>+ Add to Dashboard</button>
          </div>
        </div>
        {type && (
          <div className="cc-preview">
            <h4>Lead by Source</h4>
            <div style={{ width: 460, height: 290 }}>
              {donut ? <Donut inner={type === 'Pie Chart' ? 0 : 46} box="60 40 420 260" /> : <StageBars single legend={false} box="0 40 535 260" />}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

/* ---------------- Stacking plan ---------------- */
type Cell = '' | 'closed' | 'offer' | 'hold' | 'out' | 'signed'
const plans: { name: string; floors: [string, Cell[]][] }[] = [
  {
    name: 'Sunrise Enclave',
    floors: [
      ['3', ['', 'closed', '', '', '', '', '']],
      ['2', ['', '', '', '', '', '', '']],
      ['1', ['signed', '', '', 'offer', '', '', '']],
      ['Ground\nFloor', ['', '']],
    ],
  },
  {
    name: 'Eden Greens',
    floors: [
      ['2', ['', '', '', '', '', '', 'out']],
      ['1', ['signed', '', '', 'hold', '', '', '']],
      ['Ground\nFloor', ['', '']],
    ],
  },
]

export function StackingPlan() {
  return (
    <>
      <div className="page-head" style={{ paddingLeft: 24 }}>
        <BackButton />
        <h1 style={{ marginLeft: 2 }}>Stacking Plan Reports</h1>
        <button className="btn btn-soft sm" style={{ marginTop: -8 }}>Export</button>
      </div>
      {plans.map((p, pi) => (
        <div key={p.name}>
          {pi > 0 && <div className="sp-sep" />}
          <div className="sp">
            <h2>{pi + 1}. Development Name: {p.name}</h2>
            {p.floors.map(([floor, cells]) => (
              <div key={floor} className="sp-row">
                <div className="sp-floor" style={{ whiteSpace: 'pre-line', textAlign: floor.length > 2 ? 'left' : 'center' }}>{floor}</div>
                {cells.map((c, i) => (
                  <div key={i} className={'sp-unit ' + c}>
                    <div><span>Unit A-301</span><span>Flat</span></div>
                    <div>1250 sq.ft</div>
                    <div>Rohan Mehta</div>
                    <div>&nbsp;₹1.25 Cr</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

/* ---------------- Offer form & deal sheet ---------------- */
function DocShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <div className="page-head">
        <BackButton />
        <h1 style={{ fontSize: 20 }}>Offer Form</h1>
        <div style={{ display: 'flex', gap: 16 }}>
          <button className="btn btn-soft sm" onClick={() => window.print()}>Export PDF</button>
          <button className="btn btn-soft sm">Save Draft</button>
        </div>
      </div>
      <div className="doc">
        <div className="doc-top"><Logo /><h2>{title}</h2></div>
        {children}
      </div>
    </>
  )
}

export function OfferForm() {
  return (
    <DocShell title="Offer Form">
      <div className="doc-cols">
        <div className="left">
          <h3>Buyer’s Details</h3>
          <KV w={[169, 300]} gap={13} left={[['Full Name', 'John Doe'], ['Contact Number', '+91 98765 43210'], ['Email Address', 'john.doe@email.com'], ['Address', '201, Orchid Apartments, Bengaluru']]} />
        </div>
        <div className="right">
          <h3>Property Information</h3>
          <KV w={[200, 158]} gap={13} left={[['Deal ID', '#10567'], ['Development Name', 'Sunrise Enclave'], ['Building Name', 'Aster Tower'], ['Unit Number', 'Unit A-101'], ['Unit Type', '3 BHK'], ['Unit Area (sq.ft)', 'Unit Area (sq.ft)'], ['Floor No.', '1st Floor']]} />
        </div>
      </div>
      <div className="doc-hr" />
      <div className="doc-band">Offer Details</div>
      <div className="doc-cols" style={{ marginTop: 0 }}>
        <div className="left" style={{ paddingTop: 12 }}>
          <KV w={[260, 200]} gap={18} left={[['Offer Price (₹)', '₹1.45 Cr'], ['Booking Amount (₹)', '₹5,00,000'], ['Payment Plan', 'Full Payment'], ['Offer Validity (till date)', '31/07/2025'], ['Possession Date Expected', '30/11/2025'], ['Preferred Payment Method', 'Bank Transfer']]} />
        </div>
        <div className="right">
          <h3>Broker/Sales Agent Info</h3>
          <KV w={[165, 166]} gap={13} left={[['Broker Name', 'Rohit Mehra'], ['Contact Number', '+91 91234 56789'], ['Agency/Firm Name', 'Urban Realty Group']]} />
        </div>
      </div>
      <h3 style={{ marginTop: 80 }}>Signatures</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, marginTop: 14 }}>
        <span><span style={{ color: 'var(--label)', fontWeight: 500, marginRight: 36 }}>Buyer</span>John Doe (14/07/2025)</span>
        <span><span style={{ color: 'var(--label)', fontWeight: 500, marginRight: 36 }}>Sales Representative</span>Rohit Mehra (14/07/2025)</span>
      </div>
    </DocShell>
  )
}

export function DealSheet() {
  return (
    <DocShell title="Deal Sheet">
      <div className="doc-cols">
        <div className="left">
          <h3>Deal Information</h3>
          <KV w={[177, 250]} gap={13} left={[
            ['Deal Name', 'John Doe- Sunrise Deal'], ['Deal Owner', 'Rohit Mehra'], ['Development', 'Sunrise Enclave'], ['Building', 'Aster Tower'], ['Unit Number', 'A-101'], ['Unit Type', '3 BHK'],
            ['Unit Area', '1500 sq.ft'], ['Deal Status', 'Converted'], ['Deal Stage', 'Final Agreement'], ['Deal Value', '₹1.45 Cr'], ['Possession Date', '30/11/2025'], ['Offer Date', '14/07/2025'],
          ]} />
          <h3 style={{ marginTop: 64 }}>Deal Financials</h3>
          <KV w={[177, 250]} gap={13} left={[['Unit Area', '1500 sq.ft'], ['Deal Value', '₹1.45 Cr'], ['Payment Status', '70% Paid'], ['Balance Due', '₹43.5L'], ['Possession Date', '30/11/2025'], ['Payment Terms', 'As per final agreement']]} />
        </div>
        <div className="right">
          <h3>Buyer Information</h3>
          <KV w={[110, 250]} gap={13} left={[['Buyer Name', 'Rohan Verma'], ['Phone', '+91 98111 22334'], ['Email', 'rohan.verma@email.com'], ['Address', '402, Green Heights, Mumbai']]} />
          <h3 style={{ marginTop: 125 }}>Buyer Attorney Information</h3>
          <KV w={[60, 246]} gap={13} left={[['Name', 'Neha Kapoor'], ['Firm', 'Kapoor & Associates'], ['Phone', '+91 98760 11122'], ['Email', 'neha@kapoorlegal.com']]} />
        </div>
      </div>
    </DocShell>
  )
}

/* ---------------- Settings ---------------- */
const settings = [
  ['General', 'Basic information and system-wide preferences.'],
  ['User and Control', 'Manage users, roles, permissions, and access controls.'],
  ['Channels', 'Connect communication channels like email, phone, and chat.'],
  ['Customization', 'Personalize layouts, fields, modules, and branding.'],
  ['Automation', 'Create workflows, rules, and schedules to automate tasks.'],
  ['Process Management', 'Define and monitor sales and business processes.'],
  ['Data Administration', 'Import, export, and maintain your CRM data securely.'],
  ['Marketplace', 'Explore and install apps, integrations, and extensions.'],
  ['Developer Space', 'Access APIs, webhooks, and developer tools.'],
]

export function Settings() {
  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="set-grid">
        {settings.map(([t, d], i) => (
          <div key={t} className="card set-card">
            <img src={`img/s${Math.floor(i / 3)}${i % 3}.png`} alt="" style={i === 8 ? { width: 65, height: 65 } : undefined} />
            <h3 style={i === 8 ? { marginTop: 24 } : undefined}>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Dashboard panel ---------------- */
function Widget({ title, children, h }: { title: string; children: ReactNode; h: number }) {
  return (
    <div className="card chart-card" style={{ height: h, padding: '14px 22px' }}>
      <div className="card-title">{title}</div>
      <div className="kebab">
        <Dropdown style={{ left: 'auto', right: 0 }} trigger={() => <button aria-label="Widget menu"><Icon name="vmore" /></button>}>
          <button>Edit Widget</button>
          <button>Remove</button>
        </Dropdown>
      </div>
      {children}
    </div>
  )
}

export function Dashboard() {
  return (
    <div className="panel">
      <div style={{ display: 'grid', gap: 40 }}>
        <Widget title="Deals by Lead Source" h={410}><Donut className="fill" box="0 -10 535 334" /></Widget>
        <Widget title="Deals by Sales People by Development" h={224}><SalesBars className="fill" box="0 -8 535 196" /></Widget>
        <Widget title="Total Deals Closed" h={147}><ClosedBar /></Widget>
      </div>
      <div style={{ display: 'grid', gap: 40 }}>
        <Widget title="Deals by Stages by Development" h={410}><StageBars className="fill" box="0 -10 535 334" /></Widget>
        <Widget title="Deals in Pipeline by Development" h={411}><Pipeline /></Widget>
      </div>
    </div>
  )
}
