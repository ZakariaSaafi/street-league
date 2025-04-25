import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-reset-password',
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
          <h1>Reset Password</h1>
          <p>Enter your new password</p>
        </div>
        
        <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()" class="auth-form">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>New Password</mat-label>
            <input 
              matInput 
              formControlName="password" 
              [type]="hidePassword ? 'password' : 'text'"
              placeholder="New password">
            <button 
              type="button" 
              mat-icon-button 
              matSuffix 
              (click)="hidePassword = !hidePassword">
              <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            <mat-error *ngIf="resetPasswordForm.get('password')?.hasError('required')">
              Password is required
            </mat-error>
            <mat-error *ngIf="resetPasswordForm.get('password')?.hasError('minlength')">
              Password must be at least 8 characters long
            </mat-error>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Confirm New Password</mat-label>
            <input 
              matInput 
              formControlName="confirmPassword" 
              [type]="hideConfirmPassword ? 'password' : 'text'"
              placeholder="Confirm new password">
            <button 
              type="button" 
              mat-icon-button 
              matSuffix 
              (click)="hideConfirmPassword = !hideConfirmPassword">
              <mat-icon>{{ hideConfirmPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            <mat-error *ngIf="resetPasswordForm.get('confirmPassword')?.hasError('required')">
              Please confirm your password
            </mat-error>
            <mat-error *ngIf="resetPasswordForm.get('confirmPassword')?.hasError('passwordMismatch')">
              Passwords do not match
            </mat-error>
          </mat-form-field>
          
          <button 
            type="submit" 
            mat-raised-button 
            color="primary" 
            class="auth-submit-button"
            [disabled]="resetPasswordForm.invalid || isLoading">
            {{ isLoading ? 'Resetting Password...' : 'Reset Password' }}
          </button>
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
  `]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.notificationService.showError('Invalid or missing reset token');
      this.router.navigate(['/auth/forgot-password']);
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid || !this.token) return;
    
    this.isLoading = true;
    const newPassword = this.resetPasswordForm.value.password;
    
    // TODO: Implement password reset functionality in AuthService
    setTimeout(() => {
      this.isLoading = false;
      this.notificationService.showSuccess('Password has been reset successfully');
      this.router.navigate(['/auth/login']);
    }, 1500);
  }
}