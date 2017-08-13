import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BookService } from './book.service';
import { SharedService } from './shared.service';
import { Book } from './book.model';

@Component({
  selector: 'app-book-add',
  templateUrl: 'book-add.component.html',
  styleUrls: ['book-add.component.css']
})
export class BookAddComponent {
  bookForm: FormGroup;

  book: Book;

  constructor(
    private bookService: BookService,
    private sharedService: SharedService,
    private router: Router) {}

  onSubmit() {
    //console.log(this.bookForm.value);
    const subjects = this.bookForm.value.subjects.split(',').map(item => item.trim());
    // create a new book
    const newBook = new Book(
      "", //id
      this.bookForm.value.remain,
      this.bookForm.value.copy,
      this.bookForm.value.title,
      this.bookForm.value.author,
      this.bookForm.value.publisher,
      this.bookForm.value.year,
      this.bookForm.value.language,
      subjects,
      this.bookForm.value.discription);
    // using service
    this.bookService.addBook(newBook).
      subscribe(
        data => {
          // console.log(data);
          // put current book in localStorage
          localStorage.setItem('cur_book', JSON.stringify(data.obj));
          // redirect to view page
          this.router.navigate(['/book-opt', 'view']);
        },
        err => console.log(err)
      );
  }
  
  ngOnInit() {
    this.bookForm = new FormGroup({
      remain: new FormControl("", Validators.required),
      copy: new FormControl("", Validators.required),
      title: new FormControl("", Validators.required),
      author: new FormControl("", Validators.required),
      publisher: new FormControl("", Validators.required),
      year: new FormControl(""),
      language: new FormControl("", Validators.required),
      subjects: new FormControl(""),
      discription: new FormControl("")
    });
  }
}
