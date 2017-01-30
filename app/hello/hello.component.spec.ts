import { HelloComponent } from './hello.component';
import { HelloService } from './hello.service';

let component: HelloComponent;
let serviceFake = {
  sayOnSpeaker: (val: string) => {},
  writeToBook: (val: string) => {},
  getSpeech: () => '',
} as HelloService;
let inputElementFake = {
    nativeElement: {
        focus: () => {}
    }
};

describe('HelloComponent', () => {
    beforeEach(() => {
        component = new HelloComponent(serviceFake);
        component.vc = inputElementFake;
    });

    describe('toBook', () => {
        it('calls writeToBook if currentLine is set', () => {
            const line = 'line content';
            spyOn(serviceFake, 'writeToBook');
            component.currentLine = line;

            component.toBook();

            expect(serviceFake.writeToBook).toHaveBeenCalledWith(line);
        });

        it('does not call writeToBook if currentLine is empty', () => {
            spyOn(serviceFake, 'writeToBook');
            component.currentLine = '';

            component.toBook();

            expect(serviceFake.writeToBook).not.toHaveBeenCalled();
        });

        it('calls focus and resets currentLine', () => {
            spyOn(inputElementFake.nativeElement, 'focus');
            component.currentLine = 'abcdef';

            component.toBook();

            expect(inputElementFake.nativeElement.focus).toHaveBeenCalled();
            expect(component.currentLine).toEqual('');
        });
    });

    describe('toSpeaker', () => {
        it('calls sayOnSpeaker if currentLine is set', () => {
            const line = 'line content';
            spyOn(serviceFake, 'sayOnSpeaker');
            component.currentLine = line;

            component.toSpeaker();

            expect(serviceFake.sayOnSpeaker).toHaveBeenCalledWith(line);
        });

        it('does not call sayOnSpeaker if currentLine is not set', () => {
            spyOn(serviceFake, 'sayOnSpeaker');
            component.currentLine = '';

            component.toSpeaker();

            expect(serviceFake.sayOnSpeaker).not.toHaveBeenCalled();
        });

        it('calls focus and resets currentLine', () => {
            spyOn(inputElementFake.nativeElement, 'focus');
            component.currentLine = 'abcdef';

            component.toSpeaker();

            expect(inputElementFake.nativeElement.focus).toHaveBeenCalled();
            expect(component.currentLine).toEqual('');
        });
    });
});
