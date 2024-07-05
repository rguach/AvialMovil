import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Seg4Page } from './seg4.page';

const routes: Routes = [
  {
    path: '',
    component: Seg4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Seg4PageRoutingModule {}
