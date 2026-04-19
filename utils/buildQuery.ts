export const buildQuery = (filters: Record<string, string>) => {
  const params = new URLSearchParams();

  if (filters.location) params.append("location", filters.location);
  if (filters.form) params.append("form", filters.form);
  if (filters.engine) params.append("engine", filters.engine);
  if (filters.transmission) params.append("transmission", filters.transmission);

  return params.toString();
};