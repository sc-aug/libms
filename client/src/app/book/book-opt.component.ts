import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-opt',
  templateUrl: 'book-opt.component.html',
  styles: ['.row { padding-top: 40px;}']
})
export class BookOptComponent {

  isAuthorized() {
    return localStorage.getItem('auth') == 'admin'
        || localStorage.getItem('auth') == 'lib';
  }

  bookSelected() {
    return localStorage.getItem('cur_book') != null;
  }
}
