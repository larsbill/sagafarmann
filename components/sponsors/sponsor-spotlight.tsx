"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Sponsor } from "./sponsor-marquee";

type SponsorSpotlightProps = {
  sponsors: Sponsor[];
  intervalMs?: number;
  className?: string;
};

type Direction = "next" | "prev";

export default function SponsorSpotlight({
  sponsors,
  intervalMs = 7000,
  className,
}: SponsorSpotlightProps) {
  const length = sponsors.length;
  const hasMultiple = length > 1;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>("next");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const computeDirection = useCallback((from: number, to: number): Direction => {
    if (from === to) return "next";
    if ((from + 1) % length === to) return "next";
    if ((from - 1 + length) % length === to) return "prev";
    return to > from ? "next" : "prev";
  }, [length]);

  const clearAuto = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAuto = useCallback(() => {
    if (!hasMultiple) return;
    clearAuto();
    intervalRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % length;
        setDirection(computeDirection(prev, next));
        return next;
      });
    }, intervalMs);
  }, [hasMultiple, intervalMs, length, computeDirection]);

  useEffect(() => {
    startAuto();
    return clearAuto;
  }, [intervalMs, hasMultiple, length, startAuto]);

  const sponsor = sponsors[index];

  return (
    <Link
      href={sponsor.link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("block w-full", className)}
    >
      <div className="relative w-full max-w-sm mx-auto">
        <SponsorSlide key={sponsor.name + index} sponsor={sponsor} direction={direction} />

        {hasMultiple && (
          <div className="mt-4 flex w-4/5 mx-auto items-center gap-2">
            {sponsors.map((s, i) => (
              <button
                key={s.name + i}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  clearAuto();
                  setDirection(computeDirection(index, i));
                  setIndex(i);
                  startAuto();
                }}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-all duration-300",
                  i === index
                    ? "bg-foreground flex-[1.75] scale-y-125"
                    : "bg-foreground/30 hover:bg-foreground/50"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

type SponsorSlideProps = {
  sponsor: Sponsor;
  direction: Direction;
};

function SponsorSlide({ sponsor, direction }: SponsorSlideProps) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const initial =
    direction === "next"
      ? "translate-x-6 opacity-0"
      : "-translate-x-6 opacity-0";

  const final = "translate-x-0 opacity-100";

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-6 transition-all duration-500",
        entered ? final : initial
      )}
    >
      <div className="w-full h-42 rounded-md bg-secondary-foreground flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={sponsor.image}
            alt={sponsor.name}
            fill
            className="object-contain p-6"
          />
        </div>
      </div>

      <h3 className="text-2xl font-semibold tracking-wide">{sponsor.name}</h3>

      <p className="text-sm sm:text-base text-foreground/90 leading-relaxed text-center line-clamp-6">
        {sponsor.description}
      </p>
    </div>
  );
}
