import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ParadasLineasPageRoutingModule } from './paradas-lineas-routing.module';
import { ParadasLineasPage } from './paradas-lineas.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ParadasLineasPageRoutingModule
  ],
  declarations: [ParadasLineasPage]
})
export class ParadasLineasPageModule {}
