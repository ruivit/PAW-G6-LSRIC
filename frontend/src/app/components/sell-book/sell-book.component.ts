import { Component, OnInit } from '@angular/core';

import { TempBook } from '../../Models/temp-book';

import { MatSnackBar } from '@angular/material/snack-bar';

import { RestService } from 'src/app/services/rest/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell-book',
  templateUrl: './sell-book.component.html',
  styleUrls: ['./sell-book.component.css']
})
export class SellBookComponent {

  loading: boolean = false; // Flag variable

  // Inject SellBookService
  constructor(
    private snackBar: MatSnackBar,
    private restService: RestService,
    private router: Router,
  ) { }

  genres = ['Fiction', 'Non-Fiction', 'Children', 'Others', 'Biography', 'Poetry', 'Fantasy', 'Thriller', 'Horror', 'Mystery', 'Romance', 'Self-Help', 'Health', 'Travel', 'Science', 'History', 'Religion', 'Philosophy', 'Psychology', 'Business', 'Comics', 'Art', 'Cooking', 'Drama', 'Education', 'Engineering', 'Finance', 'Health', 'Law', 'Medicine', 'Music', 'Science', 'Sports', 'Technology', 'Travel', 'Youth'];
  genreHasError = true;


  // Create a model of an UsedBook
  tempBookModel = new TempBook('Title', 'Author', 'Genre', 'Editor', 'Resume', 
  0, new Date(Date.now()), '', localStorage.getItem('username') || '', 0);
  
  validateGenre(value:any){
    if(value === 'default'){
      this.genreHasError = true;
    } else {
      this.genreHasError = false;
    }
  }

  selectedFile: any = null;

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }
 

  onSubmit() {
    const fd = new FormData();

    // convert the model to a form data
    fd.append('title', this.tempBookModel.title);
    fd.append('author', this.tempBookModel.author);
    fd.append('genre', this.tempBookModel.genre);
    fd.append('editor', this.tempBookModel.editor);
    fd.append('resume', this.tempBookModel.resume);
    fd.append('isbn', this.tempBookModel.isbn.toString());
    fd.append('sellPrice', this.tempBookModel.sellPrice.toString());
    fd.append('dateAdded', this.tempBookModel.dateAdded.toString());
    fd.append('dateString', this.tempBookModel.dateString);
    fd.append('provider', this.tempBookModel.provider);

    fd.append('image', this.selectedFile, this.selectedFile.name);

    this.restService.sellBook(fd).subscribe((data) => { } );
    this.snackBar.open("Your proposal was submited.", '', { duration: 3000 });

    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}

