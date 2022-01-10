import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MovieOverviewComponent } from './movie-overview.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

describe('MovieOverviewComponent', () => {
  let component: MovieOverviewComponent;
  let fixture: ComponentFixture<MovieOverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieOverviewComponent, MovieDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
