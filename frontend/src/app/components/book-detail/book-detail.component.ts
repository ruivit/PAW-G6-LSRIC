import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


import { Book } from '../../Models/Book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {


  @Input() book?: Book;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,

    //private path: '../../backend/uploads/bookCovers'
  ) {

  }

  ngOnInit(): void {

    providers: [
      { provide: MAT_DIALOG_DATA, useValue: {} },
    ]
  }
}