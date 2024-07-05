import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AddOptionalModalComponent } from './add-optional-modal/add-optional-modal.component'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-seg2',
  templateUrl: './seg2.page.html',
  styleUrls: ['./seg2.page.scss'],
})
export class Seg2Page implements OnInit{
  UbicacionPericialForm: FormGroup;
  
  dynamicOptions: { [key: string]: string[] } = {
    Zona: ['Zona 01', 'Zona 02', 'Zona 03'],
    SubZona: ['SubZona 01', 'SubZona 02', 'SubZona 03'],
    Distrito: ['Distrito 01', 'Distrito 02', 'Distrito 03'],
    Circuito: ['Circuito 01', 'Circuito 02', 'Circuito 03'],
    SubCircuito: ['SubCircuito 01', 'SubCircuito 02', 'SubCircuito 03'],
    Lugar: ['Lugar 01', 'Lugar 02', 'Lugar 03'],
  };

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {
    this.UbicacionPericialForm = this.formBuilder.group({
      ZonaUbicacion: [''],
      SubZonaUbicacion: [''],
      DistritoUbicacion: [''],
      Circuito: [''],
      SubCircuito: [''],
      CodigoSubCircuito: [''],
      Latitud: ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      Longitud: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      Lugar: [''],
      Propietario: [''],
      Hicc: [''],
      Cedula: ['', [Validators.required,Validators.minLength(10)]],
      fechaUbicacion: [new Date().toISOString()],
    });
  }

  async addOption(selectType: string) {
    const modal = await this.modalCtrl.create({
      component: AddOptionalModalComponent,
      componentProps: { selectType }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const capitalizedOption = result.data.toUpperCase(); // Convertir a mayúsculas
        switch (selectType) {
          case 'Zona':
            this.UbicacionPericialForm.get('ZonaUbicacion')?.setValue(capitalizedOption);
            break;
          case 'SubZona':
            this.UbicacionPericialForm.get('SubZonaUbicacion')?.setValue(capitalizedOption);
            break;
          case 'Distrito':
            this.UbicacionPericialForm.get('DistritoUbicacion')?.setValue(capitalizedOption);
            break;
          case 'Circuito':
            this.UbicacionPericialForm.get('Circuito')?.setValue(capitalizedOption);
            break;
          case 'SubCircuito':
            this.UbicacionPericialForm.get('SubCircuito')?.setValue(capitalizedOption);
            break;
          case 'Lugar':
            this.UbicacionPericialForm.get('Lugar')?.setValue(capitalizedOption);
            break;
          default:
            break;
        }
        this.dynamicOptions[selectType].push(capitalizedOption);
      }
    });
  
    return await modal.present();
  }

  ngOnInit() {
    this.obtenerDatosGuardados();    
  }

  async saveData() {
    const formData = this.UbicacionPericialForm.value;
    formData.fechaUbicacion = moment(formData.fechaUbicacion).format('DD/MM/YYYY');
    this.dataService.setData('seg2Data', formData);
    console.log('Data saved:', formData);

    this.navCtrl.navigateForward(['/segments/seg3']);
  }
  
  obtenerDatosGuardados() {
    const lastSavedDataArray = this.dataService.getData('seg2Data');
    if (lastSavedDataArray) {
      this.UbicacionPericialForm.patchValue(lastSavedDataArray);
    }
  }

  toUpperCase(event: any, formControlName: string) {
    const value = event.target.value.toUpperCase();
    const formControl = this.UbicacionPericialForm.get(formControlName);
    if (formControl) {
      formControl.setValue(value, { emitEvent: false });
    }
  }

  
}
