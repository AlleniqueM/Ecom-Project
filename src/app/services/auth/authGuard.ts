import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { catchError, Observable, map, of } from "rxjs";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const adminRoutes = ['dashboard', 'admin']

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['home']);
      return false;
    }

    if (route.data['requiresAdmin']) {
      return this.checkAdmin();
    }
    return true;
  }

  private checkAdmin(): Observable<boolean> {
    if (!this.auth.isAdmin()) {
      this.handleAccessDenied();
      return of(false);
    }

    return this.auth.verifyAdmin().pipe(
      map(isValid => isValid || this.handleAccessDenied()),
      catchError(() => of(this.handleAccessDenied()))
    );
  }

  private handleAccessDenied(): false {
    this.router.navigate(['/access-denied'], {
      state: { message: 'Access denied. Admin role required.'}
    });
    return false;
  }

}

