import ArticleLayout, {
  ClosingLink,
  Divider,
  H2,
  P,
  PullQuote,
} from "@/components/pages/insights/ArticleLayout";
import { ARTICLES } from "@/components/pages/insights/articles";

const meta = ARTICLES[0];

export default function WebsiteNotDigitalCv() {
  return (
    <ArticleLayout meta={meta} related={[ARTICLES[1], ARTICLES[3]]}>
      <P>
        Most private doctors' websites are built from the same raw material: the CV. Qualifications
        first, then fellowships, publications, society memberships, a career in reverse
        chronological order. It feels like the obvious way to present a distinguished professional
        — and it is precisely the wrong document for the job.
      </P>
      <P>
        A CV is written for peers. It assumes a reader who already understands the specialty,
        already respects the institutions listed, and is evaluating the doctor against other
        doctors. A patient arriving at a private practice website is doing none of those things.
        They are not grading a career. They are trying to answer a small set of urgent, personal
        questions — and a website that cannot answer them loses the patient quietly, without ever
        knowing they were there.
      </P>

      <H2>Two documents, two audiences</H2>
      <P>
        The distinction matters because the two documents are optimised for opposite purposes. A
        CV says: <em>here is what I have done</em>. A practice website must say:{" "}
        <em>here is what I can do for you, and here is how to take the next step</em>. The first
        is retrospective; the second is prospective. One lists credentials as the destination; the
        other uses credentials as evidence on the way to an answer.
      </P>
      <P>
        This is why so many accomplished consultants have websites that underperform. The content
        is impressive and the outcome is silence. The site documents the doctor beautifully and
        serves the patient poorly — it was written for the wrong reader.
      </P>

      <PullQuote>
        A patient does not read a website to be impressed. They read it to decide.
      </PullQuote>

      <H2>What a referred patient is actually doing</H2>
      <P>
        Consider the most valuable visitor a private practice website receives: the referred
        patient. They have been given a name by someone they trust. They arrive not to browse but
        to verify — and their questions are remarkably consistent. Does this doctor treat my
        condition? Will I be seen promptly? What will the consultation involve? How do I make an
        appointment, and what happens after I ask?
      </P>
      <P>
        A digital CV answers none of these directly. It lists a specialty but not the conditions
        within it. It names hospitals but not the practicalities of attending. It documents
        expertise but never addresses the reader. The patient is left to translate a career
        history into a decision — and translation is work. When the translation is too much work,
        the patient hesitates, and hesitation is where enquiries go to die.
      </P>

      <H2>What the difference changes in practice</H2>
      <P>
        Building for the patient's questions instead of the peer's checklist changes almost
        everything about a site. Conditions and procedures move to the front, written in the
        language patients use rather than the language of the clinic letter. The pathway becomes
        explicit: what happens at a first consultation, how referrals work, how to make contact.
        Credentials still matter — they are the evidence — but they are placed in service of the
        decision rather than presented as the decision itself.
      </P>
      <P>
        It also changes what a contact page is for. On a CV-site, contact details are an
        afterthought, often buried. On a patient-site, the route to contact is the point of the
        exercise: clear, unhurried, and available from every page. The patient who has decided
        should never have to work to act on the decision.
      </P>

      <Divider />

      <H2>A simple test</H2>
      <P>
        There is a quick way to tell which document a website is. Take a condition the practice
        treats regularly and ask how many seconds it takes a stranger to confirm, from the
        homepage, that this doctor treats it — and what to do next if they want an appointment. If
        the honest answer involves scrolling through qualifications first, the site is a CV with a
        contact form attached.
      </P>
      <P>
        None of this diminishes the career behind the CV. The qualifications, the training, the
        experience — patients want all of it, once they believe they are in the right place. The
        task of the website is to establish that belief quickly, then let the evidence do its
        work. A career documented for peers convinces colleagues. A practice presented for
        patients convinces the people who actually book.
      </P>

      <ClosingLink href="/private-practice-websites/" label="Private practice websites">
        WardShift builds private practice websites around how patients evaluate and contact
        specialists — structure, clarity and a contact journey designed for the reader who
        matters.
      </ClosingLink>
    </ArticleLayout>
  );
}
