import { Component } from '@angular/core';
import { Account } from '../auth/account.model';

@Component({
  selector: 'app-nav-account',
  templateUrl: './nav-account.component.html',
  //styleUrls: ['./nav-account.component.css',]
})
export class NavAccountComponent {
  account: Account;

  constructor() {
    this.account = null;
    // this.account = new Account('Shichuan', 2);
  }
}
