import { useEffect } from "react";
import { useLocation } from "react-router";
import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import Hero from "@/components/home/Hero";
import SoundFamiliar from "@/components/home/SoundFamiliar";
import SplitVisual from "@/components/home/SplitVisual";
import SearchingNow from "@/components/home/SearchingNow";
import SystemMap from "@/components/home/SystemMap";
import Services from "@/components/home/Services";
import SpecialistAreas from "@/components/home/SpecialistAreas";
import NewConsultants from "@/components/home/NewConsultants";
import InsightsPreview from "@/components/home/InsightsPreview";
import { usePrefersReducedMotion } from "@/lib/motion";

export default function Home() {
  const location = useLocation();
  const reduced = usePrefersReducedMotion();

  // Smooth hash scrolling for retained homepage sections.
  useEffect(() => {
    if (location.hash !== "#services" && location.hash !== "#system-map") return;
    const t = setTimeout(() => {
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }, 60);
    return () => clearTimeout(t);
  }, [location.hash, location.pathname, reduced]);

  return (
    <>
      <Seo
        title="Private Practice Growth for Doctors & Consultants | WardShift"
        description="WardShift is the growth side of private practice — improving how patients discover your practice, understand your expertise, build trust and make contact, and how that entire journey is measured."
        path="/"
      />
      <Hero />
      <SoundFamiliar />
      <SplitVisual />
      <SearchingNow />
      <SystemMap />
      <Services />
      <SpecialistAreas />
      <NewConsultants />
      <InsightsPreview />
      <CtaBand
        title="Find out how the growth side of your practice looks."
        support="Book a Practice Growth Review — a structured look at your visibility, positioning, website, enquiry handling and measurement."
        primaryLabel="See My Growth Gaps"
        primaryHref="/growth-review/"
        secondaryLabel="How WardShift works"
        secondaryHref="/growth-system/"
      />
    </>
  );
}
