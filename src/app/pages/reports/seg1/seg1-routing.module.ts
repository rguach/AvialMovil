import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Seg1Page } from './seg1.page';

const routes: Routes = [
  {
    path: '',
    component: Seg1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Seg1PageRoutingModule {}
