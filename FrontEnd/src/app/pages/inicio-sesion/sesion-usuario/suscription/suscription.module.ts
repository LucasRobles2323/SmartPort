import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuscriptionPageRoutingModule } from './suscription-routing.module';

import { SuscriptionPage } from './suscription.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SuscriptionPageRoutingModule
  ],
  declarations: [SuscriptionPage]
})
export class SuscriptionPageModule {}
