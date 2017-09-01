// responsible for auth related: signin signup ...
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Account } from './account.model';

const baseurl = 'http://localhost:9000';
const headers = new Headers({'Content-Type': 'application/json'});

@Injectable()
export class AuthService{
  constructor(private http: Http) {}

  signup(account: Account) {
    const body = JSON.stringify(account);
    return this.http.post(baseurl+'/api/account', body, { headers: headers})
      // transform the data we get back
      .map((response: Response) => response.json())
      // catch error
      .catch((error: Response) => Observable.throw(error.json()));
  }

  signin(account: Account) {
    const body = JSON.stringify(account);
    return this.http.post(baseurl+'/api/account/signin', body, { headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  fetchAccountById(_id: string) {
    return this.http.get(baseurl+'/api/account/id/'+_id, { headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  fetchAccount(uname: string) {
    return this.http.get(baseurl+'/api/account/'+uname, { headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  updateAccount(uname: string, account: Account) {
    const body = JSON.stringify(account);
    return this.http.post(baseurl+'/api/account/'+uname, body, { headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  fetchAllMembers() {
    return this.http.get(baseurl+'/api/account/auth/'+'member', { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json())).toPromise();
  }

  fetchAllLibrarians() {
    return this.http.get(baseurl+'/api/account/auth/'+'lib', { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json())).toPromise();
  }

  fetchAllAdmins() {
    return this.http.get(baseurl+'/api/account/auth/'+'admin', { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json())).toPromise();
  }

  logout() {
    localStorage.clear();
  }

}
