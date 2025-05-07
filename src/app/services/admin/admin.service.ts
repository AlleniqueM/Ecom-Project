import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface User {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: boolean;
  created_at: string;
}
@Injectable({
  providedIn: 'root'
})

export class AdminService {
private apiURL = `${environment.apiURL}/admin`
  constructor(private http: HttpClient) { }

  getDashboard(): Observable<any> {
    return this.http.get(`${this.apiURL}/dashboard`);
  }

  // User Management
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL);
  }


  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/${userId}`)
  }

  updateUserRole(userId: number, role: boolean): Observable<{ message: string}> {
    return this.http.patch<{ message: string}>(`${this.apiURL}/${userId}/role`, {role})
  }

  deleteUser(userId: number): Observable<{message: string}> {
    return this.http.delete<{ message: string}>(`${this.apiURL}/${userId}`);
  }


}
