import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { VerReportePageRoutingModule } from './ver-reporte-routing.module';

import { VerReportePage } from './ver-reporte.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    VerReportePageRoutingModule
  ],
  declarations: [VerReportePage]
})
export class VerReportePageModule {}
