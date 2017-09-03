import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';
import { SharedService } from '../share/shared.service';
import { Account } from '../auth/account.model';

@Component({
  selector: 'app-acc-info',
  templateUrl: 'acc-info.component.html',
  styleUrls: ['acc-info.component.css']
})
export class AccInfoComponent implements OnInit {
  @Input() cur_people: Account;
  @Input() borrow_list: any[];
  profileForm: FormGroup;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router) {
  }

  onSubmit() {
    //console.log(this.cur_people);
    var update_people = new Account(
      this.cur_people._id,
      this.cur_people.email,
      "",
      this.cur_people.uname,
      "");
    // create a new book
    update_people.uname = this.profileForm.value.uname;
    update_people.email = this.profileForm.value.email;
    update_people.auth = this.profileForm.value.auth;
    this.authService.updateAccount(this.cur_people._id, update_people)
      .subscribe(
        data => {
          console.log(data);
          // put current book in localStorage
          console.log(data.obj);
          this.updateLocalStorage(data.obj);
          this.router.navigateByUrl('/profile');
        },
        err => console.log(err)
      );
  }

  onDelete() {
    const tmp = JSON.parse(localStorage.getItem('cur_people'));
    this.authService.deleteAccount(tmp._id)
      .subscribe(
        result => {
          console.log("[delete account complete]", result);

          this.deleteLocalStorage();
          // redirect
          if (localStorage.length == 0) {
            this.router.navigateByUrl('/');
          } else {
            this.router.navigate(['/manage', 'member']);
          }
      });
  }

  deleteLocalStorage() {
    const tmp_me = JSON.parse(localStorage.getItem('me'));
    const tmp_cur = JSON.parse(localStorage.getItem('cur_people'));

    if (tmp_me && tmp_cur && tmp_me._id == tmp_cur._id) {
      localStorage.clear();

      this.sharedService.publishCurrentAcc(null);
    } else {
      localStorage.removeItem('cur_people');
    }
  }

  updateLocalStorage(acc: Account) {
    const tmp_me = JSON.parse(localStorage.getItem('me'));
    const tmp_cur = JSON.parse(localStorage.getItem('cur_people'));
    //console.log("updatelocal:", tmp_me, tmp_cur);
    if (tmp_me && tmp_cur && tmp_me._id == tmp_cur._id) {
      this.updateMe(acc);
    }
    this.updateCurPeople(acc);
  }

  updateMe(acc: Account) {
    const tmp_me = JSON.parse(localStorage.getItem('me'));
    tmp_me.uname = acc.uname;
    tmp_me.email = acc.email;

    localStorage.setItem('me',  JSON.stringify(tmp_me));

    this.sharedService.publishCurrentAcc(acc);
  }

  updateCurPeople(acc: Account) {
    const tmp_cur = JSON.parse(localStorage.getItem('cur_people'));
    tmp_cur.uname = acc.uname;
    tmp_cur.email = acc.email;

    localStorage.setItem('cur_people', JSON.stringify(tmp_cur));
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const tmp = JSON.parse(localStorage.getItem('me'));

    if (tmp && tmp.auth == 'admin') {
      this.initFormAuth();
    } else {
      this.initFormMemberAndLib();
    }
  }

  initFormMemberAndLib() {
    this.profileForm = new FormGroup({
      uname: new FormControl({ value: this.cur_people.uname }, Validators.required),
      auth: new FormControl({ value: this.cur_people.auth, disabled: true }, Validators.required),
      email: new FormControl({ value: this.cur_people.email }, [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
        ])
    });
  }

  initFormAuth() {
    this.profileForm = new FormGroup({
      uname: new FormControl({ value: this.cur_people.uname }, Validators.required),
      auth: new FormControl({ value: this.cur_people.auth }, Validators.required),
      email: new FormControl({ value: this.cur_people.email }, [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
        ])
    });
  }

  authReturn() {
    return this.isLib() || this.isAdmin();
  }

  isLib (){
    const tmp_me = JSON.parse(localStorage.getItem('me'));
    return tmp_me.auth == 'lib';
  }

  isAdmin (){
    const tmp_me = JSON.parse(localStorage.getItem('me'));
    return tmp_me.auth == 'admin';
  }

  onReturn() {
    this.router.navigate(['/trans', 'return']);
  }

}
