import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SegmentsPageRoutingModule } from './segments-routing.module';
import { ExploreSegmentComponentModule } from '../explore-segments/explore-segments.module';
import { SegmentsPage } from './segments.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SegmentsPageRoutingModule,
    ExploreSegmentComponentModule
  ],
  declarations: [SegmentsPage]
})
export class SegmentsPageModule {}
