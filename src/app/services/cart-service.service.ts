import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { supabase } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable(); // Sepet içeriğini dışa aç

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.loadCartFromSupabase(user.id);
      } else {
        this.loadCartFromLocalStorage();
      }
    });
    this.loadCartFromLocalStorage();
  }

  private loadCartFromLocalStorage() {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = storedCart;
    this.cartItemsSubject.next(this.cartItems);
  }

  private async loadCartFromSupabase(userId: string) {
    const { data, error } = await supabase
      .from('cart')
      .select('*')
      .eq('user_id', userId);

    if (!error && data) {
      this.cartItems = data;
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  async addToCart(product: any) {
    const user = await this.authService.getUser().toPromise();
    if (user) {
      const existingItem = this.cartItems.find(
        (item) => item.product_id === product.id
      );

      if (existingItem) {
        const { error } = await supabase
          .from('cart')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);

        if (!error) existingItem.quantity++;
      } else {
        const { data, error } = await supabase
          .from('cart')
          .insert([{ user_id: user.id, product_id: product.id, quantity: 1 }])
          .select()
          .single();

        if (!error && data) this.cartItems.push(data);
      }

      this.cartItemsSubject.next(this.cartItems);
    } else {
      const existingItem = this.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        product.quantity = 1;
        this.cartItems.push(product);
      }

      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  async clearCart() {
    const user = await this.authService.getUser().toPromise();

    if (user) {
      await supabase.from('cart').delete().eq('user_id', user.id);
    } else {
      localStorage.removeItem('cart');
    }

    this.cartItems = [];
    this.cartItemsSubject.next([]);
  }
}
