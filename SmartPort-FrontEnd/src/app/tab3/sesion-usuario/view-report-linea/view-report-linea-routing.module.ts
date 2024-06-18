import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewReportLineaPage } from './view-report-linea.page';

const routes: Routes = [
  {
    path: '',
    component: ViewReportLineaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewReportLineaPageRoutingModule {}
