import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/Rx';

import { Account } from '../auth/account.model';
import { Book } from '../book/book.model';

import { AuthService } from '../auth/auth.service';
import { BookService } from '../book/book.service';

@Component({
  selector: 'app-trans',
  templateUrl: './transaction.component.html',
  styles: [`.row { padding-top: 40px; }`]
})
export class TransactionComponent {

}