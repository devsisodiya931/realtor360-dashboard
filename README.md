# Realtor360

A TypeScript-based frontend implementation of the Realtor360 real-estate management dashboard, developed from the provided Figma prototype.

The project focuses on closely reproducing the reference design with reusable React components, custom CSS styling, dashboard visualizations, list/detail screens, forms, reports, and interactive frontend navigation.

---

## 🔗 Design Reference

**Figma Prototype:**  
https://www.figma.com/proto/w3ZJn4OeQVLudyC0jOzOYW/Realtor360?node-id=2-6286&t=riEfivcfVBTSxep3-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A6286
---

## 🚀 Tech Stack

- React 19
- TypeScript
- Vite
- HTML5
- CSS3
- SVG
- React Hooks

### Styling

The interface is implemented using custom CSS with reusable design tokens and component-specific styling.

No external UI framework is used.

### Charts

Dashboard charts and visualizations are implemented using SVG-based React components.

---

## ✨ Features

### Dashboard

- KPI summary cards
- Active listings overview
- Active leads overview
- Closed deals statistics
- Revenue overview
- Lead source visualization
- Sales overview
- Pipeline visualization
- Closed deals chart
- Reminders
- Calendar
- Schedule
- Active listings table
- Lead and contact section

### Property Management

- Developments
- Buildings
- Units
- List and detail views
- Property-related information sections
- Interactive navigation between records

### Lead & Contact Management

- Leads
- Contacts
- Companies
- Attorney Firms
- List and detail screens
- Lead/contact information views

### Deal Management

- Deals
- Deal detail view
- Offer Form
- Deal Sheet

### Activities

- Customer activities
- Open deals
- Leads & contacts
- Other activities

### Reports

- Reports overview
- Leads by Source
- Report grid
- Chart builder
- Chart preview
- Stacking Plan

### Settings

- User settings interface
- Account menu
- Navigation to settings

---

## 🧭 Application Routes

| Route | Screen |
| --- | --- |
| `#/` | Home dashboard |
| `#/dashboard` | Dashboard panel |
| `#/developments` | Development list |
| `#/developments/1` | Development detail |
| `#/reports/stacking-plan` | Stacking Plan |
| `#/buildings` | Building list |
| `#/buildings/1` | Building detail |
| `#/units` | Unit list |
| `#/units/1` | Unit detail |
| `#/leads` | Lead list |
| `#/leads/1` | Lead detail |
| `#/companies` | Company list |
| `#/companies/1` | Company detail |
| `#/contacts` | Contact list |
| `#/contacts/1` | Contact detail |
| `#/deals` | Deal list |
| `#/deals/1` | Deal detail |
| `#/deals/offer-form` | Offer Form |
| `#/deals/deal-sheet` | Deal Sheet |
| `#/activities` | Activities |
| `#/attorney-firms` | Attorney Firm list |
| `#/attorney-firms/1` | Attorney Firm detail |
| `#/reports` | Reports |
| `#/reports/leads-by-source` | Leads by Source |
| `#/reports/create-chart` | Chart Builder |
| `#/settings` | Settings |

---

## 🖱️ Interactive Elements

The frontend includes several interactive UI elements, including:

- Navigation between application sections
- List-to-detail navigation
- Tabs
- Filters
- Dropdown menus
- Pagination controls
- Calendar month navigation
- Starred report interactions
- User account menu
- Chart type selection and preview
- Form interactions
- Detail page navigation

The application currently uses static frontend data for the displayed records and dashboard information.

---

## 📁 Project Structure

```text
Realtor360/
│
├── public/
│   ├── favicon.png
│   └── img/
│       ├── Property images
│       ├── User avatars
│       ├── Company images
│       ├── Dashboard assets
│       └── Other visual assets
│
├── src/
│   ├── components/
│   │   ├── Charts.tsx
│   │   ├── Icon.tsx
│   │   ├── Navbar.tsx
│   │   └── ui.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Lists.tsx
│   │   ├── Details.tsx
│   │   └── Other.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── router.ts
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── .gitignore
├── .oxlintrc.json
└── README.md