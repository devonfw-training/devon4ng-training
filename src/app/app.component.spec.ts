import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { MovieOverviewComponent } from './movies/movie-overview/movie-overview.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieService } from './movies/movie.service';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      providers: [MovieService],
      declarations: [
        AppComponent, MovieDetailsComponent, MovieOverviewComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
