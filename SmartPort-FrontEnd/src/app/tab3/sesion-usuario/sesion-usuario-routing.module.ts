import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SesionUsuarioPage } from './sesion-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: SesionUsuarioPage
  },  {
    path: 'suscribe-usuario',
    loadChildren: () => import('./suscribe-usuario/suscribe-usuario.module').then( m => m.SuscribeUsuarioPageModule)
  },
  {
    path: 'view-report-linea',
    loadChildren: () => import('./view-report-linea/view-report-linea.module').then( m => m.ViewReportLineaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SesionUsuarioPageRoutingModule {}
