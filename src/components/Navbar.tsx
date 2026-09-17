import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { SERVICE_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

const PANEL_FOOTERS = [
  { label: "Overview", href: "/how-we-help/" },
  { label: "Who we help", href: "/who-we-help/" },
];

const PLAIN_LINKS = [
  { label: "How It Works", href: "/growth-system/" },
  { label: "Insights", href: "/insights/" },
  { label: "About", href: "/about/" },
];

/** Smooth-scroll to #services on the homepage, navigating there first if needed. */
function useServicesScroll(close?: () => void) {
  const navigate = useNavigate();
  const location = useLocation();
  return (e: MouseEvent) => {
    e.preventDefault();
    close?.();
    const scroll = () => {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location.pathname === "/") {
      if (location.hash !== "#services") navigate("/#services");
      // Wait a frame so any route/hash update settles before scrolling.
      requestAnimationFrame(() => requestAnimationFrame(scroll));
    } else {
      navigate("/#services");
      // Home mounts and handles the hash scroll; this is a fallback nudge.
      setTimeout(scroll, 250);
    }
  };
}

function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onNavigate = () => setOpen(false);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-[15px] font-medium text-navy-800 transition-colors duration-150 hover:text-teal-600"
      >
        What We Improve
        <ChevronDown
          className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-50 mt-3 w-[480px] -translate-x-1/2 rounded-[10px] border border-grey-300 bg-white p-4 shadow-card"
          >
            <ul className="grid grid-cols-2 gap-1">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={onNavigate}
                    className="group block rounded-md px-3 py-2.5 transition-colors duration-150 hover:bg-grey-100"
                  >
                    <span className="block text-[14px] font-semibold text-navy-800 group-hover:text-teal-600">
                      {link.title}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-grey-500">
                      {link.descriptor}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-6 border-t border-grey-300/60 px-3 pt-3">
              {PANEL_FOOTERS.map((footer) => (
                <Link
                  key={footer.href}
                  to={footer.href}
                  onClick={onNavigate}
                  className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-teal-600"
                >
                  {footer.label}
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileServicesGroup({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left text-lg font-medium text-white"
      >
        What We Improve
        <ChevronDown
          className={cn("h-5 w-5 text-teal-400 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ul className="pb-4">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={onNavigate}
                    className="block py-2.5 pl-4 text-[15px] text-navy-100 transition-colors duration-150 hover:text-teal-400"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              {PANEL_FOOTERS.map((footer) => (
                <li key={footer.href}>
                  <Link
                    to={footer.href}
                    onClick={onNavigate}
                    className="block py-2.5 pl-4 text-[15px] font-semibold text-teal-400"
                  >
                    {footer.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const compactHeader = scrolled || drawerOpen;
  const closeDrawer = () => setDrawerOpen(false);
  const scrollToServices = useServicesScroll(closeDrawer);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-200",
        compactHeader ? "h-[60px]" : "h-[72px]",
        compactHeader
          ? "border-b border-grey-300/60 bg-white/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-full max-w-site items-center justify-between px-6">
        <Link to="/" aria-label="WardShift — home" className="flex items-center">
          <img
            src="/logo.png"
            alt="WardShift — The Growth Side of Private Practice"
            className={cn("w-auto transition-all duration-200", compactHeader ? "h-9" : "h-11")}
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          <NavLink
            to="/growth-system/"
            className={({ isActive }) =>
              cn(
                "text-[15px] font-medium transition-colors duration-150",
                isActive ? "text-teal-600" : "text-navy-800 hover:text-teal-600",
              )
            }
          >
            How It Works
          </NavLink>
          <ServicesDropdown />
          <a
            href="/#services"
            onClick={scrollToServices}
            className="text-[15px] font-medium text-navy-800 transition-colors duration-150 hover:text-teal-600"
          >
            Services
          </a>
          {PLAIN_LINKS.slice(1).map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  "text-[15px] font-medium transition-colors duration-150",
                  isActive ? "text-teal-600" : "text-navy-800 hover:text-teal-600",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <Link
            to="/growth-review/"
            className="rounded-lg bg-navy-800 px-5 py-2.5 text-[15px] font-semibold tracking-[0.01em] text-white transition-colors duration-150 hover:bg-teal-500 hover:text-navy-950"
          >
            See My Growth Gaps
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-md text-navy-800 transition-colors duration-150 hover:bg-grey-100 lg:hidden"
          aria-expanded={drawerOpen}
          aria-controls="mobile-navigation"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          onClick={() => setDrawerOpen((v) => !v)}
        >
          {drawerOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 top-[60px] z-40 flex flex-col bg-navy-900 lg:hidden"
          >
            <div className="border-b border-white/10 px-6 py-5">
              <img
                src="/logo-light.png"
                alt="WardShift — The Growth Side of Private Practice"
                className="h-9 w-auto"
              />
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-4">
              <Link
                to="/growth-system/"
                onClick={closeDrawer}
                className="block border-b border-white/10 py-4 text-lg font-medium text-white"
              >
                How It Works
              </Link>
              <MobileServicesGroup onNavigate={closeDrawer} />
              <a
                href="/#services"
                onClick={scrollToServices}
                className="block border-b border-white/10 py-4 text-lg font-medium text-white"
              >
                Services
              </a>
              {PLAIN_LINKS.slice(1).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeDrawer}
                  className="block border-b border-white/10 py-4 text-lg font-medium text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-white/10 p-6">
              <Link
                to="/growth-review/"
                onClick={closeDrawer}
                className="block rounded-lg bg-teal-500 px-5 py-3.5 text-center text-[15px] font-semibold text-navy-950 transition-colors duration-150 hover:bg-teal-400"
              >
                See My Growth Gaps
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
