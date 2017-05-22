import { Injectable } from '@angular/core';

import { Speaker } from './speaker';
import { Book } from './book';

@Injectable()
export class HelloService {
  private speech: string[] = [];

  constructor(private speaker: Speaker, private book: Book) { }

  sayOnSpeaker(line: string): void {
    this.speaker.speak(line);
  }

  writeToBook(line: string): void {
    this.book.write(line);
    this.speech.push(line);
  }

  getSpeech(): string {
    return this.speech.join('\n');
  }
}
