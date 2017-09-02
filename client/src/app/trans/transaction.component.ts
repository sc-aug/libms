import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { BookService } from '../book/book.service';

@Component({
  selector: 'app-trans',
  templateUrl: './transaction.component.html',
  styles: [`.row { padding-top: 40px; }`]
})
export class TransactionComponent {
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
}
