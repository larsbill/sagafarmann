import PageBody from "@/components/common/page/page-body";
import PageHeader from "@/components/common/page/page-header";
import { getStages, getTrips, getWaypoints } from "@/lib/data/map/map";
import { getLive } from "@/lib/server/map";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MapSection from "@/components/common/map/map-sectiont";

export default function Map() {
  const trips = getTrips();
  const stages = getStages();
  const waypoints = getWaypoints();
  const live = getLive();

  return (
    <div className="relative min-h-screen bg-background font-sans">
      <PageHeader
        videoSrc="/assets/videos/about_video.webm"
        videoType="video/webm"
        title="SAGA MIDGARD 2026"
        description="Saga Farmann will be sailing from the England to Sweden in the summer of 2026, during which she will visit ports in Benelux, Germany, Denmark and Sweden. Follow and visit us along the route. We welcome you on board!"
        heightVh={90}
      />
      <PageBody fullWidth>
        <section className="w-full px-4 py-16 sm:py-5 bg-background">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mx-auto text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
                SAGA MIDGARD 2026 <br /> THE VOYAGE CONTINUES
              </h2>
              <p className="text-base sm:text-lg md:text-2xl text-muted-foreground mb-0 leading-relaxed">
                This summer, Saga Farmann embarks on yet another exciting voyage, this time from England to Sweden. The crew will be retracing historic Viking routes and visiting key ports in Benelux, Germany, Denmark, and Sweden. Study this years route on the map below and make sure to visit us along the way. We look forward to welcoming you on board for an unforgettable experience!
              </p>
              <div className="flex w-full flex-row gap-3 sm:gap-4 mb-6 sm:mb-12 py-10 button-container justify-center">
                <Button asChild className="h-10 sm:w-auto sm:h-16 sm:px-10 sm:text-lg">
                  <Link href="https://live.sagafarmann.com" target="_blank" rel="noopener noreferrer">
                    Open full live map
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="h-[90vh] w-[80vw] mx-auto px-4">
          <div className="relative h-full w-full overflow-hidden rounded-md">
            <MapSection
              trips={trips}
              stages={stages}
              waypoints={waypoints}
              live={live}
              interactive
              showAllRoutes
            />
          </div>
        </section>
      </PageBody>
    </div>
  );
}
