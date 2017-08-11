import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['auth-share.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  onSubmit() {
    console.log(this.signinForm);
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      passwd: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required])
    });
  }
}