import { Component, OnInit } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { CommonModule } from "@angular/common"
import { HeaderComponent } from "./core/components/header/header.component"
import { FooterComponent } from "./core/components/footer/footer.component"
import { SidenavComponent } from "./core/components/sidenav/sidenav.component"
import { NotificationComponent } from "./shared/components/notification/notification.component"
import { NotificationService } from "./core/services/notification.service"
import { AuthService } from "./core/services/auth.service"
import { ThemeService } from "./core/services/theme.service"
import { fadeAnimation } from "./shared/animations/animations"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, SidenavComponent, NotificationComponent],
  template: `
    <div class="app-container" [class.dark-theme]="isDarkTheme">
      <app-header></app-header>
      <div class="main-content">
        <app-sidenav *ngIf="isAuthenticated"></app-sidenav>
        <main class="content-area" [class.with-sidenav]="isAuthenticated">
          <router-outlet></router-outlet>
        </main>
      </div>
      <app-footer></app-footer>
      <app-notification></app-notification>
    </div>
  `,
  styles: [
    `
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: var(--background);
      color: var(--foreground);
      transition: background-color var(--transition), color var(--transition);
    }
    
    .main-content {
      display: flex;
      flex: 1;
      margin-top: 70px;
    }
    
    .content-area {
      flex: 1;
      padding: var(--space-6);
      transition: padding var(--transition);
    }
    
    .content-area.with-sidenav {
      padding-left: var(--space-8);
    }
    
    @media (max-width: 768px) {
      .main-content {
        flex-direction: column;
      }
      
      .content-area, .content-area.with-sidenav {
        padding: var(--space-4);
      }
    }
  `,
  ],
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
  isAuthenticated = false
  isDarkTheme = false

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuth) => (this.isAuthenticated = isAuth))

    this.themeService.theme$.subscribe((theme) => {
      this.isDarkTheme = theme === "dark"
    })

    // Welcome notification
    setTimeout(() => {
      this.notificationService.showSuccess("Welcome to the new Street League! 🏀 We hope you enjoy the fresh look!")
    }, 1000)
  }
}
