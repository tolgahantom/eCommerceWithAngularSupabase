export interface ProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
  images?: string[];
  discount?: number;
  average_rating?: number;
  uploadDate?: Date;
}
