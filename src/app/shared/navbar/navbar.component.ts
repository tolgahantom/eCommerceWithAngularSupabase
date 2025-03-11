import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service.service';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: false,
})
export class NavbarComponent implements OnInit {
  cartIsOpen: boolean = false;
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  getPrice(price: number, discount: number) {
    return price - (price * discount) / 100;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, prd) => {
      return total + this.getPrice(prd.price, prd.discount);
    }, 0);
  }
}
