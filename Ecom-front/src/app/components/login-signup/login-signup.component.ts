import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RedirectCommand, Router  } from '@angular/router';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login-signup',
  imports: [ CommonModule, FormsModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent {
  isVisible = true;
  isLoginMode = true;
  // Login form data
  loginData = {
    email: '',
    password: ''
  };
  // Signup form data
  signupData = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  };

// Show/hide
open(){
  this.isVisible = true;
}


close(){
  this.isVisible = false;
  this.isLoginMode = false;
}



  constructor(public authService: AuthService, public router : Router, private userService: UserService
  ) {


  }
  onLogin() {
      this.authService.login(this.loginData.email, this.loginData.password).subscribe({
        next: (res) => {
          const redirectUrl = res.user.role ? '/admin' : '/profile';
          console.log("Role:  ", res.user.role)
          this.router.navigate([(redirectUrl)]);
            this.close();
            localStorage.setItem('auth_token', res.token); // Ensure no extra quotes
console.log('Token stored:', localStorage.getItem('auth_token'));
        },
        error: (err) => {
          console.error('Login failed' , err);
        }
      });

  }


  onSignup() {
    this.userService.signup(this.signupData).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
      },
      error: (err) => {
        console.error('Signup failed', err);
      }
    });
  }

  Admin() {
    this.authService.isAdmin()
  }
}
