"use client";

import PageBody from "@/components/common/page/page-body";
import PageHeader from "@/components/common/page/page-header";
import CrewCard from "@/components/crew/crew-card";
import { crewInformation, crewRoles } from "@/lib/data/crew";

export default function Info() {
  return (
    <div className="relative min-h-screen bg-background font-sans">
      <PageHeader
        image="/header.jpg"
        title="Crew Information"
        description="Saga Farmann has the best crew in the world. Ready for an adventure of a lifetime sailing the Viking way across the oceans. Here you will find all the information you need as a crew member."
        heightVh={90}
      />

      <PageBody>
        <section className="w-full px-4 py-16 sm:py-5 bg-background">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mx-auto text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
                CREW INFORMATION FOR THE 2026 VOYAGE
              </h2>
              <p className="text-base sm:text-lg md:text-2xl text-muted-foreground mb-0 leading-relaxed">
                Below you will find all the necessary information for crew members joining Saga Farmann for the 2026 voyage. Please read through the details carefully to ensure a smooth and enjoyable experience on board.
              </p>
            </div>
          </div>
        </section>
        <section className="space-y-10 pb-24">
          {crewInformation.map((info) => (
            <CrewCard key={info.name} crew={info} />
          ))}
          {crewRoles.map((info) => (
            <CrewCard key={info.name} crew={info} />
          ))}
        </section>
      </PageBody>
    </div>
  );
}
