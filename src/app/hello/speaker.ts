import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export class Speaker {
    private linesSource = new Subject<string>();

    getLine(): Observable<string> {
        return this.linesSource.asObservable();
    }

    speak(val: string): void {
        this.linesSource.next(val);
    }
}
