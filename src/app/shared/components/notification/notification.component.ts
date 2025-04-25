import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { NotificationService, Notification } from "../../../core/services/notification.service"
import { trigger, transition, style, animate } from "@angular/animations"

@Component({
  selector: "app-notification",
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="notifications-container">
      <div 
        *ngFor="let notification of notifications" 
        class="notification" 
        [ngClass]="'notification-' + notification.type"
        [@notificationAnimation]>
        <div class="notification-content">
          <div class="notification-icon">
            <mat-icon>{{ getNotificationIcon(notification.type) }}</mat-icon>
          </div>
          <div class="notification-text">
            <span>{{ notification.message }}</span>
          </div>
        </div>
        <button class="notification-close" (click)="closeNotification(notification.id)">
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
    .notifications-container {
      position: fixed;
      top: 90px;
      right: 20px;
      z-index: var(--z-50);
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      max-width: 350px;
    }
    
    .notification {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-3) var(--space-4);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      background-color: var(--card);
      border-left: 4px solid;
      overflow: hidden;
      position: relative;
    }
    
    .notification::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, currentColor, transparent);
      opacity: 0.5;
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    
    .notification-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    
    .notification-text {
      font-weight: var(--font-medium);
    }
    
    .notification-success {
      border-left-color: var(--success-500);
      color: var(--success-500);
    }
    
    .notification-success .notification-icon {
      background-color: var(--success-100);
      color: var(--success-700);
    }
    
    .notification-error {
      border-left-color: var(--error-500);
      color: var(--error-500);
    }
    
    .notification-error .notification-icon {
      background-color: var(--error-100);
      color: var(--error-700);
    }
    
    .notification-warning {
      border-left-color: var(--warning-500);
      color: var(--warning-500);
    }
    
    .notification-warning .notification-icon {
      background-color: var(--warning-100);
      color: var(--warning-700);
    }
    
    .notification-info {
      border-left-color: var(--primary-500);
      color: var(--primary-500);
    }
    
    .notification-info .notification-icon {
      background-color: var(--primary-100);
      color: var(--primary-700);
    }
    
    .notification-close {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--muted-foreground);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color var(--transition), transform var(--transition);
      border-radius: 50%;
      width: 30px;
      height: 30px;
    }
    
    .notification-close:hover {
      color: var(--foreground);
      background-color: var(--muted);
      transform: rotate(90deg);
    }
    
    @media (max-width: 576px) {
      .notifications-container {
        left: 20px;
        right: 20px;
      }
    }
  `,
  ],
  animations: [
    trigger("notificationAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(100%) scale(0.8)" }),
        animate("300ms cubic-bezier(0.4, 0, 0.2, 1)", style({ opacity: 1, transform: "translateX(0) scale(1)" })),
      ]),
      transition(":leave", [
        animate("200ms cubic-bezier(0.4, 0, 0.2, 1)", style({ opacity: 0, transform: "translateX(100%) scale(0.8)" })),
      ]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = []

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications
    })
  }

  closeNotification(id: number): void {
    this.notificationService.removeNotification(id)
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case "success":
        return "check_circle"
      case "error":
        return "error"
      case "warning":
        return "warning"
      case "info":
      default:
        return "info"
    }
  }
}
