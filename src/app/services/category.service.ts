import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category-model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoryList: CategoryModel[] = [
    {
      id: 1,
      title: 'Elektronik',
      image: '',
    },
    {
      id: 2,
      title: 'Giyim',
      image: '',
    },
    {
      id: 3,
      title: 'Diğer',
      image: '',
    },
  ];
  constructor() {}

  getAllCategories() {
    return this.categoryList;
  }
}
