import { CamperFilters, CampersResponse } from "@/types/camper";


export async function fetchCampers({
  pageParam = 1,
  filters,
}: {
  pageParam?: number;
  filters: CamperFilters;
}): Promise<CampersResponse> {
  const params = new URLSearchParams();

  params.append("page", String(pageParam));
  params.append("limit", "4");

  if (filters.location) params.append("location", filters.location);
  if (filters.form) params.append("form", filters.form);
  if (filters.engine) params.append("engine", filters.engine);
  if (filters.transmission) params.append("transmission", filters.transmission);

  const res = await fetch(
    `https://campers-api.goIT.study/campers?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch campers");
  }

  return res.json();
}

