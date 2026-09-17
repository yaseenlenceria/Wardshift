import ArticleLayout, {
  ClosingLink,
  Divider,
  H2,
  P,
  PullQuote,
} from "@/components/pages/insights/ArticleLayout";
import { ARTICLES } from "@/components/pages/insights/articles";

const meta = ARTICLES[2];

export default function BeforeFirstPrivatePatient() {
  return (
    <ArticleLayout meta={meta} related={[ARTICLES[0], ARTICLES[1]]}>
      <P>
        The first weeks of a new consultant's private practice are full of practical decisions:
        rooms, secretarial support, indemnity, fee schedules. Somewhere down the list sits "the
        website" — often treated as a task for later, once the practice has found its feet. This
        ordering feels prudent. It is usually backwards.
      </P>
      <P>
        What is built before the first private patient arrives determines what happens when they
        do. And what is sketched hastily at the start has a way of becoming expensive to undo —
        not because websites are costly to rebuild, but because positioning, structure and
        habits built on the wrong foundations must be unpicked, not just replaced.
      </P>

      <H2>The sequence matters more than the spend</H2>
      <P>
        The foundations of a private practice have a natural order, and each layer depends on the
        one beneath it. First, <em>positioning</em>: a clear, honest statement of what the
        practice is for — the specialty, the conditions treated, the patients best served. This
        is not branding in the decorative sense; it is the raw material every later decision
        draws on.
      </P>
      <P>
        Second, <em>the website</em>: the place where that positioning becomes visible to
        patients. Built on clear positioning, a website is a straightforward expression of it.
        Built without it, a website becomes a digital CV — impressive to peers, inert to
        patients — and eventually a rebuild.
      </P>
      <P>
        Third, <em>the contact route</em>: how an enquiry actually reaches the practice and what
        happens next. A phone number that is answered, a form that is simple, a response that is
        prompt and professional. The first patients a new practice sees are often the most
        forgiving; their experience of making contact is still the one they describe to others.
      </P>
      <P>
        Fourth, <em>measurement</em>: even at the smallest scale, knowing where enquiries come
        from. A new consultant who records the source of every early enquiry owns, within
        months, a picture of how their practice actually grows — evidence that most established
        practices still lack.
      </P>

      <PullQuote>
        The cheapest moment to get the foundations right is before anyone has seen them.
      </PullQuote>

      <H2>Why rebuilds are expensive</H2>
      <P>
        The cost of a weak start is rarely the money spent on the first website. It is the
        compounding of everything built on top of it: directory listings that echo a vague
        description, referral conversations framed around the wrong specialty emphasis, patients
        who arrived expecting one thing and found another. By the time the practice can afford to
        fix the foundations, the fix must unwind two years of drift.
      </P>
      <P>
        There is also an opportunity cost that never appears on an invoice. The early referrals a
        new consultant receives are the most likely to be validated online by patients who have
        never heard the name before. If what those patients find is thin or unclear, some portion
        of the practice's earliest — and most consequential — demand quietly evaporates.
      </P>

      <Divider />

      <H2>What "built" actually means</H2>
      <P>
        None of this requires a large site or a long project. A foundation can be modest: clear
        positioning, a small website that answers patients' real questions, a contact route that
        works, and a habit of recording where enquiries come from. What it cannot be is vague,
        because vagueness is what gets rebuilt.
      </P>
      <P>
        The newly appointed consultant has one genuine advantage over every established practice:
        nothing to unpick. The sequence — positioning, website, contact, measurement — takes the
        same effort at the start as it does later. The difference is that at the start, it only
        has to be built once.
      </P>

      <ClosingLink href="/newly-appointed-consultants/" label="Newly appointed consultants">
        WardShift works with new consultants on exactly this foundation sequence — including the
        First 90 Days framework for building private practice visibility from day one.
      </ClosingLink>
    </ArticleLayout>
  );
}
