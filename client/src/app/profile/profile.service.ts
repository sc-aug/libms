// responsible for auth related: signin signup ...
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

const baseurl = 'http://localhost:9000';
const headers = new Headers({'Content-Type': 'application/json'});

@Injectable()
export class ProfileService{
  constructor(private http: Http) {}

  fetchBorrowList(m_id: string) {
    return this.http.get(baseurl+'/api/trans/list/'+m_id, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json())).toPromise();
  }


}
