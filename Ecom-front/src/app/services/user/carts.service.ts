import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartsService {
  private apiURl = environment.apiURL;

  constructor(private http: HttpClient) {}

  getCart(userId: string): Observable<any> {
    return this.http.get(`${this.apiURl}/cart/${userId}`);
  }
  
  addToCart(cartId: string, productId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.apiURl}/cart/${cartId}/add`,
      { product_id: productId, quantity: quantity});
  }

  updateQuantity(cartId: string, productId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.apiURl}/cart/${cartId}`,
      { product_id: productId, quantity: quantity});
  }

  deleteCart(userId: string): Observable<any> {
    return this.http.delete(`${this.apiURl}/cart/${userId}`);
  }
}
