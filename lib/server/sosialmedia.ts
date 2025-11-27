import { SosialMediaPost } from "@/types/sosialmedia";
import { fetchData } from "./server";

export function getSosialMediaPosts() {
  const API_URL = process.env.API_URL;
  const response = fetchData<SosialMediaPost[]>(`${API_URL}/cdn/sosialmedia?count=3`, []);
  return response;
}