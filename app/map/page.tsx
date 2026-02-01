import MapOl from "@/components/common/map/map";
import MapLoading from "@/components/common/map/map-loading";
import PageBody from "@/components/common/page/page-body";
import PageHeader from "@/components/common/page/page-header";
import { getLive, getStages, getTrips, getWaypoints } from "@/lib/server/map";
import { Suspense } from "react";

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
        <section className="h-[90vh] w-full flex flex-row gap-4">
          <div className="w-lg h-full flex-col justify-center bg-secondary p-4 rounded-md hidden md:flex">
            <h1 className="text-2xl text-center">The route for this year will soon be published.</h1>
            <p className="text-muted-foreground text-center">Stay tuned for updates!</p>
          </div>
          <Suspense fallback={<MapLoading />}>
            <MapOl trips={trips} stages={stages} waypoints={waypoints} live={live} interactive showAllRoutes />
          </Suspense>
        </section>
        <section className="container mx-auto">

        </section>
      </PageBody>
    </div>
  );
}
