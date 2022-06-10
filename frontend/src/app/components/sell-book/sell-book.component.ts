import { Component, OnInit } from '@angular/core';
import { TempBook } from '../../Models/temp-book';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from 'src/app/services/rest/rest.service';

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
    private restService: RestService
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

  selectedFile: any;
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0]
  }
 

  onSubmit(){
    this.loading = true;
    this.restService.sellBook(this.tempBookModel, this.selectedFile).subscribe(
      (data) => {
        this.loading = false;
        this.snackBar.open('Book sold successfully!', '', {
          duration: 2000,
        });
      });
    this.snackBar.open("Your proposal was submited.", '', { duration: 3000 });
  }

  
  ngOnInit(): void {
  }

}

