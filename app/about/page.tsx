"use client";

import PageBody from "@/components/common/page/page-body";
import PageHeader from "@/components/common/page/page-header";

export default function About() {
  return (
    <div className="relative min-h-screen bg-background font-sans">
      <PageHeader
        image="/header.jpg"
        title="About Saga Farmann"
        description="Saga Farmann is an archaeological reconstruction of the Klåstadship, often referred to as Norway's fourth Viking ship."
        heightVh={85}
      />

      <PageBody>
        <section className="space-y-10">
          <h2 className="text-3xl font-semibold">Historical Background</h2>
          <p>
            Saga Farmann is the sailing reconstruction of the Klåstadship, a Viking Age merchant vessel discovered near
            Tjome in 1893. Dated to the late ninth century, the original ship provided rare insight into the design and
            function of long-distance trading vessels. While the Oseberg, Gokstad, and Tune ships were primarily burial
            ships, the Klåstadship offered a view into everyday seafaring and commercial life during the Viking Age.
          </p>

          <h2 className="text-3xl font-semibold">Reconstruction and Research</h2>
          <p>
            The reconstruction project began with a commitment to experimental archaeology. Builders, archaeologists, and
            craftsmen followed traditional shipbuilding practices based on surviving timbers, tool marks, and comparable
            vessels from the same period. Every decision about materials, planking, tools, and construction technique was
            grounded in archaeological evidence. The resulting vessel, Saga Farmann, reflects what a functional Viking
            merchant ship would have looked and sailed like more than one thousand years ago.
          </p>

          <h2 className="text-3xl font-semibold">A Working Viking Age Vessel</h2>
          <p>
            Saga Farmann demonstrates the capabilities of Viking Age coastal traders. Ships of this type typically carried
            goods such as whetstones, iron, cloth, grain, and craft materials. Their broad hulls, sturdy frames, and large
            sail areas made them ideal for long trading routes across the Skagerrak, the Baltic, and the rivers that linked
            northern Europe to markets deep inland. The ship also provides a platform for studying navigation, crew
            coordination, cargo handling, and life aboard during long journeys.
          </p>

          <h2 className="text-3xl font-semibold">Project Mission</h2>
          <p>
            The mission of the Saga Farmann project is to preserve and communicate Viking Age maritime heritage through
            research, reconstruction, and active use. The ship serves as a public educational resource, a tool for
            scientific experimentation, and a cultural link between past and present. Demonstrations, workshops, and
            lectures allow visitors to learn through direct experience with the vessel and its crew.
          </p>

          <h2 className="text-3xl font-semibold">Voyages and Activities</h2>
          <p>
            The ship undertakes voyages that test historical theories about ship handling, speed, endurance, and coastal
            navigation. Crew members participate in training programs that explore rowing, sailing, maintenance, and
            period-appropriate seamanship. The vessel also appears at maritime festivals, museum events, and educational
            gatherings, creating opportunities for collaboration with researchers and cultural institutions.
          </p>

          <h2 className="text-3xl font-semibold">People Behind the Project</h2>
          <p>
            Saga Farmann is maintained and sailed by a dedicated community of archaeologists, shipbuilders, volunteers,
            historians, and sailors. Their shared work keeps the vessel active as a living laboratory for understanding the
            Viking Age. Partnerships with museums, universities, and maritime organizations support both research and
            public outreach.
          </p>

          <h2 className="text-3xl font-semibold">Visit and Participate</h2>
          <p>
            Visitors can learn about the ship through guided tours, sailing experiences when available, and public events.
            The project welcomes individuals interested in volunteering, supporting the vessel, or participating in
            educational programs. Information about upcoming activities, voyages, and opportunities to get involved is
            provided through the project&apos;s public channels.
          </p>
        </section>
      </PageBody>
    </div>
  );
}
