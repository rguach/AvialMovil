import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Seg6Page } from './seg6.page';

const routes: Routes = [
  {
    path: '',
    component: Seg6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Seg6PageRoutingModule {}
