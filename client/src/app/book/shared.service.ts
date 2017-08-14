import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class SharedService {
  //private caseNumber: any;

  /*
   * Observable
   * search result
   */
  private searchResult = new Subject<any>();
  searchResult$ = this.searchResult.asObservable();
  publishSearchResult(data: any) {
    this.searchResult.next(data);
  }

  /*
   * Observable
   * current book
   */
  private currentBook = new Subject<any>();
  currentBook$ = this.currentBook.asObservable();
  publishCurrentBook(data: any) {
    this.currentBook.next(data);
  }

}