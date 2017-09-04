import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Account } from '../auth/account.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styles: [`
    .row {
      padding-top: 40px;
    }
  `]
})
export class ManageComponent {
  constructor(private router: Router) {
    this.isAuthorized();
  }

  isAuthorized() {
    if (!this.isLib() && !this.isAdmin()) {
      this.router.navigateByUrl('/');
    }
  }

  isAdmin() {
    const tmp = JSON.parse(localStorage.getItem('me'));
    return tmp && tmp.token && tmp.auth == 'admin';
  }

  isLib() {
    const tmp = JSON.parse(localStorage.getItem('me'));
    return tmp && tmp.token && tmp.auth == 'lib';
  }

  // for TAG visibility
  authAdmin() {
    return this.isAdmin();
  }

  authLib() {
    return this.isAdmin();
  }

  authMember() {
    return this.isLib() || this.isAdmin();
  }
}
