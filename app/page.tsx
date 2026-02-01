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
        {/* Live map section */}
        <section className="w-full px-4 py-16 sm:py-24 lg:py-40">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-start lg:items-center">
              <div className="flex flex-col items-start text-left">
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
                  Live Voyage Tracking
                </h2>

                <p className="text-base sm:text-lg md:text-2xl max-w-xl text-muted-foreground mb-6 sm:mb-10 leading-relaxed">
                  Follow the vessel in real time as it sails between ports. Track progress, view the current
                  route, and stay connected to the ongoing journey across the seas.
                </p>

                <div className="flex w-full flex-row gap-3 sm:gap-4 mb-6 sm:mb-12">
                  <Button asChild className="h-10 sm:w-auto sm:h-16 sm:px-10 sm:text-lg">
                    <Link href="https://live.sagafarmann.com" target="_blank" rel="noopener noreferrer">
                      Open full live map
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" className="h-10 sm:w-auto sm:h-16 sm:px-10 sm:text-lg">
                    <Link href="/map">Voyage details</Link>
                  </Button>
                </div>
              </div>

              <div className="w-full rounded-xl overflow-hidden shadow-xl border border-border">
                <div className="w-full h-[360px] sm:h-[420px] md:h-[520px] lg:h-[600px]">
                  <Suspense fallback={<MapLoading />}>
                    <MapOl trips={trips} stages={stages} waypoints={waypoints} live={live} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social section */}
        <section className="w-full px-4 py-16 sm:py-24 bg-background">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mx-auto text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
                EXPERIENCE THE ADVENTURE
              </h2>
              <p className="text-base sm:text-lg md:text-2xl text-muted-foreground mb-0 leading-relaxed">
                Join the voyage, follow us on social media and get inspired by the journey and the crew behind it.
              </p>
            </div>

            <div className="flex w-full justify-center items-center">
              <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 md:hidden">
                {socialMediaList
                  .filter((i) => !i.hiddenOnMobile)
                  .map((item) => (
                    <SocialMediaCard key={item.id} item={item} />
                  ))}
              </div>

              <div className="hidden md:grid gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 w-full">
                {socialMediaList.slice(0, 9).map((item) => (
                  <SocialMediaCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors section */}
        <section className="w-full bg-card px-4 py-16 sm:py-24 lg:py-40 pb-12 sm:pb-16">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-start lg:items-center">
              <div className="flex flex-col items-start text-left">
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
                  Our Proud Sponsors
                </h2>

                <p className="text-base sm:text-lg md:text-2xl max-w-xl text-muted-foreground mb-6 sm:mb-10 leading-relaxed">
                  Their contribution is key to the successful execution of the voyage, and enables the vessel and crew to visit people and places around Europe year after year.
                </p>

                <div className="flex w-full flex-row gap-3 sm:gap-4 mb-6 sm:mb-12">
                  <Button asChild className="h-10 sm:w-auto sm:h-16 sm:px-10 sm:text-lg">
                    <Link href="/sponsors">Explore Sponsors</Link>
                  </Button>
                  <Button asChild variant="secondary" className="h-10 sm:w-auto sm:h-16 sm:px-10 sm:text-lg">
                    <Link href="https://www.paypal.com/donate/?hosted_button_id=2EAXYY2GZBJMY">Donate</Link>
                  </Button>
                </div>
              </div>

              <div className="w-full justify-center hidden lg:flex">
                <SponsorSpotlight sponsors={shuffledSponsors} intervalMs={7000} />
              </div>
            </div>
          </div>

          <div className="w-full bg-secondary-foreground mt-10 sm:mt-16 lg:mt-24">
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
