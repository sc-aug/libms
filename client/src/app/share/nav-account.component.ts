import { Component } from '@angular/core';

import { SharedService } from '../share/shared.service';

@Component({
  selector: 'app-nav-account',
  templateUrl: './nav-account.component.html',
  styleUrls: ['./nav-account.component.css',]
})
export class NavAccountComponent {
  me: any;
  tag: string = "no account";
  loggedIn: boolean = false;

  constructor(private sharedService: SharedService) {
    this.fetchData();

    this.sharedService.currentAcc$
      .subscribe(
        data => {
          this.tag = data.uname+'('+data.auth+')';
          this.loggedIn = true;
        }
      );
  }

  fetchData() {
    this.me = JSON.parse(localStorage.getItem('me'));
    this.updateLogStatus();
    this.initTag();
  }

  updateLogStatus() {
    const tmp = JSON.parse(localStorage.getItem('me'));
    if (tmp && tmp.token && this.me != null) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  initTag() {
    if (this.me != null) {
      this.tag = this.me.uname+'('+this.me.auth+')';
    }
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  isAdmin() {
    const tmp = JSON.parse(localStorage.getItem('me'));
    return tmp && tmp.token && tmp.auth == 'admin';
  }

  isLib() {
    const tmp = JSON.parse(localStorage.getItem('me'));
    return tmp && tmp.token && tmp.auth == 'lib';
  }

  authBookTrans() {
    return this.isAdmin() || this.isLib();
  }

  authBookOpt() {
    return this.isAdmin() || this.isLib();
  }

  authManage() {
    return this.isAdmin() || this.isLib();
  }

  updateCurPeople() {
    localStorage.setItem('cur_people', JSON.stringify(JSON.parse(localStorage.getItem('me'))));
  }

  logout() {
    this.loggedIn = false;
    this.me = null;
    this.tag = "no account";
  }

}
