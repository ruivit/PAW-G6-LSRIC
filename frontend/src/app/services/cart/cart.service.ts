import { Injectable } from '@angular/core';

import { Book } from '../../Models/Book';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BLOCK_MARKER } from '@angular/localize/src/utils';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items = JSON.parse(localStorage.getItem("cart") || "[]");

  constructor(
    private snackBar: MatSnackBar
  ) { }

  addToCart(book: Book): boolean {
    // count the number of the same book already in the cart
    let count = 0;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i]._id == book._id) {
        count++;
      }
    }
    console.log(this.items);
    if (book.stock > 0) {
      // compare the book.stock with the count
      if (count < book.stock) {
        // save in localStorage
        this.items.push(book);
        window.localStorage.setItem("cart", JSON.stringify(this.items));
        return true;          
      } else {
        return false;
      }
    }
    return false;
  }

  removeFromCart(book: Book): void {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i]._id == book._id) {
        this.items.splice(i, 1);
        window.localStorage.setItem("cart", JSON.stringify(this.items));
        break;
      }
    }
  }

  getQuantity(book: Book): number {
    let count = 0;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i]._id == book._id) {
        count++;
      }
    }
    return count;
  }

  getItemsInCart(): Book[] {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }

  getNumberOfItemsInCart(): number {
    return this.items.length;
  }

  clearCart() {
    this.items = Array<Book>();
    window.localStorage.setItem("cart", JSON.stringify(this.items));
  }

}
