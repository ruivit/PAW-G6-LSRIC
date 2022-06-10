import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const endpoint = 'https://localhost/clientapi';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  registerNewUser(payload: any) {
    return this.http.post(endpoint + '/register', payload);
  }

  userLogin(payload: any) {
    return this.http.post(endpoint + '/login', payload);
  }

  logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('clientID');
    this.router.navigate([ '/login' ]);
  }

  constructor(private http: HttpClient,
    private router: Router) { }

}