import { Component, OnInit} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent {
  constructor(private http: HttpClient, private userService : UserService, private authService: AuthService, private router: Router) {
    console.log('Profile Component rendered');
  }

  onLogout() {
    return this.authService.logout().subscribe();
  }

}

