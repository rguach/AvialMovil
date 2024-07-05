import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,Validators  } from '@angular/forms';
import { DatosService } from 'src/app/shared/services/datos.service';
import { DataService } from 'src/app/shared/services/data.service';
import * as moment from 'moment';
import { AlertController, NavController } from '@ionic/angular';
import { VehiculoPorPlacasServiceService } from '../../../shared/services/vehiculoPorPlacasService.service';
import { VehiculosPlacaResponse } from 'src/app/shared/common/DTO/VehiculosPlacaResponse';


@Component({
  selector: 'app-seg1',
  templateUrl: './seg1.page.html',
  styleUrls: ['./seg1.page.scss'],
})
export class Seg1Page implements OnInit {

  DatosGeneralesForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private datosService: DatosService,
    private dataService: DataService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private vehiculosPorPlaca: VehiculoPorPlacasServiceService
  ) {
    this.DatosGeneralesForm = this.formBuilder.group({
      autoridadSolicitante: ['', Validators.required],
      cargo: ['', Validators.required],
      institucion: ['', Validators.required],
      oficio: ['', Validators.required],
      fecha: [new Date().toISOString(), Validators.required],
      iprevia: [false],
      aadministrativo: [false],
      actourg: [false],
      ifiscal: [false],
      causaexpdte: [false],
      ppolicial: [false],
      numeroDocumento: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      funcionario: ['', Validators.required],
      areaFuncionario: ['', Validators.required],
      especialidadFuncionario: ['', Validators.required],
      numero: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      vigencia: [''],
      antecedente: ['']
    });
  }

  ngOnInit() {
    this.obtenerDatosGuardados();
  }


  async saveData() {
    if (this.DatosGeneralesForm.invalid && !this.DatosGeneralesForm.get('antecedente')?.value) {
      const alert = await this.alertController.create({
        header: 'Advertencia',
        message: 'Por favor llena por lo menos el campo de antecedente',
        buttons: [
          {
            text: 'Aceptar',
            role: 'aceptar',
          },
        ],
      });
      await alert.present();
      return;
    }

    const response: VehiculosPlacaResponse = await this.vehiculosPorPlaca.getVehiculoPorPlacas(this.DatosGeneralesForm.get('antecedente')?.value);
    localStorage.setItem("vehiculoPorPlacas",JSON.stringify(response));
    
    const formData = this.DatosGeneralesForm.value;
    formData.fecha = moment(formData.fecha).format('DD/MM/YYYY');
    this.dataService.setData('seg1Data', formData);
    console.log('Datos Guardados', formData);

    this.navCtrl.navigateForward(['/segments/seg2']);
  }


  calcularVigencia() {
    const fechaInicio = moment(this.DatosGeneralesForm.get('fecha')?.value);
    const fechaFin = fechaInicio.clone().add(653, 'days');
    // Formatea la fecha de fin según tus necesidades
    const fechaFinFormateada = fechaFin.format('DD/MM/YYYY');
    // Actualiza el valor del formulario
    this.DatosGeneralesForm.patchValue({
      vigencia: fechaFinFormateada
    });
  }
  
  async obtenerDatosGuardados() {
    try {
      const lastSavedDataArray = await this.datosService.obtenerDatosGenerales();
      if (lastSavedDataArray && lastSavedDataArray.length > 0) {
        const lastSavedData = lastSavedDataArray[lastSavedDataArray.length - 1];
        console.log('Últimos datos guardados:', lastSavedData);
        this.DatosGeneralesForm.patchValue(lastSavedData);
      }
    } catch (error) {
      console.error('Error al obtener los últimos datos guardados:', error);
    }
  }
  
  setCheckboxes(tipos: string) {
    const tipoDocumento: FormArray = this.DatosGeneralesForm.get('tipoDocumento') as FormArray;
    const tiposArray = tipos.split(', ');
    tiposArray.forEach(tipo => {
      tipoDocumento.push(this.formBuilder.control(tipo));
    });
  }
  
  isChecked(tipo: string): boolean {
    const tipoDocumento: FormArray = this.DatosGeneralesForm.get('tipoDocumento') as FormArray;
    return tipoDocumento.value.includes(tipo);
  }

  onCheckboxChange(event: CustomEvent, tipo: string) {
    const tipoDocumento: FormArray = this.DatosGeneralesForm.get('tipoDocumento') as FormArray;

    if (event.detail.checked) {
      tipoDocumento.push(this.formBuilder.control('x'));
    } else {
      const index = tipoDocumento.controls.findIndex(x => x.value === 'x');
      tipoDocumento.removeAt(index);
    }
  }

  toUpperCase(event: any, formControlName: string) {
    const value = event.target.value.toUpperCase();
    const formControl = this.DatosGeneralesForm.get(formControlName);
    if (formControl) {
      formControl.setValue(value, { emitEvent: false });
    }
  }
}
