import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';


import { Book } from '../../models/Book';
import { UsedBook } from '../../models/used-book';
import { Sale } from '../../models/Sale';

const endpoint = 'https://localhost/clientapi';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class RestService {
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  index(): Observable<Book[]> {
    // url: https://localhost/clientapi/index
    return this.http.get<Book[]>(endpoint + '/index');
  }

  searchBooks(term: string, bookType: string): Observable<Book[]> {
    // url: https://localhost/clientapi/search?term=term
    return this.http.get<Book[]>(endpoint + '/search?term=' + term
      + '&bookType=' + bookType);
  }



  
  getClientPurschases(): Observable<Sale[]> {
    // url: https://localhost/clientapi/mypurschases
    return this.http.get<Sale[]>(endpoint + '/mypurschases?username=' + localStorage.getItem('username'));
  }

  getClientBooks(): Observable<Book[]> {
    // url: https://localhost/clientapi/mysoldbooks
    return this.http.get<Book[]>(endpoint + '/mysoldbooks?username=' + localStorage.getItem('username'));
  }

  getClientPoints(): Observable<any> {
    // url: https://localhost/clientapi/clientPoints
    return this.http.get<any>(endpoint + '/clientPoints?username=' + localStorage.getItem('username'));
  }




  getPointsTable(): Observable<any> {
    // url: https://localhost/clientapi/pointsData
    return this.http.get<any>(endpoint + '/pointsTable');
  }

  getDiscountTable(): Observable<any> {
    // url: https://localhost/clientapi/pointsData
    return this.http.get<any>(endpoint + '/discountTable');
  }

  addSale(sale: Sale) {
    // url: https://localhost/clientapi/addSale
    return this.http.post(endpoint + '/makeSale', sale, httpOptions).subscribe(data => {});
  }

  sellBook(formParams: FormData) {
    // url: https://localhost/clientapi/sellBook

    console.log(formParams, "RestService");
    return this.http.post(endpoint + '/sellBook', formParams).subscribe(data => {
      console.log(data, "data");
    });
  }
}
