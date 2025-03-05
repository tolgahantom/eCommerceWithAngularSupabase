import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  productList: ProductModel[] = [];
  public productPerPage: number = 9;
  public selectedPage: number = 1;
  numberOfPage: number = 3;
  selectedCategoryId: number | undefined = undefined;

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      this.selectedCategoryId = params['category'] || undefined;
      this.loadBlogs();
    });
  }

  loadBlogs() {
    this.productService
      .getAllProducts(
        this.selectedPage,
        this.productPerPage,
        this.selectedCategoryId
      )
      .then((prd) => {
        this.productList = prd;
      })
      .catch((err) => {
        console.log(err);
      });
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

  changePage(page: number): void {
    this.selectedPage = page;
    this.loadBlogs();
    window.scrollTo(0, 0);
  }

  getPageArray() {
    console.log(this.productList.length);
    return Array(Math.ceil(this.productList.length / this.productPerPage))
      .fill(0)
      .map((a, i) => i + 1);
  }
}
