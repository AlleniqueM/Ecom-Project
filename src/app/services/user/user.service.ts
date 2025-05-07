import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  home (): Observable<any> {
    return this.http.get(`${this.apiUrl}/home`);
  }
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
    
  }


  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);

  }

  logout(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, user);

  }
}
