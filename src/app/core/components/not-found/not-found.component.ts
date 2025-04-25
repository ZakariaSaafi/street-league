import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { fadeAnimation, bounceAnimation } from "../../../shared/animations/animations"

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div class="not-found-container">
      <div class="not-found-content" @fadeAnimation>
        <div class="error-code" @bounceAnimation>404</div>
        <h2>Oops! Page Not Found</h2>
        <p>Looks like you've ventured into uncharted territory! The page you're looking for might have been moved, renamed, or is just taking a break.</p>
        
        <div class="illustration">
          <mat-icon class="basketball">sports_basketball</mat-icon>
          <div class="court-line"></div>
        </div>
        
        <button mat-raised-button color="primary" routerLink="/" class="home-button">
          <mat-icon>home</mat-icon>
          Back to Home Court
        </button>
      </div>
    </div>
  `,
  styles: [
    `
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 200px);
      padding: var(--space-4);
      background: linear-gradient(135deg, var(--background), var(--muted));
    }
    
    .not-found-content {
      text-align: center;
      max-width: 600px;
      padding: var(--space-8);
      background-color: var(--card);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
    }
    
    .error-code {
      font-size: 8rem;
      font-weight: 800;
      background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
      margin-bottom: var(--space-4);
      text-shadow: 3px 3px 0 rgba(0,0,0,0.1);
    }
    
    h2 {
      font-size: 2.5rem;
      margin-bottom: var(--space-4);
      color: var(--foreground);
    }
    
    p {
      margin-bottom: var(--space-6);
      color: var(--muted-foreground);
      font-size: 1.1rem;
      line-height: 1.6;
    }
    
    .illustration {
      position: relative;
      height: 100px;
      margin: var(--space-8) 0;
    }
    
    .basketball {
      font-size: 60px;
      width: 60px;
      height: 60px;
      color: var(--primary-500);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      animation: bounce 1s infinite alternate;
    }
    
    .court-line {
      position: absolute;
      bottom: 0;
      left: 20%;
      right: 20%;
      height: 4px;
      background-color: var(--primary-300);
      border-radius: var(--radius-full);
    }
    
    .home-button {
      padding: var(--space-2) var(--space-6);
      font-size: 1.1rem;
      border-radius: var(--radius-full);
      transition: transform var(--transition), box-shadow var(--transition);
    }
    
    .home-button:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
    }
    
    .home-button mat-icon {
      margin-right: var(--space-2);
    }
    
    @keyframes bounce {
      0% { transform: translateX(-50%) translateY(0); }
      100% { transform: translateX(-50%) translateY(-20px); }
    }
    
    @media (max-width: 576px) {
      .error-code {
        font-size: 6rem;
      }
      
      h2 {
        font-size: 1.8rem;
      }
    }
  `,
  ],
  animations: [fadeAnimation, bounceAnimation],
})
export class NotFoundComponent {}
