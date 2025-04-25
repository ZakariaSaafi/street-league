import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { MatIconModule } from "@angular/material/icon"
import { ThemeService } from "../../services/theme.service"
import { fadeAnimation } from "../../../shared/animations/animations"

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <footer class="footer">
      <div class="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="currentColor" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">
              <div class="footer-logo">
                <mat-icon>sports_basketball</mat-icon>
                <span>Street League</span>
              </div>
            </h3>
            <p>The ultimate platform for street sports and competitions. Join the fun today!</p>
            <div class="social-links">
              <a href="#" class="social-link" aria-label="Facebook">
                <mat-icon>facebook</mat-icon>
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <mat-icon>twitter</mat-icon>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <mat-icon>instagram</mat-icon>
              </a>
              <a href="#" class="social-link" aria-label="YouTube">
                <mat-icon>youtube_searched_for</mat-icon>
              </a>
            </div>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">Quick Links</h3>
            <ul class="footer-links">
              <li><a routerLink="/">Home</a></li>
              <li><a routerLink="/teams">Teams</a></li>
              <li><a routerLink="/tournaments">Tournaments</a></li>
              <li><a routerLink="/schedule">Schedule</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">Support</h3>
            <ul class="footer-links">
              <li><a routerLink="/help">Help Center</a></li>
              <li><a routerLink="/contact">Contact Us</a></li>
              <li><a routerLink="/faq">FAQ</a></li>
              <li><a routerLink="/feedback">Feedback</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">Legal</h3>
            <ul class="footer-links">
              <li><a routerLink="/terms">Terms of Service</a></li>
              <li><a routerLink="/privacy">Privacy Policy</a></li>
              <li><a routerLink="/cookies">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Street League. All rights reserved.</p>
          <p>Made with <span class="heart">❤</span> for street sports</p>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
    .footer {
      background-color: var(--primary-500);
      color: white;
      padding: var(--space-10) 0 var(--space-4);
      margin-top: var(--space-10);
      position: relative;
    }
    
    .footer-wave {
      top: -100px;
      left: 0;
      width: 100%;
      height: 100px;
      color: var(--primary-500);
    }
    
    .footer-content {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: var(--space-8);
      gap: var(--space-8);
    }
    
    .footer-section {
      flex: 1 1 250px;
    }
    
    .footer-logo {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-2);
    }
    
    .footer-logo mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }
    
    .footer-title {
      color: white;
      font-size: 1.25rem;
      margin-bottom: var(--space-4);
      position: relative;
      display: inline-block;
    }
    
    .footer-title::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 3px;
      background-color: var(--accent-500);
      border-radius: var(--radius-full);
    }
    
    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .footer-links li {
      margin-bottom: var(--space-2);
      transition: transform var(--transition);
    }
    
    .footer-links li:hover {
      transform: translateX(5px);
    }
    
    .footer-links a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: color var(--transition);
      display: inline-block;
      position: relative;
    }
    
    .footer-links a::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: white;
      transition: width var(--transition);
    }
    
    .footer-links a:hover {
      color: white;
    }
    
    .footer-links a:hover::after {
      width: 100%;
    }
    
    .social-links {
      display: flex;
      margin-top: var(--space-4);
      gap: var(--space-2);
    }
    
    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      transition: all var(--transition);
    }
    
    .social-link:hover {
      background-color: white;
      color: var(--primary-500);
      transform: translateY(-5px);
    }
    
    .footer-bottom {
      padding-top: var(--space-4);
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      color: rgba(255, 255, 255, 0.7);
    }
    
    .heart {
      color: var(--error-500);
      animation: pulse 1.5s infinite;
      display: inline-block;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }
    
    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        gap: var(--space-6);
      }
      
      .footer-section {
        margin-bottom: 0;
      }
      
      .footer-bottom {
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: var(--space-2);
      }
    }
  `,
  ],
  animations: [fadeAnimation],
})
export class FooterComponent {
  currentYear: number
  isDarkTheme = false

  constructor(private themeService: ThemeService) {
    this.currentYear = new Date().getFullYear()

    this.themeService.theme$.subscribe((theme) => {
      this.isDarkTheme = theme === "dark"
    })
  }
}
