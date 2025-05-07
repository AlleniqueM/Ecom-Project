import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminProductsService {
private apiURL = `${environment.apiURL}/admin`
  constructor(private http: HttpClient) { }
// See all products in database
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiURL}/products`);
  }
  // create product
  createProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiURL}/add-products`, productData);
  }

  updateProduct(product_id: number, productData: any): Observable<any> {
    return this.http.put(`${this.apiURL}/update-product/${product_id}`, productData);
  }

  deleteProduct(product_id: number) {
    return this.http.delete<void>(`${this.apiURL}/remove-products/${product_id}`);
  }



}
