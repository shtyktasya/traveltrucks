const BASE_URL = "https://campers-api.goit.study";

export const fetchCampers = async (query: string, page: number) => {
  const res = await fetch(
    `${BASE_URL}/campers?${query}&page=${page}&limit=4`
  );

  if (!res.ok) throw new Error("Failed to fetch campers");

  return res.json();
};