import {ActionReducerMap} from '@ngrx/store';
import {InjectionToken} from '@angular/core';

// todo inject reducers map as providers to app module - use { provide: REDUCER_TOKEN, useValue: reducers} for this
export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('app reducer');

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {};
