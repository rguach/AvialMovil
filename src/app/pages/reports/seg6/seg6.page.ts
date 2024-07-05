import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatosService } from 'src/app/shared/services/datos.service';
import { DataService } from 'src/app/shared/services/data.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { PhotoService } from 'src/app/shared/services/photo.service';
import * as moment from 'moment';
import 'moment/locale/es';


@Component({
  selector: 'app-seg6',
  templateUrl: './seg6.page.html',
  styleUrls: ['./seg6.page.scss'],
})
export class Seg6Page implements OnInit{

  DatosGeneralesForm: FormGroup;
  UbicacionPericialForm: FormGroup;
  IdentificacionPericialForm: FormGroup;
  FotografiasForm: FormGroup;
  ConclusionesForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private datosService: DatosService,
    private dataService: DataService,
    private photoService: PhotoService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private toastController: ToastController
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
      Cedula: ['', [Validators.required,Validators.minLength(10),Validators.pattern("^[0-9]*$")]],
      fechaUbicacion: [new Date().toISOString()],
    });
    this.IdentificacionPericialForm = this.formBuilder.group({
      foto1 : ['',],
      propidentificacion: ['',Validators.required],
      PlacaActual: [],
      NumeroChasis: ['',Validators.required, ],
      NumeroMotor: ['',Validators.required, ],
      Marca: ['',Validators.required],
      Modelo: ['',Validators.required],
      Clase:['',Validators.required],
      Tipo:['',Validators.required],
      Color: ['',Validators.required],
      Anio: ['',Validators.required],
      TipoMotor: ['', Validators.required],
      Cooperativa: [''],
      Disco: ['',Validators.required],
      Observacionesidentificacion: [''],
      fuenteinformacion: ['',Validators.required],
    });
    this.FotografiasForm = this.formBuilder.group({
      foto2: [''],
      foto3: [''],
      foto4: [''],
      foto5: [''],
      foto6: [''],
      foto7: [''],
    });
    this.ConclusionesForm = this.formBuilder.group({
      conclusiones: ['', Validators.required],
      informacionadicional: ['', Validators.required],
      anexos: ['', Validators.required],
      declaracionjuramentada: ['', Validators.required],
      gradonombresyapellidos: ['', Validators.required],
      cedulafuncionario: ['', [Validators.required, Validators.minLength(10),Validators.pattern("^[0-9]*$")]],
      telefonofuncionario: ['', [Validators.required, Validators.minLength(10),Validators.pattern("^[0-9]*$")]],
      correofuncionario: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadSavedData();
  }
  loadSavedDataAndPreview() {
    this.loadSavedData(); // Cargar datos guardados
    this.loadSavedDataUbicacion(); // Cargar datos guardados de ubicación
    this.loadSavedDataIdentificacion(); // Cargar datos guardados de identificación
    this.loadSavedDataFotografias(); // Cargar datos guardados de fotografías
    this.loadSaveDataConclusiones(); // Cargar datos guardados de conclusiones
    this.GenerarPDF(); // Generar PDF
    
  }  
  
  saveData() {
    const formData = this.ConclusionesForm.value;
    this.dataService.setData('seg6Data', formData);
    console.log('Datos Guardados', formData);
  }
  
  toUpperCase(event: any, formControlName: string) {
    const value= event.target.value.toUpperCase();
    const formControl = this.ConclusionesForm.get(formControlName);
    if (formControl) {
      formControl.setValue(value,{emitEvent: false});
    }
  }
  loadSavedData() {
    const savedData = this.dataService.getData('seg1Data');
    if (savedData) {
      this.DatosGeneralesForm.patchValue(savedData);
      console.log('Loaded data:', savedData);
    }
  }

  loadSavedDataUbicacion() {
    const savedData = this.dataService.getData('seg2Data');
    if (savedData) {
      this.UbicacionPericialForm.patchValue(savedData);
      console.log('Loaded data:', savedData);
    }
  }
  async loadSavedDataIdentificacion() {
    const savedData = this.dataService.getData('seg3Data');
    if (savedData) {
      // Cargar los datos del formulario, excluyendo la foto
      const formDataWithoutPhoto = { ...savedData };
      delete formDataWithoutPhoto.foto0;
      this.IdentificacionPericialForm.patchValue(formDataWithoutPhoto);
  
      // Cargar la foto
      if (savedData.foto1) {
        const base64Image = await this.photoService.getBase64Images(savedData.foto0);
        this.IdentificacionPericialForm.patchValue({ foto1: base64Image });
      }
  
      console.log('Loaded data:', savedData);
    }
    this.DatosGeneralesForm.get('antecedente')?.valueChanges.subscribe((value) => {
      this.IdentificacionPericialForm.get('PlacaActual')?.setValue(value);
    });
    const antecedenteValue = this.DatosGeneralesForm.get('antecedente')?.value;
    if (antecedenteValue) {
      this.IdentificacionPericialForm.get('PlacaActual')?.setValue(antecedenteValue);
    }
  }
  async loadSavedDataFotografias() {
    const savedImages = this.dataService.obtenerImagenes();
    if (savedImages && savedImages.length > 0) {
      try {
        const imagesConverted = await this.photoService.getBase64Images(savedImages);
        this.FotografiasForm.patchValue(imagesConverted);
        console.log('Loaded images:', imagesConverted);
      } catch (error) {
        console.error('Error al cargar las imágenes:', error);
      }
    } else {
      console.log('No hay imágenes guardadas');
    }
  }

  loadSaveDataConclusiones() {
    const savedData = this.dataService.getData('seg6Data');
    if (savedData) {
      this.ConclusionesForm.patchValue(savedData);
      console.log('Loaded data:', savedData);
    }
  }

  async obtenerDatosGuardados() {
    try {
      const lastSavedData = await this.datosService.obtenerDatosGenerales();
      console.log('Últimos datos guardados:', lastSavedData);
      if (lastSavedData) {
        this.DatosGeneralesForm.patchValue(lastSavedData);
      }
    } catch (error) {
      console.error('Error al obtener los últimos datos guardados:', error);
    }
  }

  async GenerarPDF() {
    const formData = this.DatosGeneralesForm.value;
    const formDataUbicacion = this.UbicacionPericialForm.value;
    const formDataIdentificacion = this.IdentificacionPericialForm.value;
    const formDataFotografias = this.FotografiasForm.value;
    const formDataConclusiones = this.ConclusionesForm.value;
    const doc = new jsPDF('p', 'mm', 'a4');
      // Función para agregar una nueva página si es necesario

    const {
      autoridadSolicitante,cargo, institucion, oficio, fecha, iprevia, aadministrativo, 
      actourg,ifiscal,causaexpdte,ppolicial,numeroDocumento,funcionario,areaFuncionario,
      especialidadFuncionario,numero,vigencia, antecedente, } = formData;

    const{ZonaUbicacion,SubZonaUbicacion,DistritoUbicacion,Circuito,
      SubCircuito,CodigoSubCircuito,Latitud,Longitud,Lugar,Propietario,Hicc,Cedula,fechaUbicacion}=formDataUbicacion;  
     
    const{foto1,propidentificacion,PlacaActual,NumeroChasis,NumeroMotor,Marca,Modelo,Clase,Tipo,Color,
      Anio,TipoMotor,Cooperativa,Disco,Observacionesidentificacion,fuenteinformacion}=formDataIdentificacion;
    
    const{foto2,foto3,foto4,foto5,foto6,foto7}=formDataFotografias;

    const{conclusiones,informacionadicional,anexos,declaracionjuramentada,gradonombresyapellidos,cedulafuncionario,telefonofuncionario,
      correofuncionario}=formDataConclusiones;
    

      // Fecha actual en palabras (día, mes y año)
      const fechaActual = moment().format('DD [de] MMMM [de] YYYY').toUpperCase();

    // Contenido principal
    autoTable(doc, {
      head: [
        [
          { content: 'POLICÍA NACIONAL DEL ECUADOR', colSpan: 2, styles: { halign: 'center', lineColor: [0, 0, 0],lineWidth:0.1  } },
          { content: 'DIRECCIÓN NACIONAL DE INVESTIGACIÓN\nTÉCNICO CIENTÍFICA POLICIAL', colSpan: 5, styles: { fontStyle: 'bold', halign: 'center', 
            lineColor: [0, 0, 0],lineWidth:0.1 } }
        ],
        [
          { content: 'CÓDIGO: PN-DNITEC-\nZ9-JAVIAL/B-REQ-005', colSpan: 1, styles: { fontSize: 7, halign: 'left', lineColor: [0, 0, 0],lineWidth:0.1  } },
          { content: 'JEFATURA ZONAL DE ACCIDENTOLOGÍA VIAL - DMQ', colSpan: 6, styles: { halign: 'center', lineColor: [0, 0, 0],lineWidth:0.1} }
        ],
        [
          { content: 'EDICIÓN N° 04', colSpan: 1, styles: { fontSize: 7, halign: 'left', lineColor: [0, 0, 0],lineWidth:0.1  }},
          { content: 'INFORME PERICIAL DE RECONOCIMIENTO TÉCNICO MECÁNICO Y AVALÚO DE DAÑOS MATERIALES', colSpan: 5, styles: { halign: 'left',  lineColor: [0, 0, 0],lineWidth:0.1 } },
          { content: 'Pag. 1 de  4', colSpan: 1, styles: { fontSize: 7, halign: 'right', lineColor: [0, 0, 0],lineWidth:0.1  } }
        ],
        [{ content: '\n', colSpan: 7, styles: { fillColor: [255, 255, 255] } }],
      ],
      headStyles: {
        textColor: [0, 0, 0],
        fillColor: [240, 240, 240],
        fontSize: 9,
        cellPadding: 2,
      },
      margin: { top: 10 },
      body: [
        [{ content: 'LUGAR/FECHA',colSpan:3, styles: { fontStyle: 'bold',} },
          { content: 'INFORME TÉCNICO PERICIAL Nro.', colSpan: 4, styles: { fontStyle: 'bold', halign: 'center' } }
          ],
          [
            { content: 'D.M. QUITO,'+ fechaActual, colSpan: 3},
            { content: 'PN-Z9DMQ-JZAV-B-2022-0001-PER',colSpan: 4}
          ],
          [{ content: '', colSpan: 7, styles: { fillColor: [255, 255, 255] } }],  
        [{ content: '1. DATOS GENERALES', colSpan: 7, styles: { fillColor: [240, 240, 240], fontStyle: 'bold' } }],
        [
          { content: 'AUTORIDAD SOLICITANTE', colSpan: 2 },
          { content: 'CARGO', colSpan: 2 },
          { content: 'INSTITUCIÓN', colSpan: 3 }
        ],
        [
          { content: autoridadSolicitante, colSpan: 2 },
          { content: cargo, colSpan: 2 },
          { content: institucion, colSpan: 3 }
        ],
        [
          { content: 'OFICIO', colSpan: 1},
          { content: oficio, colSpan: 2},
          { content: 'FECHA', colSpan: 1 },
          { content: fecha, colSpan: 3 }
        ],
        [
          { content: 'I.PREVIA', colSpan: 1 },
          { content: (iprevia?"X":""), colSpan: 1 },
          { content: 'A.ADMINISTRATIVO', colSpan: 1 },
          { content: (aadministrativo?"X":""), colSpan: 1 },
          { content: 'ACTO URG.', colSpan: 1 },
          { content: (actourg?"X":""), colSpan: 1 },
          { content: 'NUMERO', colSpan: 1 }
        ],
        [
          { content: 'I.FISCAL', colSpan: 1 },
          { content: (ifiscal?"X":""), colSpan: 1 },
          { content: 'CAUSA/EXPDTE', colSpan: 1 },
          { content: (causaexpdte?"X":""), colSpan: 1 },
          { content: 'P.POLICAL', colSpan: 1 },
          { content: (ppolicial?"X":""), colSpan: 1 },
          { content: numeroDocumento, colSpan: 1 }
        ],
        [{ content: 'FUNCIONARIO(S) RESPONSABLE(S)', colSpan: 7, styles: { fillColor: [240, 240, 240], fontStyle: 'bold' } }],
        [
          { content: 'GRADO,NOMNRES Y APELLIDOS', colSpan: 1 },
          { content: 'ÁREA', colSpan: 2 },
          { content: 'ESPECIALIDAD', colSpan: 1 },
          { content: 'NÚMERO', colSpan: 1 },
          { content: 'VIGENCIA', colSpan: 2 },
        ],
        [
          { content: funcionario, colSpan: 1 },
          { content: areaFuncionario, colSpan: 2 },
          { content: especialidadFuncionario, colSpan: 1 },
          { content: numero, colSpan: 1 },
          { content: vigencia, colSpan: 2 },
        ],
        [{ content: '2. ANTECEDENTES', colSpan: 7, styles: { fillColor: [240, 240, 240], fontStyle: 'bold' } }],
        [{ content: 'OBJETO DE PERICIA', colSpan: 7,  styles: { fontStyle: 'bold', halign: 'center' } }],
        [{
          content: 'La práctica de: "...Reconocimiento Técnico Mecánico y Avalúo de Daños Materiales, del vehículo de placas '+antecedente+'"',
          colSpan: 7
        }],
        [{ content: '3. CONSIDERACIONES TÉCNICAS / METODOLOGÍA APLICADA / FUNDAMENTO TÉCNICO CIENTÍFICO',
          colSpan: 7, styles: { fillColor: [240, 240, 240], fontStyle: 'bold' } }],
        [{
          content:
            'Instructivo para la elaboración del informe pericial de reconocimiento técnico mecánico y avalúo de daños materiales, registrado con Código PEN-GIF-GAV-EIPRTMADM-INSTR-005 VERSION 1.0; Ley de Reforma Tributaria; Norma Técnica Ecuatoriana INEN 2656 “CLASIFICACIÓN VEHICULAR”; REGLAMENTO TÉCNICO ECUATORIANO RTE INEN 034 (4R) “ELEMENTOS MINIMOS DE SEGURIDAD EN VEHICULOS AUTOMOTORES”; Reglamento del Sistema Pericial Integral de la -unción Judicial, Resolución 147-2022; Principios de la Física y teoría de la Energía Cinética.\n \n' +
            'La inspección ocular técnica y la descripción de los daños materiales de un vehículo, se lo realiza en sentido horario, de abajo hacia arriba, de izquierda a derecha, inicia desde la inspección externa, luego la inspección interna, y termina con la inspección de los sistemas. La inspección externa se lo realiza dividiendo cada uno de los laterales, como también la parte frontal, posterior y techo en tres partes iguales para su análisis, tomando como fórmula pieza daño ubicación para su descripción, luego viene la inspección interna que se lo realiza por el costado derecho y terminando con la inspección de los sistemas de adelante hacia atrás.\n \n' +
            'La cuantificación de daños materiales, producto de un siniestro de tránsito, tiene como fundamento técnico la valoración del daño producido, con enfoque a restituir el bien, mueble o inmueble, objeto de pericia, a iguales condiciones y características, a las que hubiera tenido de no haberse suscitado el hecho o acontecimiento de tránsito. Se considera que el valor de la cuantía de daños materiales es valorado mediante un método de análisis técnico, con los precios establecidos en el mercado nacional, en fuentes abiertas y cerradas.',
          colSpan: 7
        }],
      ],
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 1,
        overflow: 'linebreak',
        cellWidth: 'auto',
      },
    });
    

    doc.addPage();
    autoTable(doc, {
      body: [
        [
          {
            content:'4.OPERACIONES REALIZADAS', 
            colSpan: 5, styles: { fillColor: [240, 240, 240], fontStyle: 'bold' } 
          }
        ],
        [{
          content: 'UBICACION DEL OBJETO DE PERICIA',
          colSpan: 5, styles: { fontStyle: 'bold', halign: 'center' }
        }],
        [
         {content:'ZONA', colSpan: 1, },
         {content: 'SUBZONA', colSpan: 1,},
         {content:'DISTRITO', colSpan: 1},
         {content: 'CIRCUITO', colSpan: 2}, 
        ],
        [
          {content: ZonaUbicacion, colSpan: 1},
          {content: SubZonaUbicacion, colSpan: 1},
          {content: DistritoUbicacion, colSpan: 1},
          {content: Circuito, colSpan: 2},
        ],
        [
          {content:'SUBCIRCUITO', colSpan: 1},
          {content:'CODIGO SUBCIRCUITO', colSpan: 1},
          {content:'LATITUD', colSpan: 1},
          {content:'LONGITUD', colSpan: 2},
        ],
        [
          {content:SubCircuito, colSpan: 1},
          {content:CodigoSubCircuito, colSpan: 1},
          {content:Latitud, colSpan: 1},
          {content:Longitud, colSpan: 2},
        ],
        [
          {content:'Lugar', colSpan: 1},
          {content:'CUSTODIO/PROPIETARIO', colSpan: 1},
          {content:'H.I/C.C', colSpan: 1},
          {content:'CEDULA', colSpan: 1},
          {content:'FECHA', colSpan: 1}, 
        ],
        [
          {content:Lugar, colSpan: 1},
          {content:Propietario, colSpan: 1},
          {content:Hicc, colSpan: 1},
          {content:Cedula, colSpan: 1},
          {content:fechaUbicacion, colSpan: 1},
        ],
        [{content:'FASE 1: IDENTIFICACION DEL OBJETO DE PERICIA', 
          colSpan: 5, styles: { fillColor: [240, 240, 240], fontStyle: 'bold' }}],
        [
          {content:'PROPIETARIO', colSpan: 1},
          {content:propidentificacion, colSpan: 4},
        ],
        [
          {content:'PLACA ACTUAL', colSpan: 1},
          {content:antecedente, colSpan: 4},
        ],
        [
          {content:'CHASIS (VIN) N°', colSpan: 1},
          {content:NumeroChasis, colSpan: 4},
        ],
        [
          {content:'MOTOR N°', colSpan: 1},
          {content:NumeroMotor, colSpan: 4},
        ],
        [
          {content:'MARCA', colSpan: 1},
          {content:Marca, colSpan: 4},
        ],
        [
          {content:'MODELO', colSpan: 1},
          {content:Modelo, colSpan: 4},
        ],
        [
          {content:'CLASE', colSpan: 1},
          {content:Clase, colSpan: 4},
        ],
        [
          {content:'TIPO', colSpan: 1},
          {content:Tipo, colSpan: 4},
        ],
        [
          {content:'COLOR', colSpan: 1},
          {content:Color, colSpan: 4},
        ],
        [
          {content:'AÑO', colSpan: 1},
          {content:Anio, colSpan: 4},
        ],
        [
          {content:'TIPO DE MOTOR', colSpan: 1},
          {content:TipoMotor, colSpan: 4},
        ],
        [
          {content:'COOPERATIVA', colSpan: 1},
          {content:Cooperativa, colSpan: 4},
        ],
        [
          {content:'DISCO N°', colSpan: 1},
          {content:Disco, colSpan: 4},
        ],
        [
          {content:'OBSERVACIÓN', colSpan: 1},
          {content:Observacionesidentificacion, colSpan: 4},
        ],
        [
          {content:'FUENTE DE INFORMACIÓN', colSpan: 1},
          {content:fuenteinformacion, colSpan: 4},
        ],
        [
          {content:'FOTOGRAFÍA N° 1. De conjunto', colSpan: 1, styles: { fontStyle: 'italic' }},
          {content: foto1, colSpan: 4},
        ],
        [
          {content:'FASE 2: DESCRIPCION DE DAÑOS MATERIALES', 
            colSpan: 5, styles: { fillColor: [240, 240, 240], fontStyle: 'bold' }},
        ],
        [{content: 'ZONA EXTERIOR', colSpan: 5, styles: { fontStyle: 'bold', halign: 'center'}}],
        [
          {content:'PARTE FRONTAL', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:''
            , colSpan: 4
          }
        ],
        [
          {content:'LATERAL DERECHO', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', 
            colSpan: 4
          }
        ],
        [
          {content:'PARTE POSTERIOR', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4},
        ],
        [
          {content: 'LATERAL IZQUIERDO', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4},
        ],
        [
          {content:'TECHO', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4},
        ],
        [
          {content:'ZONA INTERIOR', colSpan: 5, styles: { fontStyle: 'bold', halign: 'center' }},
        ],
        [
          {content:'CABINA', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4},
        ],
        [
          {content:'CHASIS', colSpan: 5, styles: { fontStyle: 'bold', halign: 'center' }},
        ],
        [
          {content:'MONOCASCO', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4},
        ],
        [
          {content:'SISTEMAS INTEGRALES DEL VEHICULO', colSpan: 5, styles: { fontStyle: 'bold' , halign: 'center'}},
        ],
        [
          {content:'MOTOR', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4},
        ],
        [
          {content:'SISTEMA DE PROPULSION O TRASMISION', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4},
        ],
        [
          {content:'SISTEMA DE TRACCION', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4},
        ],
      ],
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 1,
        overflow: 'linebreak',
        cellWidth: 'auto',
      },
    });

    doc.addPage();
    autoTable(doc, {
      body: [
        [
          {content:'SISTEMA DE SUSPENSION', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4},
        ],
        [
          {content:'SISTEMA DE DIRRECCION', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4},
        ],
        [
          {content:'SISTEMA DE FRENOS', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4},
        ],
        [
          {content:'SISTEMA ELÉCTRICO Y DE ENCENDIDO', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4},	
        ],
        [
          {content:'SISTEMA ELÉCTRONICO', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4},
        ],
        [
          {content:'SISTEMA DE ALUMBRADO', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4}, 
        ],
        [
          {content:'SISTEMA DE REFFRIGERACION', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4},
        ],
        [
          {content:'SISTEMA DE ALIMENTACION Y ESCAPE', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4},
        ],
        [
          {content:'OTROS', colSpan: 1, styles: { fontStyle: 'bold' }},
          {content:'', colSpan: 4,},
        ],

        [
          {content:'', colSpan: 5,
            styles:{ fillColor: [255, 255, 255], fontStyle: 'bold', textColor: [255, 255, 255], lineColor: [255, 255, 255] }
          },
        ],
        [
          {content:'FOTOGRAFIAS', colSpan: 5, styles: { fillColor: [240, 240, 240], fontStyle: 'bold' }},
        ],
        [
          {
            content: foto2,
            colSpan: 2,
            styles: { cellWidth: 80, minCellHeight: 60 }
          },
          {
            content: await this.getImageForPdf(foto3),
            colSpan: 3,
            styles: { cellWidth: 80, minCellHeight: 60 }
          },
        ],
        [
          {content:'FOTOGRAFIA No. 2 De semiconjunto, vértice anterior izquierdo',colSpan:2, styles: { fontStyle: 'italic' }},
          {content:'FOTOGRAFIA No. 3 De semiconjunto, vértice anterior derecho',colSpan:3, styles: { fontStyle: 'italic' }},
        ],
        [
          {content:foto4,colSpan:2,
            styles: { cellWidth: 80, minCellHeight: 60 }
          },
          {content:foto5,colSpan:3,
            styles: { cellWidth: 80, minCellHeight: 60 }
          },
        ],
        [
          {content:'FOTOGRAFIA No. 4 De semiconjunto, vértice posterior derecho',colSpan:2, styles: { fontStyle: 'italic' }},
          {content:'FOTOGRAFIA No. 5 De semiconjunto, vértice posterior izquierdo',colSpan:3, styles: { fontStyle: 'italic' }},
        ],
      ],
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 1,
        overflow: 'linebreak',
        cellWidth: 'auto',
      },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' }
      }
    });

    doc.addPage();
    autoTable(doc, {
      body: [
        [
          {content:foto6,colSpan:2,
            styles: { cellWidth: 80, minCellHeight: 60 }
          },
          {content:foto7,colSpan:2,
            styles: { cellWidth: 80, minCellHeight: 60 }
          },
        ],
        [
          {content:'FOTOGRAFIA No. 6 De detalle, vértice anteiror derecho',colSpan:2, styles: { fontStyle: 'italic' }},
          {content:'FOTOGRAFIA No. 7 De detalle, vértice anterior izquierdo',colSpan:2, styles: { fontStyle: 'italic' }},
        ],
        [
          {content:'5. CONCLUSIONES',colSpan:4, styles: { fillColor: [240, 240, 240], fontStyle: 'bold' }},
        ],
        [
          {content:conclusiones,colSpan:4,},
        ],
        [
          {content:'6. INFORMACION ADICIONAL',colSpan:4, styles: { fillColor: [240, 240, 240], fontStyle: 'bold' }},
        ],
        [
          {content:informacionadicional,colSpan:4,},
        ],
        [
          {content:'7. ANEXOS',colSpan:4, styles: { fillColor: [240, 240, 240], fontStyle: 'bold' }},
        ],
        [
          {content:anexos,colSpan:4,},
        ],
        [
          {content:'8. DECLARACION JURAMENTADA',colSpan:4, styles: { fillColor: [240, 240, 240], fontStyle: 'bold' }},
        ],
        [
          {content:declaracionjuramentada,colSpan:4,},
        ],
        [
          {content:'9. FIRMA DEL FUNCIONARIO RESPONSABLE',colSpan:4, styles: { fillColor: [240, 240, 240], fontStyle: 'bold' }},
        ],
        [
          {content:'GRADO, APELLIDOS Y NOMBRES',colSpan:2, styles: { fontStyle: 'bold' }},
          {content:'CEDULA',colSpan:1, styles: { fontStyle: 'bold' }},
          {content:'FIRMA',colSpan:1, styles: { fontStyle: 'bold' }},
        ],
        [
          {content:gradonombresyapellidos,colSpan:2,},
          {content:cedulafuncionario,colSpan:1,},
          {content:'',colSpan:1,},
        ],
        [
          {content: 'TELEFONO', styles: {fontStyle: 'bold'}},
          {content: telefonofuncionario, colSpan: 1, styles: {halign: 'left'}},
          {content: 'CORREO', styles: {fontStyle: 'bold'}},
          {content: correofuncionario, colSpan: 1, styles: {halign: 'left'}}
        ]
      ],
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 1,
        overflow: 'linebreak',
      },
      tableWidth: 'auto',
    });

  // Guardamos el PDF directamente en el dispositivo
  const pdfOutput = doc.output('arraybuffer');
  const fileName = `Informe_${fechaActual}.pdf`;

  if (Capacitor.isNativePlatform()) {
    await this.guardarPDFEnDispositivo(pdfOutput, fileName);
  } else {
    this.guardarPDFEnNavegador(doc, fileName);
  }

  // Limpiamos los formularios y navegamos después de guardar
  this.limpiarFormularios();
  await this.navCtrl.navigateRoot('/tabs');

  // Mostramos un mensaje de éxito
  this.mostrarMensajeExito();

}
private async guardarPDFEnDispositivo(pdfOutput: ArrayBuffer, fileName: string) {
  try {
    const result = await Filesystem.writeFile({
      path: fileName,
      data: btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(pdfOutput)))),
      directory: Directory.Documents,
    });

    console.log('Archivo guardado en:', result.uri);
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
    this.mostrarError('No se pudo guardar el PDF. Por favor, intente nuevamente.');
  }
}

private guardarPDFEnNavegador(doc: jsPDF, fileName: string) {
  doc.save(fileName);
}

private async mostrarMensajeExito() {
  const toast = await this.toastController.create({
    message: 'Informe guardado exitosamente',
    duration: 2000,
    position: 'bottom'
  });
  toast.present();
}

async descargarPDF() {
  const confirmacion = await this.alertController.create({
    header: 'Confirmar descarga',
    message: '¿Está seguro de que desea descargar el informe?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Descargar',
        handler: () => {
          this.GenerarPDF();
        }
      }
    ]
  });

  await confirmacion.present();
}

limpiarFormularios() {
  // Aquí debes resetear todos tus formularios
  // Por ejemplo:
  this.DatosGeneralesForm.reset();
  this.UbicacionPericialForm.reset();
  this.IdentificacionPericialForm.reset();
  this.FotografiasForm.reset();
  this.ConclusionesForm.reset();
}

async mostrarError(mensaje: string) {
  const alert = await this.alertController.create({
    header: 'Error',
    message: mensaje,
    buttons: ['OK']
  });

  await alert.present();
}


async getImageForPdf(imageData: string): Promise<any> {
  if (!imageData) {
    return ''; // Retorna una cadena vacía si no hay datos de imagen
  }

  // Si ya es una imagen base64, úsala directamente
  if (imageData.startsWith('data:image')) {
    return { image: imageData, fit: [80, 60] };
  }

  // Para otros casos (como rutas de archivo en plataformas nativas)
  if (Capacitor.isNativePlatform()) {
    try {
      const file = await Filesystem.readFile({
        path: imageData,
        directory: Directory.Data
      });
      const base64Image = `data:image/jpeg;base64,${file.data}`;
      return { image: base64Image, fit: [80, 60] };
    } catch (error) {
      console.error('Error al leer la imagen:', error);
      return '';
    }
  }

  return ''; // Retorna una cadena vacía si no se pudo procesar la imagen
}
}
