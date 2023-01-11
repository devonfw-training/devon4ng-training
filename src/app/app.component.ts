import {Component} from '@angular/core';
import {AuthState} from './state/auth.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectIsLoggedIn} from './state/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn$: Observable<boolean> = this.store$.select(selectIsLoggedIn);

  constructor(private store$: Store<AuthState>) {

  }
}
