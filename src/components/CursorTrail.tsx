import { useEffect, useRef } from "react";

export function CursorTrail() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const ringPositionRef = useRef({ x: 0, y: 0 });
  const dotPositionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    const updatePreferences = () => {
      if (reducedMotionQuery.matches || coarsePointerQuery.matches) {
        if (rootRef.current) {
          rootRef.current.style.display = "none";
        }
      } else if (rootRef.current) {
        rootRef.current.style.display = "block";
      }
    };

    reducedMotionQuery.addEventListener?.("change", updatePreferences);
    coarsePointerQuery.addEventListener?.("change", updatePreferences);

    if (reducedMotionQuery.matches || coarsePointerQuery.matches) {
      updatePreferences();
      return () => {
        reducedMotionQuery.removeEventListener?.("change", updatePreferences);
        coarsePointerQuery.removeEventListener?.("change", updatePreferences);
      };
    }

    const root = document.createElement("div");
    root.className = "cursor-trail-root";
    root.setAttribute("aria-hidden", "true");
    document.body.appendChild(root);
    rootRef.current = root;

    const ring = document.createElement("div");
    ring.className = "cursor-trail-ring";
    root.appendChild(ring);
    ringRef.current = ring;

    const dot = document.createElement("div");
    dot.className = "cursor-trail-dot";
    root.appendChild(dot);
    dotRef.current = dot;

    const setHoverScale = (target: EventTarget | null) => {
      const interactive = Boolean(
        (target as HTMLElement | null)?.closest?.("a, button, input, textarea, select, [role='button']"),
      );

      ring.style.setProperty("--ring-scale", interactive ? "1.5" : "1");
    };

    const onPointerMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      setHoverScale(event.target);
    };

    const onPointerOver = (event: MouseEvent) => {
      setHoverScale(event.target);
    };

    const onPointerOut = (event: MouseEvent) => {
      setHoverScale(event.relatedTarget);
    };

    const animate = () => {
      const target = targetRef.current;
      const ringPosition = ringPositionRef.current;
      const dotPosition = dotPositionRef.current;

      dotPosition.x += (target.x - dotPosition.x) * 0.88;
      dotPosition.y += (target.y - dotPosition.y) * 0.88;

      ringPosition.x += (target.x - ringPosition.x) * 0.18;
      ringPosition.y += (target.y - ringPosition.y) * 0.18;

      dot.style.left = `${dotPosition.x}px`;
      dot.style.top = `${dotPosition.y}px`;
      ring.style.left = `${ringPosition.x}px`;
      ring.style.top = `${ringPosition.y}px`;

      rafRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      if (rootRef.current?.parentNode) {
        rootRef.current.parentNode.removeChild(rootRef.current);
      }
      reducedMotionQuery.removeEventListener?.("change", updatePreferences);
      coarsePointerQuery.removeEventListener?.("change", updatePreferences);
    };
  }, []);

  return null;
}
