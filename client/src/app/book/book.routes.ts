import { Routes } from '@angular/router';

import { BookAddComponent } from './book-add.component';
import { BookEditComponent } from './book-edit.component';
import { BookViewComponent } from './book-view.component';

export const BOOK_ROUTES: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full'},
  { path: 'add', component: BookAddComponent },
  { path: 'edit', component: BookEditComponent },
  { path: 'view', component: BookViewComponent }
]