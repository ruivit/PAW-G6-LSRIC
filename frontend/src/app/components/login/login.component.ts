import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Book } from 'src/app/Models/Book';

import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private User: UserService,
    private router: Router, private snackBar: MatSnackBar) { }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit() {
  }

// Quando o cliente faz login, carrega os dados do cliente no localStorage

  loginUser() {
    this.User.userLogin(this.loginForm.value).subscribe(
      (data: any) => {
        console.log(data);
        let token = data.token;
        localStorage.setItem('Token', token);
        localStorage.setItem('clientID', data.clientID);
        localStorage.setItem('username', data.username);
        localStorage.setItem('clientPoints', data.points);
        localStorage.setItem('name', data.name);
        localStorage.setItem('email', data.email);
        localStorage.setItem('phone', data.phone);
        localStorage.setItem('address', data.address);
        localStorage.setItem('totalBuys', data.totalBuys);
        localStorage.setItem('ageType', data.ageType);

        
        let books: Array<Book> = [];
        localStorage.setItem('cart', JSON.stringify(books));
        
        this.snackBar.open("Login Successfull", '', { duration: 3000 });
        this.router.navigate(['/']);
      },
      (err: HttpErrorResponse) => {
        if (err.error.msg) {
          console.log(err.error.msg);
          this.snackBar.open(err.error.msg, 'Ups');
        } else {
          this.snackBar.open(err.error.message, 'Ok', {
            duration: 2000,
          });
        }
      });
  }
}
