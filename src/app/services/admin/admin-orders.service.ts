// Updated AdminOrdersService with auth handling
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {
  private apiURL = `${environment.apiURL}/admin`;

  constructor(private http: HttpClient) { }


  getAllOrders(): Observable<any> {
    return this.http.get(`${this.apiURL}/get-orders`);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get(`${this.apiURL}/order/${orderId}`)}

  cancelOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/order/${orderId}/remove-order`)
  }
}

