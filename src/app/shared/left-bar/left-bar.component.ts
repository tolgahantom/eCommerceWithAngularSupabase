import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../models/category-model';

@Component({
  selector: 'app-left-bar',
  standalone: false,
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.scss',
})
export class LeftBarComponent implements OnInit {
  categoryList: CategoryModel[] = [];
  selectedCategory: CategoryModel | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryList = this.categoryService.getAllCategories();
  }

  changeCategory(newCategory: CategoryModel) {
    this.selectedCategory = newCategory;
  }
}
