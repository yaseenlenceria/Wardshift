import ArticleLayout, {
  ClosingLink,
  Divider,
  H2,
  P,
  PullQuote,
} from "@/components/pages/insights/ArticleLayout";
import ReferralPathFigure from "@/components/pages/insights/ReferralPathFigure";
import { ARTICLES } from "@/components/pages/insights/articles";

const meta = ARTICLES[1];

export default function ReferralValidationSearch() {
  return (
    <ArticleLayout meta={meta} related={[ARTICLES[0], ARTICLES[4]]} figure={<ReferralPathFigure />}>
      <P>
        A referral feels like the end of the marketing problem. A trusted professional has spoken
        your name; the patient has every reason to book. Yet between the referral and the
        appointment lies a short, decisive episode that most practices never see: the patient
        picks up their phone and searches for you.
      </P>
      <P>
        This is the referral validation search. It takes minutes. It happens privately, often the
        same day the name is given. And its outcome — contact, or quiet hesitation — is decided
        almost entirely by what the patient finds on a single screen of search results.
      </P>

      <H2>The minutes after the referral</H2>
      <P>
        The referred patient is not comparison shopping in the way a cold searcher is. They are
        not typing a symptom and weighing ten names. They are typing one name — yours — and
        asking a narrower question: <em>does what I find here confirm the recommendation I was
        just given?</em>
      </P>
      <P>
        That confirmation is assembled from fragments. The results page itself: does the practice
        appear clearly, with a proper website rather than a scattering of stale directory
        listings? The website: does it load quickly, read clearly, and confirm the specialty and
        conditions the referral was about? The supporting evidence: profiles, credentials,
        affiliations — the quiet signals that the name they were given belongs to a substantial,
        current, practising specialist.
      </P>

      <PullQuote>
        A referral transfers trust. The search either preserves it or spends it.
      </PullQuote>

      <H2>What the search is checking</H2>
      <P>
        The validation search is not a deep investigation; it is a pattern match. The patient has
        a mental picture of what a credible private specialist looks like online — built from
        every other professional service they have ever used — and they are checking the practice
        against it. Clarity, currency and coherence pass. Confusion, contradiction and absence
        fail.
      </P>
      <P>
        The failures are rarely dramatic. A website that hasn't been touched in years. A name
        attached to three different phone numbers across three different directories. A specialty
        described in language the patient doesn't recognise as their own problem. Each is a small
        thing; together they introduce doubt at exactly the moment the patient was ready to act.
      </P>
      <P>
        Crucially, the patient who hesitates almost never tells anyone. The referring clinician
        believes the referral was made. The practice believes referrals arrive by reputation
        alone. The patient simply drifts — to another name, or to no name at all.
      </P>

      <Divider />

      <H2>When the search fails</H2>
      <P>
        The uncomfortable implication is that a practice can be receiving a healthy stream of
        referrals and still be losing a meaningful share of them in the minutes afterwards. No
        referral report shows the patients who searched and stopped. The loss is invisible unless
        someone looks for it — and it is also one of the most recoverable losses in private
        practice, because the patient arrived pre-persuaded.
      </P>
      <P>
        The fix is not advertising to referred patients; it is making the validation search
        succeed. That means owning the results page for your own name, keeping every profile
        consistent, and presenting a website that confirms in seconds what the referral promised.
        Reputation opens the door. What the patient finds in those few minutes decides whether
        they walk through it.
      </P>

      <ClosingLink href="/search-visibility/" label="Search visibility">
        WardShift's search visibility work covers exactly this ground — what patients find when
        they look for a doctor by name, by specialty, and by the problem they want solved.
      </ClosingLink>
    </ArticleLayout>
  );
}
