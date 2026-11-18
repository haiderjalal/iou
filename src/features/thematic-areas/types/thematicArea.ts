import type { StaticImageData } from "next/image";

export interface ThematicArea {
  slug: string;
  /** Programme acronym used across IoU communications, e.g. "RUM". */
  code: string;
  title: string;
  summary: string;
  image: StaticImageData;
  imageAlt: string;
  keyFact: {
    value: string;
    label: string;
  };
  /** Background paragraphs explaining why the programme matters. */
  context: string[];
  /** What IoU aims to do under this programme. */
  objectives: string[];
}
