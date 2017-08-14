import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BookService } from './book.service';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  constructor(private bookService: BookService,
    private sharedService: SharedService,
    private router: Router) {
  }

  /*
   * search book
   * publish result
   */
  onSubmit(data: any) {
    // search books
    if (data.search.trim().length >= 3) {
      this.bookService.searchBook(data.search.trim()).
        subscribe(
          data => {
            console.log(data);
            this.sharedService.publishSearchResult(data);
          },
          err => console.log(err));
      this.router.navigateByUrl('/search');
    } else {
      console.error("keywords too short");
    }
  }

}
