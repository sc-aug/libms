import { Component, Input } from '@angular/core';

import { Book } from './book.model'
import { SharedService } from './shared.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent {
  // Test books
  books: Book[];

  constructor(private sharedService: SharedService) {
    // subscribe search result
    this.sharedService.searchResult$
      .subscribe(data => {
        // console.log('receive ' + data);
        this.books = data;
      });
  }

}
