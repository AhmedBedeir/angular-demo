import { Injectable, inject, afterNextRender } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  private authUrl = 'http://localhost:3000';

  constructor() {
    afterNextRender(() => {
      const user = localStorage.getItem('user');
      if (user) {
        this.userSubject.next(JSON.parse(user));
        console.log(user);
      }
    });
  }

  register(user: User): Observable<User> {
    return this._httpClient.post<User>(`${this.authUrl}/register`, user);
  }

  login(email: string, password: string): Observable<User> {
    return this._httpClient
      .post<User>(`${this.authUrl}/login`, { email, password })
      .pipe(
        tap((user: User) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this._router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
}
