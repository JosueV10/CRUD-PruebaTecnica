import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { PolizasComponent } from './pages/polizas/polizas.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'inventarios', component: InventariosComponent },
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'polizas', component: PolizasComponent },
      { path: '', redirectTo: 'inventarios', pathMatch: 'full' }
    ]
  }
];
