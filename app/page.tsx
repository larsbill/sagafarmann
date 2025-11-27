import HeroHeader from "@/components/common/page/page-header";
import SosialMedia from "@/components/common/sosial-media";
import { getSosialMediaPosts } from "@/lib/server/sosialmedia";
import { Suspense } from "react";

export default function Home() {

  const posts = getSosialMediaPosts();

  return (
    <div className="relative min-h-screen bg-background font-sans">
      <HeroHeader
        videoSrc="/landing_page_video.webm"
        videoType="video/webm"
        title="Experience the voyage"
        description="Discover new worlds, explore the unknown, and join the journey"
        heightVh={100}
        parallaxStrength={0.3}
        action={{ label: "Join Us", href: "/join" }}
      />

      <main className="relative z-10 w-full">
        <section className="h-screen w-full bg-background flex items-center justify-center">
          <Suspense fallback={<div>Loading social media posts...</div>}>
            <SosialMedia posts={posts} />
          </Suspense>
        </section>

        <section className="h-screen w-full bg-background flex items-center justify-center">
          <h2 className="text-2xl md:text-3xl">Section Two</h2>
        </section>

        <section className="h-screen w-full bg-background flex items-center justify-center">
          <h2 className="text-2xl md:text-3xl">Section Three</h2>
        </section>
      </main>
    </div>
  );
}
