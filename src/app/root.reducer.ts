import {ActionReducerMap} from '@ngrx/store';
import {InjectionToken} from '@angular/core';
import {key as numberKey} from './number/number.state';
import {NumberState} from './number/number.state';
import * as fromAuth from './state/auth.state';
import {AuthState} from './state/auth.state';
import {reducer as NumberReducer} from './number/number.reducer';
import {reducer as AuthReducer} from './state/auth.reducer';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('app reducer');

export interface AppState {
  [numberKey]: NumberState;
  [fromAuth.key]: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  [numberKey]: NumberReducer,
  [fromAuth.key]: AuthReducer
};
