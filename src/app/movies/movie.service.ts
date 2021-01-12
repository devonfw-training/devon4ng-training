// tslint:disable:max-line-length

import { Injectable } from '@angular/core';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movies: Movie[];
  private movieIdSequence = 4;

  constructor() {
    this.movies = [
      {
        id: 1,
        title: 'Avengers: Infinity War',
        directors: 'Anthony Russo, Joe Russo',
        description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
        year: 2018
      },
      {
        id: 2,
        title: 'Matrix',
        directors: 'The Wachowski Brothers',
        description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        year: 1999
      },
      {
        id: 3,
        title: 'Blues Brothers',
        directors: 'John Landis',
        description: 'Jake Blues, just out from prison, puts together his old band to save the Catholic home where he and brother Elwood were raised.',
        year: 1980
      }];
  }

  findAll(): Movie[] {
    return this.movies;
  }

  findOne(id: number): Movie | undefined {
    return this.movies.find(m => m.id === id);
  }

  save(movieToSave: Movie): Movie {
    const movie = this.movies.find(m => m.id === movieToSave.id);
    if (movie != null) {
      Object.assign(movie, movieToSave);
      return movie;
    } else {
      movieToSave.id = this.movieIdSequence++;
      this.movies.push(movieToSave);
      return movieToSave;
    }
  }

}
