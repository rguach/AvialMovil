import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Seg3Page } from './seg3.page';

const routes: Routes = [
  {
    path: '',
    component: Seg3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Seg3PageRoutingModule {}
