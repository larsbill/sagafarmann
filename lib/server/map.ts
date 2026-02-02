import { fetchData } from "./server";
import { Live } from "@/types/map";

export function getLive() {
  const API_URL = process.env.API_URL;
  const response = fetchData<Live | null>(`${API_URL}/cdn/live/latest`, null);
  return response;
}