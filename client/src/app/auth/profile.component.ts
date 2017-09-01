import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Account } from './account.model';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  me: Account;
  cur_people: Account;

  constructor(private authService: AuthService, private router: Router) {

    this.me = JSON.parse(localStorage.getItem('me'));
    this.cur_people = JSON.parse(localStorage.getItem('cur_people'));

    if (this.validAuth(this.me, this.cur_people)) {
      //this.cur_people = JSON.parse(localStorage.getItem('cur_people'));
    } else { // if you don't have token, you cannot access this page
      this.router.navigateByUrl('/');
    }
  }

  validAuth(me, cur) {
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

  ngOnInit() {
    this.profileForm = new FormGroup({
      uname: new FormControl({ value: this.cur_people.uname }, Validators.required),
      auth: new FormControl({ value: this.cur_people.auth, disabled: true }, Validators.required),
      email: new FormControl({ value: this.cur_people.email }, [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
        ])
    });
  }

}
