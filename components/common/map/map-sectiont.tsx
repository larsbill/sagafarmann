"use client";

import { useMemo, useState } from "react";
import MapOl from "@/components/common/map/map";
import MapMenu from "@/components/common/map/map-menu";
import { Live, Stage, Trip, Waypoint } from "@/types/map";

type MapSectionProps = {
  trips: Trip[];
  stages: Stage[];
  waypoints: Waypoint[];
  live: Promise<Live | null>;
  interactive?: boolean;
  showAllRoutes?: boolean;
};

export default function MapSection({
  trips,
  stages,
  waypoints,
  live,
  interactive = true,
  showAllRoutes = true,
}: MapSectionProps) {
  const [selectedStageId, setSelectedStageId] = useState<number | null>(null);

  const selectedStage = useMemo(() => {
    if (selectedStageId == null) return null;
    return stages.find((s) => s.id === selectedStageId) ?? null;
  }, [selectedStageId, stages]);

  return (
    <>
      <MapOl
        trips={trips}
        stages={stages}
        waypoints={waypoints}
        live={live}
        interactive={interactive}
        showAllRoutes={showAllRoutes}
        selectedStageId={selectedStage?.id ?? null}
      />

      <MapMenu
        trips={trips}
        stages={stages}
        selectedStageId={selectedStage?.id ?? null}
        onSelectStage={(id) => setSelectedStageId(id)}
        onClearSelection={() => setSelectedStageId(null)}
      />
    </>
  );
}
