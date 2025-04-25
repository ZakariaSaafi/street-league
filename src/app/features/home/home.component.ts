import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1>Welcome to Street League</h1>
          <p>The ultimate platform for street sports and competitions</p>
          <div class="hero-actions">
            <a routerLink="/auth/register" mat-raised-button color="primary" class="btn-lg">Get Started</a>
            <a routerLink="/tournaments" mat-stroked-button class="btn-lg">Browse Tournaments</a>
          </div>
        </div>
      </div>
    </div>
    
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">Why Choose Street League?</h2>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <mat-icon>group</mat-icon>
            </div>
            <h3>Team Management</h3>
            <p>Create and manage your own teams, or join existing ones to compete in tournaments.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <mat-icon>emoji_events</mat-icon>
            </div>
            <h3>Tournaments</h3>
            <p>Participate in tournaments across various street sports and compete to win prizes.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <mat-icon>event</mat-icon>
            </div>
            <h3>Scheduling</h3>
            <p>Schedule matches and training sessions with your team members with automatic reminders.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <mat-icon>chat</mat-icon>
            </div>
            <h3>Communication</h3>
            <p>Stay connected with your teammates and opponents through our integrated messaging system.</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Join the Street League?</h2>
          <p>Sign up today and start competing in street sports tournaments!</p>
          <a routerLink="/auth/register" mat-raised-button color="accent" class="btn-lg">Sign Up Now</a>
        </div>
      </div>
    </section>
    
    <section class="upcoming-section">
      <div class="container">
        <h2 class="section-title">Upcoming Tournaments</h2>
        
        <div class="tournaments-grid">
          <div class="tournament-card">
            <div class="tournament-image">
              <img src="https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Street Basketball Tournament">
            </div>
            <div class="tournament-content">
              <h3>Street Basketball Championship</h3>
              <p class="tournament-date"><mat-icon>event</mat-icon> June 15-20, 2025</p>
              <p class="tournament-location"><mat-icon>location_on</mat-icon> Central Park, New York</p>
              <a routerLink="/tournaments/1" mat-button color="primary">View Details</a>
            </div>
          </div>
          
          <div class="tournament-card">
            <div class="tournament-image">
              <img src="https://images.pexels.com/photos/2889416/pexels-photo-2889416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Skateboarding Competition">
            </div>
            <div class="tournament-content">
              <h3>Extreme Skateboarding Competition</h3>
              <p class="tournament-date"><mat-icon>event</mat-icon> July 5-8, 2025</p>
              <p class="tournament-location"><mat-icon>location_on</mat-icon> Venice Beach, Los Angeles</p>
              <a routerLink="/tournaments/2" mat-button color="primary">View Details</a>
            </div>
          </div>
          
          <div class="tournament-card">
            <div class="tournament-image">
              <img src="https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Street Soccer Tournament">
            </div>
            <div class="tournament-content">
              <h3>Urban Soccer Showdown</h3>
              <p class="tournament-date"><mat-icon>event</mat-icon> August 12-18, 2025</p>
              <p class="tournament-location"><mat-icon>location_on</mat-icon> Maracanã, Rio de Janeiro</p>
              <a routerLink="/tournaments/3" mat-button color="primary">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(to right, var(--primary-700), var(--primary-500));
      color: white;
      padding: var(--space-20) 0;
      margin-top: -70px; /* To account for header height */
      padding-top: calc(var(--space-20) + 70px);
    }
    
    .hero-content {
      max-width: 600px;
      text-align: center;
      margin: 0 auto;
    }
    
    .hero-content h1 {
      font-size: 3rem;
      margin-bottom: var(--space-4);
      color: white;
    }
    
    .hero-content p {
      font-size: 1.25rem;
      margin-bottom: var(--space-8);
      opacity: 0.9;
    }
    
    .hero-actions {
      display: flex;
      gap: var(--space-4);
      justify-content: center;
    }
    
    .section-title {
      text-align: center;
      margin-bottom: var(--space-10);
    }
    
    .features-section {
      padding: var(--space-16) 0;
      background-color: white;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: var(--space-6);
    }
    
    .feature-card {
      padding: var(--space-6);
      border-radius: var(--radius-lg);
      background-color: white;
      box-shadow: var(--shadow);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-align: center;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .feature-icon {
      width: 70px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--primary-50);
      border-radius: 50%;
      margin: 0 auto var(--space-4);
    }
    
    .feature-icon mat-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
      color: var(--primary-500);
    }
    
    .cta-section {
      padding: var(--space-16) 0;
      background-color: var(--accent-500);
      color: white;
    }
    
    .cta-content {
      max-width: 600px;
      text-align: center;
      margin: 0 auto;
    }
    
    .cta-content h2 {
      color: white;
      margin-bottom: var(--space-4);
    }
    
    .cta-content p {
      margin-bottom: var(--space-6);
      font-size: 1.125rem;
    }
    
    .upcoming-section {
      padding: var(--space-16) 0;
      background-color: var(--neutral-50);
    }
    
    .tournaments-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--space-6);
    }
    
    .tournament-card {
      border-radius: var(--radius-lg);
      overflow: hidden;
      background-color: white;
      box-shadow: var(--shadow);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .tournament-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .tournament-image {
      height: 200px;
      overflow: hidden;
    }
    
    .tournament-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .tournament-card:hover .tournament-image img {
      transform: scale(1.05);
    }
    
    .tournament-content {
      padding: var(--space-4);
    }
    
    .tournament-date, .tournament-location {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--neutral-600);
      margin-bottom: var(--space-2);
    }
    
    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2.25rem;
      }
      
      .hero-actions {
        flex-direction: column;
        gap: var(--space-2);
      }
      
      .tournaments-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {}