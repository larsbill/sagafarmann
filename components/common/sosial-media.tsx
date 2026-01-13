"use client";

import { SocialMedia } from "@/types/socialmedia";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export function SocialMediaCard({ item }: { item: SocialMedia }) {
  const hasImage = Boolean(item.image);
  const hasVideo = Boolean(item.video);

  const choice = useMemo<"image" | "video" | "none">(() => {
    if (hasImage && hasVideo) {
      return "image";
    }
    if (hasVideo) return "video";
    if (hasImage) return "image";
    return "none";
  }, [hasImage, hasVideo]);

  const inner = (
    <div className="group block">
      <div className="rounded-lg shadow-md bg-card overflow-hidden w-96 h-96">
        <div className="relative w-full h-full">
          {choice === "image" && item.image ? (
            <Image
              src={item.image}
              alt={item.title || "Social media"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(min-width: 1536px) 11vw, (min-width: 1280px) 11vw, (min-width: 1024px) 16vw, (min-width: 640px) 33vw, 100vw"
            />
          ) : choice === "video" && item.video ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={item.video}
              playsInline
              muted
              loop
              autoPlay
              controls={false}
              preload="metadata"
              poster={item.image}
            />
          ) : (
            <div className="absolute inset-0 bg-secondary flex items-center justify-center p-4">
              <p className="text-center text-secondary-foreground font-medium line-clamp-3">
                {item.title || "Untitled"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (item.url) {
    return (
      <Link
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.title || "Open post"}
      >
        {inner}
      </Link>
    );
  }

  return inner;
}