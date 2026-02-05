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
        title="SAGA MIDGARD 2026"
        description="Application for this years voyage is now open. Join us for an unforgettable adventure sailing the Viking way from England to Sweden visiting Belgium, Holland, Germany and Denmark."
        heightVh={90}
      />

      <PageBody>
        <div className="flex justify-center items-center container mx-auto px-4">
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
            <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full border border-border bg-background">
              <MailOpen className="size-7 text-muted-foreground" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Apply to join the 2026 Crew NOW!
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              This years voyage consists of 11 stages that one can apply for. Each stage is either one or two weeks long and you can apply for as many stages as you like. The application deadline is the 2st of March 2026.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSe9YHbZusauCtWN-44nS3z2mxS73vhjuJBBVONCfrM51xz4-g/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                APPLY HERE
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