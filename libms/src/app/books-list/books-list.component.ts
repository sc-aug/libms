import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  @Input() books: Book[];
  
  constructor() {
    // this.books = [
    //   new Book('American Nations: A History of the Eleven Rival Regional Cultures of North America', 'Colin Woodard', 'Penguin Books', '2012', 'English'),
    //   new Book('One Hundred Years of Solitude', 'Gabriel García Márquez', 'Harper Perennial Modern Classics', '2006', 'English'),
    //   new Book('Old Man And The Sea', 'Ernest Hemingway', 'Scribner; Reissue edition', '1995', 'English'),
    //   new Book('Walden', 'Henry David Thoreau', 'CreateSpace Independent Publishing Platform', '2017', 'English')];
  }

  ngOnInit() {
  }

}
