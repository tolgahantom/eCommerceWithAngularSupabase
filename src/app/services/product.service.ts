import { Injectable } from '@angular/core';
import { supabase } from './supabase.service';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  async getAllProducts(
    page: number,
    productsPerPage: number,
    categoryId?: number
  ): Promise<{ products: ProductModel[]; totalCount: number }> {
    let query = supabase.from('products').select('*', { count: 'exact' });

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
