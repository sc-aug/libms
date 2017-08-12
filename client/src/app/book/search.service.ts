// responsible for books
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Book } from './book.model';

@Injectable()
export class SearchService{
  constructor(private http: Http) {}

  searchBook(keywords: string) {
    keywords = keywords.trim();
    if (keywords.length >= 3) {
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.get('http://localhost:9000/api/search/'+keywords, { headers: headers})
        // transform the data we get back
        .map((response: Response) => response.json())
        // catch error
        .catch((error: Response) => Observable.throw(error.json()));
    }
  }

  // signup(account: Account) {
  //   const body = JSON.stringify(account);
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   return this.http.post('http://localhost:9000/api/account', body, { headers: headers})
  //     // transform the data we get back
  //     .map((response: Response) => response.json())
  //     // catch error
  //     .catch((error: Response) => Observable.throw(error.json()));
  // }

  // signin(account: Account) {
  //   const body = JSON.stringify(account);
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   return this.http.post('http://localhost:9000/api/account/signin', body, { headers: headers})
  //     // transform the data we get back
  //     .map((response: Response) => response.json())
  //     // catch error
  //     .catch((error: Response) => Observable.throw(error.json()));
  // }

  // fetchAccount(uname: string) {
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   return this.http.get('http://localhost:9000/api/account/'+uname, { headers: headers})
  //     // transform the data we get back
  //     .map((response: Response) => response.json())
  //     // catch error
  //     .catch((error: Response) => Observable.throw(error.json()));
  // }

  // updateAccount(uname: string, account: Account) {
  //   const body = JSON.stringify(account);
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   return this.http.post('http://localhost:9000/api/account/'+uname, body, { headers: headers})
  //     // transform the data we get back
  //     .map((response: Response) => response.json())
  //     // catch error
  //     .catch((error: Response) => Observable.throw(error.json()));
  // }

  // logout() {
  //   localStorage.clear();
  // }

  // isLoggedIn() {
  //   return localStorage.getItem('token') != null;
  // }

}