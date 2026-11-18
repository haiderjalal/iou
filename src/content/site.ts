/**
 * Organisation-wide content. Every fact here comes from IoU's current website (iupk.org).
 * Keep copy changes in this file so components stay presentation-only.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface Stat {
  value: number;
  /** Characters rendered after the number, e.g. "%" or "M". */
  suffix?: string;
  decimals?: number;
  label: string;
  source: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Approach {
  title: string;
  description: string;
  icon: "search" | "megaphone" | "messages" | "handshake";
}

export const SITE = {
  name: "Institute of Urbanism",
  shortName: "IoU",
  tagline: "Making Cities Green",
  description:
    "The Institute of Urbanism (IoU) is an Islamabad-based policy research institute and think tank working for nature-inclusive, just urban development in Pakistan through research, advocacy and citizen action.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://iupk.org",
  email: "info@iupk.org",
  location: "Islamabad, Pakistan",
  foundingDate: "2019-04",
  transparencyDocument: "/docs/iou-transparency.pdf",
} as const;

export const MISSION =
  "Ensure resource conservation, adopt innovative solutions, and build synergies amongst stakeholders for nature-centric and just urban development.";

export const VISION = "Nature inclusive urban settings.";

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Thematic Areas", href: "/thematic-areas" },
  { label: "Contact", href: "/contact" },
];

export const CREDIBILITY_POINTS: string[] = [
  "Born from the Reclaiming Green Islamabad movement",
  "Policy research institute & think tank",
  "Registered with SECP",
  "Evidence-led advocacy since 2019",
  "Citizen-driven, participatory governance",
  "Nature-centric & just urban development",
];

/** Context figures cited on IoU's thematic area pages. */
export const STATS: Stat[] = [
  {
    value: 3,
    suffix: "%",
    label: "Average urban growth rate — the fastest urbanising country in South Asia",
    source: "IoU, Redefining Urban Mobility",
  },
  {
    value: 43,
    suffix: "%",
    label: "Of smog-causing air pollutants in Punjab come from motorised road vehicles",
    source: "IoU, Redefining Urban Mobility",
  },
  {
    value: 48.5,
    suffix: "M",
    decimals: 1,
    label: "Tons of municipal solid waste produced in Pakistan every year",
    source: "International Trade Administration, 2019",
  },
  {
    value: 64,
    suffix: "%",
    label: "Of Pakistan's population is under the age of 30",
    source: "IoU, Eco-Entrepreneurship",
  },
];

export const MILESTONES: Milestone[] = [
  {
    year: "2015",
    title: "Reclaiming Green Islamabad",
    description:
      "A citizens' movement forms in response to rapid road-infrastructure expansion that cut old trees, shrank green and open spaces and worsened air quality.",
  },
  {
    year: "Since 2015",
    title: "Citizens take a stand",
    description:
      "RGI stages public demonstrations and files public-interest litigation, helping shelve infrastructure projects that conflicted with environmental conservation.",
  },
  {
    year: "April 2019",
    title: "Institute of Urbanism is founded",
    description:
      "To organise the social capital RGI created, IoU is established as a policy research institute that brings empirical evidence to urban governance.",
  },
  {
    year: "October 2024",
    title: "Registered with SECP",
    description:
      "IoU is formally registered with the Securities and Exchange Commission of Pakistan, strengthening its institutional footing.",
  },
];

export const APPROACHES: Approach[] = [
  {
    title: "Empirical research",
    description:
      "We generate evidence that puts urban environmental issues on the policy agenda and informs better planning decisions.",
    icon: "search",
  },
  {
    title: "Policy advocacy",
    description:
      "We work to influence policies and legislation so that urban development is inclusive and environment-centric.",
    icon: "megaphone",
  },
  {
    title: "Dialogue & awareness",
    description:
      "We convene citizens, media, academia, parliamentarians and youth to drive behavioural change and participatory governance.",
    icon: "messages",
  },
  {
    title: "Partnerships",
    description:
      "We build synergies with public and private sector actors to find, test and scale innovative, nature-centric solutions.",
    icon: "handshake",
  },
];
