import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PolizaService, PolizaDTO } from '../../services/poliza.service';
import { EmpleadoService } from '../../services/empleado.service';
import { InventarioService } from '../../services/inventario.service';

import { Poliza } from '../../models/poliza.model';
import { Empleado } from '../../models/empleados.model';
import { Inventario } from '../../models/inventario.model';

// Modelo solo para el formulario
interface PolizaForm {
  idPolizas: number;
  empleadoGenero: number; // idEmpleado
  sku: number;            // SKU numérico
  cantidad: number;
  fecha: string;
}

@Component({
  selector: 'app-polizas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './polizas.component.html',
  styleUrls: ['./polizas.component.css']
})
export class PolizasComponent implements OnInit {

  polizas: Poliza[] = [];
  empleados: Empleado[] = [];
  inventario: Inventario[] = [];

  mensaje: string = '';

  formModel: PolizaForm = {
    idPolizas: 0,
    empleadoGenero: 0,
    sku: 0,
    cantidad: 0,
    fecha: ''
  };

  editMode: boolean = false;

  constructor(
    private polizaService: PolizaService,
    private empleadoService: EmpleadoService,
    private inventarioService: InventarioService
  ) {}

  ngOnInit(): void {
    this.cargarCatalogos();
    this.cargarPolizas();
  }

  // Cargar empleados e inventario para los combos
  cargarCatalogos(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (resp) => {
        this.empleados = resp.Data.Resultado ?? [];
      },
      error: (err) => {
        console.error('Error al cargar empleados (pólizas):', err);
      }
    });

    this.inventarioService.getInventario().subscribe({
      next: (resp) => {
        this.inventario = resp.Data.Resultado ?? [];
      },
      error: (err) => {
        console.error('Error al cargar inventario (pólizas):', err);
      }
    });
  }

  // Cargar pólizas
  cargarPolizas(): void {
    this.polizaService.getPolizas().subscribe({
      next: (resp: any) => {
        console.log('Respuesta Polizas:', resp);

        // Soportar tanto formato {Meta,Data,Resultado} como arreglo plano
        const posibleResultado = resp?.Data?.Resultado ?? resp;
        this.polizas = Array.isArray(posibleResultado) ? posibleResultado : [];

        this.mensaje = resp?.Data?.Mensaje?.IDMensaje ?? '';
      },
      error: (err) => {
        console.error('Error al cargar pólizas:', err);
        const msg = err.error?.Data?.Mensaje?.IDMensaje ?? 'Error al consultar pólizas';
        alert(msg);
      }
    });
  }

  // Al seleccionar una póliza de la tabla para editar
  seleccionar(p: Poliza): void {
    this.formModel = {
      idPolizas: p.idPolizas,
      empleadoGenero: p.empleadoGenero?.idEmpleado,
      sku: Number(p.articulo?.SKU),
      cantidad: p.cantidad,
      fecha: p.fecha
    };
    this.editMode = true;
  }

  limpiarFormulario(): void {
    this.formModel = {
      idPolizas: 0,
      empleadoGenero: 0,
      sku: 0,
      cantidad: 0,
      fecha: ''
    };
    this.editMode = false;
  }

  guardar(): void {
    if (!this.formModel.empleadoGenero || !this.formModel.sku || !this.formModel.cantidad) {
      alert('Empleado, SKU y cantidad son obligatorios');
      return;
    }

    // DTO exactamente como lo espera el backend
    const dto: PolizaDTO = {
      idEmpleado: this.formModel.empleadoGenero,
      sku: Number(this.formModel.sku),
      cantidad: this.formModel.cantidad
    };

    if (this.editMode) {
      this.polizaService.actualizarPoliza(this.formModel.idPolizas, dto).subscribe({
        next: () => {
          alert('Póliza actualizada correctamente');
          this.cargarPolizas();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al actualizar póliza:', err);
          const msg = err.error?.Data?.Mensaje?.IDMensaje ?? 'Error al actualizar póliza';
          alert(msg);
        }
      });
    } else {
      this.polizaService.crearPoliza(dto).subscribe({
        next: () => {
          alert('Póliza creada correctamente');
          this.cargarPolizas();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al crear póliza:', err);
          const msg = err.error?.Data?.Mensaje?.IDMensaje ?? 'Error al crear póliza';
          alert(msg);
        }
      });
    }
  }

  eliminar(p: Poliza): void {
    if (!confirm(`¿Seguro que deseas eliminar la póliza ${p.idPolizas}?`)) {
      return;
    }

    this.polizaService.eliminarPoliza(p.idPolizas).subscribe({
      next: (resp: any) => {
        alert(resp?.Data?.Mensaje?.IDMensaje || 'Póliza eliminada');
        this.cargarPolizas();
        if (this.formModel.idPolizas === p.idPolizas) {
          this.limpiarFormulario();
        }
      },
      error: (err) => {
        console.error('Error al eliminar póliza:', err);

        // Parche por si el backend devuelve 200/204 sin cuerpo
        if (err.status === 200 || err.status === 204) {
          alert('Póliza eliminada');
          this.cargarPolizas();
          if (this.formModel.idPolizas === p.idPolizas) {
            this.limpiarFormulario();
          }
          return;
        }

        const msg = err.error?.Data?.Mensaje?.IDMensaje ?? 'Error al eliminar póliza';
        alert(msg);
      }
    });
  }
}
