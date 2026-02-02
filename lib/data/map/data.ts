import { Stage, Trip, Waypoint } from "@/types/map";

import trips from "@/lib/data/map/data/trips.json";

import trip1Stages from "@/lib/data/map/data/stages/trip_1.json";
import trip2Stages from "@/lib/data/map/data/stages/trip_2.json";
import trip3Stages from "@/lib/data/map/data/stages/trip_3.json";

import stage1Waypoints from "@/lib/data/map/data/waypoints/stage_1.json";
import stage2Waypoints from "@/lib/data/map/data/waypoints/stage_2.json";
import stage3Waypoints from "@/lib/data/map/data/waypoints/stage_3.json";
import stage4Waypoints from "@/lib/data/map/data/waypoints/stage_4.json";
import stage5Waypoints from "@/lib/data/map/data/waypoints/stage_5.json";
import stage6Waypoints from "@/lib/data/map/data/waypoints/stage_6.json";
import stage7Waypoints from "@/lib/data/map/data/waypoints/stage_7.json";
import stage8Waypoints from "@/lib/data/map/data/waypoints/stage_8.json";
import stage9Waypoints from "@/lib/data/map/data/waypoints/stage_9.json";
import stage10Waypoints from "@/lib/data/map/data/waypoints/stage_10.json";
import stage11Waypoints from "@/lib/data/map/data/waypoints/stage_11.json";
import stage12Waypoints from "@/lib/data/map/data/waypoints/stage_12.json";
import stage13Waypoints from "@/lib/data/map/data/waypoints/stage_13.json";
import stage14Waypoints from "@/lib/data/map/data/waypoints/stage_14.json";
import stage15Waypoints from "@/lib/data/map/data/waypoints/stage_15.json";
import stage16Waypoints from "@/lib/data/map/data/waypoints/stage_16.json";
import stage17Waypoints from "@/lib/data/map/data/waypoints/stage_17.json";
import stage18Waypoints from "@/lib/data/map/data/waypoints/stage_18.json";
import stage19Waypoints from "@/lib/data/map/data/waypoints/stage_19.json";
import stage20Waypoints from "@/lib/data/map/data/waypoints/stage_20.json";
import stage21Waypoints from "@/lib/data/map/data/waypoints/stage_21.json";
import stage22Waypoints from "@/lib/data/map/data/waypoints/stage_22.json";
import stage23Waypoints from "@/lib/data/map/data/waypoints/stage_23.json";
import stage24Waypoints from "@/lib/data/map/data/waypoints/stage_24.json";
import stage25Waypoints from "@/lib/data/map/data/waypoints/stage_25.json";

export const tripsData: Trip[] = trips;

export const stagesByTripId: Record<number, Stage[]> = {
  1: trip1Stages,
  2: trip2Stages,
  3: trip3Stages,
};

export const waypointsByStageId: Record<number, Waypoint[]> = {
  1: stage1Waypoints,
  2: stage2Waypoints,
  3: stage3Waypoints,
  4: stage4Waypoints,
  5: stage5Waypoints,
  6: stage6Waypoints,
  7: stage7Waypoints,
  8: stage8Waypoints,
  9: stage9Waypoints,
  10: stage10Waypoints,
  11: stage11Waypoints,
  12: stage12Waypoints,
  13: stage13Waypoints,
  14: stage14Waypoints,
  15: stage15Waypoints,
  16: stage16Waypoints,
  17: stage17Waypoints,
  18: stage18Waypoints,
  19: stage19Waypoints,
  20: stage20Waypoints,
  21: stage21Waypoints,
  22: stage22Waypoints,
  23: stage23Waypoints,
  24: stage24Waypoints,
  25: stage25Waypoints,
};
