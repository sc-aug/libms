export class Book {
  title: string;
  author: string;
  publisher: string;
  year: string;
  language: string;
  
  constructor(
    title: string,
    author: string,
    publisher: string,
    year: string,
    language: string) {
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.year = year;
    this.language = language;
  }
}