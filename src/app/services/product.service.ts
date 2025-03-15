import { Injectable } from '@angular/core';
import { supabase } from './supabase.service';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  async uploadImages(files: File[]): Promise<string[]> {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const filePath = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('product_images')
        .upload(filePath, file);

      if (error) {
        console.error('Resim yükleme hatası:', error);
        continue;
      }

      const url = supabase.storage.from('product_images').getPublicUrl(filePath)
        .data.publicUrl;
      uploadedUrls.push(url);
    }

    return uploadedUrls;
  }

  async addProduct(product: any, imageFiles: File[]) {
    const imageUrls = await this.uploadImages(imageFiles);

    const { data, error } = await supabase.from('products').insert([
      {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: 50,
        category_id: product.categoryId,
        images: imageUrls,
        discount: product.discount | 0,
        rating: 0,
        upload_date: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Ürün ekleme hatası:');
      console.error('Hata detayları:');
    } else {
      console.log('Ürün eklendi:', data);
    }
  }

  async getAllProducts(
    page: number,
    productsPerPage: number,
    categoryId?: number
  ): Promise<{ products: ProductModel[]; totalCount: number }> {
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .order('upload_date', { ascending: false });

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage - 1;

    const { data, error, count } = await query.range(start, end);

    if (error) {
      console.log('getAllProducts hatası: ', error);
      return { products: [], totalCount: 0 };
    }

    return { products: data, totalCount: count || 0 };
  }

  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id);

    if (error) {
      console.log(error);
      return null;
    }

    return data;
  }
}
