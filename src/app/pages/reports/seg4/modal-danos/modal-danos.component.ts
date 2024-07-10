import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, SelectCustomEvent } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ICategoriaparte, IDanio, IDivisionparte, ITipoparte } from 'src/app/shared/common/DTO/EntidadesInforme';
import { DaniosService } from 'src/app/shared/services/danios/danios.service';

@Component({
  selector: 'app-modal-danos',
  templateUrl: './modal-danos.component.html',
  styleUrls: ['./modal-danos.component.css'],
  providers:[DaniosService]
})
export class ModalDanosComponent implements OnInit {
  @ViewChild('canvasPieza', { static: false }) canvasPieza!: ElementRef;

  
  tipoPartes: ITipoparte[]=[];
  categoriaPartes: ICategoriaparte[] = [];
  divisionPartes: IDivisionparte[] = [];
  danios: IDanio []=[]


  daniosSeleccionados: IDanio[] =[];

  tipoParteSelected: ITipoparte ={
    idTipoParte: 0,
    idAdjuntos: 0,
    idCategoriaParte: 0,
    idDivisionParte: 0,
    nombre: ''
  }
  categoriaParteSelected : ICategoriaparte = {
    idCategoriaParte: 0,
    nombre: ''
  }
  divisionParteSelected: IDivisionparte={
    idDivisionParte: 0,
    nombre: '',
    filas: 0,
    columnas: 0
  }
  

  zonas: string[] = ['Zona Exterior', 'Zona Interior', 'Chasis', 'Sistemas Integrales del Vehiculo'];
  subzona: { [key: string]: string[] } = {
    'Zona Exterior': ['Parte Frontal', 'Lateral Derecho', 'Parte Posterior', 'Lateral Derecho','Techo'],
    'Zona Interior': ['Cabina'],
    'Chasis': ['Monocasco/Independiente'],
    'Sistemas Integrales del Vehiculo': ['Motor', ' Sistema de Propulsion', 'Sistema de Traccion','Sistema de Suspension',
      'Sistema de Direccion', 'Sistema de Frenos', 'Sistema Electrico y de Encendido','Sistema Electronico', 'Sistema de Alumbrado',
      'Sistema de Refrigeracion','Sistema de Alimentacion y Escaoe','Otros'
    ]
  };
  piezas: { [key: string]: string[] } = {
    'Parte Frontal': ['Parachoque', 'Capot', 'Parrilla', 'Faro', 'Guardabarros'],
    'Lateral Derecho': ['Parachoque', 'Puerta', 'Guardabarros', 'Espejo', 'Llanta'],
    'Parte Posterior:': ['Parachoque', 'Puerta', 'Guardabarros', 'Faro', 'Llanta'],
    'Techo': ['Vidrio', 'Antena', 'Rieles', 'Luces', 'Quillas'],
    'Cabina': ['Tablero', 'Volante', 'Asiento', 'Cinturon', 'Pedales'],
    'Monocasco/Independiente': ['Longitudinal', 'Travesal', 'Piso', 'Refuerzos', 'Torres'],
    'Motor': ['Carter', 'Culata', 'Pistones', 'Bielas', 'Cigueñal'],
    'Sistema de Propulsion': ['Caja de Cambios', 'Embrague', 'Cardan', 'Diferencial', 'Eje'],
    'Sistema de Traccion': ['Eje Delantero', 'Eje Trasero', 'Eje Cardan', 'Eje de Transmision', 'Eje de Direccion'],
    'Sistema de Suspension': ['Amortiguadores', 'Muelles', 'Brazos', 'Barras Estabilizadoras', 'Bujes'],
    'Sistema de Direccion': ['Cremallera', 'Bomba', 'Barras', 'Rotulas', 'Mangueras'],
    'Sistema de Frenos': ['Discos', 'Pastillas', 'Tambores', 'Zapatas', 'Mangueras'],
    'Sistema Electrico y de Encendido': ['Alternador', 'Motor de Arranque', 'Bateria', 'Cables', 'Fusibles'],
    'Sistema Electronico': ['Centralita', 'Sensores', 'Actuadores', 'Cables', 'Fusibles'],
    'Sistema de Alumbrado': ['Faros', 'Pilotos', 'Intermitentes', 'Luces de Freno', 'Luces de Marcha Atras'],
    'Sistema de Refrigeracion': ['Radiador', 'Mangueras', 'Bomba', 'Termostato', 'Ventilador'],
    'Sistema de Alimentacion y Escaoe': ['Inyectores', 'Bomba', 'Filtros', 'Colectores', 'Catalizador'],
    'Otros': ['Otros']
  };

  formDanios:FormGroup;

  zonaSeleccionada: string ='';
  subzonaSeleccionada: string = '';
  piezaSeleccionada: string = '';
  areaAfectada: string  = '';

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private daniosService: DaniosService,
    private formBuilder: FormBuilder,
  ) {
    this.formDanios = this.formBuilder.group({
      tipoParte: ['', Validators.required],
      categoriaParte: ['', Validators.required],
      divisionParte: ['', Validators.required],
      // zona: ['', Validators.required],
      // subzona: ['', Validators.required],
      pieza: ['', Validators.required],
      danios: [[]]
    });
  }

  async ngOnInit(){
    const tipoParteResponse = await this.daniosService.getTipoPartes();
    if(!tipoParteResponse.isSuccess){
      console.log("Error",tipoParteResponse);
    }
    this.tipoPartes = tipoParteResponse.data;

    const daniosResponse = await this.daniosService.getDanios();
    if(!daniosResponse.isSuccess){
      console.log("Error",daniosResponse);
    }
    this.danios = daniosResponse.data;
  }

  //#region Events on select
  async onSelectTipoParte(event: SelectCustomEvent){
    const selectedTipoParteId= event.detail.value;
    this.tipoParteSelected = this.tipoPartes.find((item) => item.idTipoParte === selectedTipoParteId) || this.tipoParteSelected;
    console.log(this.tipoParteSelected);


    const categoriaParteResponse = await this.daniosService.getCategoria(this.tipoParteSelected.idCategoriaParte);
    if(!categoriaParteResponse.isSuccess){
      console.log("Error",categoriaParteResponse);
    }
    this.categoriaPartes = categoriaParteResponse.data;

    const divisionParte = await this.daniosService.getDivisionPartes(this.tipoParteSelected.idDivisionParte);
    if(!divisionParte.isSuccess){
      console.log("Error",divisionParte);
    }
    this.divisionPartes = divisionParte.data;

    if (this.categoriaPartes.length === 1) {
      this.formDanios.patchValue({ categoriaParte: this.categoriaPartes[0].idCategoriaParte });
    }
    if (this.divisionPartes.length === 1) {
      this.formDanios.patchValue({ divisionParte: this.divisionPartes[0].idDivisionParte });
    }
  }

  //#endregion
  
  //#region HELPERS
  isTipoParteEmpty(tipoParte: ITipoparte): boolean {
    return tipoParte.idTipoParte === 0 && 
           tipoParte.idAdjuntos === 0 && 
           tipoParte.idCategoriaParte === 0 && 
           tipoParte.idDivisionParte === 0 && 
           tipoParte.nombre === '';
  }
  
  //#endregion
  cargarSubzonas() {
    // Se llama cuando se selecciona una zona
    this.subzonaSeleccionada = '';
    this.piezaSeleccionada = '';
    this.areaAfectada = '';
  
  }

  cargarPiezas() {
    // Se llama cuando se selecciona una zona
    this.piezaSeleccionada = '';
    this.areaAfectada = '';
  }

  cargarImagenPieza() {
    // Se llama cuando se selecciona una pieza
    this.areaAfectada = '';
    if (this.canvasPieza) {
      const canvas = this.canvasPieza.nativeElement;
      const ctx = canvas.getContext('2d');
      
      // Limpiar el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar la cuadrícula
      this.dibujarCuadricula(ctx, canvas.width, canvas.height);

      // Aquí podrías cargar y dibujar la imagen de la pieza
      // Por ejemplo:
      // const img = new Image();
      // img.onload = () => {
      //   ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // };
      // img.src = `assets/images/${this.zonaSeleccionada}/${this.piezaSeleccionada}.png`;
    }
  }

  dibujarCuadricula(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const rows = 3; // Número de filas
    const cols = 3; // Número de columnas
    const cellSizeX = width / cols; // Tamaño de cada celda horizontalmente
    const cellSizeY = height / rows; // Tamaño de cada celda verticalmente
    
    ctx.beginPath();
  
    // Dibujar líneas verticales
    for (let col = 1; col < cols; col++) {
      const x = col * cellSizeX;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
  
    // Dibujar líneas horizontales
    for (let row = 1; row < rows; row++) {
      const y = row * cellSizeY;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
  
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.stroke();
  }
  seleccionarAreaDano(event: MouseEvent) {
    const canvas = this.canvasPieza.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Tamaño de la cuadrícula
    const rows = 3;
    const cols = 3;
    const cellSizeX = canvasWidth / cols;
    const cellSizeY = canvasHeight / rows;
  
    // Calcular la celda seleccionada
    const cellX = Math.floor(x / cellSizeX);
    const cellY = Math.floor(y / cellSizeY);
  
    // Calcular porcentaje del área seleccionada dentro de la celda
    const porcentajeX = ((x - cellX * cellSizeX) / cellSizeX) * 100;
    const porcentajeY = ((y - cellY * cellSizeY) / cellSizeY) * 100;
  
    this.areaAfectada = `Porcentaje horizontal: ${porcentajeX.toFixed(2)}%, Porcentaje vertical: ${porcentajeY.toFixed(2)}%`;

    // Marcar el área seleccionada en el canvas
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(cellX * cellSizeX, cellY * cellSizeY, cellSizeX, cellSizeY);
  }
  
  cerrarModal() {
    this.modalController.dismiss();
  }

  async guardarDano() {
    if (this.zonaSeleccionada && this.subzonaSeleccionada && this.piezaSeleccionada && this.areaAfectada) {
      const dano = {
        zona: this.zonaSeleccionada,
        subzona: this.subzonaSeleccionada,
        pieza: this.piezaSeleccionada,
        area: this.areaAfectada
      };
      await this.modalController.dismiss(dano);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debe seleccionar una zona, una pieza y un área afectada.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}