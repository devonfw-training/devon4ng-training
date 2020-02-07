import {Action, createAction, createReducer, on, props} from '@ngrx/store';
import {AuthState, initialAuthState} from './auth.state';

export const login = createAction('[authentication] login',
  props<{ username: string, password: string }>());
export const logout = createAction('[authentication] logout');

const numberReducer = createReducer(initialAuthState,
  on(logout, (state) => ({...state, username: null})),
  on(login, (state, {username, password}) => ({...state, username: (password === '12345') ? username : null}))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return numberReducer(state, action);
}
