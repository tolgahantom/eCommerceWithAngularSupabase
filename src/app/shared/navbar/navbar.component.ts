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
      this.cartItems = items;
      this.user$ = this.authService.user$;
    });
  }

  getPrice(price: number, discount: number) {
    return price - (price * discount) / 100;
  }

  getTotalPrice(): number {
    return Math.floor(
      this.cartItems.reduce((total, prd) => {
        return total + this.getPrice(prd.price, prd.discount);
      }, 0)
    );
  }

  logout() {
    this.authService.logout();
  }
}
