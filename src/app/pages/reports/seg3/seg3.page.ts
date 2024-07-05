import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { PhotoService } from '../../../shared/services/photo.service';
import { AlertController, NavController } from '@ionic/angular';
import { InformeCompletoService } from 'src/app/shared/services/InformeCompletoService.service';
import {
  IMarca,
  IModelo,
  InformeCompletoResponse,
  ITipovehiculo,
} from 'src/app/shared/common/DTO/Entidades';
import { VehiculosPlacaResponse } from 'src/app/shared/common/DTO/VehiculosPlacaResponse';

@Component({
  selector: 'app-seg3',
  templateUrl: './seg3.page.html',
  styleUrls: ['./seg3.page.scss'],
})
export class Seg3Page implements OnInit {
  DatosGeneralesForm: FormGroup;
  IdentificacionPericialForm: FormGroup;

  marcas: IMarca[] = [];
  modelos: IModelo[]=[];
  tipoVehiculo: ITipovehiculo | undefined;


  tipoVehiculoSeleccionado:number=0;
  marcaSeleccionada: number = 0;
  modeloSeleccionado: number = 0

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public photoService: PhotoService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private informeCompletoService: InformeCompletoService
  ) {
    this.IdentificacionPericialForm = this.formBuilder.group({
      foto1: [''],
      propidentificacion: ['', Validators.required],
      PlacaActual: [''],
      NumeroChasis: ['', Validators.required],
      NumeroMotor: ['', Validators.required],
      Marca: ['', Validators.required],
      Modelo: ['', Validators.required],
      Color: ['', Validators.required],
      Anio: ['', Validators.required],
      TipoMotor: ['', Validators.required],
      Cooperativa: [''],
      Disco: ['', Validators.required],
      Observacionesidentificacion: [''],
      TipoVehiculo: ['',Validators.required],
      fuenteinformacion: ['', Validators.required],
    });
    this.DatosGeneralesForm = this.formBuilder.group({
      antecedente: [''],
    });
  }


  async ngOnInit() {
    console.log('ngOnInit started');
    await this.loadDataFromServer();
    this.obtenerDatosGuardados();
    this.loadSavedData();
    this.loadVehicleData();

    this.DatosGeneralesForm.get('antecedente')?.valueChanges.subscribe(
      (value) => {
        this.IdentificacionPericialForm.get('PlacaActual')?.setValue(value);
      }
    );

    const antecedenteValue = this.DatosGeneralesForm.get('antecedente')?.value;
    if (antecedenteValue) {
      this.IdentificacionPericialForm.get('PlacaActual')?.setValue(
        antecedenteValue
      );
    }

    this.IdentificacionPericialForm.get('Marca')?.valueChanges.subscribe(
      (marcaId: number) => {
        this.onMarcaChange(marcaId);
      }
    );

    this.IdentificacionPericialForm.get('Modelo')?.valueChanges.subscribe(
      (modeloId: number) => {
        this.onModeloChange(modeloId);
      }
    );
    console.log('ngOnInit completed');
  }
  async loadDataFromServer() {
    try {
      const response: InformeCompletoResponse = await this.informeCompletoService.getDatos();
      this.marcas = response.marcas;
      console.log('Marcas loaded:', this.marcas);
    } catch (error) {
      console.error('Error loading data from server:', error);
      this.showErrorAlert(
        'Error de carga',
        'No se pudieron cargar los datos del servidor.'
      );
    }
  }

  loadVehicleData() {
    console.log('loadVehicleData started');
    const vehicleDataString = localStorage.getItem('vehiculoPorPlacas');
    if (vehicleDataString) {
      try {
        const vehicleData = JSON.parse(vehicleDataString);
        console.log('Vehicle data loaded:', vehicleData);
        if ('error' in vehicleData) {
          this.showErrorAlert(vehicleData.error, vehicleData.details);
        } else {
          this.populateFormWithVehicleData(vehicleData);
        }
      } catch (error) {
        console.error('Error parsing vehicle data:', error);
        this.showErrorAlert(
          'Error de parsing',
          'Los datos del vehículo no son válidos.'
        );
      }
    }
    console.log('loadVehicleData completed');
  }

  populateFormWithVehicleData(vehicleData: VehiculosPlacaResponse) {
    console.log('populateFormWithVehicleData started', vehicleData);
    this.IdentificacionPericialForm.patchValue({
      PlacaActual: vehicleData.placa,
      Marca: vehicleData.marca,
      Modelo: vehicleData.modelo,
      Anio: vehicleData.año,
    });
  
    this.marcaSeleccionada =
      this.marcas.find((marca) => marca.nombre === vehicleData.marca)
        ?.idMarca || 0;
    console.log('Marca seleccionada:', this.marcaSeleccionada);
    this.cargarModelos();
    const modeloSeleccionado = this.modelos.find((modelo) => modelo.nombre === vehicleData.modelo);
    if (modeloSeleccionado) {
      this.modeloSeleccionado = modeloSeleccionado.idModelo;
      this.tipoVehiculo = modeloSeleccionado.tipoVehiculo;
      this.tipoVehiculoSeleccionado = modeloSeleccionado.tipoVehiculo.idTipoVehiculo;
    }
  
    console.log('Modelo seleccionado:', this.modeloSeleccionado);

  }
  
  async showErrorAlert(error: string, details: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: `${error}: ${details}`,
      buttons: ['OK'],
    });
    await alert.present();
  }

  cargarModelos() {
    this.modeloSeleccionado = 0;
    this.IdentificacionPericialForm.get('Modelo')?.setValue('');
    const marcaSeleccionada = this.marcas.find(m => m.idMarca === this.marcaSeleccionada);
    this.modelos = marcaSeleccionada ? marcaSeleccionada.modelos : [];
  }

  cargarTiposVehiculo() {
    this.tipoVehiculoSeleccionado = 0;
    this.IdentificacionPericialForm.get('TipoVehiculo')?.setValue('');
    const modeloSeleccionado = this.modelos.find(m => m.idModelo === this.modeloSeleccionado);
    this.tipoVehiculo = modeloSeleccionado ? modeloSeleccionado.tipoVehiculo : undefined;
  }

  onModeloChange(modeloId: number) {
    const modeloSeleccionado = this.modelos.find(m => m.idModelo === modeloId);
    if (modeloSeleccionado) {
      this.IdentificacionPericialForm.patchValue({
        Anio: modeloSeleccionado.año,
        TipoVehiculo: modeloSeleccionado.tipoVehiculo.tipo
      });
      this.tipoVehiculo = modeloSeleccionado.tipoVehiculo;
    } else {
      this.IdentificacionPericialForm.patchValue({
        Anio: '',
        TipoVehiculo: ''
      });
      this.tipoVehiculo = undefined;
    }
  }
  onMarcaChange(marcaId: number) {
    this.marcaSeleccionada = marcaId;
    const marcaSeleccionada = this.marcas.find(m => m.idMarca === marcaId);
    this.modelos = marcaSeleccionada ? marcaSeleccionada.modelos : [];
    this.IdentificacionPericialForm.patchValue({
      Modelo: '',
      Anio: '',
      TipoVehiculo: ''
    });
  }

  async saveData() {
    if (this.IdentificacionPericialForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Advertencia',
        message: 'Por favor llena todos los campos',
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
    const formData = this.IdentificacionPericialForm.value;
    if (formData.foto1) {
      this.dataService.guardarImagen(formData.foto1);
    }
    this.dataService.setData('seg3Data', formData);
    console.log('Data saved', formData);
    this.navCtrl.navigateForward(['/segments/seg4']);
  }

  obtenerDatosGuardados() {
    const lastSavedDataArray = this.dataService.getData('seg3Data');
    if (lastSavedDataArray) {
      this.IdentificacionPericialForm.patchValue(lastSavedDataArray);
    }
  }

  loadSavedData() {
    const savedData = this.dataService.getData('seg1Data');
    if (savedData) {
      this.DatosGeneralesForm.patchValue(savedData);
      console.log('Loaded data:', savedData);
    }
  }

  addPhotoToGallery(index: number) {
    this.photoService
      .addNewToGallery(index, this.IdentificacionPericialForm)
      .catch((error) => {
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
          handler: () => {},
        },
        {
          text: 'Reemplazar',
          handler: () => {
            this.addPhotoToGallery(index);
          },
        },
      ],
    });

    await alert.present();
  }

  toUpperCase(event: any, formControlName: string) {
    const value = event.target.value.toUpperCase();
    const formControl = this.IdentificacionPericialForm.get(formControlName);
    if (formControl) {
      formControl.setValue(value, { emitEvent: false });
    }
  }
}
