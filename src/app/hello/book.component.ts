import { Component } from '@angular/core';

import { Book } from './book';

@Component({
  selector: 'app-book',
  styles: [`
.book-box {
  margin: 5px 0;
}
.book-box li {
  margin: 0;
  padding: 0;
}
.book-box h3 {
  font-weight: normal;
}`],
  template: `
<div class="book-box">
  <h3>Book:</h3>
  <ol>
    <li *ngFor="let line of (book.lines$ | async)">{{line}}</li>
  </ol>
</div>`
})
export class BookComponent {
  constructor(public book: Book) {}
}
