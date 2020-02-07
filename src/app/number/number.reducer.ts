import {Action, createReducer, on} from '@ngrx/store';
import {decrementCounter, incrementCounter, resetCounter} from './number.action';
import {initialNumberState, NumberState} from './number.state';

const numberReducer = createReducer(initialNumberState,
  on(incrementCounter, (state) => ({...state, value: state.value + 1})),
  on(decrementCounter, (state) => ({...state, value: state.value - 1})),
  on(resetCounter, (state) => ({...state, value: 0}))
);

export function reducer(state: NumberState | undefined, action: Action) {
  return numberReducer(state, action);
}
