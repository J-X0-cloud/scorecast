export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatarIndex: number;
  size: "lg" | "sm";
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      "We used to read the numbers out at the 4 PM huddle. Now nobody waits for the huddle. The board changes, someone cheers, and the next three calls get dialed faster.",
    name: "Marisol V.",
    role: "Director of Inside Sales, Meadowline Insurance Partners",
    avatarIndex: 4,
    size: "lg",
  },
  {
    quote: "The five-star shout-outs did more for our CSAT conversation than a year of QA spreadsheets.",
    name: "Derek O.",
    role: "Support Operations Lead, Fernhill Outfitters",
    avatarIndex: 2,
    size: "sm",
  },
];
