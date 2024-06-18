import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuscribeUsuarioPage } from './suscribe-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: SuscribeUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuscribeUsuarioPageRoutingModule {}
