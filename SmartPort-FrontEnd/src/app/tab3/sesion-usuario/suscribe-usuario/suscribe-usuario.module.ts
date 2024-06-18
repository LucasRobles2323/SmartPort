import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuscribeUsuarioPageRoutingModule } from './suscribe-usuario-routing.module';

import { SuscribeUsuarioPage } from './suscribe-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuscribeUsuarioPageRoutingModule
  ],
  declarations: [SuscribeUsuarioPage]
})
export class SuscribeUsuarioPageModule {}
