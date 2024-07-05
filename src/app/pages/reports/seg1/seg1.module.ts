import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { ExploreSegmentComponentModule } from '../explore-segments/explore-segments.module';
import { Seg1PageRoutingModule } from './seg1-routing.module';
import { Seg1Page } from './seg1.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Seg1PageRoutingModule,
    ExploreSegmentComponentModule
  ],
  declarations: [Seg1Page]
})
export class Seg1PageModule {}
