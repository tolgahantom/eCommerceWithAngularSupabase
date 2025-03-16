import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product-model';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  activeProduct: ProductModel = {} as ProductModel;
  similarProducts: any[] = [];
  private routeSub!: Subscription;
  selectedIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.fetchProduct(productId);
      }
    });
  }

  async fetchProduct(productId: string) {
    this.loaderService.show();
    try {
      const prd = await this.productService.getProductById(productId);
      if (prd && prd.length > 0) {
        this.activeProduct = prd[0];
        this.getSimilarProducts(prd[0].category_id, prd[0].id);
        this.selectedIndex = 0;
      }
    } catch (err) {
      console.error('Ürün yüklenirken hata oluştu:', err);
    } finally {
      this.loaderService.hide();
    }
  }

  async getSimilarProducts(category_id: string, prd_id: string) {
    this.similarProducts = await this.productService.getSimilarProducts(
      category_id,
      prd_id
    );
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
