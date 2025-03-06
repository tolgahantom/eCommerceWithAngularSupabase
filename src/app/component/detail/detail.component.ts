import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product-model';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  activeProduct: ProductModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private loaderService: LoaderService
  ) {}

  selectedIndex = 0;

  ngOnInit(): void {
    this.loaderService.show();
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.productService
        .getProductById(productId)
        .then((prd) => {
          prd ? (this.activeProduct = prd[0]) : (this.activeProduct = null);
          this.loaderService.hide();
        })
        .catch((err) => console.log(err));
    }
  }

  changeMainImage(index: number) {
    this.selectedIndex = index;
  }

  getDiscountPrice(price: number, discount: number) {
    return Math.round(price * (1 - discount / 100));
  }
}
