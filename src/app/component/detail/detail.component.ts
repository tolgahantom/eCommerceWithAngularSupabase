import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product-model';

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
    private productService: ProductService
  ) {}

  selectedIndex = 0;

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      console.log(productId);
      this.productService
        .getProductById(productId)
        .then((prd) => {
          prd ? (this.activeProduct = prd[0]) : (this.activeProduct = null);
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
