import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-overview',
  templateUrl: './movie-overview.component.html',
  styleUrls: ['./movie-overview.component.scss']
})
export class MovieOverviewComponent implements OnInit {

  selectedMovie: Movie;
  movies$:Observable<Movie[]>;

  constructor(private movieService:MovieService) {
   }

  ngOnInit() {
    this.movies$ = this.movieService.findAll();
  }

  selectMovie(movie:Movie){
    this.selectedMovie = movie;
  }

  isMovieSelected(movie: Movie){
    return this.selectedMovie && movie && this.selectedMovie.id === movie.id;
  }

  onMovieUpdated(updatedMovie: Movie) {
    this.movies$ = this.movieService.save(updatedMovie).pipe(switchMap( (movie) => {
      return this.movieService.findAll();
    }));
  }

  onMovieCreate() {
    this.selectedMovie = {
      id: null,
      description: null,
      directors: null,
      title: null,
      year: null
    }
  }


}
