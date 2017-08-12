import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Account } from './account.model';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['auth-share.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  // inject service
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log(this.signinForm.value);
    const acc = new Account(this.signinForm.value.email, this.signinForm.value.passwd);
    this.authService.signin(acc)
      .subscribe(
        data => {
          // storage in browser, javascript object
          localStorage.setItem('token', data.token);
          localStorage.setItem('accId', data.accId);
          localStorage.setItem('accName', data.accName);
          localStorage.setItem('accAuth', data.accAuth);
          // this.router.navigate(['/']);
          this.router.navigateByUrl('/');
        },
        err => console.error(err)
      );
    // 
    
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