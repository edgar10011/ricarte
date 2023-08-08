import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlantasPageRoutingModule } from './plantas-routing.module';

import { PlantasPage } from './plantas.page';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    PlantasPageRoutingModule
  ],
  declarations: [PlantasPage]
})
export class PlantasPageModule {}
