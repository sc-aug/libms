import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchService } from './search.service';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  constructor(private searchService: SearchService,
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
      this.searchService.searchBook(data.search.trim()).
        subscribe(
          data => {
            // this.sharedService.publishData(JSON.stringify(data));
            console.log(data);
            this.sharedService.publishData(data);
          },
          err => console.log(err));
      this.router.navigateByUrl('/search');
    } else {
      console.error("keywords too short");
    }
  }

}
