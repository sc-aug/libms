import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookItemComponent } from './book-item/book-item.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
