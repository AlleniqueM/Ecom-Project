import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

// src/app/models/product-search-result.ts
export interface ProductSearchResult {
  product_id: number;
  name: string;
  price: number;
  imageUrl?: string;  // Optional property
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURl = environment.apiURL;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiURl}/shop`);
  }

  getProductById(product_id: number): Observable<any> {
    return this.http.get(`${this.apiURl}/shop/products/${product_id}`);
  }

  searchProducts(searchTerm: string): Observable<ProductSearchResult[]> {
    return this.http.get<ProductSearchResult[]>(
      `${this.apiURl}/search?q=${encodeURIComponent(searchTerm)}`
    );
  }

}
