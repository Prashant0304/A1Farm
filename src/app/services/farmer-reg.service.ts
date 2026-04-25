import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FarmerRegService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFarmers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/farmers`);
  }

  addFarmer(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/farmer`, data);
  }

  getStates() {
    return this.http.get<any[]>(`${this.baseUrl}/Master/states`);
  }
  getDistricts(StateId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/Master/districts/${StateId}`);
  }

  verifyOtp(data: any) {
    return this.http.post(`${this.baseUrl}/verifyOtp`, data);
  }
}
