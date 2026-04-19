'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

type Filters = {
  location?: string;
  form?: string;
  engine?: string;
  transmission?: string;
};

const fetchCampers = async ({ pageParam = 1, filters }: { 
  pageParam: number; 
  filters: Filters 
}) => {
  const params = new URLSearchParams();
  params.append('page', pageParam.toString());
  params.append('limit', '4');

  if (filters.location?.trim()) params.append('location', filters.location.trim());
  if (filters.form) params.append('form', filters.form);
  if (filters.engine) params.append('engine', filters.engine);
  if (filters.transmission) params.append('transmission', filters.transmission);

  const url = `https://campers-api.goit.study/campers?${params.toString()}`;
  console.log('Fetching:', url);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  console.log('API Response:', data);   

  return data;
};

export const useCampers = (filters: Filters = {}) => {
  return useInfiniteQuery({
    queryKey: ['campers', filters],
    queryFn: ({ pageParam = 1 }) => fetchCampers({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.campers || lastPage.campers.length === 0) return undefined;
      return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
    },
  });
};