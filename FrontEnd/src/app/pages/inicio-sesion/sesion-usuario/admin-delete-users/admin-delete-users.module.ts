import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDeleteUsersPageRoutingModule } from './admin-delete-users-routing.module';

import { AdminDeleteUsersPage } from './admin-delete-users.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AdminDeleteUsersPageRoutingModule
  ],
  declarations: [AdminDeleteUsersPage]
})
export class AdminDeleteUsersPageModule {}
