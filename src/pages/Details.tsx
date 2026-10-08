import type { ReactNode } from 'react'
import { Icon } from '../components/Icon'
import { Badge, Detail, Dropdown, KV, MiniTable, Section, SendEdit } from '../components/ui'
import { go } from '../router'
import { buildings } from './Lists'

const site = <a className="link" href="#/developments/1">www.sunriseenclave.com</a>
const Mail = ({ k = 'Email', v, sm }: { k?: string; v: ReactNode; sm?: boolean }) => (
  <div className={'sub' + (sm ? ' sm' : '')}><em style={sm ? { fontWeight: 600, color: 'var(--label)' } : undefined}>{k}:</em> {v}</div>
)
const Img = ({ src, w, h = w, round }: { src: string; w: number; h?: number; round?: boolean }) => (
  <img src={`img/${src}.png`} width={w} height={h} alt="" style={{ borderRadius: round ? '50%' : 6, objectFit: 'cover', flex: 'none' }} />
)
const TEAM = 'Direct and indirect communication information.'

/* ---------------- Development ---------------- */
export function DevelopmentDetail() {
  return (
    <Detail
      headH={154}
      related={['Notes', ['Buildings', 6], ['Units', 8], 'Deals', 'Activities', 'Attachments']}
      header={
        <>
          <Img src="dev_lg" w={155} h={115} />
          <div className="who" style={{ paddingTop: 12 }}>
            <h1>Sunrise Enclave</h1>
            <div className="sub" style={{ marginTop: 6 }}><em>Email:</em> sales@sunriseenclave.com</div>
            <div className="sub"><em>Website:</em> {site}</div>
          </div>
          <SendEdit
            extra={
              <Dropdown trigger={() => <button className="btn btn-soft" style={{ padding: '0 8px' }}>Stacking Plan <Icon name="caret" size={16} /></button>}>
                <a href="#/reports/stacking-plan">Stacking Plan Reports</a>
              </Dropdown>
            }
          />
        </>
      }
    >
      <Section title="Basic Details" sub="Key development highlights">
        <KV w={[390, 200]} gap={29} style={{ columnGap: 62 }} left={[
          ['Development Type', 'Villa'], ['Starting Price', 'Rs.1.25 Cr'], ['Development Website', site], ['Development Status', 'Active'], ['City', 'Bengaluru'],
        ]} />
      </Section>
      <Section title="Development Information" sub="Essential development details at a glance">
        <KV w={[213, 148]} gap={29} left={[
          ['Development Owner', 'Rohit Mehra'], ['Development Type', 'Villa'], ['Starting Price', 'Rs.1.25 Cr'], ['Phone', '+91-9854155264'], ['Development Website', site],
        ]} right={[['Development Name', 'Sunrise Enclave'], ['No.of Buildings', '6'], ['City', 'Bengaluru']]} />
      </Section>
      <Section title="Address Information" sub="Where the development is located">
        <KV w={[110, 337]} gap={29} left={[['Street', '102 Sunrise Avenue, Sarjapur Road'], ['State', 'Karnataka'], ['Country', 'India']]} right={[['City', 'Bengaluru'], ['Zip Code', '560035']]} />
      </Section>
    </Detail>
  )
}

/* ---------------- Building ---------------- */
export function BuildingDetail({ id }: { id: number }) {
  const b = buildings[id - 1] ?? buildings[0]
  return (
    <Detail
      headH={154}
      related={['Notes', ['Units', 3], 'Activities', 'Attachments']}
      header={
        <>
          <Img src={b.img === 'b_aster' ? 'b_aster_lg' : b.img} w={100} />
          <div className="who" style={{ paddingTop: 9 }}>
            <Dropdown
              style={{ width: 262, top: 'calc(100% + 4px)' }}
              trigger={(open) => <h1 style={{ cursor: 'pointer' }}>{b.name}<Icon name={open ? 'caretUp' : 'caret'} /></h1>}
            >
              {buildings.slice(0, 3).map((x, i) => (
                <button key={x.name} onClick={() => go(`/buildings/${i + 1}`)} style={x === b ? { background: '#f3f3f3' } : undefined}>
                  <b style={{ fontSize: 16, fontWeight: 600 }}>{x.name}</b>
                  <div className="bsub">Development: <span>{x.dev}</span></div>
                </button>
              ))}
            </Dropdown>
            <Mail k="Development" v={b.dev} sm />
            <Mail v={b.mail} sm />
          </div>
          <SendEdit />
        </>
      }
    >
      <Section title="Basic Details" sub="Key development highlights">
        <KV w={[397, 200]} gap={29} style={{ columnGap: 62 }} left={[
          ['Development Name', b.dev], ['No. of Floors', '4'], ['Development Website', site], ['Building Status', b.status], ['City', b.city],
        ]} />
      </Section>
      <Section title="Development Information" sub="Essential development details at a glance">
        <KV w={[225, 169]} gap={29} left={[
          ['Building Owner', 'Rohit Mehra'], ['Development Name', b.dev], ['Building Status', b.status], ['Development Website', site],
        ]} right={[['Building Name', b.name], ['No. of Floors', '6']]} />
      </Section>
      <Section title="Units" sub="Details of Units within the Building" style={{ paddingTop: 20 }}>
        <MiniTable tools bold widths={[137, 158, 136, 122, 100]}
          head={['', 'Development Name', 'Building Name', 'Unit Price', 'Status', 'Created Time']}
          rows={[
            [<div style={{ textAlign: 'center' }}>Unit A- 101<br />(3 BHK)</div>, 'Sunrise Enclave', b.name, 'Rs.1.45Cr', 'Active', '12/06/18'],
            [<div style={{ textAlign: 'center' }}>Unit A- 205<br />(2 BHK)</div>, 'Sunrise Enclave', b.name, 'Rs.98L', 'Active', '07/06/18'],
            [<div style={{ textAlign: 'center' }}>Unit A- 307<br />(4 BHK+Study)</div>, 'Sunrise Enclave', b.name, 'Rs.1.95Cr', 'Active', '07/06/18'],
          ]} />
      </Section>
    </Detail>
  )
}

/* ---------------- Unit ---------------- */
export function UnitDetail() {
  return (
    <Detail
      headH={122}
      related={['Notes', 'Deals Associate', 'Add-On Units Associated', 'Activities', 'Attachments']}
      tabsStyle={{ marginTop: 12 }}
      header={
        <>
          <Img src="u0_lg" w={82} />
          <div style={{ paddingTop: 0 }}>
            <h1 style={{ fontSize: 20 }}>Unit A- 101 (3 BHK)</h1>
            <Mail k="Building Name" v="Aster Tower" sm />
            <Mail k="Development Name" v="Sunrise Enclave" sm />
          </div>
          <div className="who"><Badge s="Active" style={{ width: 76, marginLeft: 0, marginTop: 8 }} /></div>
          <div className="actions" style={{ marginTop: 28 }}>
            <button className="btn btn-gold">Send Email</button>
            <button className="btn btn-soft">Edit</button>
          </div>
        </>
      }
    >
      <Section title="Basic Details" sub="Key development highlights">
        <KV w={[258, 200]} style={{ columnGap: 62 }} left={[
          ['Unit Name', 'Unit A-101'], ['Type', '3 BHK Flat'], ['Area', '1650 sqft'], ['Floor', '1st Floor'], ['Balconies', '2'], ['Bathrooms', '2'],
          ['Status', <Badge s="Active" sm />], ['Price', '₹1.45 Cr'], ['Facing', 'East'], ['Furnishing', 'Semi- Furnished'],
        ]} />
      </Section>
      <Section title="Building & Development Info" sub="Direct and indirect communication information.">
        <KV w={[258, 200]} style={{ columnGap: 62 }} left={[
          ['Building Name', 'Aster Tower'], ['Development Name', 'Sunrise Enclave'], ['City', 'Bengaluru'], ['No. of Floors in Building', '6'], ['Building Status', 'Available'],
          ['Development Website', <a href="#/developments/1" style={{ color: 'var(--gold)' }}>www.sunriseenclave.com</a>],
        ]} />
      </Section>
      <Section title="Assigned Broker / Sales Agent" sub={TEAM}>
        <KV w={[258, 200]} style={{ columnGap: 62 }} left={[['Name', 'Jessica Chen'], ['Role', 'Sales Executive'], ['Email', 'jessica.chen@urbanrealty.com'], ['Phone', '+91 98765 43210']]} />
      </Section>
    </Detail>
  )
}

/* ---------------- Lead ---------------- */
export function LeadDetail() {
  return (
    <Detail
      related={['Notes', 'Email', 'Social', 'Activities', 'Attachments']}
      header={
        <>
          <Img src="lead_john_lg" w={109} round />
          <div className="who" style={{ paddingTop: 9 }}>
            <h1>John Doe</h1>
            <div className="sub" style={{ marginTop: 3 }}><em style={{ color: 'var(--label)' }}>Email:</em> john@urbanrealty.com</div>
            <Badge s="Interested" sm style={{ width: 102, marginTop: 4 }} />
          </div>
          <SendEdit />
        </>
      }
    >
      <Section title="Basic Details" sub="Key development highlights">
        <KV left={[
          ['Lead Name', 'John Doe'], ['Mobile', '+91 98765 43210'], ['Email', 'john.doe@email.com'], ['Status', <Badge s="Interested" sm style={{ width: 102 }} />], ['Last Contacted', '10/02/2025'],
        ]} right={[['Lead Owner', 'Jessica Chen'], ['Lead Source', <>Referral from<br />Client</>]]} />
      </Section>
      <Section title="Address Information" sub={TEAM}>
        <KV w={[212, 214]} left={[['Street', '56 Auricht Road'], ['State', 'Karnataka'], ['Country', 'India']]} right={[['City', 'Bengaluru'], ['Zip Code', '560035']]} />
      </Section>
      <Section title="Requirement Detail" sub={TEAM}>
        <KV left={[['Property Type', 'Residential Apartment'], ['Budget', 'Rs.50L - Rs.1Cr'], ['Preferred Location', 'Begaluru'], ['Requirement Notes', 'Looking for 2BHK sea-facing flat']]} />
      </Section>
      <Section title="Visit Summary" sub={TEAM}>
        <KV w={[212, 144]} left={[['Days Visited', '-'], ['Number of Chats', '-'], ['First Visit', '-'], ['Next Task', 'Call schedule on 14/02/2025']]} right={[['Most recent Visit', '-'], ['Referrer', '-']]} />
      </Section>
    </Detail>
  )
}

/* ---------------- Company ---------------- */
const big = { fontSize: 20, fontWeight: 600, color: '#000' }
export function CompanyDetail() {
  return (
    <Detail
      headH={129}
      related={['Notes', 'Deals', 'Projects', 'Activities', 'Attachments']}
      tabsStyle={{ marginTop: 15 }}
      header={
        <>
          <Img src="c0_lg" w={61} round />
          <div className="who" style={{ paddingTop: 0 }}>
            <h1>Urban Build Group <Badge s="Active" sm style={{ marginLeft: 44, width: 76 }} /></h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'max-content max-content', columnGap: 16, marginTop: 6 }}>
              <Mail v="contact@urbanbuild.com" />
              <Mail k="Type" v="Developer" />
              <Mail k="Owner Name" v="Mohit Verma" />
              <Mail k="City" v="Bengaluru" />
            </div>
          </div>
          <SendEdit />
        </>
      }
    >
      <Section title="Basic Details" sub="Key development highlights">
        <KV w={[201, 182]} left={[['Company Name', 'Urban Build Group'], ['Type', 'Developer'], ['City', 'Bengaluru']]} right={[['Owner Name', 'Mohit Verma'], ['Status', <Badge s="Active" sm style={{ width: 76 }} />]]} />
      </Section>
      <Section title="Contact Information" sub="Essential communication details">
        <KV w={[201, 300]} left={[['Phone', '+91 98765 43210'], ['Email', 'contact@urbanbuild.com'], ['Website', 'www.urbanbuildgroup.com']]} />
      </Section>
      <Section title="Address Information" sub="Essential communication details">
        <KV w={[201, 151]} left={[['Address', '56 Auricht Road'], ['State', 'Karnataka'], ['Country', 'India']]} right={[['City', 'Bengaluru'], ['Zip Code', '560035']]} />
      </Section>
      <Section title="Deals Information" sub="Essential communication details">
        <div className="kv" style={{ gridTemplateColumns: '201px 42px max-content 1fr', rowGap: 26, columnGap: 36 }}>
          <div className="l" style={big}>Total Deals</div><div>21</div>
          <div className="l" style={big}>Deal Value Range</div><div className="nw">Rs.98L - Rs.2.95Cr</div>
          <div className="l" style={big}>Deal Types</div>
          <div className="nw" style={{ gridColumn: '2 / 5' }}>•&nbsp; Residential Sales &nbsp;•&nbsp; Commercial Lease &nbsp;•&nbsp; Land Acquisition</div>
          <div className="l" style={big}>Deal Status</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '146px 144px 151px 1fr', marginLeft: 91, marginTop: 6, fontSize: 17, lineHeight: '32px' }}>
          {['Open Deals', 'In progress', 'Closed Won', 'Closed Lost'].map((h) => <div key={h} style={{ color: 'var(--label)', fontWeight: 500 }}>{h}</div>)}
          {['8', '5', '6', '2'].map((v, i) => <div key={i}>{v}</div>)}
        </div>
      </Section>
      <Section title="Projects Information" sub="Essential communication details">
        <div className="kv" style={{ gridTemplateColumns: '201px 42px max-content 1fr', columnGap: 36, lineHeight: '34px' }}>
          <div className="l" style={big}>Total Deals</div><div>12</div>
          <div className="l" style={big}>Project Types</div><div>Villas- 5<br />Apartments- 4<br />Commercial Spaces- 3</div>
        </div>
      </Section>
    </Detail>
  )
}

/* ---------------- Contact ---------------- */
export function ContactDetail() {
  return (
    <Detail
      related={['Notes', ['Deals', 3], 'Activities', 'Attachments']}
      header={
        <>
          <div className="who" style={{ paddingLeft: 13, paddingTop: 0 }}>
            <h1 style={{ fontSize: 26 }}>John Doe</h1>
            <div className="sub"><em style={{ color: 'var(--label)' }}>Email:</em> john.doe@email.com</div>
            <Badge s="Active" sm style={{ width: 76, marginTop: 17 }} />
          </div>
          <SendEdit />
        </>
      }
    >
      <Section title="Basic Details" sub="Key development highlights">
        <KV w={[351, 200]} style={{ columnGap: 62 }} left={[['Contact Name', 'John Doe'], ['Role', 'Broker'], ['Status', <Badge s="Active" sm style={{ width: 76 }} />], ['Assigned To', 'Jessica Chen'], ['Created Date', '12/06/2024']]} />
      </Section>
      <Section title="Contact Information" sub={TEAM}>
        <KV w={[351, 300]} gap={29} left={[['Email', 'john.doe@email.com'], ['Phone Number', '+91 98765 43210'], ['Location/City', 'Bengaluru'], ['Preferred Contact Method', 'Email / Phone']]} />
      </Section>
      <Section title="Deals" sub="Associated transactions or deal stages with the contact." style={{ paddingTop: 16 }}>
        <div style={{ marginLeft: 22 }}>
          <MiniTable tools bold widths={[150, 155, 90, 121, 115]}
            head={['Deal Name', 'Development Name', 'Unit Type', 'Deal Value', 'Status', 'Follow-up Date']}
            rows={[
              ['Villa Purchase - Sunrise', 'Sunrise Enclave', '3 BHK Villa', 'Rs. 1.95 Cr', 'In Progress', '12 July 2025'],
              ['Apartment - Orchid', 'Orchid Heights', '2 BHK Flat', 'Rs. 98 L', 'Cold', '15 July 2025'],
              ['Aster Tower Penthouse', 'Aster Tower', '4 BHK Duplex', 'Rs. 2.5 Cr', 'Not Interested', '-'],
            ]} />
        </div>
      </Section>
    </Detail>
  )
}

/* ---------------- Deal ---------------- */
export function DealDetail() {
  return (
    <Detail
      headH={122}
      related={['Notes', 'Email', 'Stage History', 'Contact Roles', 'Invoices', 'Meetings', 'Activities', 'Attachments']}
      tabsStyle={{ marginTop: 12 }}
      header={
        <>
          <div className="who" style={{ paddingLeft: 13, paddingTop: 3 }}>
            <h1 style={{ fontSize: 26 }}>Sunrise Villa Sale &nbsp;- &nbsp;Jessica Chen</h1>
            <Badge s="Closed Won" sm style={{ width: 114, marginTop: 17 }} />
          </div>
          <div className="actions" style={{ marginTop: 26 }}>
            <Dropdown
              style={{ borderRadius: 8, left: 'auto', right: 0 }}
              trigger={(open) => <button className="btn btn-gold">Generate Offer Form <Icon name={open ? 'caretUp' : 'caret'} size={16} /></button>}
            >
              <a href="#/deals/offer-form">Generate Offer Form</a>
              <a href="#/deals/deal-sheet">Generate Deal Sheet</a>
            </Dropdown>
            <button className="btn btn-soft">Edit</button>
          </div>
        </>
      }
    >
      <Section title="Basic Details" sub="Key development highlights">
        <KV w={[261, 200]} style={{ columnGap: 62 }} left={[
          ['Deal Name', 'Sunrise Villa Sale'], ['Deal Owner', 'Jessica Chen'], ['Development', 'Sunrise Enclave'], ['Unit', 'Unit A-101 (3 BHK)'], ['Phone', '+91 98765 43210'],
          ['Email', 'john.doe@example.com'], ['Status', <Badge s="Closed Won" sm style={{ width: 114 }} />], ['Contact Person', 'John Doe'], ['Deal Stage', 'Offer Accepted'], ['Deal Value', '₹1.45 Cr'],
        ]} />
      </Section>
      <Section title="Stage History" sub={TEAM}>
        <div style={{ marginLeft: 169 }}>
          <MiniTable widths={[219, 203]} head={['Stage', 'Date', 'Updated By']} rows={[
            ['Initial Contact', '10/06/2025', 'Jessica Chen'], ['Qualified', '12/06/2025', 'Jessica Chen'], ['Site Visit Done', '16/06/2025', 'Jessica Chen'],
            ['Proposal Sent', '20/06/2025', 'Jessica Chen'], ['Offer Accepted', '25/06/2025', 'Jessica Chen'], ['Closed Won', '30/06/2025', 'Jessica Chen'],
          ]} />
        </div>
      </Section>
      <Section title="Contact Roles" sub="People involved in this deal.">
        <div style={{ marginLeft: 166 }}>
          <MiniTable widths={[118, 92, 223]} head={['Name', 'Role', 'Email', 'Phone']} rows={[
            ['John Doe', 'Buyer', 'john.doe@example.com', '+91 98765 43210'],
            ['Jessica Chen', 'Agent', 'jessica@urbanrealty.com', '+91 91234 56789'],
          ]} />
        </div>
      </Section>
    </Detail>
  )
}

/* ---------------- Attorney firm ---------------- */
export function AttorneyDetail() {
  return (
    <Detail
      headH={126}
      related={['Notes', 'Email', 'Assigned Matters', 'Originating Leads', 'Originating Matters', 'Activities', 'Attachments']}
      tabsStyle={{ marginTop: 14 }}
      header={
        <>
          <div className="who" style={{ paddingLeft: 12, paddingTop: 0 }}>
            <h1>Lex &amp; Co. Legal Partners <Badge s="Active" sm style={{ marginLeft: 70, width: 76 }} /></h1>
            <div className="sub sm" style={{ color: '#aaa' }}>Property Registration, Due Diligence</div>
            <div className="sub"><em style={{ color: 'var(--label)' }}>Email:</em> contact@lexcolegal.com</div>
          </div>
          <SendEdit />
        </>
      }
    >
      <Section title="Basic Details" sub="Key development highlights">
        <KV w={[263, 200]} style={{ columnGap: 62 }} left={[
          ['Firm Name', 'Lex & Co. Legal Partners'], ['Phone', '+91 98765 43210'], ['Email', 'contact@lexandco.com'], ['Status', <Badge s="Active" sm style={{ width: 76 }} />], ['City', 'Bengaluru'], ['Type of Service', 'Property Registration, Due Diligence'],
        ]} />
      </Section>
      <Section title="Assigned Developments" sub={TEAM} style={{ paddingTop: 22 }}>
        <div style={{ marginLeft: 93 }}>
          <MiniTable widths={[219, 124, 168]} head={['Development Name', 'City', 'No. of Buildings', 'Starting Price']} rows={[['Sunrise Enclave', 'Bengaluru', '6', 'Rs.1.25Cr'], ['Orchid Grove', 'Pune', '4', 'Rs.98L']]} />
        </div>
      </Section>
      <Section title="Assigned Units" sub={TEAM} style={{ paddingTop: 26 }}>
        <div style={{ marginLeft: 93 }}>
          <MiniTable widths={[138, 184, 112, 89]} head={['Unit ID', 'Development', 'Building Name', 'Status', 'Assigned Date']} rows={[
            [<>Unit A-101<br />(3BHK)</>, 'Sunrise Enclave', <>Aster<br />Tower</>, 'Sold', '12/06/2022'],
            [<>Unit B-205<br />(2BHK)</>, 'Orchid Grove', <>Tulip<br />Residency</>, 'Active', '18/07/2022'],
          ]} />
        </div>
      </Section>
      <Section title="Team Member" sub={TEAM}>
        <div style={{ marginLeft: 93, fontSize: 20, fontWeight: 600, lineHeight: '52px', color: '#000' }}>
          <div>Meera Sinha (Partner) - meera@lexco.in</div>
          <div>Arvind Jha (Sr. Associate) - arvind@lexco.in</div>
        </div>
      </Section>
      <Section title="Originating Leads" sub={TEAM}>
        <div style={{ marginLeft: 93 }}>
          <MiniTable widths={[152, 116, 126, 118]} head={['Lead Name', 'Source', 'Category', 'Status', 'Contact']} rows={[
            ['Rahul Verma', 'Referral', 'Buyer', 'Active', '+91 98765 12345'],
            ['Sneha Iyer', 'Website', 'Investor', 'In Progress', '+91 98234 45678'],
          ]} />
        </div>
      </Section>
    </Detail>
  )
}
