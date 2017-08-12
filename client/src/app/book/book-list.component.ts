import { Component, Input } from '@angular/core';

import { Book } from './book.model'
import { SharedService } from './shared.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  // Test books
  books: Book[];

  constructor(private sharedService: SharedService) {
    // subscribe search result
    this.sharedService.searchResult$
      .subscribe(data => {
        // console.log('receive ' + data);
        this.update(data);
      });
  }

  update(books: Book[]) {
    this.books = books;
  }
}
