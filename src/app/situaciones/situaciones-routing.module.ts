import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SituacionesPage } from './situaciones.page';

const routes: Routes = [
  {
    path: '',
    component: SituacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SituacionesPageRoutingModule {}
