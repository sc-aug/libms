import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavTopComponent } from './share/nav-top.component';
import { NavAccountComponent } from './share/nav-account.component';
import { FooterComponent } from './share/footer.component';
import { HomeComponent } from './home.component';
import { SearchFormComponent } from './book/search-form.component';
import { SearchComponent } from './book/search.component';
import { BookListComponent } from './book/book-list.component';
import { BookItemComponent } from './book/book-item.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { LogoutComponent } from './auth/logout.component';


import { AUTH_ROUTES } from './auth/auth.routes';

const routes: Routes = [
  // basic routes
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }

  // all other routes and finally at the last add
  // { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavTopComponent,
    FooterComponent,
    HomeComponent,
    SearchFormComponent,
    SearchComponent,
    BookListComponent,
    BookItemComponent,
    AuthenticationComponent,
    SigninComponent,
    SignupComponent,
    LogoutComponent,
    NavAccountComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
