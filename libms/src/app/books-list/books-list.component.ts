import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  @Input() books: Book[];

  @Output() onBookSelected: EventEmitter<Book>;
  
  private curBook: Book;

  constructor() {
    this.onBookSelected = new EventEmitter();
  }

  clicked(book: Book): void {
    this.curBook = book;
    this.onBookSelected.emit(book);
  }

  // isSelected(book: Book): boolean {
  //   if (!book || !this.curBook) {
  //     return false;
  //   }
  //   return book.title === this.curBook.title;
  // }

  ngOnInit() {
  }

}
