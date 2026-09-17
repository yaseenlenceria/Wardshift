import { useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Shared layout: Navbar (sticky, in flow — pages do not compensate for nav
 * height) + page content slot ({children}) + Footer. Owns Lenis smooth
 * scrolling and scroll-reset on route change.
 */
export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();

  // Page-wide smooth scrolling (disabled for reduced motion)
  useEffect(() => {
    if (reducedMotion) return;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (coarsePointer) return;

    const lenis = new Lenis({ lerp: 0.1 });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reducedMotion]);

  // Reset scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-md bg-white px-4 py-3 font-semibold text-navy-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
