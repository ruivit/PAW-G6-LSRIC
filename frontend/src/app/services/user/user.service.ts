import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const api = 'https://localhost:3000/clientapi';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient,
    private router: Router) { }

  registerNewUser(payload: any) {
    // url: https://localhost/clientapi/register
    return this.http.post(api + '/register', payload);
  }

  userLogin(payload: any) {
    // url: https://localhost/clientapi/login
    return this.http.post(api + '/login', payload);
  }

  logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('clientID');
    this.router.navigate([ '/login' ]);
  }

  isLoggedIn() {
    return localStorage.getItem('Token') !== null;
  }

}