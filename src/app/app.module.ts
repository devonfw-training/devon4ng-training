import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { reducers, REDUCER_TOKEN } from './root.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: REDUCER_TOKEN,
      useValue: reducers,
    },
  ],
})
export class AppModule {}
