import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname:  ['', Validators.required],
      email: ['example@mail.com', Validators.email],
      passwords: this.formBuilder.group(
        {
          password:  ['', Validators.minLength(8)],
          passwordRepeat: ''
      }, {
        validators: this.validateEqual
      })
    });
  }

  ngOnInit() {
  }

  register() {
    console.log(this.registrationForm.value);
  }


  validateEqual(pws: FormGroup): ValidationErrors|null {
    if (pws.controls.password.value !== pws.controls.passwordRepeat.value) {
      return { notequal: true };
    }
    return null;
  }

}
