import { Movie } from '../movie';
import { Component, Output, EventEmitter, Input } from '@angular/core';

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

  onApplyClick() {
    this.movieUpdate.emit(this._movie);
  }

  onCreateClick() {
    this.movieCreate.emit();
  }

}
