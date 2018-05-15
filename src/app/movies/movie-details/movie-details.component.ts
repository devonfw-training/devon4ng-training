import { Component } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {

  currentMovie: Movie = {
    id: 1,
    title: 'Star Wars',
    directors: 'George Lucas',
    description: 'A story about the light and the dark side.',
    year: 1977
  };

}
