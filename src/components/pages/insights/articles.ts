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
  datePublished: string;
  dateModified: string;
  tags: string[];
}

export const ARTICLES: ArticleMeta[] = [
  {
    path: "/insights/why-a-doctors-website-is-not-a-digital-cv/",
    title: "Why a Doctor's Website Is Not a Digital CV",
    standfirst:
      "A CV documents a career for peers. A website must answer questions for patients. The difference decides whether a referred patient ever makes contact.",
    category: "Websites",
    datePublished: "2026-09-17",
    dateModified: "2026-09-17",
    readTime: "8 min read",
    tags: ["Websites", "Positioning"],
  },
  {
    path: "/insights/the-referral-validation-search/",
    title: "The Referral Validation Search",
    standfirst: "What happens in the minutes after a patient is given your name — and why the referral validation search decides whether they ever book.",
    category: "Search",
    datePublished: "2026-09-17",
    dateModified: "2026-09-17",
    readTime: "6 min read",
    tags: ["Search", "Referrals"],
  },
  {
    path: "/insights/what-to-build-before-your-first-private-patient/",
    title: "What to Build Before Your First Private Patient",
    standfirst: "The foundation sequence for new private practice — what to build before spending on visibility, so you never have to rebuild it.",
    category: "New Consultants",
    datePublished: "2026-09-17",
    dateModified: "2026-09-17",
    readTime: "7 min read",
    tags: ["New Consultants", "Foundations"],
  },
  {
    path: "/insights/traffic-is-not-the-outcome/",
    title: "Traffic Is Not the Outcome",
    standfirst: "More visitors feels like progress, but enquiries pay the bills. Why growth is decided after the click — in clarity, trust and ease of contact.",
    category: "Enquiries",
    datePublished: "2026-09-17",
    dateModified: "2026-09-17",
    readTime: "5 min read",
    tags: ["Enquiries", "Conversion"],
  },
  {
    path: "/insights/growth-should-be-measurable/",
    title: "Growth Should Be Measurable",
    standfirst: "If you can't measure it, you can't grow it. The small set of numbers every private practice can honestly track — from visibility to booked outcomes.",
    category: "Measurement",
    datePublished: "2026-09-17",
    dateModified: "2026-09-17",
    readTime: "6 min read",
    tags: ["Measurement", "Strategy"],
  },
];
