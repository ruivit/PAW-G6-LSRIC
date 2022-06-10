import { Component, OnInit } from '@angular/core';

import { Sale } from '../../Models/Sale';
import { HttpErrorResponse } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from 'src/app/services/rest/rest.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  clientSales = Array<Sale>();
  clientSoldBooks = Array<any>();
  isCollapsed = false;
  clientData = {
    name: JSON.stringify(localStorage.getItem('name')).toString().replace(/\"/g, ""),
    email: JSON.stringify(localStorage.getItem('email')).toString().replace(/\"/g, ""),
    phone: JSON.stringify(localStorage.getItem('phone')).toString().replace(/\"/g, ""),
    address: JSON.stringify(localStorage.getItem('address')).toString().replace(/\"/g, ""),
    totalBuys: JSON.stringify(localStorage.getItem('totalBuys')).toString().replace(/\"/g, ""),
    points: JSON.stringify(localStorage.getItem('clientPoints')).toString().replace(/\"/g, ""),
  }

  form: FormGroup = new FormGroup({});
  
  constructor(
    private rest: RestService,
    private snackBar: MatSnackBar,
    private user: UserService,
    private fb: FormBuilder) {

    this.form = fb.group({
      password: [''],
      password2: [''],
    });
  }
    
  get f(){
    return this.form.controls;
  }
   
  submit(){
    // check if new password is equal to confirm password
    if ( this.form.value.password != this.form.value.password2 ) {
      this.snackBar.open('Passwords do not match', '', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    this.rest.updatePassword(this.form.value).subscribe(
      (data: any) => { },
      (err: HttpErrorResponse) => {
        if (err.error.msg) {
          this.snackBar.open(err.error.msg, 'Ups');
        }
      }
    );

    this.snackBar.open('Password updated, please login again', 'Ok', {
      duration: 2000,
    });

    //sleep for 3s
    setTimeout(() => {
      this.user.logout();
    }, 3000);
  }
  
  ngOnInit(): void {

    console.log(this.clientData);

    this.rest.getClientSales().subscribe(
      (data: any) => {
        this.clientSales = data;
      }
    );
    this.rest.getClientSoldBooks().subscribe(
      (data: any) => {
        this.clientSoldBooks = data;
      }
    );
  }

  getClientSales() {
    return this.clientSales;
  }

  getClientSoldBooks() {
    return this.clientSoldBooks;
  }

}