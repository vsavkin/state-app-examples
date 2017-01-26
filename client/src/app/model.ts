export interface Talk {
  id: number;
  title: string;
  speaker: string;
  description: string;
  yourRating: number;
  rating: number;
}

export interface Filters {
  speaker: string;
  title: string;
  minRating: number;
}