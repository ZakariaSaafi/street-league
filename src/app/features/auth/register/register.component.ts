import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatStepperModule } from "@angular/material/stepper"
import { MatSelectModule } from "@angular/material/select"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core"
import { AuthService } from "../../../core/services/auth.service"
import { NotificationService } from "../../../core/services/notification.service"
import { fadeAnimation, slideInAnimation } from "../../../shared/animations/animations"

@Component({
  selector: "app-register",
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
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  template: `
    <div class="auth-container">
      <div class="auth-card" @fadeAnimation>
        <div class="auth-header">
          <div class="auth-logo" @slideInAnimation>
            <mat-icon>sports_basketball</mat-icon>
          </div>
          <h1 class="auth-title">Join the League!</h1>
          <p class="auth-subtitle">Create your account and start playing</p>
        </div>
        
        <mat-stepper linear #stepper class="register-stepper">
          <mat-step [stepControl]="accountForm" label="Account Details">
            <form [formGroup]="accountForm">
              <div class="step-content">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Email</mat-label>
                  <input matInput formControlName="email" type="email" placeholder="your@email.com">
                  <mat-icon matPrefix>email</mat-icon>
                  <mat-error *ngIf="accountForm.get('email')?.hasError('required')">Email is required</mat-error>
                  <mat-error *ngIf="accountForm.get('email')?.hasError('email')">Please enter a valid email</mat-error>
                </mat-form-field>
                
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Password</mat-label>
                  <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'" placeholder="••••••••">
                  <mat-icon matPrefix>lock</mat-icon>
                  <button type="button" mat-icon-button matSuffix (click)="hidePassword = !hidePassword">
                    <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
                  </button>
                  <mat-error *ngIf="accountForm.get('password')?.hasError('required')">Password is required</mat-error>
                  <mat-error *ngIf="accountForm.get('password')?.hasError('minlength')">Password must be at least 8 characters</mat-error>
                </mat-form-field>
                
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Confirm Password</mat-label>
                  <input matInput formControlName="confirmPassword" [type]="hidePassword ? 'password' : 'text'" placeholder="••••••••">
                  <mat-icon matPrefix>lock</mat-icon>
                  <mat-error *ngIf="accountForm.get('confirmPassword')?.hasError('required')">Please confirm your password</mat-error>
                  <mat-error *ngIf="accountForm.get('confirmPassword')?.hasError('passwordMismatch')">Passwords do not match</mat-error>
                </mat-form-field>
                
                <div class="step-actions">
                  <button mat-raised-button color="primary" matStepperNext [disabled]="accountForm.invalid">Next</button>
                </div>
              </div>
            </form>
          </mat-step>
          
          <mat-step [stepControl]="personalForm" label="Personal Info">
            <form [formGroup]="personalForm">
              <div class="step-content">
                <div class="form-row">
                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>First Name</mat-label>
                    <input matInput formControlName="firstName" placeholder="John">
                    <mat-icon matPrefix>person</mat-icon>
                    <mat-error *ngIf="personalForm.get('firstName')?.hasError('required')">First name is required</mat-error>
                  </mat-form-field>
                  
                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Last Name</mat-label>
                    <input matInput formControlName="lastName" placeholder="Doe">
                    <mat-icon matPrefix>person</mat-icon>
                    <mat-error *ngIf="personalForm.get('lastName')?.hasError('required')">Last name is required</mat-error>
                  </mat-form-field>
                </div>
                
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Date of Birth</mat-label>
                  <input matInput [matDatepicker]="picker" formControlName="dateOfBirth">
                  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                  <mat-datepicker #picker></mat-datepicker>
                  <mat-icon matPrefix>cake</mat-icon>
                  <mat-error *ngIf="personalForm.get('dateOfBirth')?.hasError('required')">Date of birth is required</mat-error>
                </mat-form-field>
                
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Phone Number</mat-label>
                  <input matInput formControlName="phone" placeholder="+1 (555) 123-4567">
                  <mat-icon matPrefix>phone</mat-icon>
                </mat-form-field>
                
                <div class="step-actions">
                  <button mat-button matStepperPrevious>Back</button>
                  <button mat-raised-button color="primary" matStepperNext [disabled]="personalForm.invalid">Next</button>
                </div>
              </div>
            </form>
          </mat-step>
          
          <mat-step [stepControl]="preferencesForm" label="Preferences">
            <form [formGroup]="preferencesForm">
              <div class="step-content">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Favorite Sport</mat-label>
                  <mat-select formControlName="favoriteSport">
                    <mat-option value="basketball">Basketball</mat-option>
                    <mat-option value="football">Football</mat-option>
                    <mat-option value="soccer">Soccer</mat-option>
                    <mat-option value="volleyball">Volleyball</mat-option>
                    <mat-option value="skateboarding">Skateboarding</mat-option>
                  </mat-select>
                  <mat-icon matPrefix>sports_basketball</mat-icon>
                </mat-form-field>
                
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Skill Level</mat-label>
                  <mat-select formControlName="skillLevel">
                    <mat-option value="beginner">Beginner</mat-option>
                    <mat-option value="intermediate">Intermediate</mat-option>
                    <mat-option value="advanced">Advanced</mat-option>
                    <mat-option value="pro">Professional</mat-option>
                  </mat-select>
                  <mat-icon matPrefix>emoji_events</mat-icon>
                </mat-form-field>
                
                <div class="form-field checkbox-field">
                  <mat-checkbox formControlName="notifications" color="primary">Receive notifications about new tournaments</mat-checkbox>
                </div>
                
                <div class="form-field checkbox-field">
                  <mat-checkbox formControlName="termsAccepted" color="primary" required>
                    I accept the <a routerLink="/terms" class="terms-link">Terms of Service</a> and <a routerLink="/privacy" class="terms-link">Privacy Policy</a>
                  </mat-checkbox>
                  <mat-error *ngIf="preferencesForm.get('termsAccepted')?.hasError('required') && preferencesForm.get('termsAccepted')?.touched">
                    You must accept the terms to continue
                  </mat-error>
                </div>
                
                <div class="step-actions">
                  <button mat-button matStepperPrevious>Back</button>
                  <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="!isFormValid() || isLoading">
                    <span *ngIf="!isLoading">Create Account</span>
                    <mat-icon *ngIf="isLoading" class="spinner">refresh</mat-icon>
                  </button>
                </div>
              </div>
            </form>
          </mat-step>
        </mat-stepper>
        
        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/auth/login" class="login-link">Sign in</a></p>
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
      max-width: 600px;
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
    
    .register-stepper {
      margin-bottom: var(--space-6);
    }
    
    .step-content {
      padding: var(--space-4) 0;
    }
    
    .form-field {
      width: 100%;
      margin-bottom: var(--space-4);
    }
    
    .form-row {
      display: flex;
      gap: var(--space-4);
    }
    
    .checkbox-field {
      margin-bottom: var(--space-4);
    }
    
    .terms-link {
      color: var(--primary-500);
      text-decoration: none;
      transition: color var(--transition);
    }
    
    .terms-link:hover {
      color: var(--primary-600);
      text-decoration: underline;
    }
    
    .step-actions {
      display: flex;
      justify-content: space-between;
      margin-top: var(--space-4);
    }
    
    .spinner {
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .auth-footer {
      text-align: center;
      margin-top: var(--space-6);
      color: var(--muted-foreground);
    }
    
    .login-link {
      color: var(--primary-500);
      text-decoration: none;
      font-weight: 500;
      transition: color var(--transition);
    }
    
    .login-link:hover {
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
    
    @media (max-width: 768px) {
      .auth-card {
        padding: var(--space-4);
      }
      
      .auth-title {
        font-size: 1.5rem;
      }
      
      .form-row {
        flex-direction: column;
        gap: 0;
      }
    }
  `,
  ],
  animations: [fadeAnimation, slideInAnimation],
})
export class RegisterComponent {
  accountForm: FormGroup
  personalForm: FormGroup
  preferencesForm: FormGroup
  hidePassword = true
  isLoading = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {
    this.accountForm = this.fb.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    )

    this.personalForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      phone: [""],
    })

    this.preferencesForm = this.fb.group({
      favoriteSport: ["basketball"],
      skillLevel: ["beginner"],
      notifications: [true],
      termsAccepted: [false, Validators.requiredTrue],
    })
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get("password")?.value
    const confirmPassword = form.get("confirmPassword")?.value

    if (password !== confirmPassword) {
      form.get("confirmPassword")?.setErrors({ passwordMismatch: true })
      return { passwordMismatch: true }
    }

    return null
  }

  isFormValid(): boolean {
    return this.accountForm.valid && this.personalForm.valid && this.preferencesForm.valid
  }

  onSubmit(): void {
    if (!this.isFormValid()) return

    this.isLoading = true

    const userData = {
      ...this.accountForm.value,
      ...this.personalForm.value,
      ...this.preferencesForm.value,
    }

    // Simulate API call
    setTimeout(() => {
      this.authService.register(userData)
      this.notificationService.showSuccess("Welcome to Street League! 🎉 Your account has been created successfully!")
      this.isLoading = false
    }, 1500)
  }
}
