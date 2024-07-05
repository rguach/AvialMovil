import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SegmentsPage } from './segments.page';

const routes: Routes = [
  {
    path: 'segments',
    component: SegmentsPage,
    children: [
      {
        path: 'seg1',
        loadChildren: () => import('../seg1/seg1.module').then( m => m.Seg1PageModule)
      },
      {
        path: 'seg2',
        loadChildren: () => import('../seg2/seg2.module').then( m => m.Seg2PageModule)
      },
      {
        path: 'seg3',
        loadChildren: () => import('../seg3/seg3.module').then( m => m.Seg3PageModule)
      },
      {
        path: 'seg4',
        loadChildren: () => import('../seg4/seg4.module').then( m => m.Seg4PageModule)
      },
      {
        path: 'seg5',
        loadChildren: () => import('../seg5/seg5.module').then( m => m.Seg5PageModule)
      },
      {
        path: 'seg6',
        loadChildren: () => import('../seg6/seg6.module').then( m => m.Seg6PageModule)
      },
      {
        path: '',
        redirectTo: '/segments/seg1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/segments/seg1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SegmentsPageRoutingModule {}
