import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieOverviewComponent } from './movie-overview/movie-overview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MovieDetailsComponent,
    MovieOverviewComponent
  ],
  declarations: [MovieDetailsComponent, MovieOverviewComponent]
})
export class MoviesModule { }
