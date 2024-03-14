import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {REDUCER_TOKEN, reducers} from './root.reducer';
import {NumberComponent} from './number/number.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NumberComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({connectInZone: true}),
    ReactiveFormsModule
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
