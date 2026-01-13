/* import { socialMediaPost } from "@/types/socialmedia";
import { fetchData } from "./server";

export function getsocialMediaPosts() {
  const API_URL = process.env.API_URL;
  const response = fetchData<socialMediaPost[]>(`${API_URL}/cdn/socialmedia?count=3`, []);
  return response;
} */