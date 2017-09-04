// responsible for auth related: signin signup ...
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Account } from './account.model';

import { ErrorService } from '../error/error.service';

const baseurl = 'http://localhost:9000';
const headers = new Headers({'Content-Type': 'application/json'});

@Injectable()
export class AuthService{
  constructor(private http: Http, private errorService: ErrorService) {}

  signup(account: Account) {
    const body = JSON.stringify(account);
    return this.http.post(baseurl+'/api/sign/up', body, { headers: headers})
      // transform the data we get back
      .map((response: Response) => response.json())
      // catch error
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  signin(account: Account) {
    const body = JSON.stringify(account);
    return this.http.post(baseurl+'/api/sign/in', body, { headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  // fetchAccountById(_id: string) {
  //   return this.http.get(baseurl+'/api/account/id/'+_id, { headers: headers})
  //     .map((response: Response) => response.json())
  //     .catch((error: Response) => Observable.throw(error.json()));
  // }

  // fetchAccount(uname: string) {
  //   return this.http.get(baseurl+'/api/account/'+uname, { headers: headers})
  //     .map((response: Response) => response.json())
  //     .catch((error: Response) => Observable.throw(error.json()));
  // }

  updateAccount(id: string, update_acc: Account) {
    const body = JSON.stringify(update_acc);
    const me = JSON.parse(localStorage.getItem('me'));
    const token = (me && me.token)  ? '?token=' + me.token : '';
    return this.http.post(baseurl+'/api/account/'+id+token, body, { headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  deleteAccount(id: string) {
    const me = JSON.parse(localStorage.getItem('me'));
    const token = (me && me.token)  ? '?token=' + me.token : '';
    return this.http.delete(baseurl+'/api/account/'+id+token, { headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  fetchAccountByAuth(auth: string) {
    const me = JSON.parse(localStorage.getItem('me'));
    const token = (me && me.token)  ? '?token=' + me.token : '';
    return this.http.get(baseurl+'/api/account/auth/'+ auth + token, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  logout() {
    localStorage.clear();
  }

}
