import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IndexComponent } from './components/index/index.component';
import { CartComponent } from './components/cart/cart.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { TopbarclientComponent } from './components/topbarclient/topbarclient.component';
import { SellBookComponent } from './components/sell-book/sell-book.component';
import { SearchComponent } from './components/search/search.component';
import { MypurschasesComponent } from './components/mypurschases/mypurschases.component';
import { MysoldbooksComponent } from './components/mysoldbooks/mysoldbooks.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatDividerModule} from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guard/auth.guard';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { IndexclientComponent } from './components/indexclient/indexclient.component';

const appRoutes: Routes = [
  {
  //url: localhost:4200/
  path: '',
  component: IndexComponent,
  data: { title: 'Welcome to Library G6' }
  },
  {
  //url: localhost:4200/library
  path: 'library',
  canActivate: [ AuthGuard ],
  component: IndexclientComponent,
  data: { title: 'Welcome to Library G6' }
  },
  {
  //url: localhost:4200/login
  path: 'login',
  component: LoginComponent,
  data: { title: 'Login' }
  },
  {
    //url: localhost:4200/login
    path: 'logout',
    component: LoginComponent,
    data: { title: 'Logout' }
  },
  {
  //url: localhost:4200/sign-up
  path: 'signup',
  component: SignupComponent,
  data: { title: 'Sign Up' }
  },
  {
  //url: localhost:4200/cart
  path: 'cart',
  component: CartComponent,
  data: { title: 'My Shopping Cart' }
  },
  {
    //url: localhost:4200/search
    path: 'search',
    component: SearchComponent,
    data: { title: 'Search Books' }
  },
  {
    //url: localhost:4200/sellbook
    path: 'sellbook',
    component: SellBookComponent,
    data: { title: 'Sell Book' }
  },
  {
  //url: localhost:4200/mypurschases
  path: 'mypurschases',
  component: MypurschasesComponent,
  data: { title: 'My Purchases' }
  },
  {
  //url: localhost:4200/mysoldbooks
  path: 'mysoldbooks',
  component: MysoldbooksComponent,
  data: { title: 'My Sold Books' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    CartComponent,
    TopbarComponent,
    IndexComponent,
    SellBookComponent,
    SearchComponent,
    MypurschasesComponent,
    MysoldbooksComponent,
    LoginComponent,
    SignupComponent,
    IndexclientComponent,
    TopbarclientComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule, MatInputModule, MatCardModule, MatFormFieldModule,MatGridListModule,MatSnackBarModule, BrowserAnimationsModule,
    MatDatepickerModule,
    MatRadioModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    FlexLayoutModule
    ],
    providers: [
      {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
      }],
    bootstrap: [AppComponent]
})

export class AppModule { }
