"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      setScrolled(scrollY > vh * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-16 backdrop-blur transition-opacity duration-500",
          scrolled ? "opacity-0" : "opacity-100"
        )}
      />

      <div
        className={cn(
          "relative mx-auto w-full px-4 transition-all duration-500",
          scrolled ? "max-w-5xl mt-4" : "max-w-7xl"
        )}
      >
        <div
          className={cn(
            "relative flex h-16 items-center px-3 sm:px-4 transition-all duration-500",
            scrolled
              ? "rounded-xl bg-background/70 backdrop-blur-xl ring-1 ring-white/10 shadow-lg"
              : "rounded-none bg-transparent ring-0 shadow-none"
          )}
        >
          {/* Left Section */}
          <div className="flex items-center gap-2 shrink-0 relative z-10">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/logo.png"
                alt="Logo"
                width={165}
                height={40}
                className={cn(
                  "w-auto object-contain transition-all duration-500",
                  scrolled ? "h-10" : "h-12"
                )}
                priority
              />
            </Link>
          </div>

          {/* Centered Navigation */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
            <nav className="flex items-center gap-6 text-sm font-medium text-foreground/90 pointer-events-auto">
              <Link href="/sponsors" className="hover:text-foreground">Sponsors</Link>
              <Link href="/about" className="hover:text-foreground">About Us</Link>
              <Link href="/info" className="hover:text-foreground">Info</Link>
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 ml-auto relative z-10">
            <Link
              href="/join"
              className="hidden sm:inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Join Us
            </Link>

            <Link
              href="/menu"
              className="md:hidden rounded-md px-3 py-2 text-sm font-medium text-foreground/90 hover:bg-accent hover:text-accent-foreground"
              aria-label="Open menu"
            >
              Menu
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
