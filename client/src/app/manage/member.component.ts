import { Component } from '@angular/core';
import { Account } from '../auth/account.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-member',
  templateUrl: './people-list.component.html',
  styles: []
})
export class MemberComponent {
  people: Account[];

  constructor(private authService: AuthService) {
    this.initTest();
  }

  initTest() {
    this.authService.fetchAllMembers()
      .subscribe(
        data => this.people = data,
        err => console.log(err));
  }
}
