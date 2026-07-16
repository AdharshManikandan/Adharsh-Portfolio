import { useEffect } from "react";

/**
 * CustomCursor
 * Renders two fixed DOM nodes (dot + ring) and drives them via
 * requestAnimationFrame using transform: translate() so everything
 * stays on the compositor thread — zero layout thrash, no scroll lag.
 *
 * Automatically disabled on touch/coarse-pointer devices.
 */
export function CustomCursor() {
  useEffect(() => {
    // Only activate on fine-pointer (mouse) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot  = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    // Current raw mouse position
    let mx = -100, my = -100;
    // Ring follows with lerp
    let rx = -100, ry = -100;

    // Track mouse
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      document.body.classList.remove("cursor-out");
    };

    const onLeave = () => document.body.classList.add("cursor-out");
    const onEnter = () => document.body.classList.remove("cursor-out");

    // Cursor state from hovered element
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, [role='button'], [role='link'], label, select"
      );
      const textTarget = (e.target as HTMLElement).closest(
        "input, textarea"
      );

      if (textTarget) {
        document.body.classList.remove("cursor-pointer");
        document.body.classList.add("cursor-text");
      } else if (target) {
        document.body.classList.remove("cursor-text");
        document.body.classList.add("cursor-pointer");
      } else {
        document.body.classList.remove("cursor-pointer", "cursor-text");
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver, { passive: true });

    // RAF loop — dot snaps instantly, ring lerps
    let rafId: number;
    const LERP = 0.12; // 0 = no follow, 1 = instant

    const tick = () => {
      // Dot: instant
      dot.style.transform  = `translate(${mx}px, ${my}px)`;

      // Ring: smooth lerp
      rx += (mx - rx) * LERP;
      ry += (my - ry) * LERP;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.body.classList.remove("cursor-pointer", "cursor-text", "cursor-out");
    };
  }, []);

  return (
    <>
      <div id="cursor-dot"  aria-hidden="true" />
      <div id="cursor-ring" aria-hidden="true" />
    </>
  );
}
