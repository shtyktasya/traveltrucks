export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description?: string;

  coverImage?: string;
  gallery?: (string | { original?: string; thumb?: string; url?: string })[];

  reviews?: Review[];

  length?: string;
  width?: string;
  height?: string;
  tank?: string;
  consumption?: string;

  transmission?: string;
  engine?: string;
  form?: string;

  amenities?: string[];

  totalReviews?: number;
}

export interface Review {
  id: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt?: string;
}

export interface CamperFilters {
  location?: string;
  form?: string;
  engine?: string;
  transmission?: string;
}

export interface CampersResponse {
  items: Camper[];
  total: number;
  page: number;
  limit: number;
}
