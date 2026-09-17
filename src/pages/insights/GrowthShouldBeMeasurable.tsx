import ArticleLayout, {
  ClosingLink,
  Divider,
  H2,
  P,
  PullQuote,
} from "@/components/pages/insights/ArticleLayout";
import { ARTICLES } from "@/components/pages/insights/articles";

const meta = ARTICLES[4];

export default function GrowthShouldBeMeasurable() {
  return (
    <ArticleLayout meta={meta} related={[ARTICLES[3], ARTICLES[1]]}>
      <P>
        Private practice growth has a measurement problem — but not the one usually assumed. The
        issue is rarely a shortage of numbers. It is that the numbers a practice sees most often
        are the ones least connected to the outcome it cares about, while the numbers that would
        actually inform decisions go unrecorded.
      </P>

      <H2>What honesty requires</H2>
      <P>
        Honest measurement begins with an admission: some things a practice would love to know
        cannot be known precisely, and pretending otherwise produces theatre rather than insight.
        Not every patient will say where they heard of you. Not every referral can be traced.
        Attribution in healthcare will always be approximate, because decisions are private and
        journeys cross channels.
      </P>
      <P>
        That is not a reason to give up on measurement; it is a reason to choose measures that
        survive contact with reality. The test for any number is simple: does it describe
        something that actually happened, in terms specific enough to act on? Counts of real
        events pass. Composite scores, vague "visibility" ratings and projections dressed as
        results do not.
      </P>

      <PullQuote>
        The honest dashboard is smaller than the impressive one — and far more useful.
      </PullQuote>

      <H2>The numbers a practice can honestly track</H2>
      <P>
        The core set is modest. <em>Enquiries</em>: how many, through which channel, about which
        conditions. <em>Source</em>: where each enquiry believes it came from — referral, search,
        advertisement — recorded at the moment of contact, when the answer is freshest.{" "}
        <em>Conversion</em>: what share of enquiries become consultations, and where the rest
        fall away. <em>Response</em>: how quickly and how well each enquiry is handled, because
        an enquiry answered in three days is a different asset from one answered in three hours.
      </P>
      <P>
        Around these sit supporting indicators that earn their place only by informing action:
        the searches the practice appears for, the pages patients actually read, the campaigns
        that produce enquiries rather than clicks. Each is subordinate to the central question —
        is the practice receiving more appropriate enquiries, and can it say why?
      </P>

      <H2>What measurement changes</H2>
      <P>
        The value of honest numbers is not reporting; it is the change in the conversation. A
        practice that knows its enquiry sources can stop arguing about whether marketing "works"
        and start asking which part of the system deserves the next pound. Weak stages become
        visible. Strong ones become defensible. Spending stops being an act of faith.
      </P>
      <P>
        Measurement also disciplines the people doing the work — including us. An agency that
        reports enquiries, sources and outcomes can be held to account. One that reports
        impressions and reach cannot. Practices should be suspicious of any growth partner whose
        numbers cannot be checked against the diary.
      </P>

      <Divider />

      <P>
        Growth should be measurable — not because everything can be counted, but because the
        things that matter can. Start with enquiries, sources and outcomes, recorded consistently
        and reviewed calmly. A practice that does this for a year knows more about how it grows
        than most of its peers ever will.
      </P>

      <ClosingLink href="/growth-system/" label="The Growth System">
        Measurement is the fifth stage of the WardShift Growth System — the discipline that turns
        individual efforts into a compounding whole. See how the six stages connect.
      </ClosingLink>
    </ArticleLayout>
  );
}
