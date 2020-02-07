import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromNumber from './number.state';
import {NumberState} from './number.state';

export const selectNumber = createFeatureSelector<NumberState>(fromNumber.key);

export const selectNrValue = createSelector(
  selectNumber,
  (state: NumberState) => state.value
);
