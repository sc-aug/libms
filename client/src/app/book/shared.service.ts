import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class SharedService {
  //private caseNumber: any;

  // Observable string sources
  private searchResult = new Subject<any>();  

  // Observable streams
  searchResult$ = this.searchResult.asObservable();

    // Service message commands
  publishData(data: any) {
    this.searchResult.next(data);
  }
}