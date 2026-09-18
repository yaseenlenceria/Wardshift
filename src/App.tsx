import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";

const HowWeHelp = lazy(() => import("@/pages/HowWeHelp"));
const PrivatePracticeWebsites = lazy(() => import("@/pages/PrivatePracticeWebsites"));
const SearchVisibility = lazy(() => import("@/pages/SearchVisibility"));
const PatientAcquisition = lazy(() => import("@/pages/PatientAcquisition"));
const GoogleAds = lazy(() => import("@/pages/GoogleAds"));
const DigitalReputation = lazy(() => import("@/pages/DigitalReputation"));
const ConsultantPositioning = lazy(() => import("@/pages/ConsultantPositioning"));
const PracticeEnquirySystems = lazy(() => import("@/pages/PracticeEnquirySystems"));
const CrmFollowUp = lazy(() => import("@/pages/CrmFollowUp"));
const PracticeGrowthStrategy = lazy(() => import("@/pages/PracticeGrowthStrategy"));
const WhoWeHelp = lazy(() => import("@/pages/WhoWeHelp"));
const PrivateDoctors = lazy(() => import("@/pages/PrivateDoctors"));
const NewlyAppointedConsultants = lazy(() => import("@/pages/NewlyAppointedConsultants"));
const GrowthSystem = lazy(() => import("@/pages/GrowthSystem"));
const Insights = lazy(() => import("@/pages/Insights"));
const About = lazy(() => import("@/pages/About"));
const GrowthReview = lazy(() => import("@/pages/GrowthReview"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Cookies = lazy(() => import("@/pages/Cookies"));
const Disclaimer = lazy(() => import("@/pages/Disclaimer"));
const WebsiteNotDigitalCv = lazy(() => import("@/pages/insights/WebsiteNotDigitalCv"));
const ReferralValidationSearch = lazy(() => import("@/pages/insights/ReferralValidationSearch"));
const BeforeFirstPrivatePatient = lazy(() => import("@/pages/insights/BeforeFirstPrivatePatient"));
const TrafficIsNotTheOutcome = lazy(() => import("@/pages/insights/TrafficIsNotTheOutcome"));
const GrowthShouldBeMeasurable = lazy(() => import("@/pages/insights/GrowthShouldBeMeasurable"));
const NotFound = lazy(() => import("@/pages/NotFound"));
import CookieConsent from "@/components/CookieConsent";

/** Minimal branded route-loading state — navy field with the WardShift mark. */
function RouteLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-navy-900">
      <img
        src="/logo-mark-light.webp"
        alt="WardShift"
        className="h-10 w-auto animate-pulse"
        width={360}
        height={231}
      />
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<RouteLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-we-help/" element={<HowWeHelp />} />
          <Route path="/private-practice-websites/" element={<PrivatePracticeWebsites />} />
          <Route path="/search-visibility/" element={<SearchVisibility />} />
          <Route path="/patient-acquisition/" element={<PatientAcquisition />} />
          <Route path="/google-ads/" element={<GoogleAds />} />
          <Route path="/digital-reputation/" element={<DigitalReputation />} />
          <Route path="/consultant-positioning/" element={<ConsultantPositioning />} />
          <Route path="/practice-enquiry-systems/" element={<PracticeEnquirySystems />} />
          <Route path="/crm-follow-up/" element={<CrmFollowUp />} />
          <Route path="/practice-growth-strategy/" element={<PracticeGrowthStrategy />} />
          <Route path="/who-we-help/" element={<WhoWeHelp />} />
          <Route path="/private-doctors/" element={<PrivateDoctors />} />
          <Route path="/newly-appointed-consultants/" element={<NewlyAppointedConsultants />} />
          <Route path="/growth-system/" element={<GrowthSystem />} />
          <Route path="/insights/" element={<Insights />} />
          <Route path="/insights/why-a-doctors-website-is-not-a-digital-cv/" element={<WebsiteNotDigitalCv />} />
          <Route path="/insights/the-referral-validation-search/" element={<ReferralValidationSearch />} />
          <Route path="/insights/what-to-build-before-your-first-private-patient/" element={<BeforeFirstPrivatePatient />} />
          <Route path="/insights/traffic-is-not-the-outcome/" element={<TrafficIsNotTheOutcome />} />
          <Route path="/insights/growth-should-be-measurable/" element={<GrowthShouldBeMeasurable />} />
          <Route path="/about/" element={<About />} />
          <Route path="/growth-review/" element={<GrowthReview />} />
          <Route path="/contact/" element={<Contact />} />
          <Route path="/privacy/" element={<Privacy />} />
          <Route path="/terms/" element={<Terms />} />
          <Route path="/cookies/" element={<Cookies />} />
          <Route path="/disclaimer/" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <CookieConsent />
    </Layout>
  );
}
