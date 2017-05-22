import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Book {
    private linesSource = new BehaviorSubject<string[]>([]);
    lines$ = this.linesSource.asObservable();

    write(val: string): void {
        let current: string[] = this.linesSource.getValue();
        let newLines: string[]  = [...current, val];
        this.linesSource.next(newLines);
    }
}
