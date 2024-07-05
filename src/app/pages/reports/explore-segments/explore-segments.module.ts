import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreSegmentsComponent } from './explore-segments.component';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ExploreSegmentsComponent, ],
  exports: [ExploreSegmentsComponent],
  providers: [FileOpener, File]
})
export class ExploreSegmentComponentModule {}
