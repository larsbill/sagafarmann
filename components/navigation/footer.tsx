"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { ReactNode } from "react";

interface MenuItem {
  title: string;
  links: { text: string; url: string }[];
}

interface SocialItem {
  label: string;
  url: string;
  icon: "facebook" | "instagram" | "youtube";
}

interface FooterProps {
  logo?: { src: string; alt: string; url?: string };
  description?: string;
  contact?: { email: string; location: string; mapUrl?: string };
  social?: SocialItem[];
  menuItems?: MenuItem[];
  rightsText?: string;
  madeBy?: { name: string; url: string };
  smallLinks?: { text: string; icon: ReactNode; url: string }[];
}

export default function Footer({
  logo = { src: "/logo.png", alt: "Logo", url: "/" },
  contact = {
    email: "contact@sagafarmann.com",
    location: "Vikingodden Ollebukta 3, 3126 Tønsberg",
  },
  menuItems = [
    {
      title: "Explore",
      links: [
        { text: "About Us", url: "/about" },
        { text: "Viking Show", url: "/viking-show" },
        { text: "Crew Info", url: "/crew" },
        { text: "Sponsors", url: "/sponsors" }
      ]
    },
    {
      title: "Visit",
      links: [
        { text: "Opening Hours", url: "/hours" },
        { text: "Tickets", url: "/tickets" },
        { text: "Location", url: "/location" },
        { text: "FAQ", url: "/faq" }
      ]
    },
    {
      title: "Programs",
      links: [
        { text: "Workshops", url: "/workshops" },
        { text: "Events", url: "/events" },
        { text: "Schools", url: "/schools" },
        { text: "Families", url: "/families" }
      ]
    },
    {
      title: "Community",
      links: [
        { text: "Join Us", url: "/join" },
        { text: "Volunteer", url: "/volunteer" },
        { text: "Donate", url: "/donate" },
        { text: "Newsletter", url: "/newsletter" }
      ]
    }
  ],
  rightsText = `© ${new Date().getFullYear()} Saga Farmann. All rights reserved.`,
  madeBy = { name: "Robert Arnorsson", url: "https://robertarnorsson.com" },
  smallLinks = [
    { text: "Facebook", icon: <SiFacebook />, url: "https://www.facebook.com/VikingskipetSagaFarmann" },
    { text: "Instagram", icon: <SiInstagram />, url: "https://www.instagram.com/original_vikings_of_norway/" },
    { text: "YouTube", icon: <SiYoutube />, url: "https://www.youtube.com/channel/UCaPUAvRBw0i5ET79TMh2_MQ" }
  ]
}: FooterProps) {
  return (
    <footer className="relative w-full bg-background border-t border-white/10 text-sm text-foreground/80 z-10">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-6">
          <div className="col-span-2">
            <Link href={logo.url ?? "/"} className="inline-flex items-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={225}
                height={64}
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>

            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 opacity-80" />
                <Link
                  href={`mailto:${contact.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {contact.email}
                </Link>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 opacity-80" />
                <span className="text-foreground/80">{contact.location}</span>
              </div>
            </div>
          </div>

          {menuItems.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 font-semibold text-foreground/90">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <HoverLink href={link.url}>{link.text}</HoverLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-foreground/60">{rightsText}</p>

          <p className="text-xs text-foreground/60">
            Made by{" "}
            <Link
              href={madeBy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground/80 hover:text-foreground underline-offset-4 hover:underline"
            >
              {madeBy.name}
            </Link>
          </p>

          <ul className="flex flex-wrap items-center gap-4">
            {smallLinks.map((l) => (
              <li key={l.text}>
                <SosialLink href={l.url}>{l.icon}</SosialLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}


function HoverLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative inline-flex text-foreground/70 transition-colors hover:text-foreground"
    >
      <span className="relative">
        <span className="after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-current after:transition-[width] after:duration-300 hover:after:w-full">
          {children}
        </span>
      </span>
    </Link>
  );
}

function SosialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-flex text-xl text-foreground/70 transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}