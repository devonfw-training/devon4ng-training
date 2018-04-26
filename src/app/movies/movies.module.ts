import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieOverviewComponent } from './movie-overview/movie-overview.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MovieDetailsComponent,
    MovieOverviewComponent
  ],
  declarations: [MovieDetailsComponent, MovieOverviewComponent]
})
export class MoviesModule { }
