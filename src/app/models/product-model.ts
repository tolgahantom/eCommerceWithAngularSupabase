export interface ProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  images?: string[];
  discount?: number;
  rating?: number;
  uploadDate?: Date;
}
