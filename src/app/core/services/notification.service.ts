import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$: Observable<Notification[]> = this.notificationsSubject.asObservable();
  private idCounter = 0;

  showSuccess(message: string, duration = 5000): void {
    this.addNotification({
      id: this.getNextId(),
      message,
      type: 'success',
      duration
    });
  }

  showError(message: string, duration = 5000): void {
    this.addNotification({
      id: this.getNextId(),
      message,
      type: 'error',
      duration
    });
  }

  showWarning(message: string, duration = 5000): void {
    this.addNotification({
      id: this.getNextId(),
      message,
      type: 'warning',
      duration
    });
  }

  showInfo(message: string, duration = 5000): void {
    this.addNotification({
      id: this.getNextId(),
      message,
      type: 'info',
      duration
    });
  }

  removeNotification(id: number): void {
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next(current.filter(notification => notification.id !== id));
  }

  private addNotification(notification: Notification): void {
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([...current, notification]);
    
    if (notification.duration) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, notification.duration);
    }
  }

  private getNextId(): number {
    return ++this.idCounter;
  }
}