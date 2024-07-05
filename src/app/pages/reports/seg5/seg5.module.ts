import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreSegmentComponentModule } from '../explore-segments/explore-segments.module';
import { Seg5PageRoutingModule } from './seg5-routing.module';
import { Seg5Page } from './seg5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Seg5PageRoutingModule,
    ExploreSegmentComponentModule,
    ReactiveFormsModule
  ],
  declarations: [Seg5Page]
})
export class Seg5PageModule {}
