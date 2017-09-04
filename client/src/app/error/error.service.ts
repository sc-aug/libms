import { EventEmitter } from '@angular/core';

import { Error } from './error.model';

export class ErrorService {
  errorOccurred = new EventEmitter<Error>();

  handleError(err: any) {
    let errorData = null;
    if (!err.title && !err.message) {
      localStorage.clear();
      errorData = new Error("Token Expired", "Please login.");
    } else {
      errorData = new Error(err.title, err.error.message);
    }
    this.errorOccurred.emit(errorData);
  }

}
