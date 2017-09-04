// responsible for books
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Book } from './book.model';

import { ErrorService } from '../error/error.service';

const baseurl = 'http://localhost:9000';
const headers = new Headers({'Content-Type': 'application/json'});

@Injectable()
export class BookService{

  constructor(private http: Http, private errorService: ErrorService) {}

  addBook(book: Book) {
    const auth = JSON.parse(localStorage.getItem('me')).auth;
    const body = JSON.stringify(book);

    const me = JSON.parse(localStorage.getItem('me'));
    const token = (me && me.token)  ? '?token=' + me.token : '';
    // backend server will check auth in encrypted token
    if (auth && (auth == 'lib' || auth == 'admin')){
      return this.http.post(baseurl+'/api/book/'+token, body, { headers: headers })
        // transform the data we get back
        .map((response: Response) => response.json())
        // catch error
        .catch((error: Response) => {
          this.errorService.handleError(error.json());
          return Observable.throw(error.json());
        });
    } else {
      const err = {
        title: "Fail to ADD BOOK",
        error: { message: "You are not authorized to do this operation."}
      };
      this.errorService.handleError(err);
      console.error(err);
    }
  }

  updateBook(book: Book) {
    const auth = JSON.parse(localStorage.getItem('me')).auth;
    const body = JSON.stringify(book);

    const me = JSON.parse(localStorage.getItem('me'));
    const token = (me && me.token)  ? '?token=' + me.token : '';
    if (auth && (auth == 'lib' || auth == 'admin')){
      return this.http.patch(baseurl+'/api/book/'+book._id+token, body, { headers: headers })
        // transform the data we get back
        .map((response: Response) => response.json())
        // catch error
        .catch((error: Response) => {
          this.errorService.handleError(error.json());
          return Observable.throw(error.json());
        });
    } else {
      const err = {
        title: "Fail to UPDATE BOOK",
        error: { message: "You are not authorized to do this operation."}
      };
      this.errorService.handleError(err);
      console.error(err);
    }
  }

  deleteBook(book: Book) {
    const auth = JSON.parse(localStorage.getItem('me')).auth;
    //console.log("bookID: ", book._id);
    const body = JSON.stringify(book);

    const me = JSON.parse(localStorage.getItem('me'));
    const token = (me && me.token)  ? '?token=' + me.token : '';
    if (auth && (auth == 'lib' || auth == 'admin')){
      return this.http.delete(baseurl+'/api/book/'+book._id+token, { headers: headers })
        // transform the data we get back
        .map((response: Response) => response.json())
        // catch error
        .catch((error: Response) => {
          this.errorService.handleError(error.json());
          return Observable.throw(error.json());
        });
    } else {
      const err = {
        title: "Fail to DELETE BOOK",
        error: { message: "You are not authorized to do this operation."}
      };
      this.errorService.handleError(err);
      console.error(err);
    }
  }

  fetchAllBooks() {
    const me = JSON.parse(localStorage.getItem('me'));
    const token = (me && me.token)  ? '?token=' + me.token : '';
    return this.http.get(baseurl+'/api/book/'+token, { headers: headers})
      // transform the data we get back
      .map((response: Response) => response.json())
      // catch error
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  searchBook(keywords: string) {
    keywords = keywords.trim();
    if (keywords.length >= 3) {
      return this.http.get(baseurl+'/api/search/kw/'+keywords, { headers: headers})
        // transform the data we get back
        .map((response: Response) => response.json())
        // catch error
        .catch((error: Response) => {
          this.errorService.handleError(error.json());
          return Observable.throw(error.json());
        });
    }
  }

  fetchBookById(id: string) {
    return this.http.get(baseurl+'/api/search/id/'+id, { headers: headers })
      // transform the data we get back
      .map((response: Response) => response.json())
      // catch error
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

}
