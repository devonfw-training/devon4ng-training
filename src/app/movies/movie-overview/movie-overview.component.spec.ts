import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MovieOverviewComponent } from './movie-overview.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MovieService } from '../movie.service';
import { NEVER, Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { addMatchers, hot, cold, initTestScheduler } from 'jasmine-marbles';
import { Movie } from '../movie';

fdescribe('MovieOverviewComponent', () => {
  let component: MovieOverviewComponent;
  let fixture: ComponentFixture<MovieOverviewComponent>;
  let movieServiceMock: MovieService;
  let params$: Observable<Params[]>;
  let activatedRouteMock: Partial<ActivatedRoute>;
  let movies: Movie[];

  beforeEach(waitForAsync(() => {
    initTestScheduler();
    addMatchers();
    movies = [{
      id: 1,
      title: 'Django',
    },{
      id: 2,
      title: 'Pulp Fiction',
    }]
    movieServiceMock = jasmine.createSpyObj<MovieService>({findAll: cold('---a-d|',{a: movies, d: {}}), findOne: cold('--c|', {c: movies[0]})});
    params$ = cold('b-b|', {b: {id: 1}, e: {}});
    activatedRouteMock = {params: params$};
    TestBed.configureTestingModule({
      providers: [
        {provide: MovieService, useValue: movieServiceMock},
        {provide: ActivatedRoute, useValue: activatedRouteMock},
      ],
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

  it('should load initial movies', () => {
    expect(component.movies$).toBeObservable(hot('---a-d|', {a: movies, d: {}}));
  });

  it('should select and load movie according to route params', () => {
    expect(component.selectedMovie$).toBeObservable(hot('----c|', {c: movies[0]}));
    expect(movieServiceMock.findOne).toHaveBeenCalledWith(1);
    expect(component.selectedMovie).toEqual(movies[0]);
  })
});
