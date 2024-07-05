import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Seg2Page } from './seg2.page';

const routes: Routes = [
  {
    path: '',
    component: Seg2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Seg2PageRoutingModule {}
