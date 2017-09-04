import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { SharedService } from '../share/shared.service';
import { Account } from '../auth/account.model';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent {
  // for acc-info: check auth & detail
  me: Account;
  cur_people: Account;
  // for borrow list: data of books
  borrow_list: any;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private profileService: ProfileService,
    private router: Router) {
    // account data: me &
    this.loadAccountData();
    // check validation
    this.authValidation();
    // get borrow list
    this.fetchBorrowList();
  }

  loadAccountData() {
    this.me = JSON.parse(localStorage.getItem('me'));
    this.cur_people = JSON.parse(localStorage.getItem('cur_people'));
    if (! this.me) {
      this.authService.logout();
      this.sharedService.publishCurrentAcc(null);
    }
  }

  authValidation() {
    // check validation
    if (this.cur_people != null && this.checkAuth(this.me, this.cur_people)) {
      //this.cur_people = JSON.parse(localStorage.getItem('cur_people'));
    } else { // if you don't have token, you cannot access this page
      this.router.navigateByUrl('/');
    }
  }

  checkAuth(me, cur) {
    if ( !me ) {
      return false;
    } else if (me.auth == 'admin') {
      return true;
    } else if (me.auth == 'member' && cur.auth == 'lib') {
      return true;
    } else if (me.auth == cur.auth && me._id == cur._id) {
      return true;
    } else {
      return false;
    }
  }

  fetchBorrowList() {
    if ( ! this.cur_people ) return;
    this.profileService.fetchBorrowList(this.cur_people._id)
      .subscribe(
        data => this.borrow_list = data.obj,
        err => console.error(err)
      );
  }

}
