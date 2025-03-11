import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product-model';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  productList: ProductModel[] = [];
  public productPerPage: number = 8;
  public selectedPage: number = 1;
  numberOfPage: number = 3;
  productCount: number = 0;
  selectedCategoryId: number | undefined = undefined;

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      this.selectedCategoryId = params['category'] || undefined;
      this.loadPrds();
    });
  }

  loadPrds() {
    this.loaderService.show();
    this.productService
      .getAllProducts(
        this.selectedPage,
        this.productPerPage,
        this.selectedCategoryId
      )
      .then((data) => {
        this.productList = data.products;
        this.productCount = data.totalCount;
        this.loaderService.hide();
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
    this.loadPrds();
    window.scrollTo(0, 0);
  }

  getPageArray() {
    return Array(Math.ceil(this.productCount / this.productPerPage))
      .fill(0)
      .map((a, i) => i + 1);
  }

  addToCart(prd: ProductModel, e: Event) {
    e.stopPropagation();
    this.cartService.addToCart(prd);
  }
}
