import { Component } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-overview',
  templateUrl: './movie-overview.component.html',
  styleUrls: ['./movie-overview.component.scss']
})
export class MovieOverviewComponent {

  selectedMovie?: Movie;
  movies: Movie[];

  constructor(private movieService: MovieService) {
    this.movies = this.movieService.findAll()
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  isMovieSelected(movie: Movie) {
    return this.selectedMovie && this.selectedMovie.id === movie.id;
  }

  onMovieUpdated(updatedMovie: Movie) {
    debugger;
    if (this.movieService.save(updatedMovie)) {
      this.movies = this.movieService.findAll();
    };

  }

  onMovieCreate() {
    this.selectedMovie = {};
  }

}
