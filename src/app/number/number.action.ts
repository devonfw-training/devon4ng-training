import {createAction} from '@ngrx/store';

export const incrementCounter = createAction('[app component number] increment');
export const decrementCounter = createAction('[app component number] decrement');
export const resetCounter = createAction('[app component number] reset');
