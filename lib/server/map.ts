import { fetchData } from "./server";
import { Live, Stage, Trip, Waypoint } from "@/types/map";

export function getTrips() {
  const API_URL = process.env.API_URL;
  const response = fetchData<Trip[]>(`${API_URL}/cdn/trips`, []);
  return response;
}

export function getStages() {
  const API_URL = process.env.API_URL;
  const response = fetchData<Stage[]>(`${API_URL}/cdn/stages`, []);
  return response;
}

export function getWaypoints() {
  const API_URL = process.env.API_URL;
  const response = fetchData<Waypoint[]>(`${API_URL}/cdn/waypoints`, []);
  return response;
}

export function getLive() {
  const API_URL = process.env.API_URL;
  const response = fetchData<Live | null>(`${API_URL}/cdn/live/latest`, null);
  return response;
}