import { Component } from '@angular/core';

import { Account } from '../auth/account.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-librarian',
  templateUrl: './people-list.component.html',
  styles: []
})
export class LibrarianComponent {
  people: Account[];

  constructor(private authService: AuthService) {
    this.initTest();
  }

  initTest() {
    this.authService.fetchAccountByAuth('lib')
      .subscribe(
        data => this.people = data,
        err => console.log(err));
  }
}
