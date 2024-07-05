import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../../../shared/services/photo.service';
import { AlertController, NavController } from '@ionic/angular';
import{ DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-seg5',
  templateUrl: './seg5.page.html',
  styleUrls: ['./seg5.page.scss'],
})
export class Seg5Page {
  FotografiasForm: FormGroup;

  constructor(
    public photoService: PhotoService, 
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private navCtrl: NavController
  ) {
    this.FotografiasForm = this.formBuilder.group({
      foto2: [''],
      foto3: [''],
      foto4: [''],
      foto5: [''],
      foto6: [''],
      foto7: [''],
    });
  }

  saveData() {
    const formData = this.FotografiasForm.value;
    for (let i = 2; i <= 7; i++) {
      const foto = formData[`foto${i}`];
      if (foto) {
        this.dataService.guardarImagen(foto);
      }
    }
    console.log('Data saved:', formData);
    this.navCtrl.navigateForward(['/segments/seg6']);
  }

  addPhotoToGallery(index: number) {
    this.photoService.addNewToGallery(index, this.FotografiasForm).catch(error => {
      console.error('Error al agregar la foto:', error);
    });
  }

  async removePhoto(index: number) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: '¿Estás seguro de que deseas reemplazar esta imagen?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Reemplazar',
          handler: () => {
            this.addPhotoToGallery(index);
          }
        }
      ]
    });

    await alert.present();
  }
}
