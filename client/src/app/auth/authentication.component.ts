import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styles: [`
    .row {
      padding-top: 40px;
    }
  `]
})
export class AuthenticationComponent {
  // constructor(private authService: AuthService) {}

  // isLoggedIn() {
  //   return this.authService.isLoggedIn();
  // }
}