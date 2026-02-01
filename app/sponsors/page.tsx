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
        description="The epic Voyage of Saga Farmann is made possible by the generous support of our sponsors, helping us share Viking history and craftmanship accross Europe."
        heightVh={90}
      />

      <PageBody>
         {/* Social section */}
        <section className="w-full px-4 py-16 sm:py-5 bg-background">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mx-auto text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
                SUPPORT THE VIKINGS
              </h2>
              <p className="text-base sm:text-lg md:text-2xl text-muted-foreground mb-0 leading-relaxed">
                Saga Farmann is proudly supported by a diverse group of sponsors who share our passion for Viking heritage and maritime adventure. Building, sailing and maintaining a Viking longship is a costly endeavor, and we rely on sponsorship and partnerships to bring this historic vessel to life and keep her sailing. Their support enables us to continue our mission of education, cultural exchange, and the preservation of traditional shipbuilding techniques.
              </p>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
          {sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>
      </PageBody>
    </div>
  );
}
