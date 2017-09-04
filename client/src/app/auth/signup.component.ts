import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './auth.service';
import { Account } from './account.model';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['auth-share.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  // inject service
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log(this.signupForm.value);
    // create a new account
    const acc = new Account(
      "",
      this.signupForm.value.email,
      this.signupForm.value.passwd,
      this.signupForm.value.uname,
      this.signupForm.value.auth);
    // using service
    this.authService.signup(acc).
        subscribe(
          data => console.log(data),
          err => console.log(err)
        );
    // this.signupForm.reset();
    this.router.navigate(['/auth', 'signin']);
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
    this.signupForm = new FormGroup({
      uname: new FormControl("", Validators.required),
      passwd: new FormControl("", Validators.required),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
      ]),
      auth: new FormControl({ value: "member", disabled: true }, Validators.required)
    });
  }

  initFormAuth() {
    this.signupForm = new FormGroup({
      uname: new FormControl("", Validators.required),
      passwd: new FormControl("", Validators.required),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
      ]),
      auth: new FormControl("", Validators.required)
    });
  }

}
