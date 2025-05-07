import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
interface Address {
  user_id: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  addAddress(addressData: Address): Observable<any> {
    return this.http.post(`${this.apiURL}/address/add`, addressData);
  }

  updateAddress(addressId: string, updateData: Partial<Address>): Observable<any> {
    return this.http.put(`${this.apiURL}/address/${addressId}/update`, {
      address_id: addressId,
      ...updateData
    });
  }
  removeAddress(userId: string, addressId: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/address/${addressId}/remove`, {
      body: { user_id: userId, address_id: addressId }
    });
  }

}
