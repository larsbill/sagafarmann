"use client";

export default function MapLoading() {
  return (
    <div className="relative w-full h-full group rounded-lg overflow-clip">
      <div className="absolute inset-0 flex items-center justify-center bg-secondary animate-pulse z-10">
        <p className="text-foreground">Loading map...</p>
      </div>
    </div>
  );
}