import PageBody from "@/components/common/page/page-body";
import PageHeader from "@/components/common/page/page-header";
import { MailOpen } from "lucide-react";
import Link from "next/link";

export default function Join() {
  return (
    <div className="relative min-h-screen bg-background font-sans">
      <PageHeader
        videoSrc="/assets/videos/landing_page_video.webm"
        videoType="video/webm"
        title="Join Saga Farmann"
        description="Become a part of our adventurous voyage"
        heightVh={90}
      />

      <PageBody>
        <div className="flex justify-center items-center container mx-auto px-4">
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
            <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full border border-border bg-background">
              <MailOpen className="size-7 text-muted-foreground" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Joining opens when the 2026 trip is ready
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Want to be part of the adventure? Registration will open soon, giving you the chance to register your interest and apply for a spot on this years crew.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Back to home
              </Link>

              <a
                href="/map"
                className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
              >
                Explore the voyage map
              </a>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Want to be notified? Follow our social channels for announcements.
            </p>
          </div>
        </div>
      </PageBody>
    </div>
  )
}