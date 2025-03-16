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
  activeProduct: ProductModel = {} as ProductModel;

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
          if (prd) {
            this.activeProduct = prd[0];
          }
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

  onRate(newRating: number) {
    this.productService.rateProduct(this.activeProduct!.id, newRating);
  }

  roundToNearestHalf(number: any) {
    return Math.round(number * 2) / 2;
  }
}
