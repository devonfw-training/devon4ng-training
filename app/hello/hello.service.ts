import { Injectable } from '@angular/core';

import { Speaker } from './speaker';

@Injectable()
export class HelloService {
    private speech: string[] = [];

    constructor(private speaker: Speaker) { }

    say(line: string): void {
        this.speaker.speak(line);
        this.speech.push(line);
    }

    getSpeech(): string {
        return this.speech.join('\n');
    }
}
