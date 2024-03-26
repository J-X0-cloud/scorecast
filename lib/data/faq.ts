export interface FaqItem {
  question: string;
  answer: string;
}

export const PRODUCT_FAQ: readonly FaqItem[] = [
  {
    question: "Do the people watching the TV need a license?",
    answer:
      "No. You pay for tracked users, the people whose numbers appear on a board. Managers, viewers and TV screens are free and unlimited on every plan.",
  },
  {
    question: "How live is live?",
    answer:
      "Webhook-based connectors like helpdesks, phone systems and Stripe update within seconds. Polling connectors refresh every minute, and the REST API pushes events the moment you send them.",
  },
  {
    question: "Can we build KPIs that aren't in our CRM?",
    answer:
      "Yes. Custom KPIs combine fields from any connected source with a spreadsheet-style formula editor: ratios, filtered counts, weighted scores and rolling averages.",
  },
  {
    question: "Will a leaderboard demotivate the bottom half?",
    answer:
      "It can if it only ranks totals. Scorecast lets you rank by progress-to-own-target, split boards by tenure or role, and keep coaching views private to the rep and their manager.",
  },
  {
    question: "What screens does TV mode work on?",
    answer:
      "Anything with a modern browser: smart TVs, streaming sticks, a mini PC behind the screen or a spare laptop. Each screen gets a private link and can rotate through a playlist of boards.",
  },
];

export const BILLING_FAQ: readonly FaqItem[] = [
  {
    question: "What counts as a tracked user?",
    answer:
      "Anyone whose activity is measured on a board: a rep, an agent, a closer. Admins, managers who aren't tracked, viewers and TV screens never cost anything.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, 14 days of the Floor plan with no card required. Your boards and connectors carry over when you pick a plan.",
  },
  {
    question: "Can we pay monthly?",
    answer: "Yes. Monthly billing is 20% more than the annual price and you can switch to annual at any time.",
  },
  {
    question: "Do you offer discounts for nonprofits or schools?",
    answer: "We do. Email us with a little about your team and we'll set you up.",
  },
];
