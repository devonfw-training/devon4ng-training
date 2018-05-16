// tslint:disable:max-line-length

import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {}

  findAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>('/services/rest/movies');
  }

  findOne(id: number): Observable<Movie|undefined> {
    return this.http.get<Movie>('/services/rest/movies/' + id);
  }

  save(movieToSave: Movie): Observable<Movie> {
    return this.http.post<Movie>('/services/rest/movies/', movieToSave);
  }

}
