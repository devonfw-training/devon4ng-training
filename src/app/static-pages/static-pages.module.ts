import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [AboutComponent, PageNotFoundComponent],
  imports: [
    CommonModule
  ]
})
export class StaticPagesModule { }
