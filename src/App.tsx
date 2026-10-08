import { Navbar } from './components/Navbar'
import { AttorneyDetail, BuildingDetail, CompanyDetail, ContactDetail, DealDetail, DevelopmentDetail, LeadDetail, UnitDetail } from './pages/Details'
import Home from './pages/Home'
import { AttorneyFirms, Buildings, Companies, Contacts, Deals, Developments, Leads, Units } from './pages/Lists'
import { Activities, CreateChart, Dashboard, DealSheet, LeadsBySource, OfferForm, Reports, Settings, StackingPlan } from './pages/Other'
import { useRoute } from './router'

const pages: Record<string, () => React.JSX.Element> = {
  '/': Home,
  '/dashboard': Dashboard,
  '/settings': Settings,
  '/developments': Developments,
  '/buildings': Buildings,
  '/units': Units,
  '/leads': Leads,
  '/companies': Companies,
  '/contacts': Contacts,
  '/deals': Deals,
  '/deals/offer-form': OfferForm,
  '/deals/deal-sheet': DealSheet,
  '/activities': Activities,
  '/attorney-firms': AttorneyFirms,
  '/reports': Reports,
  '/reports/leads-by-source': LeadsBySource,
  '/reports/create-chart': CreateChart,
  '/reports/stacking-plan': StackingPlan,
}

// "/<section>/<id>" → detail page for that section.
const details: Record<string, (p: { id: number }) => React.JSX.Element> = {
  developments: DevelopmentDetail,
  buildings: BuildingDetail,
  units: UnitDetail,
  leads: LeadDetail,
  companies: CompanyDetail,
  contacts: ContactDetail,
  deals: DealDetail,
  'attorney-firms': AttorneyDetail,
}

export default function App() {
  const path = useRoute()
  const [, section, id] = path.split('/')
  const Page = pages[path]
  const DetailPage = details[section] as (typeof details)[string] | undefined
  return (
    <>
      <Navbar path={path} />
      {Page ? <Page /> : DetailPage && /^\d+$/.test(id) ? <DetailPage key={path} id={+id} /> : <Home />}
    </>
  )
}
