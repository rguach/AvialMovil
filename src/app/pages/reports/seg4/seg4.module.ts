import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreSegmentComponentModule } from '../explore-segments/explore-segments.module';
import { Seg4PageRoutingModule } from './seg4-routing.module';
import { Seg4Page } from './seg4.page';
import { ModalDanosComponentModule } from './modal-danos/modal-danos.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Seg4PageRoutingModule,
    ExploreSegmentComponentModule,
    ModalDanosComponentModule
  ],
  declarations: [Seg4Page]
})
export class Seg4PageModule {}
