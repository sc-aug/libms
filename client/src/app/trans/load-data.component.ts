import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';

// By importing just the rxjs operators we need, We're theoretically able
// to reduce our build size vs. importing all of them.
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';

import { Account } from '../auth/account.model';
import { Book } from '../book/book.model';

import { AuthService } from '../auth/auth.service';
import { BookService } from '../book/book.service';


@Component({
  selector: 'app-load-data',
  template: `
    <button type="submit" class="btn btn-default" (click)="onClick()">Load Data</button>
  `
})
export class LoadDataComponent implements OnInit {
  @Output() books: EventEmitter<Book[]> = new EventEmitter<Book[]>();
  @Output() members: EventEmitter<Account[]> = new EventEmitter<Account[]>();

  constructor(private authService: AuthService,
              private bookService: BookService,
              private el: ElementRef) {
  }

  onClick() {
    this.authService.fetchAllMembers().subscribe(
      data => {
        this.members.emit(data);
        console.log(this.members);
      },
      err => {
        console.error(err);
      });

    this.bookService.fetchAllBooks().subscribe(
      data => {
        this.books.emit(data);
      },
      err => {
        console.error(err);
      });
  }

  ngOnInit(): void {

  }
}
