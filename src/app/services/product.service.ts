import { Injectable } from '@angular/core';
import { supabase } from './supabase.service';
import { ProductModel } from '../models/product-model';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private authService: AuthService) {}

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

  async rateProduct(productId: string, rating: number) {
    const user = await firstValueFrom(this.authService.getUser());

    if (!user) {
      console.error('Puan vermek için giriş yapmalısınız.');
      return;
    }

    const { data: existingRating } = await supabase
      .from('ratings')
      .select('id')
      .eq('product_id', productId)
      .eq('user_id', user.id)
      .single();

    if (existingRating) {
      await supabase
        .from('ratings')
        .update({ rating })
        .eq('id', existingRating.id);
    } else {
      await supabase
        .from('ratings')
        .insert([{ product_id: productId, user_id: user.id, rating }]);
    }

    const { data, error } = await supabase.from('ratings').select('rating');

    if (!error && data) {
      const avgRating =
        data.reduce((sum, r) => sum + r.rating, 0) / data.length;

      await supabase
        .from('products')
        .update({ average_rating: avgRating })
        .eq('id', productId);
    }
  }

  async getAverageRating(productId: string): Promise<number> {
    const { data, error } = await supabase
      .from('ratings')
      .select('rating')
      .eq('product_id', productId);

    if (error) {
      console.error('Puanları çekerken hata oluştu:', error.message);
      return 0;
    }

    if (!data.length) return 0;

    const average =
      data.reduce((sum, item) => sum + item.rating, 0) / data.length;
    return parseFloat(average.toFixed(1));
  }
}
