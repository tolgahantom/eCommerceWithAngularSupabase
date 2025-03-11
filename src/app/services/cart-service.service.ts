import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable(); // Sepet içeriğini dışa aç

  constructor() {
    this.loadCartFromLocalStorage();
  }

  private loadCartFromLocalStorage() {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = storedCart;
    this.cartItemsSubject.next(this.cartItems);
  }

  addToCart(product: any) {
    this.cartItems.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartItemsSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
    this.cartItemsSubject.next([]);
  }
}
