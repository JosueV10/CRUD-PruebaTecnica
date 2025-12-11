import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventario } from '../models/inventario.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  
  private apiUrl = 'http://localhost:8080/inventario';

  constructor(private http: HttpClient) {}

  
  getInventario(): Observable<ApiResponse<Inventario[]>> {
    return this.http.get<ApiResponse<Inventario[]>>(this.apiUrl);
  }

  getProducto(sku: string): Observable<ApiResponse<Inventario>> {
    return this.http.get<ApiResponse<Inventario>>(`${this.apiUrl}/${sku}`);
  }

  crearProducto(producto: Inventario): Observable<ApiResponse<Inventario>> {
    return this.http.post<ApiResponse<Inventario>>(this.apiUrl, producto);
  }

  actualizarProducto(sku: string, producto: Inventario): Observable<ApiResponse<Inventario>> {
    return this.http.put<ApiResponse<Inventario>>(`${this.apiUrl}/${sku}`, producto);
  }

  eliminarProducto(sku: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${sku}`);
  }

}
