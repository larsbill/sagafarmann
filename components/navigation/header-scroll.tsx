"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const ratio = Math.min(scrollY / (vh * 0.9), 1);
      setProgress(ratio);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const lerp = (a: number, b: number) => a + (b - a) * progress;

  const maxWidthPx = lerp(1400, 1024);
  const containerMarginTopPx = lerp(0, 16);
  const borderRadiusPx = lerp(0, 12);
  const bgAlpha = lerp(0, 0.7);
  const ringAlpha = lerp(0, 0.1);
  const blurPx = lerp(0, 16);
  const shadowAlpha = lerp(0, 0.25);
  const logoHeightPx = lerp(48, 40);
  const ctaPaddingPx = lerp(54, 32);
  const overlayOpacity = 1 - progress;

  const mobileBtnBgAlpha = 0.25 * (1 - progress);
  const mobileBtnRingAlpha = 0.25 * (1 - progress);

  const mobilePaddingLeft = lerp(0, 16);
  const mobilePaddingRight = lerp(0, 12);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16"
        style={{
          opacity: overlayOpacity,
          backdropFilter: `blur(${blurPx}px)`,
          WebkitBackdropFilter: `blur(${blurPx}px)`
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-background/40 to-transparent" />
      </div>

      <div
        className="relative mx-auto w-full px-4"
        style={{
          maxWidth: `${maxWidthPx}px`,
          marginTop: `${containerMarginTopPx}px`
        }}
      >
        <div
          className="relative flex h-16 items-center px-0 sm:px-4"
          style={{
            paddingLeft: isMobile ? `${mobilePaddingLeft}px` : undefined,
            paddingRight: isMobile ? `${mobilePaddingRight}px` : undefined,
            borderRadius: `${borderRadiusPx}px`,
            backgroundColor: `rgba(30, 42, 46, ${bgAlpha})`,
            backdropFilter: `blur(${blurPx}px)`,
            WebkitBackdropFilter: `blur(${blurPx}px)`,
            boxShadow: `0 10px 30px rgba(0,0,0,${shadowAlpha})`,
            outline: `1px solid rgba(255,255,255,${ringAlpha})`
          }}
        >
          <div className="flex items-center gap-2 shrink-0 relative z-10">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/logo.png"
                alt="Logo"
                width={165}
                height={40}
                className="w-auto object-contain"
                style={{ height: `${logoHeightPx}px` }}
                priority
              />
            </Link>
          </div>

          <nav className="absolute inset-0 hidden md:flex items-center justify-center gap-6 text-sm font-medium text-foreground/90">
            <Link href="/sponsors" className="hover:text-foreground">Sponsors</Link>
            <Link href="/about" className="hover:text-foreground">About Us</Link>
            <Link href="/crew" className="hover:text-foreground">Crew Info</Link>
            <Link href="/viking-show" className="hover:text-foreground">Viking Show</Link>
          </nav>

          <div className="flex items-center gap-2 ml-auto relative z-10">
            <Link
              href="/join"
              className="hidden sm:inline-flex rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              style={{ paddingInline: `${ctaPaddingPx}px` }}
            >
              Join Us
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <div
                  className="md:hidden flex justify-center items-center w-10 h-10 rounded-md"
                  aria-label="Open menu"
                  style={{
                    backgroundColor: `rgba(30,42,46,${mobileBtnBgAlpha})`,
                    outline: `1px solid rgba(255,255,255,${mobileBtnRingAlpha})`
                  }}
                >
                  <Menu className="w-5 h-5" />
                </div>
              </SheetTrigger>

              <SheetContent
                side="top"
                className="p-0 border-b gap-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
              >
                <SheetHeader className="px-4 py-3 border-b">
                  <SheetTitle className="text-left">
                    <SheetClose asChild>
                      <Link href="/" className="flex items-center gap-2 shrink-0">
                        <Image
                          src="/logo.png"
                          alt="Logo"
                          width={160}
                          height={30}
                          className="object-contain"
                          style={{ height: `${logoHeightPx}px` }}
                          priority
                        />
                      </Link>
                    </SheetClose>
                  </SheetTitle>
                </SheetHeader>

                <div className="px-4 py-3">
                  <nav className="grid gap-1 text-sm font-medium">
                    <SheetClose asChild>
                      <Link
                        href="/sponsors"
                        className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                      >
                        Sponsors
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/about"
                        className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                      >
                        About Us
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/crew"
                        className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                      >
                        Crew Info
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/viking-show"
                        className="rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                      >
                        Viking Show
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        href="/join"
                        className="my-2 inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                      >
                        Join Us
                      </Link>
                    </SheetClose>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
