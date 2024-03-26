export const CONTACT_EMAIL = "hello@scorecast.com";
export const SITE_URL = "https://scorecast.com";

export interface NavLink {
  href: string;
  label: string;
}

export const MAIN_NAV: readonly NavLink[] = [
  { href: "/", label: "Product" },
  { href: "/dashboards", label: "TV dashboards" },
  { href: "/contests", label: "Contests" },
  { href: "/pricing", label: "Pricing" },
];

export interface FooterColumn {
  title: string;
  links: readonly NavLink[];
}

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: "Product",
    links: [
      { href: "/dashboards", label: "TV dashboards" },
      { href: "/dashboards#widgets", label: "Widget library" },
      { href: "/contests", label: "Contests" },
      { href: "/contests#badges", label: "Achievements" },
      { href: "/contests#alerts", label: "Notifications" },
      { href: "/demo", label: "Live demo" },
    ],
  },
  {
    title: "Teams",
    links: [
      { href: "/#teams", label: "Inside sales" },
      { href: "/#teams", label: "Field sales" },
      { href: "/#teams", label: "Customer support" },
      { href: "/#teams", label: "Contact centers" },
      { href: "/#connect", label: "Connectors" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: `mailto:${CONTACT_EMAIL}`, label: CONTACT_EMAIL },
      { href: "#", label: "Help center" },
      { href: "#", label: "API docs" },
      { href: "#", label: "Security" },
      { href: "#", label: "Careers" },
    ],
  },
];

export const LEGAL_LINKS: readonly NavLink[] = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "#", label: "DPA" },
];

export const CONNECTORS = [
  "Salesforce",
  "HubSpot",
  "Pipedrive",
  "Zoho CRM",
  "Close",
  "Zendesk",
  "Freshdesk",
  "Intercom",
  "Help Scout",
  "Gorgias",
  "Aircall",
  "RingCentral",
  "Dialpad",
  "Five9",
  "Talkdesk",
  "Stripe",
  "Shopify",
  "Google Sheets",
  "Microsoft Excel",
  "BigQuery",
  "Postgres",
  "Slack",
  "Microsoft Teams",
  "Zapier",
  "Webhooks",
  "REST API",
] as const;
