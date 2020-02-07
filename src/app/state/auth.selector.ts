import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from './auth.state';
import {AuthState} from './auth.state';

export const selectAuth = createFeatureSelector<AuthState>(fromAuth.key);

export const selectIsLoggedIn = createSelector(
  selectAuth,
  (state: AuthState) => !!(state.username)
);

export const selectUsername = createSelector(
  selectAuth,
  (state: AuthState) => state.username
);
