import {ActionReducerMap} from '@ngrx/store';
import {InjectionToken} from '@angular/core';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('app reducer');

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {};
