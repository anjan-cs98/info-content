import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  registrationSuccess = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  // Check if passwords do not match
  get passwordsDoNotMatch() {
    return this.registerForm.errors?.['passwordMismatch'];
  }

  // Check if a control has an error and is touched
  hasError(controlName: string, errorName: string) {
    return (
      this.registerForm.get(controlName)?.hasError(errorName) &&
      this.registerForm.get(controlName)?.touched
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // let registerData = {
      //   type: 'register',
      //   name: this.registerForm.get('name')?.value,
      //   email: this.registerForm.get('email')?.value,
      //   password: this.registerForm.get('password')?.value,
      // };
      // console.log(this.registerForm.value);

      let Data = new FormData();
      Data.append('type', 'register');
      Data.append('name', this.registerForm.get('name')?.value);
      Data.append('email', this.registerForm.get('email')?.value);
      Data.append('password', this.registerForm.get('password')?.value);

      this.authService.login(Data).subscribe(
        (res: any) => {
          this.registrationSuccess = true;
          console.log(res);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
