import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
  // style: ['input, button { width: 100%; }']
})
export class SearchComponent {
  // Test books
  books: Object;

  constructor() {
    this.books = [{
        "remain": 5,
        "copies": 10,
        "title" : "American Nations: A History of the Eleven Rival Regional Cultures of North America",
        "author" : "Colin Woodard",
        "publisher" : "Penguin Books",
        "year" : 2012,
        "language" : "English",
        "subjects" : [ 
            "History", 
            "United States", 
            "General"
        ],
        "description" : "According to award-winning journalist and historian Colin Woodard, North America is made up of eleven distinct nations, each with its own unique historical roots. In American Nations he takes readers on a journey through the history of our fractured continent, offering a revolutionary and revelatory take on American identity, and how the conflicts between them have shaped our past and continue to mold our future. From the Deep South to the Far West, to Yankeedom to El Norte, Woodard (author of American Character: A History of the Epic Struggle Between Individual Liberty and the Common Good) reveals how each region continues to uphold its distinguishing ideals and identities today, with results that can be seen in the composition of the U.S. Congress or on the county-by-county election maps of this year's Trump versus Clinton presidential election."
    },{
        "remain": 3,
        "copies": 5,
        "title" : "One Hundred Years of Solitude",
        "author" : "Gabriel García Márquez (Author) Gregory Rabassa  (Translator)",
        "publisher" : "Harper Perennial Modern Classics",
        "year" : 2006,
        "language" : "English",
        "subjects" : [ 
            "Literature & Fiction", 
            "World Literature", 
            "Caribbean & Latin American"
        ],
        "description" : "One Hundred Years of Solitude is perhaps the most important landmark of the so-called 'Boom' in contemporary Latin American fiction. Published in 1967, the novel was an instant success, running to hundreds of editions, winning four international prizes, and being translated into 27 languages. In 1982, its author received the Nobel Prize for Literature. Michael Wood places the novel in the context of modern Colombia's violent history, and helps the reader to explore the rich and complex vision of the world which Garcia Marquez presents in it. Close reference is made to the text itself (in English translation), and there is a guide to further reading."
    }];
  }

}
