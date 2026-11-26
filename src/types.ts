export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export type RoutePath = '/' | '/catalog' | '/cart';
