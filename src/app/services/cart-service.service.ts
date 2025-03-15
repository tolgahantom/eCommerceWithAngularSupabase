import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { supabase } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

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
    this.cartItemsSubject.next([...this.cartItems]);
  }

  private async loadCartFromSupabase(userId: string) {
    const { data, error } = await supabase
      .from('cart')
      .select('id, product_id, quantity, products(*)')
      .eq('user_id', userId);

    if (!error && data) {
      this.cartItems = data.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        products: item.products,
      }));
      this.cartItemsSubject.next([...this.cartItems]);
    } else {
      console.error('Error fetching cart:', error);
    }
  }

  async addToCart(product: any) {
    const user = await firstValueFrom(this.authService.getUser());

    if (user) {
      const existingItem = this.cartItems.find(
        (item) => item.product_id === product.id
      );

      if (existingItem) {
        existingItem.quantity++;

        const { error } = await supabase
          .from('cart')
          .update({ quantity: existingItem.quantity })
          .eq('id', existingItem.id);

        if (error) console.error('Error updating cart:', error);
      } else {
        const { data, error } = await supabase
          .from('cart')
          .insert([{ user_id: user.id, product_id: product.id, quantity: 1 }])
          .select('id, product_id, quantity, products(*)')
          .single();

        if (!error && data) {
          this.cartItems.push(data);
        }
      }

      this.cartItemsSubject.next([...this.cartItems]);
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
      this.cartItemsSubject.next([...this.cartItems]);
    }
  }

  async clearCart() {
    const user = await firstValueFrom(this.authService.getUser());

    if (user) {
      await supabase.from('cart').delete().eq('user_id', user.id);
    } else {
      localStorage.removeItem('cart');
    }

    this.cartItems = [];
    this.cartItemsSubject.next([]);
  }

  async updateCartItemQuantity(productId: number, newQuantity: number) {
    const user = await firstValueFrom(this.authService.getUser());

    if (user) {
      const { error } = await supabase
        .from('cart')
        .update({ quantity: newQuantity })
        .eq('product_id', productId)
        .eq('user_id', user.id);

      if (!error) {
        this.cartItems = this.cartItems.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        console.error('Sepet güncelleme hatası:', error.message);
        return;
      }
    } else {
      this.cartItems = this.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    this.cartItemsSubject.next([...this.cartItems]);
  }

  async removeFromCart(productId: number) {
    const user = await firstValueFrom(this.authService.getUser());

    if (user) {
      await supabase
        .from('cart')
        .delete()
        .eq('product_id', productId)
        .eq('user_id', user.id);
    } else {
      this.cartItems = this.cartItems.filter((item) => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
    this.cartItemsSubject.next(this.cartItems);
  }
}
