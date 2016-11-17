/* tslint:disable:no-unused-variable */
import {AppComponent} from './app.component';
import {TestBed, async} from '@angular/core/testing';
import {ComponentFixture} from '@angular/core/testing/component_fixture';

describe('AppComponent with TCB', function () {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should instantiate component', () => {
    fixture.detectChanges(); // triggers AppComponent.ngOnInit()
    expect(component instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});
