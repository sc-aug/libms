import { Routes } from '@angular/router';

import { BorrowComponent } from './borrow.component';
import { ReturnComponent } from './return.component';

export const TRANS_ROUTES: Routes = [
  { path: '', redirectTo: 'borrow', pathMatch: 'full'},
  { path: 'borrow', component: BorrowComponent },
  { path: 'return', component: ReturnComponent }
]