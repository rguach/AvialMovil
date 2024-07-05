import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddOptionalModalComponent } from './add-optional-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [AddOptionalModalComponent]
})
export class AddOptionalModalModule { }
