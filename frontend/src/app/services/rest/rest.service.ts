import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TempBook } from 'src/app/Models/temp-book';

import { Book } from '../../Models/Book';
import { Sale } from '../../Models/Sale';

//#region Constants
const api = 'https://localhost:3000/clientapi';
const baseURl = 'http://localhost/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
//#endregion

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient
  ) { }

  getBooks(type: string): Observable<Book[]> {
    return this.http.get<Book[]>(api + '/books?type=' + type);
  }


  getSale(saleID: number) {
    // url: https://localhost/clientapi/getSale?saleID=saleID
    return this.http.get(api + '/getSale?saleID=' + saleID);
  }

  getPointsTable() {
    // url: https://localhost/clientapi/pointsTable
    return this.http.get(api + '/pointsTable');
  }

  getDiscountTable() {
    // url: https://localhost/clientapi/discountTable
    return this.http.get(api + '/discountTable');
  }

  getClientPoints() {
    // url: https://localhost/clientapi/clientPoints
    return this.http.get(api + '/clientPoints?username=' +
      localStorage.getItem('username'));
  }


  searchBooks(term: string, bookType: string): Observable<Book[]> {
    // url: https://localhost/clientapi/search?term=term
    return this.http.get<Book[]>(api + '/search?term=' + term
      + '&bookType=' + bookType);
  }


  rateBook(bookId: number, like: number) {
    // url: https://localhost/clientapi/rateBook?bookId=bookId&like=true
    return this.http.get(api + '/rateBook?bookId=' + bookId + '&like=' + like);
  }


  getClientSales() {
    // url: https://localhost/clientapi/clientSales
    return this.http.get(api + '/clientSales?username=' +
      localStorage.getItem('username'));
  }


  getClientSoldBooks() {
    // url: https://localhost/clientapi/clientSoldBooks
    return this.http.get(api + '/clientSoldBooks?username=' +
      localStorage.getItem('username'));
  }


  updatePassword(formParams: FormData) {
    // url: https://localhost/clientapi/updatePassword
    return this.http.post(api + '/updatePassword', formParams);
  }

  sellBook(tempBookModel: TempBook, selectedFile: any) {
    console.log('restService');
    console.log(tempBookModel);
    // url: https://localhost/clientapi/sellbook
    return this.http.post(api + '/sellbook', { tempBookModel, selectedFile });

  }

  checkout(formParams: FormData) {
    // url: https://localhost/clientapi/makeSale
    return this.http.post(api + '/makeSale', formParams);
  }
}
