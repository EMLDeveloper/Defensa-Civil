import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SituacionesPageRoutingModule } from './situaciones-routing.module';

import { SituacionesPage } from './situaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SituacionesPageRoutingModule
  ],
  declarations: [SituacionesPage]
})
export class SituacionesPageModule {}
