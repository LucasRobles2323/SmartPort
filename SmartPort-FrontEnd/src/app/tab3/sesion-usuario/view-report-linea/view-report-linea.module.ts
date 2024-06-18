import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewReportLineaPageRoutingModule } from './view-report-linea-routing.module';

import { ViewReportLineaPage } from './view-report-linea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewReportLineaPageRoutingModule
  ],
  declarations: [ViewReportLineaPage]
})
export class ViewReportLineaPageModule {}
