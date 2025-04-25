import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Forgot Password</h1>
          <p>Enter your email address to reset your password</p>
        </div>
        
        <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()" class="auth-form">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" placeholder="Email address">
            <mat-icon matSuffix>email</mat-icon>
            <mat-error *ngIf="forgotPasswordForm.get('email')?.hasError('required')">
              Email is required
            </mat-error>
            <mat-error *ngIf="forgotPasswordForm.get('email')?.hasError('email')">
              Please enter a valid email address
            </mat-error>
          </mat-form-field>
          
          <button 
            type="submit" 
            mat-raised-button 
            color="primary" 
            class="auth-submit-button"
            [disabled]="forgotPasswordForm.invalid || isLoading">
            {{ isLoading ? 'Sending Reset Link...' : 'Send Reset Link' }}
          </button>
          
          <div class="auth-alt-options">
            <p>Remember your password? <a routerLink="/auth/login">Log in</a></p>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 140px);
      padding: var(--space-4);
      background-color: var(--neutral-50);
    }
    
    .auth-card {
      width: 100%;
      max-width: 450px;
      padding: var(--space-6);
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
    }
    
    .auth-header {
      text-align: center;
      margin-bottom: var(--space-6);
    }
    
    .auth-header h1 {
      color: var(--primary-700);
    }
    
    .auth-header p {
      color: var(--neutral-600);
    }
    
    .auth-form {
      display: flex;
      flex-direction: column;
    }
    
    .form-field {
      margin-bottom: var(--space-4);
    }
    
    .auth-submit-button {
      padding: var(--space-3) 0;
      font-size: 1rem;
    }
    
    .auth-alt-options {
      margin-top: var(--space-6);
      text-align: center;
    }
    
    .auth-alt-options p {
      color: var(--neutral-600);
    }
    
    .auth-alt-options a {
      color: var(--primary-600);
      font-weight: 500;
      text-decoration: none;
    }
  `]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) return;
    
    this.isLoading = true;
    const email = this.forgotPasswordForm.value.email;
    
    // TODO: Implement password reset functionality in AuthService
    setTimeout(() => {
      this.isLoading = false;
      this.notificationService.showSuccess('Password reset link has been sent to your email');
      this.forgotPasswordForm.reset();
    }, 1500);
  }
}