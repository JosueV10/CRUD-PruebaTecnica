import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleados.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiUrl = 'http://localhost:8080/empleados';

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<ApiResponse<Empleado[]>> {
    return this.http.get<ApiResponse<Empleado[]>>(this.apiUrl);
  }

  getEmpleado(id: number): Observable<ApiResponse<Empleado>> {
    return this.http.get<ApiResponse<Empleado>>(`${this.apiUrl}/${id}`);
  }

  crearEmpleado(emp: Empleado): Observable<ApiResponse<Empleado>> {
    return this.http.post<ApiResponse<Empleado>>(this.apiUrl, emp);
  }

  actualizarEmpleado(id: number, emp: Empleado): Observable<ApiResponse<Empleado>> {
    return this.http.put<ApiResponse<Empleado>>(`${this.apiUrl}/${id}`, emp);
  }

  eliminarEmpleado(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
  }
}
