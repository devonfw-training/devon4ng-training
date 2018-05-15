// tslint:disable:max-line-length

import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-overview',
  templateUrl: './movie-overview.component.html',
  styleUrls: ['./movie-overview.component.scss']
})
export class MovieOverviewComponent implements OnInit {

  movies: Movie[] = [];
  selectedMovie: Movie|null = null;
  private movieIdSequence = 4;

  ngOnInit() {
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

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  isMovieSelected(movie: Movie) {
    return this.selectedMovie && movie && this.selectedMovie.id === movie.id;
  }

  onMovieUpdated(updatedMovie: Movie) {
    const movieToUpdate = this.movies.find((movie) => {
      return movie.id === updatedMovie.id;
    });
    if (movieToUpdate) {
      Object.assign(movieToUpdate, updatedMovie);
    } else {
      updatedMovie.id = this.movieIdSequence++;
      this.movies.push(updatedMovie);
    }
  }

  onMovieCreate() {
    this.selectedMovie = { };
  }

}
