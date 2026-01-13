import AutoMarquee from "@/components/common/auto-marquee";
import PageHeader from "@/components/common/page/page-header";
import SponsorMarquee from "@/components/sponsors/sponsor-marquee";
import { sponsors } from "@/lib/data/sponsors";
import { Suspense } from "react";
import MapOl from "@/components/common/map/map";
import { getLive, getStages, getTrips, getWaypoints } from "@/lib/server/map";
import MapLoading from "@/components/common/map/map-loading";
import { shuffleArray } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SponsorSpotlight from "@/components/sponsors/sponsor-spotlight";
import { socialMediaList } from "@/lib/data/socialmedia";
import { SocialMediaCard } from "@/components/common/sosial-media";

export default function Home() {

  const trips = getTrips();
  const stages = getStages();
  const waypoints = getWaypoints();
  const live = getLive();

  const shuffledSponsors = shuffleArray(sponsors);

  return (
    <div className="relative min-h-screen bg-background font-sans">
      <PageHeader
        videoSrc="/assets/videos/landing_page_video.webm"
        videoType="video/webm"
        title="Experience Saga Farmann"
        description="Discover new worlds, explore the unknown, and join the adventure"
        heightVh={100}
        parallaxStrength={0.3}
      />

      <main className="relative z-10 w-full bg-card">
        <section className="w-full flex items-center justify-center px-4 py-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

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
                  <Link href="https://live.sagafarmann.com" target="_blank" rel="noopener noreferrer">
                    Open full live map
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/map">
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

        <section className="w-full flex items-center justify-center px-4 py-32 bg-background">
          <div className="container w-full relative">

            <div className="mx-auto text-center mb-16">
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
                EXPERIENCE THE ADVENTURE
              </h2>
              <p className="text-2xl text-muted-foreground mb-10">
                Join the voyage, follow us on social media and get inspired by the journey and the crew behind it.
              </p>
            </div>

            <div className="flex w-full justify-center">
              <div className="grid grid-cols-1 gap-6 md:hidden">
                {socialMediaList
                  .filter((i) => !i.hiddenOnMobile)
                  .map((item) => (
                    <SocialMediaCard key={item.id} item={item} />
                  ))}
              </div>

              <div className="hidden md:grid gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 w-fit">
                {socialMediaList.slice(0, 9).map((item) => (
                  <SocialMediaCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-card py-48 pb-24">
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

      </main>
    </div>
  );
}
