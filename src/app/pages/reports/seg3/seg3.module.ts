import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExploreSegmentComponentModule } from '../explore-segments/explore-segments.module';
import { IonicModule } from '@ionic/angular';
import { Seg3PageRoutingModule } from './seg3-routing.module';
import { Seg3Page } from './seg3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Seg3PageRoutingModule,
    ExploreSegmentComponentModule,
    ReactiveFormsModule
  ],
  declarations: [Seg3Page]
})
export class Seg3PageModule {}
