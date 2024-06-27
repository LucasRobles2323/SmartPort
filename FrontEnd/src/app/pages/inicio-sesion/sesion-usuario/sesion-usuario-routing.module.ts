import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SesionUsuarioPage } from './sesion-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: SesionUsuarioPage
  },  {
    path: 'editar-usuario',
    loadChildren: () => import('./editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule)
  },
  {
    path: 'editar-contrasenha',
    loadChildren: () => import('./editar-contrasenha/editar-contrasenha.module').then( m => m.EditarContrasenhaPageModule)
  },
  {
    path: 'admin-delete-users',
    loadChildren: () => import('./admin-delete-users/admin-delete-users.module').then( m => m.AdminDeleteUsersPageModule)
  },
  {
    path: 'ver-reporte',
    loadChildren: () => import('./ver-reporte/ver-reporte.module').then( m => m.VerReportePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SesionUsuarioPageRoutingModule {}
