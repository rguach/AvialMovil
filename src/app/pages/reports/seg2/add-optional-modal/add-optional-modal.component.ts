import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-optional-modal',
  templateUrl: './add-optional-modal.component.html',
  styleUrls: ['./add-optional-modal.component.scss'],
})
export class AddOptionalModalComponent {
  @Input() selectType: string = '';
  newOption: string = '';

  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  addOption() {
    if (!this.newOption || this.newOption.trim() === '') {
      this.presentAlert();
      return;
    }

    const upperCaseOption = this.newOption.toUpperCase(); // Convertir a mayúsculas
    this.modalCtrl.dismiss(upperCaseOption);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Campo Vacío',
      message: 'Debe agregar una opción antes de continuar.',
      buttons: ['OK']
    });

    await alert.present();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
