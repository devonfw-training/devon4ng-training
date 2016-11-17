import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
import {enableProdMode} from '@angular/core';
import {environment} from './_env/environment';

if (environment.enableProdMode) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
