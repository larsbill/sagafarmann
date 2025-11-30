"use client";

import { use, useEffect, useRef, useState } from "react";
import { useMap } from "../../context/map-context";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import { fromLonLat } from "ol/proj";
import { Live, Stage, Trip, Waypoint } from "@/types/map";

type MapOlProps = {
  trips: Promise<Trip[]>;
  stages: Promise<Stage[]>;
  waypoints: Promise<Waypoint[]>;
  live: Promise<Live | null>;
};

export default function MapOl({ trips, stages, waypoints, live }: MapOlProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { map, updateLivePos, addWaypoints, removeWaypoints } = useMap();

  const livePos = use(live);
  const allTrips = use(trips);
  const allStages = use(stages);
  const allWaypoints = use(waypoints);

  useEffect(() => {
    if (livePos) {
      updateLivePos(livePos);
    }
  }, [livePos, updateLivePos]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!map) return;

    const view = new View({
      center: [0, 0],
      zoom: 2,
      maxZoom: 20,
    });

    const layer = new TileLayer({
      source: new XYZ({
        urls: [
          "https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          "https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          "https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          "https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        ],
        attributions:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }),
      cacheSize: 256,
      preload: 2,
    });

    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [layer],
      view,
      maxTilesLoading: 32,
      controls: [],
      interactions: [],
    });

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/immutability
    map.current = mapInstance.current;

    return () => {
      map.current = null;
      mapInstance.current?.setTarget(undefined);
    };
  }, [livePos, map, updateLivePos]);

  useEffect(() => {
    if (!map.current) return;
    if (!allTrips.length) return;

    const years = allTrips
      .map((t) => t.year)
      .filter((y) => typeof y === "number" && !Number.isNaN(y));

    if (!years.length) return;

    const latestYear = Math.max(...years);

    const latestYearTrips = allTrips.filter((t) => t.year === latestYear);
    if (!latestYearTrips.length) return;

    const latestTrip = latestYearTrips[latestYearTrips.length - 1];

    const tripStages = allStages.filter((stage) => stage.trip_id === latestTrip.id);

    const tripCoords = tripStages.flatMap((stage) =>
      allWaypoints
        .filter((wp) => wp.stage_id === stage.id)
        .map((wp) => fromLonLat([wp.longitude, wp.latitude]))
    );

    removeWaypoints();

    if (!tripCoords.length) return;

    const color = latestTrip.color ?? "#1e90ff";
    addWaypoints(tripCoords, color);

    const extent = tripCoords.reduce(
      (ext, coord) => {
        ext[0] = Math.min(ext[0], coord[0]); // min x
        ext[1] = Math.min(ext[1], coord[1]); // min y
        ext[2] = Math.max(ext[2], coord[0]); // max x
        ext[3] = Math.max(ext[3], coord[1]); // max y
        return ext;
      },
      [Infinity, Infinity, -Infinity, -Infinity] as [number, number, number, number]
    );

    map.current.getView().fit(extent, {
      padding: [25, 25, 25, 25],
      duration: 500,
    });
  }, [allTrips, allStages, allWaypoints, map, addWaypoints, removeWaypoints]);

  return (
    <div className="relative w-full h-full group rounded-lg overflow-clip">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary animate-pulse z-10">
          <p className="text-foreground">Loading map...</p>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
