import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './root.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngrx-simple-app';

  // todo inject store here
  constructor() {
  }
}
