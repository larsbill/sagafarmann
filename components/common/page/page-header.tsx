"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import { Button } from "@/components/ui/button";

type Action =
  | { label: string; href: string; onClick?: never }
  | { label: string; onClick: () => void; href?: never };

type BaseProps = {
  title: string;
  description?: string;
  heightVh?: number;
  parallaxStrength?: number;
  overlayClassName?: string;
  action?: Action;
};

type ImageHero = BaseProps & {
  image: string;
  videoSrc?: never;
  videoType?: never;
  poster?: never;
};

type VideoHero = BaseProps & {
  videoSrc: string;
  videoType?: string;
  poster?: string;
  image?: never;
};

type PageHeaderProps = ImageHero | VideoHero;

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function PageHeader(props: PageHeaderProps) {
  const {
    title,
    description,
    heightVh = 90,
    parallaxStrength = 0.3,
    overlayClassName = "bg-black/40",
    action,
  } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const spacerRef = useRef<HTMLElement | null>(null);

  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const headerHeightRef = useRef<number>(0);
  const lastHiddenRef = useRef<boolean>(false);

  const tickingRef = useRef<boolean>(false);

  // Slow mode detection
  const slowModeRef = useRef<boolean>(false);
  const lastRafTimeRef = useRef<number>(0);
  const slowFramesRef = useRef<number>(0);

  // Quantize updates a bit
  const lastMediaShiftPxRef = useRef<number>(Number.NaN);
  const lastTextShiftPxRef = useRef<number>(Number.NaN);

  useEffect(() => {
    const container = containerRef.current;
    const spacer = spacerRef.current;
    const textEl = textRef.current;
    if (!container || !spacer || !textEl) return;

    const getReduceMotion = () =>
      typeof window !== "undefined" &&
      !!window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let reduceMotion = getReduceMotion();

    const updateHeaderHeight = () => {
      const h = container.offsetHeight;
      headerHeightRef.current = h > 0 ? h : 0;
    };

    const resetTransforms = () => {
      const img = imageRef.current;
      if (img) img.style.transform = "translate3d(0, 0, 0)";
      const vid = videoRef.current;
      if (vid) vid.style.transform = "translate3d(0, 0, 0)";
      textEl.style.transform = "translate3d(0, 0, 0)";

      lastMediaShiftPxRef.current = Number.NaN;
      lastTextShiftPxRef.current = Number.NaN;
    };

    const setHidden = (hidden: boolean) => {
      if (lastHiddenRef.current === hidden) return;
      lastHiddenRef.current = hidden;

      container.style.opacity = hidden ? "0" : "1";
      container.style.pointerEvents = hidden ? "none" : "auto";

      const vid = videoRef.current;
      if (vid) {
        if (hidden) {
          vid.pause();
        } else {
          const p = vid.play();
          if (p && typeof p.catch === "function") p.catch(() => { });
        }
      }
    };

    let removeScrollListener: (() => void) | null = null;

    const enterSlowMode = () => {
      if (slowModeRef.current) return;
      slowModeRef.current = true;

      // Make it actually feel different:
      // convert from fixed overlay to in-flow header.
      container.style.position = "relative";
      container.style.inset = "auto";
      container.style.top = "auto";
      container.style.left = "auto";
      container.style.right = "auto";

      // Drop paint containment/isolation that were useful for fixed compositing
      // but can be counterproductive in software rendering.
      container.style.contain = "none";
      container.style.isolation = "auto";

      // Remove the spacer so layout is correct in-flow
      spacer.style.display = "none";

      // Stop parallax writes
      resetTransforms();

      // Stop any extra scroll work
      if (removeScrollListener) removeScrollListener();

      // If video is present, pause it to reduce CPU in software mode
      if (videoRef.current) videoRef.current.pause();

      // Keep visible
      container.style.opacity = "1";
      container.style.pointerEvents = "auto";
      lastHiddenRef.current = false;
    };

    const applyParallax = () => {
      if (reduceMotion) return;
      if (slowModeRef.current) return;

      const headerHeightPx = headerHeightRef.current || container.offsetHeight;
      if (headerHeightPx <= 0) return;

      const scrollY = window.scrollY || 0;

      if (scrollY >= headerHeightPx) {
        setHidden(true);
        return;
      }

      setHidden(false);

      const ratio = Math.min(scrollY / headerHeightPx, 1);
      const vh = window.innerHeight || 0;

      const mediaShift = ratio * parallaxStrength * vh;
      const textShift = mediaShift * 0.75;

      const mediaShiftQ = Math.round(mediaShift);
      const textShiftQ = Math.round(textShift);

      if (lastMediaShiftPxRef.current !== mediaShiftQ) {
        lastMediaShiftPxRef.current = mediaShiftQ;
        const img = imageRef.current;
        if (img) img.style.transform = `translate3d(0, ${-mediaShiftQ}px, 0)`;
        const vid = videoRef.current;
        if (vid) vid.style.transform = `translate3d(0, ${-mediaShiftQ}px, 0)`;
      }

      if (lastTextShiftPxRef.current !== textShiftQ) {
        lastTextShiftPxRef.current = textShiftQ;
        textEl.style.transform = `translate3d(0, ${-textShiftQ}px, 0)`;
      }
    };

    const maybeEnterSlowMode = (rafNow: number) => {
      if (slowModeRef.current) return;

      const last = lastRafTimeRef.current;
      lastRafTimeRef.current = rafNow;

      if (last === 0) return;

      const dt = rafNow - last;

      if (dt > 15) {
        slowFramesRef.current += 1;
      } else {
        slowFramesRef.current = Math.max(0, slowFramesRef.current - 1);
      }

      if (slowFramesRef.current >= 6) {
        console.log("Entering slow mode due to low framerate");
        enterSlowMode();
      }
    };

    const onScroll = () => {
      if (slowModeRef.current) return;
      if (tickingRef.current) return;

      tickingRef.current = true;
      requestAnimationFrame((now) => {
        tickingRef.current = false;
        maybeEnterSlowMode(now);
        applyParallax();
      });
    };

    const onResize = () => {
      updateHeaderHeight();
      applyParallax();
    };

    // Reduced motion changes
    let mql: MediaQueryList | null = null;
    const onMotionChange = () => {
      reduceMotion = getReduceMotion();

      if (reduceMotion) {
        // If user turns on reduced motion, stop everything and make it stable.
        enterSlowMode();
      } else {
        // Do not exit slow mode automatically, it was likely entered for performance.
        updateHeaderHeight();
        applyParallax();
      }
    };

    if (typeof window !== "undefined" && window.matchMedia) {
      mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (typeof mql.addEventListener === "function") {
        mql.addEventListener("change", onMotionChange);
      } else if (typeof mql.addListener === "function") {
        mql.addListener(onMotionChange);
      }
    }

    // Observe size changes
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        updateHeaderHeight();
        applyParallax();
      });
      ro.observe(container);
    }

    updateHeaderHeight();
    applyParallax();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    removeScrollListener = () => {
      window.removeEventListener("scroll", onScroll);
      removeScrollListener = null;
    };

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();

      if (mql) {
        if (typeof mql.removeEventListener === "function") {
          mql.removeEventListener("change", onMotionChange);
        } else if (typeof mql.removeListener === "function") {
          mql.removeListener(onMotionChange);
        }
      }
    };
  }, [parallaxStrength, heightVh]);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-x-0 top-0 z-0 overflow-hidden transition-opacity duration-500"
        style={{
          height: `${heightVh}vh`,
          opacity: 1,
          pointerEvents: "auto",
          contain: "paint",
          isolation: "isolate",
        }}
        aria-label="Intro header"
      >
        {"image" in props ? (
          <div
            ref={imageRef}
            className="absolute inset-0 will-change-transform"
            style={{
              backgroundImage: `url(${props.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "translate3d(0, 0, 0)",
            }}
            aria-hidden="true"
          />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover will-change-transform pointer-events-none"
            style={{ transform: "translate3d(0, 0, 0)" }}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="metadata"
            poster={props.poster}
            aria-label="Background video"
            disablePictureInPicture
          >
            <source src={props.videoSrc} type={props.videoType ?? "video/mp4"} />
          </video>
        )}

        <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden="true" />

        <div
          ref={textRef}
          className="relative h-full flex items-center justify-center will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <div className="text-center px-6">
            <h1
              className={`${bebasNeue.className} antialiased text-gray-100 text-6xl md:text-7xl lg:text-[9rem] tracking-wider`}
            >
              {title}
            </h1>

            {description && (
              <p className="text-white/90 text-lg md:text-2xl lg:text-3xl max-w-4xl mx-auto">
                {description}
              </p>
            )}

            {action && (
              <div className="mt-8">
                {"href" in action ? (
                  <Link href={action.href || "#"} aria-label={action.label}>
                    <Button className="w-64 h-10 md:w-72 md:h-14 px-8 text-base uppercase tracking-wide">
                      {action.label}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={action.onClick}
                    className="w-64 h-10 md:w-72 md:h-14 px-8 text-base uppercase tracking-wide"
                    aria-label={action.label}
                  >
                    {action.label}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <section ref={spacerRef} style={{ height: `${heightVh}vh` }} aria-hidden="true" />
    </>
  );
}
