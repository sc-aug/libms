import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProfileService } from './profile.service';
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

  constructor(private profileService: ProfileService, private router: Router) {
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
