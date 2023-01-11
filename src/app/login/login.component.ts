import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUsername } from '../state/auth.selector';
import { login, logout } from '../state/auth.reducer';
import { AuthState } from '../state/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;

  username$: Observable<string | null> = this.store.pipe(
    select(selectUsername)
  );

  constructor(private fb: FormBuilder, private store: Store<AuthState>) {
    this.form = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  get usernameFC() {
    return this.form.get('username');
  }

  get passwordFC() {
    return this.form.get('password');
  }

  onLoginClicked() {
    this.store.dispatch(
      login({
        username: this.usernameFC?.value,
        password: this.passwordFC?.value,
      })
    );
    this.passwordFC?.reset();
  }

  onLogoutClicked() {
    this.form.reset();
    this.store.dispatch(logout());
  }
}
