import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.css']
})
export class ResultItemComponent {
  @Input() book: Object;

  constructor(private router: Router) {}
  
  onView() {
    this.onSelect();
    this.router.navigate(['/book-opt', 'view']);
  }

  onEdit() {
    this.onSelect();
    this.router.navigate(['/book-opt', 'edit']);
  }

  onSelect() {
    // console.log("onselect [result item]");
    localStorage.cur_book = JSON.stringify(this.book);
  }

}
