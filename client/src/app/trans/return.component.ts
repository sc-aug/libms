import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/Rx';

import { Account } from '../auth/account.model';
import { Book } from '../book/book.model';

import { AuthService } from '../auth/auth.service';
import { BookService } from '../book/book.service';
import { TransService } from './trans.service';

@Component({
  selector: 'app-borrow',
  templateUrl: 'return.component.html',
  styles: ['label { padding-top: 8px; } select { width: 200px; }']
})
export class ReturnComponent implements OnInit {
  members: Account[];
  books: Book[];
  returnForm: FormGroup;

  borrowResult: any;

  constructor(private authService: AuthService,
              private bookService: BookService,
              private transService: TransService,
              private router: Router) {}

  // borrow book
  onSubmit() {
    this.transService.returnBook(
      this.returnForm.value.book_id,
      this.returnForm.value.member_id)
      .subscribe(
        data => {
          console.log(data);
        },
        err => console.log(err));
  }

  initForm() {
    this.returnForm = new FormGroup({
      book_id: new FormControl("", Validators.required),
      member_id: new FormControl("", Validators.required)
    });
  }

  fetchMembers() {
    this.authService.fetchAccountByAuth('member').subscribe(
      data => {
        localStorage.setItem('members', JSON.stringify(data));
        this.members = JSON.parse(localStorage.getItem('members'));
      },
      err => console.error(err));
  }

  fetchBooks() {
    this.bookService.fetchAllBooks().subscribe(
      data => {
        this.books = data;
      },
      err => console.error(err));
  }

  fetchData() {
    this.fetchMembers();
    this.fetchBooks();
  }

  ngOnInit() {
    this.fetchData();
    this.initForm();
  }

}
