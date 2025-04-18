import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    CommonModule,
  ]
})
export class LoginComponent {
  #router = inject(Router);
  #authService = inject(AuthService);
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['karn.yong@melivecode.com', [Validators.required, Validators.email]],
      password: ['melivecode', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.#authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.#router.navigate(['/dashboard/statistics']); // ✅ navigate to dashboard
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login failed', err);
      }
    });
  }
}
