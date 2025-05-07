import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  template: ` <app-navbar></app-navbar>
  <router-outlet></router-outlet>`,
  imports: [RouterOutlet, NavbarComponent]

})
export class AppComponent {
  title = "EcomFrontend"
  constructor(private auth: AuthService, private router: Router){
    this.auth.currentUser$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        this.router.navigate([user.role ? '/admin' : '/home']);
      }
    });

}
}
