import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const DEFAULT_SECTION_IDS = [
  "about",
  "education",
  "skills",
  "experience",
  "projects",
  "journey",
  "soft",
  "gallery",
  "contact",
] as const;

const SECTION_LABELS: Record<string, string> = {
  about: "About",
  education: "Education",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  journey: "Journey",
  soft: "Soft Skills",
  gallery: "Gallery",
  contact: "Contact",
};

type ScrollIndicatorProps = {
  sectionIds?: readonly string[];
};

/**
 * ScrollIndicator
 *
 * A reusable, production-ready right-side section navigator that tracks the
 * viewport-center section using IntersectionObserver. It keeps the current
 * active section in sync with mouse wheel, keyboard, touchpad, and anchor-link
 * scrolling without relying on hardcoded scroll positions.
 */
export default function ScrollIndicator({ sectionIds = DEFAULT_SECTION_IDS }: ScrollIndicatorProps) {
  const normalizedIds = useMemo(() => [...sectionIds], [sectionIds]);
  const [activeSection, setActiveSection] = useState<string>(normalizedIds[0] ?? "about");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = normalizedIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (elements.length === 0) return;

    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight / 2;
      let bestMatch: HTMLElement | null = null;
      let bestScore = Number.NEGATIVE_INFINITY;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visibleRatio = Math.max(visibleHeight, 0) / Math.max(rect.height, 1);
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        const score = visibleRatio * 1000 - distance;

        if (score > bestScore) {
          bestScore = score;
          bestMatch = element;
        }
      });

      if (bestMatch?.id) {
        setActiveSection(bestMatch.id);
      }
    };

    const observer = new IntersectionObserver(
      () => {
        updateActiveSection();
      },
      {
        threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9],
        rootMargin: "-35% 0px -35% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));
    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [normalizedIds]);

  return (
    <div
      aria-label="Section progress navigation"
      className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 md:flex"
      role="navigation"
    >
      <div className="relative flex items-center">
        <div className="absolute left-[13px] top-1 h-[calc(100%-0.5rem)] w-px -translate-x-1/2 bg-white/15" />

        <div className="flex flex-col items-center gap-3">
          {normalizedIds.map((id) => {
            const isActive = activeSection === id;
            const label = SECTION_LABELS[id] ?? id;

            return (
              <div key={id} className="relative flex items-center gap-3">
                <motion.span
                  animate={{
                    scale: isActive ? 1.5 : 1,
                    opacity: isActive ? 1 : 0.65,
                    boxShadow: isActive
                      ? "0 0 18px rgba(255, 106, 0, 0.9), 0 0 32px rgba(255, 106, 0, 0.35)"
                      : "0 0 0 rgba(255, 106, 0, 0)",
                  }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className={`block h-2.5 w-2.5 rounded-full border ${
                    isActive
                      ? "border-[#FF6A00] bg-[#FF6A00]"
                      : "border-[#666] bg-[#666]"
                  } ${isActive ? "animate-pulse" : ""}`}
                />

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.span
                      key={id}
                      initial={{ opacity: 0, x: 8, scale: 0.96 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.96 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="pointer-events-none absolute right-5 whitespace-nowrap rounded-full border border-white/10 bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-foreground backdrop-blur-md"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
