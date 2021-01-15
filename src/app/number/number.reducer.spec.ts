import { decrementCounter, incrementCounter, resetCounter } from "./number.action";
import { reducer } from "./number.reducer";

describe('number reducer', () => {
    it('INCREMENT returns 4 if previous state is 3', () => {
        const actual = reducer({value: 3}, incrementCounter);

        expect(actual).toEqual({value: 4})
    });
    it('DECREMENT returns -2 if previous state is -1', () => {
        const actual = reducer({value: -1}, decrementCounter);
        expect(actual).toEqual({value: -2})
    });
    it('RESET returns 0 if previous state is 3', () => {
        const actual = reducer({value: 3}, resetCounter)
        expect(actual).toEqual({value: 0})
    });
});