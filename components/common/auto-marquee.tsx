"use client";

import { ReactNode, useEffect, useRef } from "react";

type AutoMarqueeProps = {
  children: ReactNode;
  speed?: number;
  hoverFactor?: number;
  ease?: number;
  fadeEdges?: boolean;
};

export default function AutoMarquee({
  children,
  speed = 50,
  hoverFactor = 0.35,
  ease = 0.03,
  fadeEdges = true,
}: AutoMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCopyRef = useRef<HTMLDivElement>(null);

  const targetSpeedRef = useRef(speed);
  const currentSpeedRef = useRef(speed);
  const offsetRef = useRef(0);
  const widthRef = useRef(1);
  const rafRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onChange = () => (reducedMotionRef.current = mq.matches);
    mq.addEventListener?.("change", onChange);

    const viewport = viewportRef.current;
    const track = trackRef.current;
    const first = firstCopyRef.current;
    if (!viewport || !track || !first) return;

    const measure = () => {
      const w = first.scrollWidth || 1;
      widthRef.current = w;
      offsetRef.current = ((offsetRef.current % w) + w) % w;
      track.style.transform = `translateX(${-offsetRef.current}px)`;
    };

    const ro = new ResizeObserver(measure);
    ro.observe(first);
    measure();

    targetSpeedRef.current = speed;
    currentSpeedRef.current = speed;

    const step = (ts: number) => {
      const last = lastTsRef.current ?? ts;
      const dt = Math.min(64, ts - last);
      lastTsRef.current = ts;

      const target = reducedMotionRef.current ? 0 : targetSpeedRef.current;
      const current = currentSpeedRef.current + (target - currentSpeedRef.current) * ease;
      currentSpeedRef.current = current;

      const dx = (current * dt) / 1000;
      let nextOffset = offsetRef.current + dx;

      const w = widthRef.current;
      if (nextOffset >= w) nextOffset -= w;
      if (nextOffset < 0) nextOffset += w;

      offsetRef.current = nextOffset;
      track.style.transform = `translateX(${-nextOffset}px)`;

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    const toHover = () => (targetSpeedRef.current = speed * hoverFactor);
    const toBase = () => (targetSpeedRef.current = speed);

    viewport.addEventListener("mouseenter", toHover);
    viewport.addEventListener("mouseleave", toBase);
    viewport.addEventListener("focusin", toHover);
    viewport.addEventListener("focusout", toBase);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      mq.removeEventListener?.("change", onChange);
      viewport.removeEventListener("mouseenter", toHover);
      viewport.removeEventListener("mouseleave", toBase);
      viewport.removeEventListener("focusin", toHover);
      viewport.removeEventListener("focusout", toBase);
    };
  }, [speed, hoverFactor, ease]);

  const baseClasses = "relative w-full overflow-hidden whitespace-nowrap";
  const maskClasses = fadeEdges
    ? " mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    : "";

  return (
    <div
      ref={viewportRef}
      className={baseClasses + maskClasses}
      aria-label="Scrolling content"
    >
      <div
        ref={trackRef}
        className="inline-flex will-change-transform gap-24"
        style={{ transform: "translateX(0px)" }}
      >
        <div ref={firstCopyRef} className="inline-flex gap-2 md:gap-24 px-0 py-3">
          {children}
        </div>
        <div aria-hidden className="inline-flex gap-2 md:gap-24 px-0 py-3">
          {children}
        </div>
      </div>
    </div>
  );
}
