import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private User: UserService, private router: Router, private snackBar: MatSnackBar) { }
  signupForm = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    phone_number: new FormControl(''),
    password: new FormControl(''),
    birthDate: new FormControl(''),
    ageType: new FormControl(''),
    recommendation: new FormControl('')
  });
  ngOnInit() { }

  calculateAgeType(birthDate: string) {
    const today = new Date();
    const birthDateDate = new Date(birthDate);
    const age = today.getFullYear() - birthDateDate.getFullYear();
    if (age < 10) {
      return 'Infantil';
    } else if (age > 10 && age <= 18) {
      return 'Juvenil';
    } else if (age > 18 && age <= 60) {
      return 'Adulto';
    } else {
      return 'Senior';
    }
  }

  createUser() {
    //Calculate age type
    this.signupForm.value.ageType = this.calculateAgeType(this.signupForm.value.birthDate);
    
    this.User.registerNewUser(this.signupForm.value).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate([ '/login' ]);
      },
      (err: HttpErrorResponse) => {
        if (err.error.msg) {
          console.log(err.error.msg);
          this.snackBar.open(err.error.msg, 'Undo');
        } else {
          this.snackBar.open('Something Went Wrong!');
        }
      }
    );
  }
}