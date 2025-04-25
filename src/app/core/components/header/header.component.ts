import { Component, HostListener } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { MatMenuModule } from "@angular/material/menu"
import { MatBadgeModule } from "@angular/material/badge"
import { MatTooltipModule } from "@angular/material/tooltip"
import { AuthService } from "../../services/auth.service"
import { User } from "../../../shared/models/user.model"
import { NotificationService } from "../../services/notification.service"
import { ThemeService } from "../../services/theme.service"
import { fadeAnimation, bounceAnimation } from "../../../shared/animations/animations"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
  ],
  template: `
    <header class="header" [class.scrolled]="isScrolled">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/" class="logo-link">
              <div class="logo-icon" @bounceAnimation>
                <mat-icon>sports_basketball</mat-icon>
              </div>
              <span class="logo-text">Street League</span>
            </a>
          </div>
          
          <nav class="main-nav" [class.open]="isMobileMenuOpen">
            <ul class="nav-list">
              <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
              <li *ngIf="currentUser"><a routerLink="/teams" routerLinkActive="active">Teams</a></li>
              <li *ngIf="currentUser"><a routerLink="/schedule" routerLinkActive="active">Schedule</a></li>
              <li *ngIf="currentUser"><a routerLink="/tournaments" routerLinkActive="active">Tournaments</a></li>
              <li *ngIf="!currentUser"><a routerLink="/auth/login" routerLinkActive="active">Login</a></li>
              <li *ngIf="!currentUser"><a routerLink="/auth/register" class="btn btn-primary">Sign Up</a></li>
            </ul>
          </nav>
          
          <div class="header-actions">
            <button 
              mat-icon-button 
              matTooltip="Toggle theme"
              (click)="toggleTheme()"
              class="theme-toggle"
              aria-label="Toggle dark/light theme">
              <mat-icon>{{ isDarkTheme ? 'light_mode' : 'dark_mode' }}</mat-icon>
            </button>
            
            <ng-container *ngIf="currentUser">
              <button 
                mat-icon-button 
                [matBadge]="unreadMessages > 0 ? unreadMessages : null" 
                matBadgeColor="accent"
                routerLink="/messages"
                matTooltip="Messages"
                class="message-button"
                aria-label="Messages">
                <mat-icon>chat_bubble</mat-icon>
              </button>
              
              <button 
                mat-icon-button 
                [matBadge]="unreadNotifications > 0 ? unreadNotifications : null" 
                matBadgeColor="accent"
                [matMenuTriggerFor]="notificationsMenu"
                matTooltip="Notifications"
                class="notification-button"
                aria-label="Notifications">
                <mat-icon>notifications</mat-icon>
              </button>
              
              <button mat-button [matMenuTriggerFor]="userMenu" class="user-menu-button">
                <div class="user-avatar" *ngIf="currentUser.profileImage">
                  <img [src]="currentUser.profileImage" alt="Profile">
                </div>
                <div class="user-avatar" *ngIf="!currentUser.profileImage">
                  <span>{{ getInitials(currentUser) }}</span>
                </div>
                <span class="user-name">{{ currentUser.firstName }}</span>
                <mat-icon>arrow_drop_down</mat-icon>
              </button>
            </ng-container>
            
            <button class="mobile-menu-toggle" (click)="toggleMobileMenu()">
              <mat-icon>{{ isMobileMenuOpen ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>
          
          <mat-menu #userMenu="matMenu" xPosition="before" class="fun-menu">
            <div class="menu-header">
              <p>Hey there, {{ currentUser?.firstName }}! 👋</p>
            </div>
            <a mat-menu-item routerLink="/profile">
              <mat-icon>account_circle</mat-icon>
              <span>My Profile</span>
            </a>
            <a mat-menu-item routerLink="/teams/my-teams">
              <mat-icon>group</mat-icon>
              <span>My Teams</span>
            </a>
            <a mat-menu-item *ngIf="isAdmin" routerLink="/admin">
              <mat-icon>admin_panel_settings</mat-icon>
              <span>Admin Dashboard</span>
            </a>
            <button mat-menu-item (click)="logout()">
              <mat-icon>exit_to_app</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>
          
          <mat-menu #notificationsMenu="matMenu" xPosition="before" class="fun-menu">
            <div class="notifications-header">
              <h3>Notifications</h3>
              <button mat-button color="primary" *ngIf="hasUnreadNotifications" (click)="markAllAsRead()">
                Mark all as read
              </button>
            </div>
            <div class="notifications-list" *ngIf="notifications.length > 0">
              <a mat-menu-item *ngFor="let notification of notifications" [class.unread]="!notification.read" (click)="readNotification(notification)">
                <div class="notification-icon" [ngClass]="'notification-' + notification.type">
                  <mat-icon>{{ getNotificationIcon(notification.type).icon }}</mat-icon>
                </div>
                <div class="notification-content">
                  <p>{{ notification.message }}</p>
                  <small>{{ notification.createdAt | date:'short' }}</small>
                </div>
              </a>
            </div>
            <div class="notifications-empty" *ngIf="notifications.length === 0">
              <mat-icon class="empty-icon">notifications_off</mat-icon>
              <p>No notifications yet!</p>
              <p class="empty-subtitle">We'll let you know when something happens</p>
            </div>
            <div class="notifications-footer">
              <a mat-button color="primary" routerLink="/notifications">View all</a>
            </div>
          </mat-menu>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--z-50);
      background-color: var(--background);
      box-shadow: var(--shadow);
      transition: all 0.3s ease;
      padding: var(--space-2) 0;
    }
    
    .header.scrolled {
      box-shadow: var(--shadow-md);
    }
    
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }
    
    .logo-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: transform var(--transition);
    }
    
    .logo-link:hover {
      transform: scale(1.05);
    }
    
    .logo-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: var(--primary-500);
      border-radius: 50%;
      margin-right: var(--space-2);
    }
    
    .logo-icon mat-icon {
      color: white;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }
    
    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-500);
      background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .main-nav {
      display: flex;
    }
    
    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .nav-list li {
      margin: 0 var(--space-3);
    }
    
    .nav-list a {
      display: block;
      padding: var(--space-2) var(--space-1);
      text-decoration: none;
      color: var(--foreground);
      font-weight: 500;
      position: relative;
      transition: color 0.2s ease, transform 0.2s ease;
    }
    
    .nav-list a:hover {
      color: var(--primary-500);
      transform: translateY(-2px);
    }
    
    .nav-list a.active {
      color: var(--primary-500);
    }
    
    .nav-list a.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
      border-radius: var(--radius-full);
    }
    
    .header-actions {
      display: flex;
      align-items: center;
    }
    
    .theme-toggle {
      margin-right: var(--space-2);
      transition: transform var(--transition);
    }
    
    .theme-toggle:hover {
      transform: rotate(30deg);
    }
    
    .message-button, .notification-button {
      transition: transform var(--transition);
    }
    
    .message-button:hover, .notification-button:hover {
      transform: translateY(-2px);
    }
    
    .user-menu-button {
      display: flex;
      align-items: center;
      margin-left: var(--space-2);
      border-radius: var(--radius-full);
      padding: var(--space-1) var(--space-2);
      transition: background-color var(--transition);
    }
    
    .user-menu-button:hover {
      background-color: var(--primary-100);
    }
    
    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      overflow: hidden;
      background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      margin-right: var(--space-2);
      box-shadow: var(--shadow);
    }
    
    .user-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .user-name {
      margin-right: var(--space-1);
      font-weight: 500;
    }
    
    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      color: var(--foreground);
      margin-left: var(--space-2);
      cursor: pointer;
    }
    
    .menu-header {
      padding: var(--space-2) var(--space-4);
      border-bottom: 1px solid var(--border);
      color: var(--primary-500);
      font-weight: 500;
    }
    
    .notifications-header,
    .notifications-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-2) var(--space-4);
      border-bottom: 1px solid var(--border);
    }
    
    .notifications-footer {
      border-top: 1px solid var(--border);
      border-bottom: none;
    }
    
    .notifications-empty {
      padding: var(--space-6) var(--space-4);
      text-align: center;
      color: var(--muted-foreground);
    }
    
    .empty-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: var(--space-2);
      opacity: 0.5;
    }
    
    .empty-subtitle {
      font-size: 0.875rem;
      opacity: 0.7;
    }
    
    .notification-content {
      display: flex;
      flex-direction: column;
    }
    
    .notification-content p {
      margin: 0;
      margin-bottom: var(--space-1);
    }
    
    .notification-content small {
      color: var(--muted-foreground);
    }
    
    .notification-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: var(--space-2);
    }
    
    .notification-success {
      background-color: var(--success-100);
      color: var(--success-700);
    }
    
    .notification-warning {
      background-color: var(--warning-100);
      color: var(--warning-700);
    }
    
    .notification-error {
      background-color: var(--error-100);
      color: var(--error-700);
    }
    
    .notification-info {
      background-color: var(--primary-100);
      color: var(--primary-700);
    }
    
    .notifications-list a.unread {
      background-color: var(--primary-50);
      position: relative;
    }
    
    .notifications-list a.unread::before {
      content: '';
      position: absolute;
      top: 50%;
      right: var(--space-4);
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--primary-500);
    }
    
    @media (max-width: 768px) {
      .main-nav {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background-color: var(--background);
        box-shadow: var(--shadow);
        padding: var(--space-4);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: var(--z-40);
      }
      
      .main-nav.open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
      
      .nav-list {
        flex-direction: column;
      }
      
      .nav-list li {
        margin: var(--space-2) 0;
      }
      
      .mobile-menu-toggle {
        display: block;
      }
      
      .user-name {
        display: none;
      }
    }
  `,
  ],
  animations: [fadeAnimation, bounceAnimation],
})
export class HeaderComponent {
  currentUser: User | null = null
  isAdmin = false
  isMobileMenuOpen = false
  isScrolled = false
  isDarkTheme = false

  // Mock data for demo
  unreadMessages = 3
  unreadNotifications = 5
  notifications = [
    { id: 1, message: "Your team match has been scheduled", type: "info", read: false, createdAt: new Date() },
    { id: 2, message: "New tournament available to join", type: "success", read: false, createdAt: new Date() },
    { id: 3, message: "Player request to join your team", type: "warning", read: true, createdAt: new Date() },
  ]

  hasUnreadNotifications = true

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private themeService: ThemeService,
  ) {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user
      this.isAdmin = user?.role === "admin"
    })

    this.themeService.theme$.subscribe((theme) => {
      this.isDarkTheme = theme === "dark"
    })
  }

  @HostListener("window:scroll")
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  toggleTheme(): void {
    this.themeService.toggleTheme()
  }

  logout(): void {
    this.authService.logout()
    this.notificationService.showSuccess("Welcome back to Street League! 🏀")
  }

  getInitials(user: User): string {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
  }

  getNotificationIcon(type: string): { icon: string; color: string } {
    switch (type) {
      case "success":
        return { icon: "check_circle", color: "primary" }
      case "warning":
        return { icon: "warning", color: "warn" }
      case "error":
        return { icon: "error", color: "warn" }
      case "info":
      default:
        return { icon: "info", color: "primary" }
    }
  }

  markAllAsRead(): void {
    // Implementation would go here
    this.notifications.forEach((notification) => (notification.read = true))
    this.hasUnreadNotifications = false
    this.unreadNotifications = 0
    this.notificationService.showSuccess("All notifications marked as read! 🎉")
  }

  readNotification(notification: any): void {
    // Implementation would go here
    notification.read = true
    this.unreadNotifications = this.notifications.filter((n) => !n.read).length
    this.hasUnreadNotifications = this.unreadNotifications > 0
  }
}
