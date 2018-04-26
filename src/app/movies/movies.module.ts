import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MovieDetailsComponent
  ],
  declarations: [MovieDetailsComponent]
})
export class MoviesModule { }
