import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventarioService } from '../../services/inventario.service';
import { Inventario } from '../../models/inventario.model';

@Component({
  selector: 'app-inventarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent implements OnInit {

  inventario: Inventario[] = [];
  mensaje: string = '';

  // Modelo del formulario
  formModel: Inventario = {
    SKU: '',
    nombre: '',
    cantidad: 0
  };

  editMode: boolean = false; // false = creando, true = editando

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario(): void {
    this.inventarioService.getInventario().subscribe({
      next: (resp) => {
        console.log('Respuesta Inventario:', resp);
        this.inventario = resp.Data.Resultado || [];
        this.mensaje = resp.Data.Mensaje.IDMensaje;
      },
      error: (err) => {
        console.error('Error al cargar inventario:', err);
        const msg = err.error?.Data?.Mensaje?.IDMensaje ?? 'Error al consultar inventario';
        alert(msg);
      }
    });
  }

  seleccionar(item: Inventario): void {
    // Copiamos el item al formulario
    this.formModel = { ...item };
    this.editMode = true;
  }

  limpiarFormulario(): void {
    this.formModel = {
      SKU: '',
      nombre: '',
      cantidad: 0
    };
    this.editMode = false;
  }

  guardar(): void {
    if (!this.formModel.SKU || !this.formModel.nombre) {
      alert('SKU y Nombre son obligatorios');
      return;
    }

    if (this.editMode) {
      // Actualizar
      this.inventarioService.actualizarProducto(
        String(this.formModel.SKU),
        this.formModel
      ).subscribe({
        next: (resp) => {
          alert(resp.Data.Mensaje.IDMensaje || 'Actualizado correctamente');
          this.cargarInventario();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          const msg = err.error?.Data?.Mensaje?.IDMensaje ?? 'Error al actualizar';
          alert(msg);
        }
      });
    } else {
      // Crear
      this.inventarioService.crearProducto(this.formModel).subscribe({
        next: (resp) => {
          alert(resp.Data.Mensaje.IDMensaje || 'Creado correctamente');
          this.cargarInventario();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          const msg = err.error?.Data?.Mensaje?.IDMensaje ?? 'Error al crear';
          alert(msg);
        }
      });
    }
  }

  eliminar(item: Inventario): void {
    if (!confirm(`¿Seguro que deseas eliminar el SKU ${item.SKU}?`)) {
      return;
    }

    this.inventarioService.eliminarProducto(String(item.SKU)).subscribe({
      next: (resp) => {
        alert(resp.Data.Mensaje.IDMensaje || 'Eliminado correctamente');
        this.cargarInventario();
        if (this.formModel.SKU === item.SKU) {
          this.limpiarFormulario();
        }
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        const msg = err.error?.Data?.Mensaje?.IDMensaje ?? 'Error al eliminar';
        alert(msg);
      }
    });
  }
}
