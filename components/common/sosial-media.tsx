"use client";

import { SosialMediaPost } from "@/types/sosialmedia";
import { Heart, MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, type ComponentType } from "react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";

const ICON_COMPONENTS: Record<"facebook" | "instagram" | "youtube", ComponentType<{ className?: string }>> = {
  facebook: SiFacebook,
  instagram: SiInstagram,
  youtube: SiYoutube,
};

function getSocialKeyFromUrl(url: string): keyof typeof ICON_COMPONENTS | null {
  if (url.includes("facebook.com")) return "facebook";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("youtube.com")) return "youtube";
  return null;
}

interface SosialMediaCardProps {
  post: SosialMediaPost;
}

function SosialMediaCard({ post }: SosialMediaCardProps) {
  const key = getSocialKeyFromUrl(post.url);
  const Icon = key ? ICON_COMPONENTS[key] : null;

  return (
    <Link href={post.url} target="_blank" rel="noreferrer noopener" className="block hover:shadow hover:-translate-y-1 transition-transform duration-300">
      <div className="rounded-lg shadow-md bg-card hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative w-full h-48">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="p-4 py-3 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <ActionButton icon={Heart} />
              <ActionButton icon={MessageCircle} />
              <ActionButton icon={Send} />
            </div>

            <div>
              {Icon ? <Icon className="w-4 h-4 text-muted-foreground" /> : null}
            </div>
          </div>

          <div className="relative">
            <p className="text-sm text-card-foreground max-h-16 overflow-hidden">
              {post.description}
            </p>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-card to-transparent" />
          </div>
        </div>
      </div>
    </Link>
  );
}

interface SosialMediaGroupProps {
  posts: Promise<SosialMediaPost[]>;
}

export function SosialMediaGroup({ posts }: SosialMediaGroupProps) {
  const allPosts = use(posts)

  return (
    allPosts.map((post) => (
      <SosialMediaCard
        key={post.id}
        post={post}
      />
    ))
  )
}

export function SosialMediaCardSkeleton() {
  return (
    <div className="block">
      <div className="rounded-lg shadow-md bg-card overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-muted" />
        <div className="p-4 py-3 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="w-4 h-4 bg-muted-foreground rounded-full" />
              ))}
            </div>
            <div className="w-4 h-4 bg-muted-foreground rounded-full" />
          </div>

          <div className="space-y-2">
            <div className="h-7 bg-muted-foreground rounded w-full" />
            <div className="h-7 bg-muted-foreground rounded w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon }: { icon: ComponentType<{ className?: string }> }) {
  return (
    <button className="text-muted-foreground hover:text-card-foreground">
      <Icon className="w-4 h-4" />
    </button>
  );
}
