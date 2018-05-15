import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {

  private _movie: Movie = {};

  @Output() movieUpdate = new EventEmitter<Movie>();

  @Output() movieCreate = new EventEmitter<void>();

  get movie(): Movie {
    return this._movie;
  }

  @Input()
  set movie(movie: Movie) {
    this._movie = {...movie};
  }

  apply() {
    this.movieUpdate.emit(this._movie);
  }

  create() {
    this.movieCreate.emit();
  }

}
