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
  movies$ = this.movieService.findAll();

  constructor(private movieService: MovieService) {}

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  isMovieSelected(movie: Movie) {
    return this.selectedMovie && this.selectedMovie.id === movie.id;
  }

  onMovieUpdated(updatedMovie: Movie) {
    this.movieService.save(updatedMovie)
      .pipe(tap(m => this.selectedMovie = m))
      .subscribe({
        complete: () => this.movies$ = this.movieService.findAll()
      });
  }

  onMovieCreate() {
    this.selectedMovie = {};
  }

}
