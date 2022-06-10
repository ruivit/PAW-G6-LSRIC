import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user/user.service';
import { CartService } from 'src/app/services/cart/cart.service';

import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { NavbarService } from 'src/app/services/navbar/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn = this.userService.isLoggedIn();
  itemsInCart = this.cartService.getNumberOfItemsInCart();

  notifierSubscription: Subscription = 
  this.navbarService.subjectNotifier.subscribe(notified => {
    this.itemsInCart = this.cartService.getNumberOfItemsInCart();
  });

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private navbarService: NavbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loggedIn = this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
  }

  getNewBooks() {
    this.router.navigateByUrl('/newbooks', { skipLocationChange: true });
  }

  getUsedBooks() {
    this.router.navigateByUrl('/usedbooks', { skipLocationChange: true });
  }
  
  searchBooks() {
    this.router.navigateByUrl('/searchbooks', { skipLocationChange: true });
  }
}
