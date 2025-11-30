"use client";

import PageBody from "@/components/common/page/page-body";
import PageHeader from "@/components/common/page/page-header";
import { aboutInfo } from "@/lib/data/about";
import Image from "next/image";

export default function About() {
  return (
    <div className="relative min-h-screen bg-background font-sans">
      <PageHeader
        videoSrc="/assets/videos/about_video.webm"
        videoType="video/webm"
        title="About Saga Farmann"
        description="Saga Farmann is an archaeological reconstruction of the Klåstadship, often referred to as Norway's fourth Viking ship."
        heightVh={90}
      />

      <PageBody>
        <div className="grid gap-10">
          {aboutInfo.map((info) => (
            <div
              key={info.id}
              className={`grid md:grid-cols-2 items-center gap-6 ${info.reverse ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""}`}
            >
              <div className="relative w-full aspect-video">
                <Image
                  src={info.image}
                  alt={info.title}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority={false}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">{info.title}</h2>
                <p>{info.description}</p>
              </div>
            </div>
          ))}
        </div>
      </PageBody>
    </div>
  );
}
