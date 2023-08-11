import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiModalPageRoutingModule } from './mi-modal-routing.module';

import { MiModalPage } from './mi-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiModalPageRoutingModule
  ],
  declarations: [MiModalPage]
})
export class MiModalPageModule {}
