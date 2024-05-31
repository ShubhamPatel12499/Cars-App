import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  addToCart(item: any): void {
    this.cartItems.push(item);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems(): any[] {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }
}
