import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.css',]
})
export class NavTopComponent {
  authBookOpt() {
    return this.isLibrarian() || this.isAdmin();
  }

  authTrans() {
    return this.isLibrarian() || this.isAdmin();
  }

  authManage() {
    return this.isLibrarian() || this.isAdmin();
  }

  isLibrarian() {
    const tmp = JSON.parse(localStorage.getItem('me'));
    return tmp && tmp.token && tmp.auth == 'lib';
  }

  isAdmin() {
    const tmp = JSON.parse(localStorage.getItem('me'));
    return tmp && tmp.token && tmp.auth == 'admin';
  }

  ngOnInit() {
    
  }
}
