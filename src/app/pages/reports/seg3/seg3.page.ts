import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { PhotoService } from '../../../shared/services/photo.service';
import {
  AlertController,
  NavController,
  RangeCustomEvent,
  SelectChangeEventDetail,
  SelectCustomEvent,
} from '@ionic/angular';
import { InformeCompletoService } from 'src/app/shared/services/InformeCompletoService.service';
import { VehiculoPorPlacasServiceService } from '../../../shared/services/vehiculoPorPlacasService.service';
import {
  IClasevehiculo,
  IMarca,
  IModelo,
  InformeCompletoResponse,
  ITipovehiculo,
} from 'src/app/shared/common/DTO/EntidadesInforme';
import { IonSelectCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-seg3',
  templateUrl: './seg3.page.html',
  styleUrls: ['./seg3.page.scss'],
  providers: [InformeCompletoService],
})
export class Seg3Page implements OnInit {
  DatosGeneralesForm: FormGroup;
  IdentificacionPericialForm: FormGroup;

  marcas: IMarca[] = [];
  modelos: IModelo[] = [];
  tipoVehiculo: ITipovehiculo[] = [];
  claseVehiculo: IClasevehiculo[] = [];

  public selectedMarca: IMarca = {
    idMarca: 0,
    nombre: '',
  };
  public selectedModelo: IModelo = {
    idModelo: 0,
    nombre: '',
    año: '',
    numeroChasis: '',
    numeroMotor: '',
    idClaseVehiculo: 0,
    idMarca: 0,
    idTipoVehiculo: 0,
  };
  public selectedTipoVehiculo: ITipovehiculo = {
    idTipoVehiculo: 0,
    tipo: '',
  };
  public selectedClaseVehiculo: IClasevehiculo = {
    idClaseVehiculo: 0,
    clase: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public photoService: PhotoService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private informeCompletoService: InformeCompletoService,
    private cdr: ChangeDetectorRef
  ) {
    this.IdentificacionPericialForm = this.formBuilder.group({
      foto1: [''],
      propidentificacion: ['', Validators.required],
      PlacaActual: [''],
      NumeroChasis: ['', Validators.required],
      NumeroMotor: ['', Validators.required],
      Marca: ['', Validators.required],
      Modelo: ['', Validators.required],
      TipoVehiculo: ['', Validators.required],
      ClaseVehiculo: ['', Validators.required],
      Color: ['', Validators.required],
      Anio: ['', Validators.required],
      TipoMotor: ['', Validators.required],
      Cooperativa: [''],
      Disco: ['', Validators.required],
      Observacionesidentificacion: [''],

      fuenteinformacion: ['', Validators.required],
    });
    this.DatosGeneralesForm = this.formBuilder.group({
      antecedente: [''],
    });
  }

  async ngOnInit() {
    this.loadDataFromServer();
    this.modelos = []; // Inicializa los modelos como un array vacío
  }

  async onSelectMarca(event: CustomEvent) {
    const marcaId = event.detail.value;
    try {
      this.modelos = await this.informeCompletoService.getModelos(marcaId);
      console.log('Modelos cargados:', this.modelos);
      this.IdentificacionPericialForm.patchValue({ Modelo: '' });
      this.IdentificacionPericialForm.setValue({"Anio":this.selectedModelo.año})
      this.cdr.detectChanges(); // Forzar la detección de cambios
    } catch (error) {
      console.error('Error al cargar los modelos:', error);
    }
  }

  onSelectModelo(event: CustomEvent) {
    console.log('id modelo', event.detail.value);
    const selectedModeloId = event.detail.value;
    this.selectedModelo = this.modelos.find((modelo) => modelo.idModelo === selectedModeloId) || this.selectedModelo;
    
    // Actualizar el valor del año en el formulario
    this.IdentificacionPericialForm.patchValue({ 
      Anio: this.selectedModelo.año,
      TipoVehiculo: this.selectedModelo.idTipoVehiculo,
      claseVehiculo: this.selectedModelo.idClaseVehiculo
    });
  
    // Filtrar tipo y clase de vehículo
    this.tipoVehiculo = this.tipoVehiculo.filter(
      (item) => item.idTipoVehiculo === this.selectedModelo.idTipoVehiculo
    );
    this.claseVehiculo = this.claseVehiculo.filter(
      (item) => item.idClaseVehiculo === this.selectedModelo.idClaseVehiculo
    );

    if (this.tipoVehiculo.length === 1) {
      this.IdentificacionPericialForm.patchValue({ TipoVehiculo: this.tipoVehiculo[0].idTipoVehiculo });
    }
    if (this.claseVehiculo.length === 1) {
      this.IdentificacionPericialForm.patchValue({ ClaseVehiculo: this.claseVehiculo[0].idClaseVehiculo });
    }
  
    // Forzar la detección de cambios
    this.cdr.detectChanges();
  }

  async loadDataFromServer() {
    try {
      const response: InformeCompletoResponse =
        await this.informeCompletoService.getDatos();
      this.marcas = response.marcas;
      (this.tipoVehiculo = response.tipoVehiculo),
        (this.claseVehiculo = response.clasevehiculo);

      console.log('Marcas loaded:', this.marcas);
      console.log('clases loaded:', this.claseVehiculo);
    } catch (error) {
      console.error('Error loading data from server:', error);
      this.showErrorAlert(
        'Error de carga',
        'No se pudieron cargar los datos del servidor.'
      );
    }
  }

  //#region relacionado con metodos internos de la aplicacion
  async showErrorAlert(error: string, details: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: `${error}: ${details}`,
      buttons: ['OK'],
    });
    await alert.present();
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
  //#endregion
}
