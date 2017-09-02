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

  /*
   * Observable
   * current loggin account
   */
  private currentAcc = new Subject<any>();
  currentAcc$ = this.currentAcc.asObservable();
  publishCurrentAcc(data: any) {
    this.currentAcc.next(data);
  }

  /*
   * Observable
   * current loggin account
   */
  // private currentProfile = new Subject<any>();
  // currentProfile$ = this.currentProfile.asObservable();
  // publishCurrentProfile(data: any) {
  //   this.currentProfile.next(data);
  // }

}
