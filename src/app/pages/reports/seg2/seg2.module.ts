import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreSegmentComponentModule } from '../explore-segments/explore-segments.module';
import { Seg2PageRoutingModule } from './seg2-routing.module';


import { Seg2Page } from './seg2.page';
import { AddOptionalModalModule } from './add-optional-modal/add-optional-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Seg2PageRoutingModule,
    ExploreSegmentComponentModule,
    AddOptionalModalModule,
    ReactiveFormsModule
  ],
  declarations: [Seg2Page]
})
export class Seg2PageModule {}
