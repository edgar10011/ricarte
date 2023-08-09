import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnciclopediaPage } from './enciclopedia.page';

const routes: Routes = [
  {
    path: '',
    component: EnciclopediaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnciclopediaPageRoutingModule {}
