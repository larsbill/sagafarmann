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
        description="Saga Farmann is an archaeological reconstruction of the Klåstadship, often referred to as Norway's fourth Viking ship."
        heightVh={90}
      />

      <PageBody>
        <section className="space-y-10 py-24">
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
