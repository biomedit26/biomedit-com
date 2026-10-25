// Legal-approved footnote copy, shared so the numbered footnotes on the
// Products, Platform, and Pipeline pages and the "Referenced Footnotes" list
// on the Legal page can never drift apart. Numbers match legal's review list.
export interface Footnote {
  n: number;
  html: string;
}

export const footnotes: Record<1 | 2 | 3, Footnote> = {
  1: {
    n: 1,
    html: 'USDA has issued a conditional license for the product CPerf LLV* in accordance with regulation 9 CFR 102.6.',
  },
  2: {
    n: 2,
    html: 'Pipeline candidates (BE-105, BE-122) are experimental products in research, have not been approved by the FDA or USDA, and are not available for commercial sale. Pipeline information is subject to change as technical, clinical, and regulatory evaluations evolve.',
  },
  3: {
    n: 3,
    html: 'Pipeline candidates in Stages 1-3 are investigational products. These products have not been approved by the FDA or USDA and are not available for commercial sale. Research and development timelines, regulatory pathways, and other pipeline information are subject to change as technical, clinical, and regulatory evaluations evolve.',
  },
};
