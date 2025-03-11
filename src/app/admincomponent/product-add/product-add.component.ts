import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../models/category-model';

@Component({
  selector: 'app-product-add',
  standalone: false,
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss',
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  imageFiles: File[] = [];
  categories: CategoryModel[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private loaderService: LoaderService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      discount: [''],
      categoryId: [''],
    });
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().then((data) => {
      this.categories = data;
    });
  }

  onFileChange(event: any) {
    this.imageFiles = Array.from(event.target.files);
  }

  async addProduct() {
    this.loaderService.show();
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      this.productService
        .addProduct(productData, this.imageFiles)
        .then((prd) => {
          this.loaderService.hide();
          alert('Ürün başarıyla eklendi');
          this.router.navigate(['products']);
        })
        .catch((err) => {
          alert('Ürün ekleme hatası');
        });
    }
  }
}
