import {Action, createAction, createReducer, on} from '@ngrx/store';

export interface NumberState {
  value: number;
}

export const initialNumberState: NumberState = {
  value: 0
};

export const incrementCounter = createAction('[app component number] increment');
export const decrementCounter = createAction('[app component number] decrement');
export const resetCounter = createAction('[app component number] reset');

const numberReducer = createReducer(initialNumberState,
  on(incrementCounter, (state) => ({...state, value: state.value + 1})),
  on(decrementCounter, (state) => ({...state, value: state.value - 1})),
  on(resetCounter, (state) => ({...state, value: 0}))
);

export function reducer(state: NumberState | undefined, action: Action) {
  return numberReducer(state, action);
}
