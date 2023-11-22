import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Movie } from './movie';
import { NEVER, Observable, asyncScheduler, of, scheduled } from 'rxjs';
import { HttpClient } from '@angular/common/http';

fdescribe('MovieService', () => {
  let service: MovieService;
  let httpMock: Partial<HttpClient>;
  let movies$: Observable<Movie[]>;

  beforeEach(() => {
    movies$ = scheduled(of([
      {id: 1, title: 'Jurassic Park', year: 1993},
      {id: 2, title: 'The Lost World: Jurassic Park', year: 1997},
      {id: 3, title: 'Jurassic Park 3', year: 2001}
    ]), asyncScheduler);
    httpMock = {
      get: jasmine.createSpy('get').and.returnValue(movies$),
    };

    service = new MovieService(httpMock as HttpClient);
  });

  it('should return all movies from 1993', fakeAsync(() => {
    let expectedMovieArray: Movie[] = [{id: 1, title: 'Jurassic Park', year: 1993}]
    let result;

    service.findAllByYear(1993).subscribe((res) => {
      result = res;
    })

    expect(result).not.toBeDefined();

    tick();

    expect(result).toEqual(expectedMovieArray);
    
  }));  
});
