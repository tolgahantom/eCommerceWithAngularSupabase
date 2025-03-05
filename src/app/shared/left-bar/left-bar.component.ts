import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../models/category-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-bar',
  standalone: false,
  templateUrl: './left-bar.component.html',
  styleUrl: './left-bar.component.scss',
})
export class LeftBarComponent implements OnInit {
  categoryList: CategoryModel[] = [];
  selectedCategory: CategoryModel | null = null;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryList = this.categoryService.getAllCategories();
  }

  changeCategory(newCategory: CategoryModel | null) {
    this.selectedCategory = newCategory;
    this.router.navigate(['products'], {
      queryParams: { category: newCategory?.id },
    });
  }
}
