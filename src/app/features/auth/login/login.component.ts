import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterModule } from "@angular/router"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatDividerModule } from "@angular/material/divider"
import { AuthService } from "../../../core/services/auth.service"
import { NotificationService } from "../../../core/services/notification.service"
import { fadeAnimation, slideInAnimation } from "../../../shared/animations/animations"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
  ],
  template: `
    <div class="auth-container">
      <div class="auth-card" @fadeAnimation>
        <div class="auth-header">
          <div class="auth-logo" @slideInAnimation>
            <mat-icon>sports_basketball</mat-icon>
          </div>
          <h1 class="auth-title">Welcome Back!</h1>
          <p class="auth-subtitle">Sign in to continue the game</p>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form">
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" placeholder="your@email.com">
            <mat-icon matPrefix>email</mat-icon>
            <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Email is required</mat-error>
            <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Please enter a valid email</mat-error>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="form-field">
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'" placeholder="••••••••">
            <mat-icon matPrefix>lock</mat-icon>
            <button type="button" mat-icon-button matSuffix (click)="hidePassword = !hidePassword">
              <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Password is required</mat-error>
          </mat-form-field>
          
          <div class="form-options">
            <mat-checkbox formControlName="rememberMe" color="primary">Remember me</mat-checkbox>
            <a routerLink="/auth/forgot-password" class="forgot-password">Forgot password?</a>
          </div>
          
          <button type="submit" mat-raised-button color="primary" class="submit-button" [disabled]="loginForm.invalid || isLoading">
            <span *ngIf="!isLoading">Sign In</span>
            <mat-icon *ngIf="isLoading" class="spinner">refresh</mat-icon>
          </button>
          
          <mat-divider class="divider">or</mat-divider>
          
          <div class="social-buttons">
            <button type="button" mat-stroked-button class="social-button google">
              <mat-icon>g_translate</mat-icon>
              <span>Sign in with Google</span>
            </button>
            <button type="button" mat-stroked-button class="social-button facebook">
              <mat-icon>facebook</mat-icon>
              <span>Sign in with Facebook</span>
            </button>
          </div>
        </form>
        
        <div class="auth-footer">
          <p>Don't have an account? <a routerLink="/auth/register" class="register-link">Sign up now</a></p>
        </div>
      </div>
      
      <div class="auth-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>
    </div>
  `,
  styles: [
    `
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 200px);
      padding: var(--space-4);
      position: relative;
      overflow: hidden;
    }
    
    .auth-card {
      width: 100%;
      max-width: 450px;
      background-color: var(--card);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      padding: var(--space-8);
      z-index: 1;
      position: relative;
    }
    
    .auth-header {
      text-align: center;
      margin-bottom: var(--space-6);
    }
    
    .auth-logo {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto var(--space-4);
      box-shadow: var(--shadow-md);
    }
    
    .auth-logo mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: white;
    }
    
    .auth-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: var(--space-2);
      color: var(--foreground);
    }
    
    .auth-subtitle {
      color: var(--muted-foreground);
      font-size: 1rem;
    }
    
    .auth-form {
      display: flex;
      flex-direction: column;
    }
    
    .form-field {
      margin-bottom: var(--space-4);
    }
    
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-4);
    }
    
    .forgot-password {
      color: var(--primary-500);
      text-decoration: none;
      font-size: 0.875rem;
      transition: color var(--transition);
    }
    
    .forgot-password:hover {
      color: var(--primary-600);
      text-decoration: underline;
    }
    
    .submit-button {
      height: 48px;
      font-size: 1rem;
      font-weight: 500;
      border-radius: var(--radius);
      margin-bottom: var(--space-4);
      transition: transform var(--transition), box-shadow var(--transition);
    }
    
    .submit-button:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .spinner {
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .divider {
      margin: var(--space-4) 0;
      position: relative;
      text-align: center;
      font-size: 0.875rem;
      color: var(--muted-foreground);
    }
    
    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background-color: var(--border);
      z-index: -1;
    }
    
    .divider::after {
      content: 'or';
      background-color: var(--card);
      padding: 0 var(--space-2);
    }
    
    .social-buttons {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
    
    .social-button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      border-radius: var(--radius);
      transition: background-color var(--transition);
    }
    
    .social-button mat-icon {
      margin-right: var(--space-2);
    }
    
    .social-button.google {
      border-color: #4285F4;
      color: #4285F4;
    }
    
    .social-button.google:hover {
      background-color: rgba(66, 133, 244, 0.1);
    }
    
    .social-button.facebook {
      border-color: #3b5998;
      color: #3b5998;
    }
    
    .social-button.facebook:hover {
      background-color: rgba(59, 89, 152, 0.1);
    }
    
    .auth-footer {
      text-align: center;
      margin-top: var(--space-6);
      color: var(--muted-foreground);
    }
    
    .register-link {
      color: var(--primary-500);
      text-decoration: none;
      font-weight: 500;
      transition: color var(--transition);
    }
    
    .register-link:hover {
      color: var(--primary-600);
      text-decoration: underline;
    }
    
    .auth-decoration {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      z-index: 0;
    }
    
    .decoration-circle {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-300), var(--secondary-300));
      opacity: 0.2;
    }
    
    .circle-1 {
      width: 300px;
      height: 300px;
      top: -100px;
      right: -100px;
    }
    
    .circle-2 {
      width: 200px;
      height: 200px;
      bottom: -50px;
      left: -50px;
    }
    
    .circle-3 {
      width: 150px;
      height: 150px;
      top: 50%;
      left: 60%;
      transform: translate(-50%, -50%);
    }
    
    @media (max-width: 576px) {
      .auth-card {
        padding: var(--space-4);
      }
      
      .auth-title {
        font-size: 1.5rem;
      }
      
      .form-options {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-2);
      }
    }
  `,
  ],
  animations: [fadeAnimation, slideInAnimation],
})
export class LoginComponent {
  loginForm: FormGroup
  hidePassword = true
  isLoading = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      rememberMe: [false],
    })
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    
    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    
    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.notificationService.showSuccess('Login successful!');
        
        // Redirect to the intended URL or default to dashboard
        const redirectUrl = this.authService.redirectUrl || '/dashboard';
        this.router.navigateByUrl(redirectUrl);
        this.authService.redirectUrl = null; // Reset redirect URL
      },
      error: (error) => {
        this.isLoading = false;
        this.notificationService.showError(error.error?.message || 'Login failed. Please check your credentials.');
      }
    });
  }
}