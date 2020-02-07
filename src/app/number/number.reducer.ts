import {Action} from "@ngrx/store";

export interface NumberState {
  value: number;
}

export const initialNumberState: NumberState = {
  value: 0
};

export function numberReducer(state = initialNumberState, action: Action): NumberState {
  switch (action.type) {
    case 'INCREMENT':
      return {...state, value: state.value + 1};
    case 'DECREMENT':
      return {...state, value: state.value + 1};
    case 'RESET':
      return {...state, value: 0};
    default:
      return state;
  }
}
