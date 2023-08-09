import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { EnciclopediaPageRoutingModule } from './enciclopedia-routing.module';

import { EnciclopediaPage } from './enciclopedia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnciclopediaPageRoutingModule,
    RouterModule.forChild([{ path: '', component: EnciclopediaPage }])
  ],
  declarations: [EnciclopediaPage]
})
export class EnciclopediaPageModule {}

