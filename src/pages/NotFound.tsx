import { Link } from "react-router";
import Seo from "@/components/Seo";

export default function NotFound() {
  return (
    <main className="bg-paper">
      <Seo
        title="Page Not Found | WardShift"
        description="The page you were looking for could not be found. Explore WardShift — the growth side of private practice."
        path="/404/"
      />
      <section className="mx-auto flex max-w-[880px] flex-col items-start px-6 py-32 md:py-40">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-600">404 — Page not found</p>
        <h1 className="mt-4 font-display text-4xl leading-[1.08] tracking-[-0.02em] text-navy-800 md:text-5xl">
          This page isn't part of the journey.
        </h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-grey-700">
          The page you were looking for doesn't exist or may have moved. Explore how WardShift helps private
          doctors get found, build trust and grow stronger practices.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center rounded-lg bg-navy-800 px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-teal-500"
          >
            Return to the homepage
          </Link>
          <Link
            to="/growth-review/"
            className="inline-flex items-center rounded-lg border border-grey-300 px-6 py-3 text-[15px] font-semibold text-navy-800 transition-colors hover:border-teal-500 hover:text-teal-600"
          >
            Book a Growth Review
          </Link>
        </div>
      </section>
    </main>
  );
}
