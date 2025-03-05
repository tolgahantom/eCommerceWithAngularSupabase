import { Injectable } from '@angular/core';
import { supabase } from './supabase.service';
import { CategoryModel } from '../models/category-model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  async getAllCategories(): Promise<CategoryModel[]> {
    const { data, error } = await supabase.from('categories').select('*');

    if (error) {
      console.log('Kategori Çekme Hatası', error);
      return [];
    }
    return data;
  }
}
