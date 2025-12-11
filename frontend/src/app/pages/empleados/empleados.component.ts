import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleados.model';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];
  mensaje: string = '';

  formModel: Empleado = {
    idEmpleado: 0,
    nombre: '',
    apellido: '',
    puesto: ''
  };

  editMode = false;

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (resp) => {
        console.log('Respuesta Empleados:', resp);
        this.empleados = resp.Data.Resultado ?? [];
        this.mensaje = resp.Data.Mensaje.IDMensaje;
      },
      error: (err) => {
        console.error('Error al cargar empleados:', err);
        const msg = err.error?.Data?.Mensaje?.IDMensaje ?? 'Error al consultar empleados';
        alert(msg);
      }
    });
  }

  seleccionar(emp: Empleado): void {
    this.formModel = { ...emp };
    this.editMode = true;
  }

  limpiarFormulario(): void {
    this.formModel = {
      idEmpleado: 0,
      nombre: '',
      apellido: '',
      puesto: ''
    };
    this.editMode = false;
  }

  guardar(): void {
    if (!this.formModel.idEmpleado || !this.formModel.nombre) {
      alert('ID Empleado y Nombre son obligatorios');
      return;
    }

    if (this.editMode) {
      this.empleadoService.actualizarEmpleado(this.formModel.idEmpleado, this.formModel).subscribe({
        next: (resp) => {
          alert(resp.Data.Mensaje.IDMensaje || 'Empleado actualizado');
          this.cargarEmpleados();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al actualizar empleado:', err);
          const msg = err.error?.Data?.Mensaje?.IDMensaje ?? 'Error al actualizar empleado';
          alert(msg);
        }
      });
    } else {
      this.empleadoService.crearEmpleado(this.formModel).subscribe({
        next: (resp) => {
          alert(resp.Data.Mensaje.IDMensaje || 'Empleado creado');
          this.cargarEmpleados();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al crear empleado:', err);
          const msg = err.error?.Data?.Mensaje?.IDMensaje ?? 'Error al crear empleado';
          alert(msg);
        }
      });
    }
  }

  eliminar(emp: Empleado): void {
    if (!confirm(`¿Seguro que deseas eliminar al empleado ${emp.idEmpleado}?`)) {
      return;
    }

    this.empleadoService.eliminarEmpleado(emp.idEmpleado).subscribe({
      next: (resp) => {
        alert(resp?.Data?.Mensaje?.IDMensaje || 'Empleado eliminado');
        this.cargarEmpleados();
        if (this.formModel.idEmpleado === emp.idEmpleado) {
          this.limpiarFormulario();
        }
      },
      error: (err) => {
        console.error('Error al eliminar empleado:', err);

        // mismo parche opcional que en inventario
        if (err.status === 200 || err.status === 204) {
          alert('Empleado eliminado');
          this.cargarEmpleados();
          if (this.formModel.idEmpleado === emp.idEmpleado) {
            this.limpiarFormulario();
          }
          return;
        }

        const msg = err.error?.Data?.Mensaje?.IDMensaje ?? 'Error al eliminar empleado';
        alert(msg);
      }
    });
  }
}
