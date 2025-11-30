"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Copy, CopyCheck, ExternalLink } from "lucide-react";
import { Sponsor } from "./sponsor-marquee";

type SponsorCardProps = {
  sponsor: Sponsor;
  className?: string;
};

export default function SponsorCard({ sponsor, className }: SponsorCardProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(sponsor.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    }
  }, [sponsor.link]);

  return (
    <article
      id={`sponsor-${sponsor.name.toLowerCase().replace(/\s+/g, "-")}`}
      className={cn(
        "group relative h-full rounded-lg overflow-clip p-5 border border-border bg-card shadow-sm",
        className
      )}
    >
      {/* Image */}
      <div className="relative bg-gray-300 rounded-sm overflow-clip">
        <div className="relative w-full h-48">
          <Image
            src={sponsor.image}
            alt={sponsor.name}
            fill
            className="object-contain p-6"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button asChild className="inline-flex items-center gap-2">
            <Link
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${sponsor.name} website`}
            >
              Visit website
              <ExternalLink />
            </Link>
          </Button>

          <Button
            type="button"
            onClick={onCopy}
            aria-label={`Copy link to ${sponsor.name}`}
            variant="outline"
            className="inline-flex items-center gap-2"
          >
            {copied ? "Copied!" : "Copy link"}
            {copied ? <CopyCheck /> : <Copy />}
          </Button>
        </div>

        <Link
          href={sponsor.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-foreground/50 hover:text-foreground/80 transition-colors whitespace-nowrap"
        >
          {new URL(sponsor.link).hostname}
        </Link>
      </div>

      <div className="flex flex-col h-full pt-5">
        <header className="space-y-1">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
            {sponsor.name}
          </h3>
        </header>

        <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
          {sponsor.description}
        </p>
      </div>
    </article>
  );
}
