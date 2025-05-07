import { Component } from '@angular/core';
import { AdminProductsService } from '../services/admin/admin-products.service';
import { AuthService } from '../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

interface User {
 first_name: string;
}

// Then in component:
currentUser$: Observable<User | null>;
@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentUser$: Observable<{first_name: string} | null>

  constructor(private productsService: AdminProductsService, private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
   }

  logout(){
    this.authService.logout().subscribe({ next: () => {
      console.log('Logout successful');
    }, error: (err) => {
      console.error('Logout failed: ', err)
    }})
  }
}
