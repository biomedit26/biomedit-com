// Legal-approved footnote copy, shared so the numbered footnotes on the
// Products, Platform, and Pipeline pages and the "Referenced Footnotes" list
// on the Legal page can never drift apart. Numbers match legal's review list.
export interface Footnote {
  n: number;
  html: string;
}

export const footnotes: Record<1 | 2 | 3 | 4 | 5, Footnote> = {
  1: {
    n: 1,
    html: 'The first-of-its-kind engineered bacterial biologic for poultry to receive USDA conditional licensure. Regulatory Status Disclaimer: This product candidate has received USDA conditional licensure, having demonstrated safety, purity, and a reasonable expectation of efficacy under USDA Center for Veterinary Biologics guidelines. Full efficacy studies are ongoing to support full product licensure. Product availability and distribution are subject to applicable federal and state regulatory requirements.',
  },
  2: {
    n: 2,
    html: 'Regulatory Notice: CPerf LLV* has demonstrated safety, purity, and a reasonable expectation of efficacy under USDA Center for Veterinary Biologics guidelines for conditional licensure. Full efficacy studies are ongoing to support full product licensure. Product availability and distribution are subject to applicable federal and state regulatory requirements.',
  },
  3: {
    n: 3,
    html: 'Investigational pipeline candidates (BE-105, BE-122) are experimental products in development, have not been approved by the FDA or USDA, and are not available for commercial sale. Pipeline information is subject to change without notice.',
  },
  4: {
    n: 4,
    html: 'BiomElix&reg; One is approved by MAPA for use in Brazil. Regulatory approvals vary by country, and product claims or availability are subject to local regulatory requirements.',
  },
  5: {
    n: 5,
    html: 'Pipeline candidates (BE-122 through BE-105) are in experimental development stages. Development timelines and regulatory pathways remain subject to ongoing clinical evaluations and agency reviews.',
  },
};
