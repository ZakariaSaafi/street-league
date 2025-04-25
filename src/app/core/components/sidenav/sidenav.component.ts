import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { MatIconModule } from "@angular/material/icon"
import { MatTooltipModule } from "@angular/material/tooltip"
import { AuthService } from "../../services/auth.service"
import { ThemeService } from "../../services/theme.service"
import { fadeAnimation, slideInAnimation } from "../../../shared/animations/animations"

@Component({
  selector: "app-sidenav",
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatTooltipModule],
  template: `
    <aside class="sidenav" [class.collapsed]="isCollapsed" [class.dark-theme]="isDarkTheme">
      <div class="sidenav-toggle" (click)="toggleSidenav()" [matTooltip]="isCollapsed ? 'Expand menu' : 'Collapse menu'">
        <mat-icon>{{ isCollapsed ? 'chevron_right' : 'chevron_left' }}</mat-icon>
      </div>
      
      <nav class="sidenav-nav">
        <ul class="sidenav-list" @fadeAnimation>
          <li class="sidenav-item" @slideInAnimation>
            <a routerLink="/dashboard" routerLinkActive="active" class="sidenav-link" [matTooltip]="isCollapsed ? 'Dashboard' : ''" [matTooltipPosition]="'right'">
              <mat-icon>dashboard</mat-icon>
              <span *ngIf="!isCollapsed">Dashboard</span>
            </a>
          </li>
          <li class="sidenav-item" @slideInAnimation>
            <a routerLink="/teams" routerLinkActive="active" class="sidenav-link" [matTooltip]="isCollapsed ? 'Teams' : ''" [matTooltipPosition]="'right'">
              <mat-icon>group</mat-icon>
              <span *ngIf="!isCollapsed">Teams</span>
            </a>
          </li>
          <li class="sidenav-item" @slideInAnimation>
            <a routerLink="/schedule" routerLinkActive="active" class="sidenav-link" [matTooltip]="isCollapsed ? 'Schedule' : ''" [matTooltipPosition]="'right'">
              <mat-icon>event</mat-icon>
              <span *ngIf="!isCollapsed">Schedule</span>
            </a>
          </li>
          <li class="sidenav-item" @slideInAnimation>
            <a routerLink="/tournaments" routerLinkActive="active" class="sidenav-link" [matTooltip]="isCollapsed ? 'Tournaments' : ''" [matTooltipPosition]="'right'">
              <mat-icon>emoji_events</mat-icon>
              <span *ngIf="!isCollapsed">Tournaments</span>
            </a>
          </li>
          <li class="sidenav-item" @slideInAnimation>
            <a routerLink="/messages" routerLinkActive="active" class="sidenav-link" [matTooltip]="isCollapsed ? 'Messages' : ''" [matTooltipPosition]="'right'">
              <mat-icon>chat_bubble</mat-icon>
              <span *ngIf="!isCollapsed">Messages</span>
            </a>
          </li>
          <li class="sidenav-item" @slideInAnimation>
            <a routerLink="/profile" routerLinkActive="active" class="sidenav-link" [matTooltip]="isCollapsed ? 'Profile' : ''" [matTooltipPosition]="'right'">
              <mat-icon>person</mat-icon>
              <span *ngIf="!isCollapsed">Profile</span>
            </a>
          </li>
          <li class="sidenav-item" *ngIf="isAdmin" @slideInAnimation>
            <a routerLink="/admin" routerLinkActive="active" class="sidenav-link" [matTooltip]="isCollapsed ? 'Admin' : ''" [matTooltipPosition]="'right'">
              <mat-icon>admin_panel_settings</mat-icon>
              <span *ngIf="!isCollapsed">Admin</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div class="sidenav-footer">
        <div class="sidenav-theme-toggle" (click)="toggleTheme()" [matTooltip]="isCollapsed ? (isDarkTheme ? 'Light mode' : 'Dark mode') : ''">
          <mat-icon>{{ isDarkTheme ? 'light_mode' : 'dark_mode' }}</mat-icon>
          <span *ngIf="!isCollapsed">{{ isDarkTheme ? 'Light mode' : 'Dark mode' }}</span>
        </div>
      </div>
    </aside>
  `,
  styles: [
    `
    .sidenav {
      width: 240px;
      background-color: var(--card);
      box-shadow: var(--shadow);
      height: calc(100vh - 70px);
      position: sticky;
      top: 70px;
      transition: width 0.3s ease, background-color 0.3s ease;
      overflow-x: hidden;
      z-index: var(--z-30);
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--border);
    }
    
    .sidenav.collapsed {
      width: 70px;
    }
    
    .sidenav-toggle {
      display: flex;
      justify-content: flex-end;
      padding: var(--space-3);
      cursor: pointer;
      color: var(--muted-foreground);
      transition: color var(--transition);
    }
    
    .sidenav-toggle:hover {
      color: var(--primary-500);
    }
    
    .sidenav-nav {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: var(--space-2) 0;
    }
    
    .sidenav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .sidenav-item {
      margin: var(--space-1) 0;
    }
    
    .sidenav-link {
      display: flex;
      align-items: center;
      padding: var(--space-3) var(--space-4);
      color: var(--foreground);
      text-decoration: none;
      transition: all var(--transition);
      border-radius: var(--radius);
      margin: 0 var(--space-2);
    }
    
    .sidenav-link:hover {
      background-color: var(--primary-100);
      color: var(--primary-600);
      transform: translateX(5px);
    }
    
    .sidenav-link.active {
      color: var(--primary-600);
      background-color: var(--primary-100);
      font-weight: var(--font-medium);
    }
    
    .sidenav-link mat-icon {
      margin-right: var(--space-3);
      transition: transform var(--transition);
    }
    
    .sidenav-link:hover mat-icon {
      transform: scale(1.2);
    }
    
    .sidenav.collapsed .sidenav-link {
      justify-content: center;
      padding: var(--space-3) 0;
    }
    
    .sidenav.collapsed .sidenav-link mat-icon {
      margin-right: 0;
    }
    
    .sidenav-footer {
      padding: var(--space-4);
      border-top: 1px solid var(--border);
      margin-top: auto;
    }
    
    .sidenav-theme-toggle {
      display: flex;
      align-items: center;
      padding: var(--space-2) var(--space-3);
      cursor: pointer;
      color: var(--foreground);
      transition: all var(--transition);
      border-radius: var(--radius);
    }
    
    .sidenav-theme-toggle:hover {
      background-color: var(--primary-100);
      color: var(--primary-600);
    }
    
    .sidenav-theme-toggle mat-icon {
      margin-right: var(--space-2);
    }
    
    .sidenav.collapsed .sidenav-theme-toggle {
      justify-content: center;
    }
    
    .sidenav.collapsed .sidenav-theme-toggle mat-icon {
      margin-right: 0;
    }
    
    @media (max-width: 768px) {
      .sidenav {
        position: fixed;
        left: 0;
        top: 70px;
        bottom: 0;
        z-index: var(--z-40);
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }
      
      .sidenav.open {
        transform: translateX(0);
      }
    }
  `,
  ],
  animations: [fadeAnimation, slideInAnimation],
})
export class SidenavComponent {
  isCollapsed = false
  isAdmin = false
  isDarkTheme = false

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
  ) {
    this.authService.currentUser$.subscribe((user) => {
      this.isAdmin = user?.role === "admin"
    })

    this.themeService.theme$.subscribe((theme) => {
      this.isDarkTheme = theme === "dark"
    })
  }

  toggleSidenav(): void {
    this.isCollapsed = !this.isCollapsed
  }

  toggleTheme(): void {
    this.themeService.toggleTheme()
  }
}
