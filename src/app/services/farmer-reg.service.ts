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

  // Get all farmers
  getFarmers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/farmers`);
  }

  // Register farmer
  addFarmer(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/farmer`, data);
  }
}
