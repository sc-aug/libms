import { Component, OnInit } from '@angular/core';
import { Account } from './account.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  account: Account;

  constructor() {
    this.account = new Account('Shichuan', 2);
  }

  ngOnInit() {
  }

}
