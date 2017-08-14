import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-account',
  templateUrl: './nav-account.component.html',
  styleUrls: ['./nav-account.component.css',]
})
export class NavAccountComponent {
  public status = localStorage;

  constructor(private authService: AuthService) {}
  
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return localStorage.getItem('auth') == 'admin';
  }

  isLib() {
    return localStorage.getItem('auth') == 'lib';
  }
}
