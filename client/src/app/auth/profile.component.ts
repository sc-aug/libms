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
export class ProfileComponent {
  
  profileForm: FormGroup;
  uname: string;
  acc: Account;

  constructor(private authService: AuthService, private router: Router) {
    if (localStorage.getItem('token')) {
      this.uname = localStorage.getItem('uname');
      this.acc = new Account(
        localStorage.getItem('email'),
        "",
        localStorage.getItem('uname'),
        localStorage.getItem('auth')
      );
    } else { // if you don't have token, you cannot access this page
      this.router.navigateByUrl('/');
    }
  }

  onSubmit() {
    console.log(this.profileForm.value);
    // create a new account
    const newAcc = new Account(
      this.profileForm.value.email,
      "",
      this.profileForm.value.uname,
      "");
    // using service
    this.authService.updateAccount(this.uname, newAcc).
      subscribe(
        data => console.log(data),
        err => console.log(err)
      );
    this.router.navigateByUrl('/');
  }
  
  ngOnInit() {
    this.profileForm = new FormGroup({
      uname: new FormControl("", Validators.required),
      auth: new FormControl("", Validators.required),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
        ])
    });
  }

}