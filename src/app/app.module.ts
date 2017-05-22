import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { BookComponent } from './hello/book.component';
import { SpeakerComponent } from './hello/speaker.component';

@NgModule({
  imports: [BrowserModule, FormsModule, CommonModule],
  declarations: [AppComponent, HelloComponent, BookComponent, SpeakerComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
