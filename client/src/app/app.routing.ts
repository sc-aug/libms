import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './home.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { SearchComponent } from './book/search.component';

import { AUTH_ROUTES } from './auth/auth.routes';

const APP_ROUTES: Routes = [
  // basic routes
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }

  // all other routes and finally at the last add
  // { path: '**', redirectTo: 'home' }
];

export const appRouting = RouterModule.forRoot(APP_ROUTES, { useHash: true });
