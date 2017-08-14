import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavTopComponent } from './share/nav-top.component';
import { NavAccountComponent } from './share/nav-account.component';
import { FooterComponent } from './share/footer.component';
import { HomeComponent } from './home.component';
import { AuthenticationComponent } from './auth/authentication.component';

import { SearchFormComponent } from './book/search-form.component';
import { SearchComponent } from './book/search.component';
import { ResultListComponent } from './book/result-list.component';
import { ResultItemComponent } from './book/result-item.component';

import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { LogoutComponent } from './auth/logout.component';
import { ProfileComponent } from './auth/profile.component';

import { BookOptComponent } from './book/book-opt.component';
import { BookAddComponent } from './book/book-add.component';
import { BookEditComponent } from './book/book-edit.component';
import { BookViewComponent } from './book/book-view.component';

import { TransactionComponent } from './trans/transaction.component';
import { BorrowComponent } from './trans/borrow.component';
import { ReturnComponent } from './trans/return.component';
import { LoadDataComponent } from './trans/load-data.component';

import { appRouting } from './app.routing';

import { AuthService } from './auth/auth.service';
import { SharedService } from './book/shared.service';
import { BookService } from './book/book.service';
import { TransService } from './trans/trans.service';

@NgModule({
  declarations: [
    AppComponent,
    NavTopComponent,
    FooterComponent,
    HomeComponent,
    SearchFormComponent,
    SearchComponent,
    ResultListComponent,
    ResultItemComponent,
    AuthenticationComponent,
    SigninComponent,
    SignupComponent,
    LogoutComponent,
    NavAccountComponent,
    ProfileComponent,
    BookOptComponent,
    BookAddComponent,
    BookViewComponent,
    BookEditComponent,
    TransactionComponent,
    BorrowComponent,
    ReturnComponent,
    LoadDataComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    appRouting
  ],
  providers: [
    AuthService,
    SharedService,
    BookService,
    TransService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
