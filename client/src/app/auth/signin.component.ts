import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { SharedService } from '../share/shared.service';
import { Account } from './account.model';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['auth-share.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  // inject service
  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router) {}

  onSubmit() {
    // console.log(this.signinForm.value);
    const acc = new Account("", this.signinForm.value.email, this.signinForm.value.passwd);
    // Signin
    this.authService.signin(acc)
      .subscribe(
        data => {
          localStorage.setItem('me', JSON.stringify(data.account));
          this.sharedService.publishCurrentAcc(data.account);
          this.router.navigateByUrl('/');
        },
        err => console.error(err)
      );

    this.signinForm.reset();
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      passwd: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
      ])
    });
  }
}
