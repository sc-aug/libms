import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-account',
  templateUrl: './nav-account.component.html',
  styleUrls: ['./nav-account.component.css',]
})
export class NavAccountComponent implements OnInit{
  me: any;

  constructor() {
  }

  fetchData() {
    this.me = JSON.parse(localStorage.getItem('me'));
  }

  isLoggedIn() {
    const tmp = JSON.parse(localStorage.getItem('me'));
    return tmp != null && tmp.token != null && this.me != null;
  }

  isAdmin() {
    const tmp = JSON.parse(localStorage.getItem('me'));
    return tmp != null && tmp.auth == 'admin';
  }

  isLib() {
    const tmp = JSON.parse(localStorage.getItem('me'));
    return tmp != null && tmp.auth == 'lib';
  }

  updateCurPeople() {
    localStorage.setItem('cur_people', JSON.stringify(this.me));
  }

  logout() {
    this.me = null;
  }

  ngOnInit() {
      this.fetchData();
  }
}
