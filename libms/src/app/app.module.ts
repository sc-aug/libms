import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavtopComponent } from './navtop/navtop.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  // basic routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'search', component: SearchComponent },
  { path: 'account', component: AccountComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'contact', component: ContactComponent },

  // authentication demo
  { path: 'login', component: LoginComponent },
  // {
  //   path: 'protected',
  //   component: ProtectedComponent,
  //   canActivate: [LoggedInGuard]
  // },

  // // nested
  // {
  //   path: 'products',
  //   component: ProductsComponent,
  //   children: childRoutes
  // }

  // all other routes and finally at the last add
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavtopComponent,
    HomeComponent,
    SearchComponent,
    SearchFormComponent,
    AboutComponent,
    LoginComponent,
    AccountComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
