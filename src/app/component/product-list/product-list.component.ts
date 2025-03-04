import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product-model';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  productList: ProductModel[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productList = this.productService.getAllProduct();
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i < 6; i++) {
      if (i < rating) {
        stars.push('fa-solid fa-star');
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push('fa-solid fa-star-half-stroke');
      } else {
        stars.push('fa-regular fa-star');
      }
    }
    return stars;
  }

  getDiscountPrice(price: number, discount: number) {
    return Math.round(price * (1 - discount / 100));
  }
}
