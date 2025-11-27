"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

type HeroHeaderProps = ImageHero | VideoHero;

export default function PageHeader(props: HeroHeaderProps) {
  const {
    title,
    description,
    heightVh = 90,
    parallaxStrength = 0.3,
    overlayClassName = "bg-black/40",
    action,
  } = props;

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const ratio = Math.min(scrollY / (vh * (heightVh / 100)), 1);

      setProgress(ratio);
      setVisible(scrollY < vh * (heightVh / 100));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heightVh]);

  const mediaShift = progress * parallaxStrength * (typeof window !== "undefined" ? window.innerHeight : 0);
  const textShift = mediaShift * 0.75;

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-0 overflow-hidden transition-opacity duration-500"
        style={{
          height: `${heightVh}vh`,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
        aria-label="Intro header"
      >
        {/* Background media */}
        {"image" in props ? (
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              backgroundImage: `url(${props.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translateY(-${mediaShift}px)`,
            }}
            aria-hidden="true"
          />
        ) : (
          <video
            className="absolute inset-0 w-full h-full object-cover will-change-transform pointer-events-none"
            style={{ transform: `translateY(-${mediaShift}px)` }}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            poster={props.poster}
            aria-label="Background video"
          >
            <source src={props.videoSrc} type={props.videoType ?? "video/mp4"} />
          </video>
        )}

        <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden="true" />

        <div
          className="relative h-full flex items-center justify-center will-change-transform"
          style={{ transform: `translateY(-${textShift}px)` }}
        >
          <div className="text-center px-6">
            <h1 className="text-white text-4xl md:text-6xl font-bold">{title}</h1>
            {description && (
              <p className="mt-4 text-white/90 text-lg md:text-2xl max-w-3xl mx-auto">
                {description}
              </p>
            )}
            {action && (
              <div className="mt-8">
                {"href" in action ? (
                  <Link href={action.href || ""} aria-label={action.label}>
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

      <section style={{ height: `${heightVh}vh` }} aria-hidden="true" />
    </>
  );
}
