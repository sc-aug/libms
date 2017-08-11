import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['auth-share.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  onSubmit() {
    console.log(this.signupForm);
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      uname: new FormControl(null, [Validators.required]),
      passwd: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required])
    });
  }
}
