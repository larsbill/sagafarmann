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
        title="Saga Farmann Map"
        description="Saga Farmann is an archaeological reconstruction of the Klåstadship, often referred to as Norway's fourth Viking ship."
        heightVh={90}
      />
      <PageBody fullWidth>
        <section className="h-[90vh] w-full flex flex-row gap-4">
          <div className="w-lg h-full flex flex-col justify-center bg-secondary p-4 rounded-md">
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
