import AutoMarquee from "@/components/common/auto-marquee";
import HeroHeader from "@/components/common/page/page-header";
import { SosialMediaCardSkeleton, SosialMediaGroup } from "@/components/common/sosial-media";
import SponsorMarquee from "@/components/sponsors/sponsor-marquee";
import { getSosialMediaPosts } from "@/lib/server/sosialmedia";
import { sponsors } from "@/lib/data/sponsors";
import { Suspense } from "react";
import MapOl from "@/components/common/map/map";
import { getLive, getStages, getTrips, getWaypoints } from "@/lib/server/map";
import MapLoading from "@/components/common/map/map-loading";
import { shuffleArray } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SponsorSpotlight from "@/components/sponsors/sponsor-spotlight";

export default function Home() {

  const posts = getSosialMediaPosts();

  const trips = getTrips();
  const stages = getStages();
  const waypoints = getWaypoints();
  const live = getLive();

  const shuffledSponsors = shuffleArray(sponsors);

  return (
    <div className="relative min-h-screen bg-background font-sans">
      <HeroHeader
        videoSrc="/assets/videos/landing_page_video.webm"
        videoType="video/webm"
        title="Experience the voyage"
        description="Discover new worlds, explore the unknown, and join the journey"
        heightVh={100}
        parallaxStrength={0.3}
      />

      <main className="relative z-10 w-full bg-background">
        <section className="w-full min-h-screen flex items-center justify-center px-4 pt-24">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="flex flex-col items-start text-left">
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Live Voyage Tracking
              </h2>

              <p className="text-2xl max-w-xl text-muted-foreground mb-10">
                Follow the vessel in real time as it sails between ports. Track progress, view the current
                route, and stay connected to the ongoing journey across the seas.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Button asChild size="lg">
                  <Link href="/map">
                    Open full live map
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/voyage">
                    Voyage details
                  </Link>
                </Button>
              </div>
            </div>

            <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl border border-border">
              <Suspense fallback={<MapLoading />}>
                <MapOl trips={trips} stages={stages} waypoints={waypoints} live={live} />
              </Suspense>
            </div>

          </div>
        </section>


        <section className="w-full bg-card py-32">
          <div className="mx-auto container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="flex flex-col items-start text-left px-4 sm:px-0">
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Our Proud Sponsors
              </h2>

              <p className="text-2xl max-w-xl text-muted-foreground mb-10">
                Their generosity helps make the voyage possible. With their support the mission grows stronger,
                the journey becomes richer, and innovation continues to thrive.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Button asChild size="lg">
                  <Link href="/sponsors">
                    Explore Sponsors
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/donate">
                    Donate
                  </Link>
                </Button>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <SponsorSpotlight sponsors={shuffledSponsors} intervalMs={7000} />
            </div>
          </div>

          <div className="w-full bg-secondary-foreground mt-24">
            <AutoMarquee fadeEdges={false}>
              {shuffledSponsors.map((item, i) => (
                <SponsorMarquee key={i} sponsor={item} />
              ))}
            </AutoMarquee>
          </div>
        </section>

        <section className="w-full flex items-center justify-center px-4 py-32">
          <div className="container w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Suspense fallback={[...Array(3)].map((_, idx) => (<SosialMediaCardSkeleton key={idx} />))}>
                <SosialMediaGroup posts={posts} />
              </Suspense>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
