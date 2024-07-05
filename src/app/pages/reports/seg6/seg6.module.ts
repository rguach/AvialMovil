import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ExploreSegmentComponentModule } from '../explore-segments/explore-segments.module';
import { Seg6PageRoutingModule } from './seg6-routing.module';

import { Seg6Page } from './seg6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Seg6PageRoutingModule,
    ExploreSegmentComponentModule,
    ReactiveFormsModule
  ],
  declarations: [Seg6Page]
})
export class Seg6PageModule {}
