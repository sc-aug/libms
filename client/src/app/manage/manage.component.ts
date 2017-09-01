import { Component } from '@angular/core';

import { Account } from '../auth/account.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styles: [`
    .row {
      padding-top: 40px;
    }
  `]
})
export class ManageComponent {}
