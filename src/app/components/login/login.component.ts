import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  errorMessage!: string;
  isLoading: boolean = false;
  forgetPasswordMessageSuccess!: string;
  forgetPasswordMessageError!: string;

  forgetFlag: boolean = true;
  verifyFlag: boolean = false;
  newPasswordflag: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
    ]),
  });
    forgetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

    verifyForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });

  newPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
    ]),
  });

  handleForm(): void {
    this.isLoading = true;
    this.errorMessage = '';
    if (this.loginForm.valid == true) {
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
          if (response.message == 'success') {

            localStorage.setItem('userToken', response.token);
            this._AuthService.saveUserDataMethod();
            this._Router.navigate(['/home']);
          }
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.isLoading = false;
        },
      });
    }
  }

  forgetPasswordMethod(): void {
    this.isLoading = true;
    this.errorMessage = '';
    if (this.forgetForm.valid == true) {
      this._AuthService.forgetPasswordAPI(this.forgetForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.message) {
            this.forgetFlag = false;
            this.verifyFlag = true;
            this.forgetPasswordMessageSuccess = response.message;
          }
        },
        error: (error) => {
          this.forgetPasswordMessageError = error.error.message;

          this.isLoading = false;
        },
      });
    }
  }

  verifyCodeMethod(): void {
    this.isLoading = true;
    this._AuthService.verifyCodeAPI(this.verifyForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.status == 'Success') {
          this.verifyFlag = false;
          this.newPasswordflag = true;
        }
      },
      error: (error) => {
        this.isLoading = false;
      },
    });
  }

  newPasswordMethod(): void {
    this.isLoading = true;
    this._AuthService.newPasswordAPI(this.newPasswordForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.token) {
          console.log(response);
          this._Router.navigate(['/login']);
        }
      },
      error: (error) => {
        this.isLoading = false;
      },
    });
  }
}
