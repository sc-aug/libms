import { Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { LibrarianComponent } from './librarian.component';
import { MemberComponent } from './member.component';

export const MANAGE_ROUTES: Routes = [
  { path: '', redirectTo: 'member', pathMatch: 'full'},
  { path: 'admin', component: AdminComponent },
  { path: 'librarian', component: LibrarianComponent },
  { path: 'member', component: MemberComponent }
]
