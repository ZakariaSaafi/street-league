import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.currentUser$.pipe(map(user => !!user));
  redirectUrl: string | null = null;

  constructor(private http: HttpClient) {}

  initializeAuth(): Promise<boolean> {
    return new Promise((resolve) => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          this.currentUserSubject.next(user);
          // Verify token validity with backend
          this.verifyToken().subscribe({
            next: () => resolve(true),
            error: () => {
              this.logout();
              resolve(false);
            }
          });
        } catch (e) {
          this.logout();
          resolve(false);
        }
      } else {
        resolve(false);
      }
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ user: User, token: string }>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          this.setAuthData(response.user, response.token);
        })
      );
  }

  register(userData: Partial<User>): Observable<any> {
    return this.http.post<{ user: User, token: string }>(`${environment.apiUrl}/auth/register`, userData)
      .pipe(
        tap(response => {
          this.setAuthData(response.user, response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/users/profile`, userData)
      .pipe(
        tap(updatedUser => {
          const currentUser = this.currentUserSubject.value;
          if (currentUser) {
            const mergedUser = { ...currentUser, ...updatedUser };
            this.currentUserSubject.next(mergedUser);
            localStorage.setItem('currentUser', JSON.stringify(mergedUser));
          }
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private setAuthData(user: User, token: string): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.currentUserSubject.next(user);
  }

  private verifyToken(): Observable<boolean> {
    return this.http.get<{valid: boolean}>(`${environment.apiUrl}/auth/verify-token`)
      .pipe(
        map(response => response.valid),
        catchError(() => {
          // Token invalid
          return of(false);
        })
      );
  }
}