import type { ReactNode } from 'react'
import { Icon } from '../components/Icon'
import { Badge, Filters, ListHeader, Pager, type FilterGroup } from '../components/ui'
import { go } from '../router'

type Col<R> = { label: ReactNode; w?: number | string; cell: (r: R) => ReactNode }
type ListConfig<R> = {
  title: string
  create: string
  search?: string
  filterSearch?: string
  filters: FilterGroup[]
  cols: Col<R>[]
  rows: R[]
  cellPad?: string
  rowH?: number
}

function ListPage<R>({ base, c }: { base: string; c: ListConfig<R> }) {
  return (
    <div className="split">
      <Filters search={c.filterSearch} groups={c.filters} />
      <main className="main">
        <ListHeader title={c.title} create={c.create} search={c.search} />
        <div className="list-body">
          <table className="dtable">
            <thead>
              <tr>{c.cols.map((col, i) => <th key={i} style={{ width: col.w }}>{col.label}</th>)}</tr>
            </thead>
            <tbody>
              {c.rows.map((r, i) => (
                <tr key={i} onClick={() => go(`${base}/${i + 1}`)}>
                  {c.cols.map((col, j) => <td key={j} style={c.cellPad ? { padding: c.cellPad, paddingLeft: j ? undefined : 17, height: c.rowH } : undefined}>{col.cell(r)}</td>)}
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

const cities = ['Bengaluru', 'Mumbai', 'Delhi', 'Pune', 'Hyderabad', 'Chennai']
const Muted = ({ k, v }: { k: string; v: ReactNode }) => <div className="sub"><em>{k}:</em> {v}</div>
const Thumb = ({ src, size, name, children }: { src: string; size: number; name: ReactNode; children?: ReactNode }) => (
  <div className="name-cell">
    <img src={`img/${src}.png`} width={size} height={size} alt="" />
    <div>{name}{children}</div>
  </div>
)

/* ---------------- Developments ---------------- */
type Dev = { name: string }
export const Developments = () => (
  <ListPage<Dev>
    base="/developments"
    c={{
      title: 'Developments',
      create: 'Create Development',
      filterSearch: 'Search by Development Name',
      filters: [
        { title: 'City', options: cities },
        { title: 'Type', options: ['Apartment', 'Villa', 'House', 'Studio', 'Penthouse'] },
        { title: 'Attorney Firm', options: ['Lex & Co. Legal Partners', 'Urban Law Associates', 'Prime Legal Group'] },
        { title: 'No. of Buildings', options: ['1-5', '6-10', '11-20', '20+'] },
        { title: 'Starting Price', options: ['Below Rs.50L', 'Rs.50L-Rs.1Cr', 'Rs.1Cr-Rs.2Cr', 'Rs.2Cr- Rs.5Cr', 'Above Rs.5Cr'] },
      ],
      cellPad: '24px 8px 24px',
      rows: Array(5).fill({ name: 'Sunrise Enclave' }),
      cols: [
        {
          label: 'Name', w: 449,
          cell: (r) => (
            <Thumb src="dev" size={100} name={<b>{r.name}</b>}>
              <div className="sub" style={{ marginTop: 20, color: '#aaa', lineHeight: '25px' }}>
                Email: sales@sunriseenclave.com<br />Website: <a className="link" href="#/developments/1">www.sunriseenclave.com</a>
              </div>
            </Thumb>
          ),
        },
        { label: 'Type', w: 85, cell: () => 'Villa' },
        { label: 'City', w: 100, cell: () => 'Bengaluru' },
        { label: <div style={{ textAlign: 'center' }}>Attorney Firms<br />Name</div>, w: 150, cell: () => <div style={{ textAlign: 'center' }}>Lex &amp; Co. Legal<br />Partners</div> },
        { label: <div style={{ textAlign: 'center' }}>No. of<br />Buildings</div>, w: 115, cell: () => <div style={{ textAlign: 'center' }}>6</div> },
        { label: <span style={{ paddingLeft: 10 }}>Starting Price</span>, cell: () => <span style={{ paddingLeft: 10 }}>Rs.1.25 Cr</span> },
      ],
    }}
  />
)

/* ---------------- Buildings ---------------- */
export const buildings = [
  { name: 'Aster Tower', img: 'b_aster', dev: 'Sunrise Enclave', mail: 'sales@sunriseenclave.com', city: 'Bengaluru', status: 'Available', units: 20, sold: 15 },
  { name: 'Orchid Heights', img: 'b_orchid', dev: 'Sunrise Enclave', mail: 'sales@sunriseenclave.com', city: 'Bengaluru', status: 'Selling Fast', units: 25, sold: 10 },
  { name: 'Maple Residency', img: 'b_maple', dev: 'Sunrise Enclave', mail: 'sales@sunriseenclave.com', city: 'Bengaluru', status: 'Ready to Move', units: 30, sold: 30 },
  { name: 'Palm Grove Towers', img: 'b_palm', dev: 'Green Valley Estates', mail: 'sales@greenvalleyestates.com', city: 'Mumbai', status: 'Few Units Left', units: 28, sold: 20 },
  { name: 'Ocean View Residences', img: 'b_ocean', dev: 'Green Valley Estates', mail: 'sales@greenvalleyestates.com', city: 'Mumbai', status: 'Available', units: 30, sold: 24 },
]
export const Buildings = () => (
  <ListPage<(typeof buildings)[number]>
    base="/buildings"
    c={{
      title: 'Buildings',
      create: 'Create Buildings',
      filterSearch: 'Search by Building Name',
      filters: [
        { title: 'Development', options: ['Sunrise Enclave', 'Garden Heights', 'Lakeview Estate', 'Harmony Valley', 'Ocean View Residency'] },
        { title: 'Status', options: ['Available', 'Sold Out', 'Ready to Move', 'Under Construction', 'On Hold'] },
        { title: 'City', options: ['Bengaluru', 'Hyderabad', 'Pune', 'Mumbai'] },
        { title: 'No. of Units', options: ['0-10', '11-20', '21-30', '31+'] },
      ],
      cellPad: '24px 8px 24px',
      rows: buildings,
      cols: [
        { label: 'Building Name', w: 405, cell: (r) => <Thumb src={r.img} size={100} name={<b>{r.name}</b>}><Muted k="Email" v={r.mail} /></Thumb> },
        { label: 'Development Name', w: 214, cell: (r) => r.dev },
        { label: 'City', w: 131, cell: (r) => r.city },
        { label: 'Status', w: 138, cell: (r) => r.status },
        { label: 'Units', w: 98, cell: (r) => r.units },
        { label: 'Sold', cell: (r) => r.sold },
      ],
    }}
  />
)

/* ---------------- Units ---------------- */
const units = [
  ['Unit A- 101 (3 BHK)', 'Aster Tower', 'Sunrise Enclave', 'Flat', 'Active', '₹1.45 Cr'],
  ['Unit A- 205 (2 BHK)', 'Aster Tower', 'Sunrise Enclave', 'Flat', 'Sold', '₹98L'],
  ['Unit B- 307 (4 BHK)', 'Aster Tower', 'Sunrise Enclave', 'Duplex', 'Active', '₹1.95 Cr'],
  ['Unit B- 104 (2 BHK)', 'Lotus Crest', 'Sunrise Enclave', 'Flat', 'Active', '₹1.10Cr'],
  ['Unit C- 402 (3 BHK)', 'Orchid Heights', 'Eden Greens', 'Flat', 'Booked', '₹1.35Cr'],
  ['Unit C- 202 (1 BHK)', 'Orchid Heights', 'Eden Greens', 'Studio', 'Sold', '₹45L'],
]
export const Units = () => (
  <ListPage<string[]>
    base="/units"
    c={{
      title: 'All Units',
      create: 'Create Units',
      search: 'Search Unit',
      filters: [
        { title: 'Development', options: ['Sunrise Enclave', 'Green Heights', 'Ocean Pearl', 'Eden Greens'] },
        { title: 'Building', options: ['Aster Tower', 'Orchid Heights', 'Lotus Crest'] },
        { title: 'Status', options: ['Active', 'Sold', 'Booked', 'Under Construction', 'Ready to Move'] },
        { title: 'Unit Type', options: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Penthouse', 'Studio'] },
        { title: 'Area Range (sqft)', options: ['0–1000', '1001–1500', '1501–2000', '2001–2500', '2500+'] },
        { title: 'Price Range', options: ['< ₹50L', '₹50L – ₹1Cr', '₹1Cr – ₹2Cr', '₹2Cr – ₹3Cr', '₹3Cr+'] },
        { title: 'Facing', options: ['East', 'West', 'North', 'South'] },
      ],
      cellPad: '20px 8px 19px',
      rows: units,
      cols: [
        { label: 'Unit Name', w: 321, cell: (r) => <Thumb src={'u' + units.indexOf(r)} size={82} name={<b style={{ display: 'block', width: 120, marginLeft: 18 }}>{r[0]}</b>} /> },
        { label: 'Building', w: 148, cell: (r) => <div style={{ paddingTop: 8 }}>{r[1]}</div> },
        { label: 'Development', w: 198, cell: (r) => <div style={{ paddingTop: 8 }}>{r[2]}</div> },
        { label: 'Type', w: 121, cell: (r) => <div style={{ paddingTop: 8 }}>{r[3]}</div> },
        { label: 'Status', w: 160, cell: (r) => <div style={{ paddingTop: 6 }}><Badge s={r[4]} /></div> },
        { label: 'Price', cell: (r) => <div style={{ paddingTop: 6, fontSize: 11 }}>{r[5]}</div> },
      ],
    }}
  />
)

/* ---------------- Leads (card list, not a table) ---------------- */
export function Leads() {
  return (
    <div className="split">
      <Filters
        search="Search by Lead Name"
        groups={[
          { title: 'Lead Source', options: ['Website Referral from Client', 'Social Media', 'Walk-in', 'Cold Call', 'Campaign', 'Event'] },
          { title: 'Lead Status', options: ['Active', 'In Progress', 'Converted', 'Cold', 'Not Interested'] },
          { title: 'Lead Category', options: ['Corporate', 'Individual', 'Investor', 'Agent', 'Other'] },
          { title: 'Lead Owner', options: ['Jessica Chen', 'Evan Chris', 'Jack B.', 'Emily Paris'] },
        ]}
      />
      <main className="main">
        <ListHeader title="Leads" create="Create Lead" search="Search Lead" />
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="lead-row" onClick={() => go(`/leads/${i + 1}`)}>
            <img className="avatar" src="img/lead_john.png" width={82} height={82} alt="" />
            <div>
              <b>John Doe</b>
              <div className="sub" style={{ marginTop: 5 }}><em style={{ color: 'var(--label)' }}>Email:</em> john@urbanrealty.com</div>
              <div className="meta">
                <div>Lead Source:<span style={{ color: 'var(--label)' }}>Referral from Client</span></div>
                <div>Lead Status:<span style={{ color: 'var(--label)' }}>Interested</span></div>
                <div>Lead Category:<span style={{ color: 'var(--label)' }}>Corporate</span></div>
                <div>Lead Owner:<span style={{ color: 'var(--label)' }}>Jessica Chen</span></div>
              </div>
            </div>
            <button className="x" onClick={(e) => e.stopPropagation()} aria-label="Remove lead"><Icon name="close" /></button>
          </div>
        ))}
        <Pager />
      </main>
    </div>
  )
}

/* ---------------- Companies ---------------- */
const companies = [
  ['Urban Build Group', 'Developer', 12, 'Bengaluru', 'Active', 'Mohit Verma'],
  ['SkyHigh Realtors', 'Brokerage Firm', 7, 'Mumbai', 'Active', 'Ravi Patel'],
  ['Blue Line Constructions', 'Contractor', 5, 'Pune', 'In Progress', 'Mohit Mehra'],
  ['Vision Infra Pvt Ltd', 'Developer', 9, 'Hyderabad', 'Active', 'Shruti Reddy'],
  ['Nest Edge Associates', 'Consultant', 3, 'Delhi', 'Inactive', 'Kunal Verma'],
  ['Prime Realty Solutions', 'Brokerage Firm', 6, 'Chennai', 'Active', 'Arjun Malhotra'],
  ['West Side Developers', 'Developer', 10, 'Ahmedabad', 'Active', 'Neha Desai'],
  ['SkyHigh Realtors', 'Brokerage Firm', 7, 'Bengaluru', 'Active', 'Mohit Verma'],
  ['SkyHigh Realtors', 'Brokerage Firm', 7, 'Bengaluru', 'Active', 'Mohit Verma'],
] as const
type Company = (typeof companies)[number]
export const Companies = () => (
  <ListPage<Company>
    base="/companies"
    c={{
      title: 'All Companies',
      create: 'Create Company',
      search: 'Search Company',
      filters: [
        { title: 'Company Type', options: ['Developer', 'Contractor', 'Brokerage Firm', 'Consultant', 'Legal Partner', 'Marketing Agency'] },
        { title: 'City', options: [...cities.slice(0, 6), 'Ahmedabad'] },
        { title: 'Owner Name', options: ['Mohit Verma', 'Arjun Malhotra', 'Mohit Mehra', 'Shruti Reddy', 'Neha Desai'] },
        { title: 'Number of Projects', options: ['0-5', '6-10', '11-20', '21+'] },
      ],
      cellPad: '23px 8px 25px',
      rows: [...companies],
      cols: [
        { label: 'Company Name', w: 342, cell: (r) => <div style={{ margin: '-9px 0 -12px 2px' }}><Thumb src={'c' + companies.indexOf(r)} size={45} name={<b style={{ marginLeft: -8 }}>{r[0]}</b>} /></div> },
        { label: 'Type', w: 148, cell: (r) => r[1] },
        { label: 'No. of Projects', w: 161, cell: (r) => r[2] },
        { label: 'City', w: 127, cell: (r) => r[3] },
        { label: 'Status', w: 143, cell: (r) => <Badge s={r[4]} style={{ marginTop: -3 }} /> },
        { label: 'Owner Name', cell: (r) => r[5] },
      ],
    }}
  />
)

/* ---------------- Contacts ---------------- */
const contacts = [
  ['John Doe', 'Broker', 'Active'],
  ['Ananya Verma', 'Buyer', 'In Progress'],
  ['Ravi Kapoor', 'Developer', 'Cold'],
  ['Emily Mehra', 'Buyer', 'Converted'],
  ['John Doe', 'Seller', 'Not Interested'],
  ['Ananya Verma', 'Buyer', 'Active'],
  ['Ravi Kapoor', 'Investor', 'Active'],
  ['Emily Mehra', 'Broker', 'Active'],
]
export const Contacts = () => (
  <ListPage<string[]>
    base="/contacts"
    c={{
      title: 'All Contacts',
      create: 'Create Contact',
      search: 'Search Contact',
      filterSearch: 'Search by Contact Name',
      filters: [
        { title: 'Status', options: ['Active', 'In Progress', 'Converted', 'Cold', 'Not Interested'] },
        { title: 'Role', options: ['Buyer', 'Seller', 'Investor', 'Broker'] },
        { title: 'Assigned To', options: ['Jessica', 'Mohit', 'Arjun', 'Emily'] },
        { title: 'City', options: ['Bengaluru', 'Pune', 'Mumbai', 'Hyderbad', 'Delhi'] },
        { title: 'Lead Source', options: ['Website Form', 'Referral', 'Facebook Ads', 'Walk-In', 'Email Campaign'] },
      ],
      cellPad: '26px 8px 25px',
      rows: contacts,
      cols: [
        { label: 'Contact Name', w: 290, cell: (r) => <div style={{ marginTop: -7 }}><b style={{ fontSize: 16, fontWeight: 600 }}>{r[0]}</b><div className="sub" style={{ marginTop: 5 }}><em style={{ color: 'var(--label)', fontWeight: 600 }}>Email:</em> john@urbanrealty.com</div></div> },
        { label: 'Company', w: 130, cell: () => 'Urban Realty' },
        { label: 'Role', w: 93, cell: (r) => r[1] },
        { label: 'Phone No.', w: 150, cell: () => '+91 9411521487' },
        { label: 'Deal Stage', w: 130, cell: () => 'Negotiation' },
        { label: 'Status', w: 148, cell: (r) => <Badge s={r[2]} style={{ marginTop: -5 }} /> },
        { label: 'Assigned to', cell: () => 'Jessica Chen' },
      ],
    }}
  />
)

/* ---------------- Deals ---------------- */
const deals = [
  ['Sunrise Villa Sale', 'Jessica Chen', 'Sunrise Enclave', 'Unit A-101\n(3 BHK)', 'Closed Won', '₹1.45Cr'],
  ['Lotus Crest B2 Booking', 'Arjun Rao', 'Lotus Crest', 'Unit B2-205\n(2 BHK)', 'In Progress', '₹98L'],
  ['Orchid Heights Lease', 'Priya Nair', 'Orchid Heights', 'Unit A-307', 'Closed Lost', '₹1.95Cr'],
  ['Orion Tech Park Deal', 'Sunil Mehta', 'Orion Tech Square', 'Unit T1-504', 'Open', '₹2.20Cr'],
  ['Palm Greens Penthouse Sale', 'Jessica Chen', 'Palm Greens', 'Unit PH-01', 'Closed Lost', '₹2.00Cr'],
  ['Sunrise Enclave- Duplex', 'Arjun Rao', 'Sunrise Enclave', 'Unit D-208', 'Closed Won', '₹1.85Cr'],
  ['Lotus Crest A3 Sale', 'Priya Nair', 'Lotus Crest', 'Unit A3-109', 'Closed Won', '₹1.10Cr'],
  ['Orchid Heights Corner Flat', 'Sunil Mehta', 'Orchid Heights', 'Unit C-312', 'Closed Won', '₹1.25Cr'],
  ['Sunrise Villa Sale', 'Jessica Chen', 'Sunrise Enclave', 'Unit A-101\n(3 BHK)', 'Closed Won', '₹1.45Cr'],
  ['Sunrise Villa Sale', 'Jessica Chen', 'Sunrise Enclave', 'Unit A-101\n(3 BHK)', 'Closed Lost', '₹1.45Cr'],
]
export const Deals = () => (
  <ListPage<string[]>
    base="/deals"
    c={{
      title: 'All Deals',
      create: 'Create Deals',
      search: 'Search Deal',
      filters: [
        { title: 'Deal Owner', options: ['Jessica Chen', 'Arjun Rao', 'Priya Nair', 'Sunil Mehta'] },
        { title: 'Status', options: ['Open', 'In Progress', 'Closed Won', 'Closed Lost', 'On Hold'] },
        { title: 'Developments', options: ['Sunrise Enclave', 'Palm Greens', 'Orion Tech Square', 'Orchid Heights', 'Lotus Crest'] },
        { title: 'Unit Name', options: ['A-101 (3 BHK)', 'B2-205 (2 BHK)', 'PH-01 (Penthouse)', 'T1-504 (Commercial)'] },
        { title: 'Deal Value', range: ['₹50L', '₹3Cr'] },
      ],
      cellPad: '25px 8px 0',
      rowH: 74,
      rows: deals,
      cols: [
        { label: 'Deal Name', w: 344, cell: (r) => <b style={{ fontSize: 16, fontWeight: 600, position: 'relative', top: -2 }}>{r[0]}</b> },
        { label: 'Deal Owner', w: 145, cell: (r) => r[1] },
        { label: 'Development', w: 168, cell: (r) => r[2] },
        { label: 'Unit', w: 131, cell: (r) => <div style={{ whiteSpace: 'pre-line' }}>{r[3]}</div> },
        { label: 'Status', w: 156, cell: (r) => <Badge s={r[4]} style={{ marginTop: -5 }} /> },
        { label: 'Deal Value', cell: (r) => r[5] },
      ],
    }}
  />
)

/* ---------------- Attorney Firms ---------------- */
const firms = [
  ['Lex & Co. Legal Partners', 'contact@lexcolegal.com', '+91 99888 11223', 'Bengaluru', 'Active'],
  ['Juris Edge Associates', 'info@jurisedge.in', '+91 93412 44456', 'Mumbai', 'Active'],
  ['Civic Law Chambers', 'support@civiclawchambers.com', '+91 93412 44456', 'Delhi', 'Inactive'],
  ['Trust Legal Advisory', 'contact@trustlegaladvisory.com', '+91 93412 44456', 'Pune', 'Active'],
  ['Prime Advocates LLP', 'hello@primeadvocates.in', '+91 93412 44456', 'Hyderabad', 'Inactive'],
  ['Metro Law Group', 'office@metrolawgroup.com', '+91 93412 44456', 'Chennai', 'Active'],
  ['Estate Law Solutions', 'estate@lawsolutions.in', '+91 93412 44456', 'Ahmedabad', 'Active'],
  ['Lex & Co. Legal Partners', 'contact@lexcolegal.com', '+91 99888 11223', 'Bengaluru', 'Active'],
  ['Juris Edge Associates', 'info@jurisedge.in', '+91 93412 44456', 'Mumbai', 'Active'],
  ['Prime Advocates LLP', 'hello@primeadvocates.in', '+91 93412 44456', 'Hyderabad', 'Inactive'],
]
export const AttorneyFirms = () => (
  <ListPage<string[]>
    base="/attorney-firms"
    c={{
      title: 'Attorney Firm',
      create: 'Create Attorney Firm',
      search: 'Search Attorney Firm',
      filters: [
        { title: 'City', options: [...cities.slice(0, 6), 'Ahmedabad'] },
        { title: 'Status', options: ['Active', 'Inactive'] },
        { title: 'Assigned Developments', options: ['Sunrise Enclave', 'Green Meadows', 'Orchid Grove', 'Vista Heights', 'Other'] },
        { title: 'Type of Service', options: ['Property Registration', 'Legal Verification', 'Title Due Diligence', 'Agreement Drafting', 'RERA Consultation'] },
        { title: 'No. of Clients Handled', options: ['0-5', '6-10', '11-20', '21+'] },
      ],
      cellPad: '19px 8px 19px',
      rows: firms,
      cols: [
        { label: 'Firm Name', w: 344, cell: (r) => <b style={{ fontWeight: 600 }}>{r[0]}</b> },
        { label: 'Email', w: 267, cell: (r) => <span style={{ fontSize: 12 }}>{r[1]}</span> },
        { label: 'Phone No.', w: 179, cell: (r) => <span style={{ fontSize: 12 }}>{r[2]}</span> },
        { label: 'City', w: 125, cell: (r) => <span style={{ fontSize: 12 }}>{r[3]}</span> },
        { label: 'Status', cell: (r) => <Badge s={r[4]} sm /> },
      ],
    }}
  />
)
