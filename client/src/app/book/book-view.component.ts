import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BookService } from './book.service';
import { Book } from './book.model';

@Component({
  selector: 'app-book-view',
  templateUrl: 'book-view.component.html',
  styleUrls: ['book-add.component.css']
})
export class BookViewComponent {
  bookForm: FormGroup;

  constructor(
    private bookService: BookService,
    private router: Router) {

    if (this.bookSelected()) {
      this.initForm();
      this.loadBook();
    }

  }

  initForm() {
    this.bookForm = new FormGroup({
      _id: new FormControl(""),
      remain: new FormControl("", Validators.required),
      copy: new FormControl("", Validators.required),
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
          // console.log(data);
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

}