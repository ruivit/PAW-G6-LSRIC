import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { RestService } from '../../services/rest/rest.service';
import { CartService } from './cart.service';

import { Book } from '../../models/Book';
import { Sale } from '../../models/Sale';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  booksInCart: Book[] = [];
  clientPoints: number = 0;
  pointsData: any = {};
  discountData: any = {};

  constructor(
    private restService: RestService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.booksInCart = this.cartService.getBooksInCart();
    this.clientPoints = 0;
    this.restService.getClientPoints().subscribe(data => {
      this.clientPoints = data;
    });
    this.restService.getPointsTable().subscribe(data => {
      this.pointsData = data;
    });
    this.restService.getDiscountTable().subscribe(data => {
      this.discountData = data;
    });
    console.log(this.clientPoints);
    console.log(this.pointsData);
    console.log(this.discountData);
  }

  getBooks() {
    return this.booksInCart;
  }

  // -------------- Cart Operations --------------
  removeFromCart(book: Book) {
    // ATUALIZAR PRECOS AND COISOS
    this.booksInCart.splice(this.booksInCart.indexOf(book), 1);
  }

  clearCart() {
    this.booksInCart = [];
    return this.booksInCart;
  }

  
  // -------------- Sale Operations --------------
  calculateTotalPrice(): number {
    // FALTA APLICAR DESCONTOS PELA VENDA E POR IDADE CLIENTE
    let total = 0;
    for (let item of this.booksInCart) {
      total += item.sellPrice;
    }
    return total;
  }

  calculateShipping(): number {
    let shipping = 0;
    
    if (this.booksInCart.length > 0) {
      // If the client has the points to get free shipping
      if (this.clientPoints == this.pointsData.shippingPoints) {
        shipping = 0;
      } else {
        // Calculate the shipping cost
        shipping = this.booksInCart.length * 0.85;
      }
      return shipping;
    } else {
      //generate error message
      return 0;
    }
  }

  calculateGainedPoints(): number {
    let gainedPoints: number = 0;

    gainedPoints += (this.pointsData.percentagePerPurschase
    * (this.booksInCart.length * 2));
    
    // If there is a promotion active, the client gains even more points
    if (this.pointsData.salePromotionActive) {
      gainedPoints += this.pointsData.pointsPerPromotion;
    }

    return gainedPoints;
  }
  

  makeSale(books: Book[]) {
    let quantity: number[] = [];
    for (let book of books) {
      quantity.push(book.quantityToBuy);
    }

    let sale: Sale = new Sale(
      "ruiv", books, quantity, this.calculateTotalPrice(),
      this.calculateGainedPoints(), new Date(), this.calculateShipping()
    );
    console.log(sale);
    confirm("Are you sure you want to make this sale?");
    // TODO - this.restService.updatePoints(client_id);
    // if shipping == 0 remove the 2k points
    this.restService.addSale(sale);
    this.router.navigate(['/']);
  }

}
