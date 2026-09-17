/**
 * Metadata for the WardShift Insights series. Shared by the Insights hub,
 * the article pages and the "related articles" footers.
 */
export interface ArticleMeta {
  /** Full route path, e.g. "/insights/the-referral-validation-search/". */
  path: string;
  title: string;
  standfirst: string;
  category: string;
  readTime: string;
  tags: string[];
}

export const ARTICLES: ArticleMeta[] = [
  {
    path: "/insights/why-a-doctors-website-is-not-a-digital-cv/",
    title: "Why a Doctor's Website Is Not a Digital CV",
    standfirst:
      "A CV documents a career for peers. A website must answer questions for patients. The difference decides whether a referred patient ever makes contact.",
    category: "Websites",
    readTime: "8 min read",
    tags: ["Websites", "Positioning"],
  },
  {
    path: "/insights/the-referral-validation-search/",
    title: "The Referral Validation Search",
    standfirst: "What happens in the minutes after a patient is given your name.",
    category: "Search",
    readTime: "6 min read",
    tags: ["Search", "Referrals"],
  },
  {
    path: "/insights/what-to-build-before-your-first-private-patient/",
    title: "What to Build Before Your First Private Patient",
    standfirst: "The foundation sequence that prevents expensive rebuilds.",
    category: "New Consultants",
    readTime: "7 min read",
    tags: ["New Consultants", "Foundations"],
  },
  {
    path: "/insights/traffic-is-not-the-outcome/",
    title: "Traffic Is Not the Outcome",
    standfirst: "Why growth is decided after the click.",
    category: "Enquiries",
    readTime: "5 min read",
    tags: ["Enquiries", "Conversion"],
  },
  {
    path: "/insights/growth-should-be-measurable/",
    title: "Growth Should Be Measurable",
    standfirst: "The numbers a private practice can honestly track.",
    category: "Measurement",
    readTime: "6 min read",
    tags: ["Measurement", "Strategy"],
  },
];
