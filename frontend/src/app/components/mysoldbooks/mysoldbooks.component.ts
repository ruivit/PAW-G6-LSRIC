import { Component, OnInit } from '@angular/core';

import { RestService } from '../../services/rest/rest.service';

@Component({
  selector: 'app-mysoldbooks',
  templateUrl: './mysoldbooks.component.html',
  styleUrls: ['./mysoldbooks.component.css']
})
export class MysoldbooksComponent implements OnInit {

  books: any = [];
  term: string = '';

  constructor(private restService: RestService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.restService.getClientBooks().subscribe(data => {
      this.books = data;
      console.log("msb gb " + this.books);
    });
  }
}
