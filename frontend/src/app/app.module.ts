//#region Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guard/auth.guard';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
//#endregion


//#region Components
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SellBookComponent } from './components/sell-book/sell-book.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { VisitorComponent } from './components/visitor/visitor.component';
import { NewBooksComponent } from './components/new-books/new-books.component';
import { UsedBooksComponent } from './components/used-books/used-books.component';
import { SearchedBooksComponent } from './components/searched-books/searched-books.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

//#endregion

//#region Services
//#endregion

//#region Style
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MatBadgeModule } from '@angular/material/badge';
import { IgxIconModule } from 'igniteui-angular';
//#endregion

//#region Routes
const appRoutes: Routes = [
  {
    //url: localhost:4200/
    path: '',
    component: VisitorComponent,
    data: { title: 'Welcome to Library G6' }
  },
  {
    //url: localhost:4200/client
    path: 'newbooks',
    component: NewBooksComponent,
    canActivate: [AuthGuard],
    data: { title: 'Welcome to Library G6' }
  },
  {
    //url: localhost:4200/client
    path: 'usedbooks',
    component: UsedBooksComponent,
    canActivate: [AuthGuard],
    data: { title: 'Welcome to Library G6' }
  },
  {
    path: 'searchbooks',
    component: SearchedBooksComponent,
    canActivate: [AuthGuard],
    data: { title: 'Welcome to Library G6' }
  },
  {
    //url: localhost:4200/cart
    path: 'cart',
    component: CartComponent,
    data: { title: 'Shopping Cart' }
  },
  {
    //url: localhost:4200/myprofile
    path: 'myprofile',
    component: MyprofileComponent,
    canActivate: [AuthGuard],
    data: { title: 'My Profile' }
  },
  {
    //url: localhost:4200/login
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    //url: localhost:4200/signup
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Signup' }
  },
  {
    //url: localhost:4200/sellBook
    path: 'sellbook',
    component: SellBookComponent,
    data: { title: 'Sell us a Book' }
  },
];
//#endregion

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    NavbarComponent,
    SellBookComponent,
    LoginComponent,
    SignupComponent,
    MyprofileComponent,
    VisitorComponent,
    NewBooksComponent,
    UsedBooksComponent,
    SearchedBooksComponent,
    BookDetailComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatRadioModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    FlexLayoutModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    AccordionModule.forRoot(),
    IgxIconModule,
    MatButtonToggleModule,
    MatBadgeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
