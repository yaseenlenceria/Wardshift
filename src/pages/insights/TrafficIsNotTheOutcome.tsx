import ArticleLayout, {
  ClosingLink,
  Divider,
  H2,
  P,
  PullQuote,
} from "@/components/pages/insights/ArticleLayout";
import { ARTICLES } from "@/components/pages/insights/articles";

const meta = ARTICLES[3];

export default function TrafficIsNotTheOutcome() {
  return (
    <ArticleLayout meta={meta} related={[ARTICLES[4], ARTICLES[0]]}>
      <P>
        Ask how a practice's marketing is going and the answer, if there is one, is usually a
        traffic number. Visits are up. Impressions have grown. The graph points the right way. It
        feels like progress — and it may be. But traffic is not the outcome a private practice is
        actually pursuing, and confusing the two is how growth budgets get spent on the wrong end
        of the problem.
      </P>

      <H2>The metric that feels like progress</H2>
      <P>
        Traffic is seductive because it is visible, immediate and always moving. A practice can
        watch it weekly and feel informed. Yet a visitor is not a patient, and a hundred visitors
        who never make contact are worth precisely nothing to the diary. The number that matters
        to a private practice is narrower and less flattering: the number of appropriate enquiries
        — people with a relevant need, reaching out, in a way the practice can respond to.
      </P>
      <P>
        Between the click and the enquiry lies the part of the system where growth is actually
        decided: whether the page answers the visitor's question, whether trust is established
        quickly, whether the route to contact is obvious and effortless. Traffic buys a chance at
        that decision. It does not make it.
      </P>

      <PullQuote>
        Growth is not decided by who arrives. It is decided by what happens after the click.
      </PullQuote>

      <H2>What happens after the click</H2>
      <P>
        Follow a single visitor through and the leverage becomes clear. They arrive with a
        question — often as specific as a condition or a procedure. The page either answers it in
        patient language or loses them in seconds. If they stay, they look for reassurance:
        credentials, clarity, the sense of a substantial practice. If persuaded, they look for
        the way to make contact — and here, an extraordinary number of practices place obstacles
        in front of patients who have already decided: forms that ask too much, phone numbers
        that ring out, next steps left ambiguous.
      </P>
      <P>
        Each stage is a filter. Improving any one of them multiplies the value of every visit the
        practice already receives — before a single additional pound is spent on attracting more.
      </P>

      <H2>The enquiry as the unit of growth</H2>
      <P>
        A healthier way to run the numbers is to treat the enquiry as the basic unit. Where do
        enquiries come from? What happens to each one? How many become consultations? These
        questions are answerable by any practice that chooses to ask them, and they redirect
        attention to the places where improvement is cheapest: the pages patients actually read,
        the phone manner of the front desk, the speed and tone of the reply.
      </P>
      <P>
        None of this argues against visibility — a practice that cannot be found has no clicks to
        convert. But visibility and conversion are halves of one system, and the order of
        operations matters. Pouring traffic into a leaky journey simply raises the cost of the
        same outcome. Fix what happens after the click, and every channel upstream of it becomes
        more valuable at once.
      </P>

      <Divider />

      <P>
        The practical starting point is unglamorous: trace one enquiry from first click to booked
        consultation and count the places it could have been lost. Most practices find the
        journey has never been walked end to end. Walking it once tends to reorder the whole
        marketing agenda.
      </P>

      <ClosingLink href="/practice-enquiry-systems/" label="Practice enquiry systems">
        WardShift's enquiry systems work focuses on exactly this: what happens after a patient
        makes contact, and how to make that journey worthy of the traffic that feeds it.
      </ClosingLink>
    </ArticleLayout>
  );
}
