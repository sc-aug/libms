import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
@Component({
  selector: 'app-logout',
  template: '<h1>Logout</h1>'
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.onLogout();
  }
  
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth', 'signin']);
  }
  
}