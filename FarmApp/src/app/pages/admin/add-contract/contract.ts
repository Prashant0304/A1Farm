import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractService {

  private baseUrl = 'https://localhost:7054/api'; // change if needed

  constructor(private http: HttpClient) {}

  getFarmers(search: string, pageNumber = 1, pageSize = 10) {
  return this.http.get(`${this.baseUrl}/farmer/search`, {
    params: {
      search,
      pageNumber,
      pageSize
    }
  });
}

  // ✅ Crops
  getCrops(lang = 'en', pageNumber = 1, pageSize = 50): Observable<any> {
    let params = new HttpParams()
      .set('lang', lang)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get(`${this.baseUrl}/crop`, { params });
  }

  // ✅ Lands by farmer
  getLandsByFarmerId(farmerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Contract/get-landid`, {
      params: { farmerId }
    });
  }

  // ✅ Save contract
  saveContract(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Contract/save-contract`, payload);
  }

  
}
