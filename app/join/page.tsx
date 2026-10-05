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
              Want to join the Saga Midgaard 2026 voyage?
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              The application deadline for this years voyage ended on the 2nd of March 2026. But if you have any questions regarding Saga Farmann, this years voyage or anything else related to the Saga Farmann adventure, please contact us. We are always happy to answer questions and provide more information about the voyage and how to join.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="mailto:contact@sagafarmann.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Contact us
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