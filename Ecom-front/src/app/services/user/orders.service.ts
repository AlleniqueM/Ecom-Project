import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiURl = environment.apiURL;

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.apiURl}/order`);
  }
  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiURl}/order/new-order`, orderData);
  }
  getOrderById(orderId: string): Observable<any> {
    return this.http.get(`${this.apiURl}/order/${orderId}/find-order`);
  }
  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiURl}/order/${orderId}/order-update`, {orderStatus: status});
  }
  cancelOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.apiURl}/order/${orderId}/remove-order`);
  }

}
