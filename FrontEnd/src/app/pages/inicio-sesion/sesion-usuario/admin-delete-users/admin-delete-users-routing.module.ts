import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDeleteUsersPage } from './admin-delete-users.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDeleteUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDeleteUsersPageRoutingModule {}
