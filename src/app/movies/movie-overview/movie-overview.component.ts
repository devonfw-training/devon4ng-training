import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

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
    this.movies$ = this.movieService.save(updatedMovie)
      .pipe(
        switchMap((movie) => {
          this.selectedMovie = movie;
          return this.movieService.findAll()
        }
      )
    );
  }

  onMovieCreate() {
    this.selectedMovie = {};
  }

}
