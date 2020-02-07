import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {decrementCounter, incrementCounter, resetCounter} from './number.action';
import {NumberState} from './number.state';
import {selectNrValue} from './number.selector';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent {
  numberValue$: Observable<number> = this.store.pipe(select(selectNrValue));

  constructor(private store: Store<NumberState>) {
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
