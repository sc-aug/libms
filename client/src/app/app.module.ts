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
import { SearchFormComponent } from './book/search-form.component';
import { SearchComponent } from './book/search.component';
import { BookListComponent } from './book/book-list.component';

import { ResultListComponent } from './book/result-list.component';

import { BookItemComponent } from './book/book-item.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { LogoutComponent } from './auth/logout.component';
import { ProfileComponent } from './auth/profile.component';

import { appRouting } from './app.routing';
import { AuthService } from './auth/auth.service';
import { SearchService } from './book/search.service';
import { SharedService } from './book/shared.service';

@NgModule({
  declarations: [
    AppComponent,
    NavTopComponent,
    FooterComponent,
    HomeComponent,
    SearchFormComponent,
    SearchComponent,
    BookListComponent,

    ResultListComponent,


    BookItemComponent,
    AuthenticationComponent,
    SigninComponent,
    SignupComponent,
    LogoutComponent,
    NavAccountComponent,
    ProfileComponent
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
    SearchService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
