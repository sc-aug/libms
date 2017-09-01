import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './home.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { SearchComponent } from './book/search.component';
import { ProfileComponent } from './auth/profile.component';
import { BookOptComponent } from './book/book-opt.component';
import { TransactionComponent } from './trans/transaction.component';
import { ManageComponent } from './manage/manage.component';

import { AUTH_ROUTES } from './auth/auth.routes';
import { BOOK_ROUTES } from './book/book.routes';
import { TRANS_ROUTES } from './trans/trans.routes';
import { MANAGE_ROUTES } from './manage/manage.routes';

const APP_ROUTES: Routes = [
  // basic routes
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
  { path: 'profile', component: ProfileComponent },
  { path: 'book-opt', component: BookOptComponent, children: BOOK_ROUTES },
  { path: 'trans', component: TransactionComponent, children: TRANS_ROUTES },
  { path: 'manage', component: ManageComponent, children: MANAGE_ROUTES },

  // all other routes and finally at the last add
  { path: '**', redirectTo: 'home' }
];

export const appRouting = RouterModule.forRoot(APP_ROUTES, { useHash: true });
