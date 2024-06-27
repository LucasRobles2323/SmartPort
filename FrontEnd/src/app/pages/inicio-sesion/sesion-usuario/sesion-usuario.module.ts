import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SesionUsuarioPageRoutingModule } from './sesion-usuario-routing.module';
import { SesionUsuarioPage } from './sesion-usuario.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SesionUsuarioPageRoutingModule
  ],
  declarations: [SesionUsuarioPage]
})
export class SesionUsuarioPageModule {}
