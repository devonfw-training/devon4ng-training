import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from './root.reducer';
import {Observable} from "rxjs";

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
    this.store.dispatch({type: 'RESET'});
  }

  onIncrementClick() {
    this.store.dispatch({type: 'INCREMENT'});
  }

  onDecrementClick() {
    this.store.dispatch({type: 'DECREMENT'});
  }
}
