import { Empleado } from './empleados.model';
import { Inventario } from './inventario.model';

export interface Poliza {
  idPolizas: number;
  empleadoGenero: Empleado;   // objeto completo
  articulo: Inventario;       // objeto completo (inventario)
  cantidad: number;
  fecha: string;
}

