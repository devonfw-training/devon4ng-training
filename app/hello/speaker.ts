import { Subject } from 'rxjs/Subject';

export class Speaker {
    private linesSource = new Subject<string>();
    lines$ = this.linesSource.asObservable();

    speak(val: string): void {
        this.linesSource.next(val);
    }
}
