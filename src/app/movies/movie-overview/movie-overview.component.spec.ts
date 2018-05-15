import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOverviewComponent } from './movie-overview.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { FormsModule } from '@angular/forms';

describe('MovieOverviewComponent', () => {
  let component: MovieOverviewComponent;
  let fixture: ComponentFixture<MovieOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
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
