export interface ProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  images?: string[];
  discount?: number;
  rating?: number;
}
