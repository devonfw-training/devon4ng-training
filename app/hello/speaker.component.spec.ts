import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { Speaker } from './speaker';
import { SpeakerComponent } from './speaker.component';

let fixture: ComponentFixture<SpeakerComponent>;
let speaker: Speaker;

describe('SpeakerComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ SpeakerComponent ],
            providers: [Speaker]
        });

        fixture = TestBed.createComponent(SpeakerComponent);
        speaker = fixture.debugElement.injector.get(Speaker);
    });

    it('displays default value', () => {
        spyOn(speaker, 'getLine').and.returnValue(Observable.empty());
        fixture.componentInstance.ngOnInit();

        fixture.detectChanges();
        let header = fixture.debugElement.query(By.css('h3'));

        expect(header.nativeElement.textContent).toContain('speaker is quiet');
    });

    it('displays emitted line', () => {
        const line = 'this line is expected';
        spyOn(speaker, 'getLine').and.returnValue(Observable.of(line));
        fixture.componentInstance.ngOnInit();

        fixture.detectChanges();
        let header = fixture.debugElement.query(By.css('h3'));

        expect(header.nativeElement.textContent).toContain(line);
    });
});
