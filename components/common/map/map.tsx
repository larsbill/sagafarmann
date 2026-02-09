"use client";

import { use, useEffect, useRef, useState } from "react";
import { useMap } from "../../context/map-context";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import { fromLonLat } from "ol/proj";
import { defaults as defaultInteractions } from "ol/interaction";
import { Live, Stage, Trip, Waypoint } from "@/types/map";

type MapOlProps = {
  trips: Trip[];
  stages: Stage[];
  waypoints: Waypoint[];
  live: Promise<Live | null>;
  showAllRoutes?: boolean;
  interactive?: boolean;
  selectedStageId?: number | null;
};

export default function MapOl({
  trips,
  stages,
  waypoints,
  live,
  showAllRoutes = false,
  interactive = false,
  selectedStageId = null,
}: MapOlProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { map, updateLivePos, addWaypoints, removeWaypoints } = useMap();

  const livePos = use(live);

  useEffect(() => {
    if (livePos) updateLivePos(livePos);
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
      interactions: interactive ? defaultInteractions() : [],
    });

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/immutability
    map.current = mapInstance.current;

    return () => {
      map.current = null;
      mapInstance.current?.setTarget(undefined);
    };
  }, [map, interactive]);

  useEffect(() => {
    if (!map.current) return;
    if (!trips.length) return;

    const toExtent = (coords: number[][]) =>
      coords.reduce(
        (ext, coord) => {
          ext[0] = Math.min(ext[0], coord[0]);
          ext[1] = Math.min(ext[1], coord[1]);
          ext[2] = Math.max(ext[2], coord[0]);
          ext[3] = Math.max(ext[3], coord[1]);
          return ext;
        },
        [Infinity, Infinity, -Infinity, -Infinity] as number[]
      );

    const mergeExtents = (a: number[], b: number[]): number[] => {
      return [
        Math.min(a[0], b[0]),
        Math.min(a[1], b[1]),
        Math.max(a[2], b[2]),
        Math.max(a[3], b[3]),
      ];
    };

    const getStageCoords = (stageId: number) => {
      return waypoints
        .filter((wp) => wp.stage_id === stageId)
        .map((wp) => fromLonLat([wp.longitude, wp.latitude]));
    };

    const getTripCoords = (tripId: number) => {
      const tripStages = stages.filter((stage) => stage.trip_id === tripId);

      return tripStages.flatMap((stage) =>
        waypoints
          .filter((wp) => wp.stage_id === stage.id)
          .map((wp) => fromLonLat([wp.longitude, wp.latitude]))
      );
    };

    removeWaypoints();

    // If a stage is selected, only render that stage and zoom to it
    if (selectedStageId != null) {
      const stage = stages.find((s) => s.id === selectedStageId);
      if (!stage) return;

      const coords = getStageCoords(stage.id);
      if (!coords.length) return;

      const trip = trips.find((t) => t.id === stage.trip_id);
      const color = trip?.color ?? "#1e90ff";

      addWaypoints(coords, color);

      const ext = toExtent(coords);
      map.current.getView().fit(ext, {
        padding: [50, 50, 50, 450],
        duration: 500,
        maxZoom: 16,
      });

      return;
    }

    // Default behavior (your existing logic)
    let globalExtent: number[] | null = null;

    if (showAllRoutes) {
      for (const trip of trips) {
        const coords = getTripCoords(trip.id);
        if (!coords.length) continue;

        const color = trip.color ?? "#1e90ff";
        addWaypoints(coords, color);

        const ext = toExtent(coords);
        globalExtent = globalExtent ? mergeExtents(globalExtent, ext) : ext;
      }
    } else {
      const years = trips
        .map((t) => t.year)
        .filter((y) => typeof y === "number" && !Number.isNaN(y));

      if (!years.length) return;

      const latestYear = Math.max(...years);
      const latestYearTrips = trips.filter((t) => t.year === latestYear);
      if (!latestYearTrips.length) return;

      const latestTrip = latestYearTrips[latestYearTrips.length - 1];
      const coords = getTripCoords(latestTrip.id);
      if (!coords.length) return;

      const color = latestTrip.color ?? "#1e90ff";
      addWaypoints(coords, color);

      globalExtent = toExtent(coords);
    }

    if (!globalExtent) return;

    map.current.getView().fit(globalExtent, {
      padding: [25, 25, 25, interactive ? 450 : 25],
      duration: 500,
    });
  }, [
    trips,
    stages,
    waypoints,
    map,
    addWaypoints,
    removeWaypoints,
    showAllRoutes,
    selectedStageId,
  ]);

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
