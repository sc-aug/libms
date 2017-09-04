// responsible for auth related: signin signup ...
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { ErrorService} from '../error/error.service';

const baseurl = 'http://localhost:9000';
const headers = new Headers({'Content-Type': 'application/json'});

@Injectable()
export class ProfileService{
  constructor(private http: Http, private errorService: ErrorService) {}

  // param: _id. account-id
  fetchBorrowList(_id: string) {
    const me = JSON.parse(localStorage.getItem('me'));
    const token = (me && me.token)  ? '?token=' + me.token : '';
    return this.http.get(baseurl+'/api/trans/list/'+_id+token, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

}
