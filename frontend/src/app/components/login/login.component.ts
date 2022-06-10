import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
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

  loginUser() {
    this.User.userLogin(this.loginForm.value).subscribe(
      (data: any) => {
        let token = data.token;
        localStorage.setItem('Token', token);
        localStorage.setItem('clientID', data.clientID);
        localStorage.setItem('username', data.username);
        this.snackBar.open("Login com Sucesso", "Nice", { duration: 3000 });
        this.router.navigate(['/']);
      },
      (err: HttpErrorResponse) => {
        if (err.error.msg) {
          console.log(err.error.msg);
          this.snackBar.open(err.error.msg, 'Ups');
        } else {
          this.snackBar.open(err.error.message, 'Ok...', {
            duration: 2000,
          });
        }
      });
  }
}
