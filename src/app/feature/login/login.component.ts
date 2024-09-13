import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  loginFailed = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }
  ngOnInit() {
    //Check if Remember Me was checked and load previous login details
    const savedLogin = JSON.parse(localStorage.getItem('loginData') || '{}');
    if (savedLogin.email && savedLogin.password) {
      this.loginForm.patchValue({
        email: savedLogin.email,
        password: savedLogin.password,
        rememberMe: true,
      });
    }
  }
  // Check for errors in the form controls
  hasError(controlName: string, errorName: string) {
    return (
      this.loginForm.get(controlName)?.hasError(errorName) &&
      this.loginForm.get(controlName)?.touched
    );
  }

  // Form submission and login API call
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      // let loginData = {
      //   type: 'login',
      //   email: this.loginForm.get('email')?.value,
      //   password: this.loginForm.get('password')?.value,
      // };

      let Data = new FormData();
      Data.append('type', 'login');
      Data.append('email', this.loginForm.get('email')?.value);
      Data.append('password', this.loginForm.get('password')?.value);

      this.authService.login(Data).subscribe(
        (response) => {
          // On successful login, redirect to dashboard
          this.loginFailed = false;
          // Redirect to the dashboard
          this.router.navigate(['/dashboard']);

          if (rememberMe) {
            // Save login details in local storage
            localStorage.setItem(
              'loginData',
              JSON.stringify({ email, password })
            );
            alert(response.message);

            /**User Trace */
            localStorage.setItem('isView', 'true');
          } else {
            // Clear login details from local storage
            localStorage.removeItem('loginData');
          }
        },
        (error) => {
          // On login failure, show an error message
          this.loginFailed = true;
        }
      );
    }
  }
}
