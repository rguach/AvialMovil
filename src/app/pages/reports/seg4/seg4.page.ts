import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalDanosComponent } from 'src/app/pages/reports/seg4/modal-danos/modal-danos.component';

@Component({
  selector: 'app-seg4',
  templateUrl: './seg4.page.html',
  styleUrls: ['./seg4.page.scss'],
})
export class Seg4Page {

  danos: any[] = [];

  constructor(private modalController: ModalController) { }

  async abrirModalDanios() {
    const modal = await this.modalController.create({
      component: ModalDanosComponent,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data !== undefined) {
        this.danos.push(dataReturned.data);
      }
    });

    return await modal.present();
  }
}

