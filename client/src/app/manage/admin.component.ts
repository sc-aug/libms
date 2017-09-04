import { Component } from '@angular/core';

import { Account } from '../auth/account.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './people-list.component.html',
  styles: []
})
export class AdminComponent {
  people: Account[];

  constructor(private authService: AuthService) {
    this.initTest();
  }

  initTest() {
    this.authService.fetchAccountByAuth('admin')
      .subscribe(
        data => this.people = data,
        err => console.log(err));
  }
}
