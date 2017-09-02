import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavTopComponent } from './share/nav-top.component';
import { NavAccountComponent } from './share/nav-account.component';
import { AboutComponent } from './share/about.component';
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

import { BookOptComponent } from './book/book-opt.component';
import { BookAddComponent } from './book/book-add.component';
import { BookEditComponent } from './book/book-edit.component';
import { BookViewComponent } from './book/book-view.component';

import { TransactionComponent } from './trans/transaction.component';
import { BorrowComponent } from './trans/borrow.component';
import { ReturnComponent } from './trans/return.component';
import { LoadDataComponent } from './trans/load-data.component';

import { ManageComponent } from './manage/manage.component';
import { AdminComponent } from './manage/admin.component';
import { LibrarianComponent} from './manage/librarian.component';
import { MemberComponent } from './manage/member.component';
import { PeopleItemComponent } from './manage/people-item.component';

import { ProfileComponent } from './profile/profile.component';
import { AccInfoComponent } from './profile/acc-info.component';

import { appRouting } from './app.routing';

import { AuthService } from './auth/auth.service';
import { SharedService } from './share/shared.service';
import { BookService } from './book/book.service';
import { TransService } from './trans/trans.service';
import { ProfileService } from './profile/profile.service';

@NgModule({
  declarations: [
    AppComponent,
    NavTopComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    SearchFormComponent,
    SearchComponent,
    ResultListComponent,
    ResultItemComponent,
    AuthenticationComponent,
    SigninComponent,
    SignupComponent,
    LogoutComponent,
    NavAccountComponent,
    BookOptComponent,
    BookAddComponent,
    BookViewComponent,
    BookEditComponent,
    TransactionComponent,
    BorrowComponent,
    ReturnComponent,
    LoadDataComponent,
    ManageComponent,
    AdminComponent,
    LibrarianComponent,
    MemberComponent,
    PeopleItemComponent,
    ProfileComponent,
    AccInfoComponent
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
    TransService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
