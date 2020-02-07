import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {REDUCER_TOKEN, reducers} from './root.reducer';

// import StoreModule.forRoot(reducers) & StoreDevtoolsModule.instrument()
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {
}
