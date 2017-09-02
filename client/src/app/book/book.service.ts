// responsible for books
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Book } from './book.model';

const baseurl = 'http://localhost:9000';
const headers = new Headers({'Content-Type': 'application/json'});

@Injectable()
export class BookService{

  constructor(private http: Http) {}

  addBook(book: Book) {
    const auth = localStorage.getItem('auth');
    const body = JSON.stringify(book);
    // backend server will check auth in encrypted token
    // if (auth && (auth == 'lib' || auth == 'admin')){
      return this.http.post(baseurl+'/api/book/', body, { headers: headers })
        // transform the data we get back
        .map((response: Response) => response.json())
        // catch error
        .catch((error: Response) => Observable.throw(error.json()));
    // } else {
    //   console.error('not authorized operation');
    // }
  }

  updateBook(book: Book) {
    const auth = localStorage.getItem('auth');
    const body = JSON.stringify(book);
    // backend server will check auth in encrypted token
    if (auth && (auth == 'lib' || auth == 'admin')){
      return this.http.patch(baseurl+'/api/book/'+book._id, body, { headers: headers })
        // transform the data we get back
        .map((response: Response) => response.json())
        // catch error
        .catch((error: Response) => Observable.throw(error.json()));
    } else {
      console.error('not authorized operation');
    }
  }

  deleteBook(book: Book) {
    const auth = localStorage.getItem('auth');
    console.log("bookID: ", book._id);
    // const body = JSON.stringify(book);
    // backend server will check auth in encrypted token
    // if (auth && (auth == 'lib' || auth == 'admin')){
      return this.http.delete(baseurl+'/api/book/'+book._id, { headers: headers })
        // transform the data we get back
        .map((response: Response) => response.json())
        // catch error
        .catch((error: Response) => {
          return Observable.throw(error.json());
        });
    // } else {
    //   console.error('not authorized operation');
    // }
  }

  searchBook(keywords: string) {
    keywords = keywords.trim();
    if (keywords.length >= 3) {
      return this.http.get(baseurl+'/api/search/kw/'+keywords, { headers: headers})
        // transform the data we get back
        .map((response: Response) => response.json())
        // catch error
        .catch((error: Response) => Observable.throw(error.json()));
    }
  }

  fetchBookById(id: string) {
    return this.http.get(baseurl+'/api/search/id/'+id, { headers: headers })
        // transform the data we get back
        .map((response: Response) => response.json())
        // catch error
        .catch((error: Response) => Observable.throw(error.json()));
  }

  fetchAllBooks() {
    return this.http.get(baseurl+'/api/book/', { headers: headers})
      // transform the data we get back
      .map((response: Response) => response.json())
      // catch error
      .catch((error: Response) => Observable.throw(error.json())).toPromise();
  }

}
