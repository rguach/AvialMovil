import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ModalDanosComponent } from './modal-danos.component';
import { DaniosService } from 'src/app/shared/services/danios/danios.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [ModalDanosComponent],
  exports: [ModalDanosComponent]
})
export class ModalDanosComponentModule {}