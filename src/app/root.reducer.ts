import {ActionReducerMap} from '@ngrx/store';
import {InjectionToken} from '@angular/core';
import {numberReducer, NumberState} from "./number/number.reducer";

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('app reducer');

export interface AppState {
  number: NumberState
}

export const reducers: ActionReducerMap<AppState> = {
  number: numberReducer
};
