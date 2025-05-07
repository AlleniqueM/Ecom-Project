import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = environment.apiURL;
  private currentUser = new BehaviorSubject<any>(this.getUserData());

  public currentUser$ = this.currentUser.asObservable();

  constructor( private http: HttpClient, private router: Router) {
    this.initializeAuthState();
  }

  private getUserData(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private initializeAuthState(){
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUser.next(JSON.parse(userData));
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiURL}/login`, { email, password}).pipe(
      tap((res: any) => {
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.currentUser.next(res.user);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiURL}/logout`, {}).pipe(
      tap(() => {
        this.clearAuthData();
        this.router.navigate(['home'])
      })
    )
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser.value;
  }

  isAdmin(): boolean {
    const user = this.currentUser.value;
    return !!(user && user.role);
  }

  verifyAdmin(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/admin`)
  }

}

