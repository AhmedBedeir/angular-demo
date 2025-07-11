import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  _formBuilder = inject(FormBuilder);
  _authService = inject(AuthService);
  _router = inject(Router);
  apiError: string = "";
  apiLoading: boolean = false;
  registerForm: FormGroup;

  constructor() {
    this.registerForm = this._formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'mismatch': true } : null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.apiError = "";
      this.apiLoading = true;
      const { confirmPassword, ...formData } = this.registerForm.value; // Exclude confirmPassword
      this._authService.register(formData).subscribe({
        next: () => {
          this.apiLoading = false;
          this._router.navigate(['/login']);
        },
        error: (err) => {
          this.apiLoading = false;
          this.apiError = err.error || 'Registration failed. Please try again.';
        }
      });
    } else {
      this.apiError = 'Please fill out the form correctly.';
    }
  }
}
