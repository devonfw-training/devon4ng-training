import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Book {
  private linesSource = new BehaviorSubject<string[]>([]);
  lines$ = this.linesSource.asObservable();

  write(val: string): void {
    const current: string[] = this.linesSource.getValue();
    const newLines: string[]  = [...current, val];
    this.linesSource.next(newLines);
  }
}
