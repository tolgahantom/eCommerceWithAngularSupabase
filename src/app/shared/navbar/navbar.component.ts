import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: false,
})
export class NavbarComponent implements OnInit {
  cartIsOpen: boolean = false;
  cartItems: any[] = [];
  user$!: Observable<any | null>;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartService.cartItems$.subscribe((items) => {
        this.cartItems = [...items];
      });
      this.user$ = this.authService.user$;
    });
  }

  getPrice(price: number, discount: number, quantity: number) {
    return (price - (price * discount) / 100) * quantity;
  }

  getTotalPrice(): number {
    return Math.floor(
      this.cartItems.reduce((total, prd) => {
        return (
          total +
          this.getPrice(prd.products.price, prd.products.discount, prd.quantity)
        );
      }, 0)
    );
  }

  updateQuantity(product: any, newQuantity: number) {
    if (newQuantity < 1) {
      if (confirm('Ürünü sepetten çıkarmak istediğinize emin misiniz?')) {
        this.cartService.removeFromCart(product.product_id);
      }
      return;
    }

    this.cartService.updateCartItemQuantity(product.product_id, newQuantity);
  }

  logout() {
    this.authService.logout();
  }
}
