export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  image: string;
  description: string;
}
export type RoutePath = '/' | '/catalog' | '/cart';

export interface FilterParams {
  categories: string[];
  minPrice: number | null;
  maxPrice: number | null;
}
