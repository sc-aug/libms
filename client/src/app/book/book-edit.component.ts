import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BookService } from './book.service';
import { Book } from './book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: 'book-edit.component.html',
  styleUrls: ['book-add.component.css']
})
export class BookEditComponent {
  book: Book;

  bookForm: FormGroup;

  constructor(
    private bookService: BookService,
    private router: Router) {
    // only visible for admin & lib
    this.isAuthorized();

    if (this.bookSelected()) {
      this.initForm();
      this.loadBook();
    }
    // else {
    //   this.router.navigate(['/book-opt', 'view']);
    // }

  }

  initForm() {
    this.bookForm = new FormGroup({
      _id: new FormControl({ value: "", disabled: true}),
      remain: new FormControl({ value: ""}, Validators.required),
      copy: new FormControl({ value: ""}, Validators.required),
      title: new FormControl("", Validators.required),
      author: new FormControl("", Validators.required),
      publisher: new FormControl("", Validators.required),
      year: new FormControl(""),
      lang: new FormControl("", Validators.required),
      subjects: new FormControl(""),
      description: new FormControl("")
    });
  }

  loadBook() {
    const id = JSON.parse(localStorage.getItem('cur_book'))._id;
    this.bookService.fetchBookById(id)
      .subscribe(
        data => {
          this.book = data;
          this.loadBookForm(data);
        },
        err => console.log(err)
      );
  }

  loadBookForm(book: Book) {
    this.bookForm.setValue({
      _id: book._id,
      remain: book.remain,
      copy: book.copy,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      year: book.year,
      lang: book.lang,
      subjects: book.subjects.join(', '),
      description: book.description
    });
  }

  bookSelected() {
    return localStorage.getItem('cur_book') != null;
  }

  /** Operations **/

  onSubmit() {
    const subjects = this.bookForm.value.subjects.split(',').map(item => item.trim());
    // create a new book
    this.book.remain = this.bookForm.value.remain
    this.book.copy = this.bookForm.value.copy;
    this.book.title = this.bookForm.value.title;
    this.book.author = this.bookForm.value.author;
    this.book.publisher = this.bookForm.value.publisher;
    this.book.year = this.bookForm.value.year;
    this.book.lang = this.bookForm.value.lang;
    this.book.subjects = subjects;
    this.book.description = this.bookForm.value.description;
    // using service
    this.bookService.updateBook(this.book)
      .subscribe(
        data => {
          // console.log(data);
          // put current book in localStorage
          localStorage.setItem('cur_book', JSON.stringify(data.obj));
          // redirect to view page
          this.router.navigate(['/book-opt', 'view']);
        },
        err => console.log(err)
      );
    //this.router.navigateByUrl('/');
  }

  onDelete() {
    // const id = JSON.parse(localStorage.getItem('cur_book'))._id;
    //console.log(this.book);
    this.bookService.deleteBook(this.book)
      .subscribe(
        result => {
          console.log("[delete complete]", result);
          // this.loadBookForm(data);
          //console.log('deleted');
          localStorage.removeItem('cur_book');
          this.router.navigate(['/book-opt', 'view']);
      });
  }

  isAuthorized() {
    if (!this.isLib() && !this.isAdmin()) {
      this.router.navigate(['/book-opt', 'view']);
    }
  }

  isAdmin() {
    const tmp = JSON.parse(localStorage.getItem('me'));
    return tmp && tmp.token && tmp.auth == 'admin';
  }

  isLib() {
    const tmp = JSON.parse(localStorage.getItem('me'));
    return tmp && tmp.token && tmp.auth == 'lib';
  }

}
