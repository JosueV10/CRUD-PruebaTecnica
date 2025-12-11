import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poliza } from '../models/poliza.model';
import { ApiResponse } from '../models/api-response.model';


export interface PolizaDTO {
  idEmpleado: number;
  sku: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class PolizaService {

  private apiUrl = 'http://localhost:8080/polizas';

  constructor(private http: HttpClient) {}

  getPolizas(): Observable<any> {
    
    return this.http.get<any>(this.apiUrl);
  }

  getPoliza(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  crearPoliza(dto: PolizaDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, dto);
  }

  actualizarPoliza(id: number, dto: PolizaDTO): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, dto);
  }

  eliminarPoliza(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
