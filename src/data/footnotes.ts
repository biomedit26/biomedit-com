// Legal-approved footnote copy, shared so the numbered footnotes on the
// Products, Platform, and Pipeline pages and the "Referenced Footnotes" list
// on the Legal page can never drift apart. Numbers match legal's review list.
export interface Footnote {
  n: number;
  html: string;
}

export const footnotes: Record<1 | 2 | 3 | 4, Footnote> = {
  1: {
    n: 1,
    html: 'USDA has issued a conditional license for the product CPerf LLV* in accordance with regulation 9 CFR 102.6. The approved claim is: &ldquo;This product has shown a reasonable expectation of efficacy for passive immunity of healthy chicks against <em>Clostridium perfringens</em>. Duration of passive immunity has not been determined. The license is conditional; efficacy and potency have not been fully demonstrated.&rdquo; Conditional licensure enables commercialization in the US while additional effectiveness and potency data are developed as required for full product licensure. Product use is subject to federal and state regulatory requirements.',
  },
  2: {
    n: 2,
    html: 'Investigational pipeline candidates (BE-105, BE-122) are experimental products in development, have not been approved by the FDA or USDA, and are not available for commercial sale. Pipeline information is subject to change without notice.',
  },
  3: {
    n: 3,
    html: 'BiomElix&reg; One is approved as a feed ingredient by MAPA in Brazil. BiomEdit is developing the corresponding feed additive for use in Brazil. Regulator claims and approvals may vary by country, and product registrations are subject to local regulatory requirements.',
  },
  4: {
    n: 4,
    html: 'Pipeline candidates (BE-122 through BE-105) are in experimental development stages. Development timelines and regulatory pathways remain subject to ongoing clinical evaluations and agency reviews.',
  },
};
