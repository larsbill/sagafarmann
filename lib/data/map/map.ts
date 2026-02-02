import { Trip, Stage, Waypoint } from "@/types/map";
import { waypointsByStageId, stagesByTripId, tripsData } from "./data";

export function getTrips(): Trip[] {
  return tripsData;
}

export function getStagesForTrip(tripId: number): Stage[] {
  return stagesByTripId[tripId] ?? [];
}

export function getWaypointsForStage(stageId: number): Waypoint[] {
  return waypointsByStageId[stageId] ?? [];
}

export function getStages(): Stage[] {
  const all: Stage[] = [];

  for (const key in stagesByTripId) {
    const stages = stagesByTripId[Number(key)] ?? [];
    all.push(...stages);
  }

  return all;
}

export function getWaypoints(): Waypoint[] {
  const all: Waypoint[] = [];

  for (const key in waypointsByStageId) {
    const waypoints = waypointsByStageId[Number(key)] ?? [];
    all.push(...waypoints);
  }

  return all;
}

export function getTripData(tripId: number): {
  trip: Trip;
  stages: Array<{
    stage: Stage;
    waypoints: Waypoint[];
  }>;
} | null {
  const trip = tripsData.find((t) => t.id === tripId);
  if (!trip) return null;

  const stages = getStagesForTrip(tripId);

  return {
    trip,
    stages: stages.map((stage) => ({
      stage,
      waypoints: getWaypointsForStage(stage.id),
    })),
  };
}
