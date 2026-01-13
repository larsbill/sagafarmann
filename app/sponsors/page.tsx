"use client";

import PageBody from "@/components/common/page/page-body";
import PageHeader from "@/components/common/page/page-header";
import SponsorCard from "@/components/sponsors/sponsor-card";
import { sponsors } from "@/lib/data/sponsors";

export default function Sponsors() {
  return (
    <div className="relative min-h-screen bg-background font-sans">
      <PageHeader
        image="/header.jpg"
        title="Saga Farmann Sponsors"
        description="Saga Farmann is an archaeological reconstruction of the Klåstadship, referred to as Norway's fourth Viking ship."
        heightVh={90}
      />

      <PageBody>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-24">
          {sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>
      </PageBody>
    </div>
  );
}
