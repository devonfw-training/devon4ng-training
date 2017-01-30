import { Component, ViewChildren, ViewChild } from '@angular/core';

import { HelloService } from './hello.service';
import { Book } from './book';
import { Speaker } from './speaker';

@Component({
    selector: 'app-hello',
    providers: [HelloService, Book, Speaker],
    styles: [`
.hello-box {
  width: 350px;
  margin: 0 auto;
  background: #EDEDED;
  padding: 10px;
  font-family: sans-serif
}
.hello-box h1 {
  font-weight: normal;
}
.hello-box input {
  width: 190px;
  height: 31px;
}
.hello-box button {
  height: 36px;
}
`],
    template: `
<div class="hello-box">
  <div>
    <h1>It's your turn to speak!</h1>
    <input #helloInput type="text" [(ngModel)]="currentLine">
    <button (click)="toBook()">Book</button>
    <button (click)="toSpeaker()">Speaker</button>
  </div>
  <speaker></speaker>
  <book></book>
<div>`
})
export class HelloComponent {
    @ViewChild('helloInput') vc: any;
    currentLine: string;

    constructor(private helloService: HelloService) {}

    clearAndFocus(): void {
        this.currentLine = '';
        this.vc.nativeElement.focus();
    }

    toBook(): void {
        if (this.currentLine) {
            this.helloService.writeToBook(this.currentLine);
        }
        this.clearAndFocus();
    }

    toSpeaker(): void {
        if (this.currentLine) {
            this.helloService.sayOnSpeaker(this.currentLine);
        }
        this.clearAndFocus();
    }
}
