"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type Sponsor = {
  id: string | number;
  name: string;
  image: string;
  description: string;
  link: string;
};

type SponsorMarqueeProps = {
  sponsor: Sponsor;
  className?: string;
};

export default function SponsorMarquee({ sponsor, className }: SponsorMarqueeProps) {

  return (
    <Link
      href={sponsor.link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative h-full",
        className
      )}
    >
      <div className="relative overflow-clip">
        <div className="relative w-48 h-20 md:w-96 md:h-42">
          <Image
            src={sponsor.image}
            alt={sponsor.name}
            fill
            draggable={false}
            className="object-contain p-2 md:p-6"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      </div>
    </Link>
  );
}
