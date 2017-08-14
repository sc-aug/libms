// responsible for books
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Book } from '../book/book.model';
import { Account } from '../auth/account.model';

import { BookService } from '../book/book.service';
import { AuthService } from '../auth/auth.service';

const baseurl = 'http://localhost:9000';
const headers = new Headers({'Content-Type': 'application/json'});

@Injectable()
export class TransService {

  constructor(private http: Http,
              private bookService: BookService,
              private authService: AuthService) {}

  borrowBook(b_id: string, m_id: string) {
    const body = JSON.stringify({"b_id": b_id, "m_id": m_id});
    console.log(body);
    return this.http.post(baseurl+'/api/trans/borrow', body, { headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  returnBook(b_id: string, m_id: string) {
    const body = JSON.stringify({"b_id": b_id, "m_id": m_id});
    console.log(body);
    return this.http.post(baseurl+'/api/trans/return', body, { headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}