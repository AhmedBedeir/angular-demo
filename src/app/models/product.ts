export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  description?: string;
  images?: string[];
  stock?: number;
  discountPercentage?: number;
  reviews?: {
    rating: number;
    comment: string;
    reviewerName: string;
    reviewerEmail: string;
    date: string;
  }[];
}
