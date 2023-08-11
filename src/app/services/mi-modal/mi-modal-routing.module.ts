import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiModalPage } from './mi-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MiModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiModalPageRoutingModule {}
