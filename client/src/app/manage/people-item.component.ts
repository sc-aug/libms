import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Account } from '../auth/account.model';

@Component({
  selector: 'app-people-item',
  templateUrl: './people-item.component.html',
  styles: []
})
export class PeopleItemComponent {
  @Input() p: Account;

  constructor(private router: Router) {}

  checkProfile() {
    localStorage.cur_people = JSON.stringify(this.p);
    this.router.navigate(['/profile']);
  }
}
