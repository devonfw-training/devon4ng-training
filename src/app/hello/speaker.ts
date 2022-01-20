import { Subject, Observable } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class Speaker {
  private linesSource = new Subject<string>();

  getLine(): Observable<string> {
    return this.linesSource.asObservable();
  }

  speak(val: string): void {
    this.linesSource.next(val);
  }
}
