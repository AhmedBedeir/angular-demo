import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  loginForm: FormGroup;
  apiError: string = '';
  apiLoading: boolean = false;
  returnUrl: string = '/home';

  constructor() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });

    this._route.queryParams.subscribe((params) => {
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.apiError = '';
      this.apiLoading = true;
      const { email, password } = this.loginForm.value;
      this._authService.login(email, password).subscribe({
        next: () => {
          this.apiLoading = false;
          this._router.navigate([this.returnUrl]);
        },
        error: (err) => {
          this.apiLoading = false;
          this.apiError = err.error || 'Login failed. Please try again.';
        },
      });
    } else {
      this.apiError = 'Please fill out the form correctly.';
    }
  }
}
