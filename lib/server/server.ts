
export async function fetchData<T>(url: string, defaultValue: T): Promise<T> {
  const headers = {
    Authorization: `Bearer ${process.env.API_TOKEN}`,
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      console.error(`Failed to fetch ${url}:`, response.statusText);
      return defaultValue;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return defaultValue;
  }
}