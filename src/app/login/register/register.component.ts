import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";

interface RegistrationFormType {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  passwords: FormGroup<PasswordFormType>;
}

type PasswordFormType = {
  password: FormControl<string | null>;
  passwordRepeat: FormControl<string | null>;
};

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup<RegistrationFormType>;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group<RegistrationFormType>({
      firstName: this.formBuilder.control("", Validators.required),
      lastName: this.formBuilder.control("", Validators.required),
      email: this.formBuilder.control("example@mail.com", Validators.email),
      passwords: this.formBuilder.group(
        {
          password: this.formBuilder.control("", [
            Validators.required,
            Validators.minLength(8),
          ]),
          passwordRepeat: this.formBuilder.control(""),
        },
        {
          validators: this.validateEqual,
        }
      ),
    });
  }

  ngOnInit() {}

  register() {
    console.log(this.registrationForm.value);
  }

  validateEqual(pws: FormGroup<PasswordFormType>): ValidationErrors | null {
    if (pws.controls.password.value !== pws.controls.passwordRepeat.value) {
      return { notequal: true };
    }
    return null;
  }
}
