import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from './root.reducer';
import {Observable} from 'rxjs';
import {decrementCounter, incrementCounter, resetCounter} from './number/number.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numberValue$: Observable<number> = this.store.pipe(select(s => s.number.value));

  constructor(private store: Store<AppState>) {
  }

  onResetClick() {
    this.store.dispatch(resetCounter());
  }

  onIncrementClick() {
    this.store.dispatch(incrementCounter());
  }

  onDecrementClick() {
    this.store.dispatch(decrementCounter());
  }
}
