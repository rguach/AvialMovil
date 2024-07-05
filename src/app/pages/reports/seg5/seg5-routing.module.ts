import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Seg5Page } from './seg5.page';

const routes: Routes = [
  {
    path: '',
    component: Seg5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Seg5PageRoutingModule {}
