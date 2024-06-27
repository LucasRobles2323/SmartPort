import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarContrasenhaPageRoutingModule } from './editar-contrasenha-routing.module';
import { EditarContrasenhaPage } from './editar-contrasenha.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    EditarContrasenhaPageRoutingModule
  ],
  declarations: [EditarContrasenhaPage]
})
export class EditarContrasenhaPageModule {}
