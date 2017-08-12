import { Component, OnInit } from '@angular/core';
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
  constructor(private authService: AuthService) {}

  onSubmit() {
    console.log(this.signupForm.value);
    // create a new account
    const acc = new Account(
      this.signupForm.value.email,
      this.signupForm.value.passwd,
      this.signupForm.value.uname);
    // using service
    this.authService.signup(acc).
        subscribe(
          data => console.log(data),
          err => console.log(err)
        );
    this.signupForm.reset();
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      uname: new FormControl("", Validators.required),
      passwd: new FormControl("", Validators.required),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
        ])
    });
  }
}
