import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MovieOverviewComponent } from './movie-overview.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieService } from '../movie.service';

describe('MovieOverviewComponent', () => {
  let component: MovieOverviewComponent;
  let fixture: ComponentFixture<MovieOverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      providers: [MovieService],
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
