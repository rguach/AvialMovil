// Basic export interfaces

export interface IAdjunto {
  idAdjuntos: number;
  extension: string;
  mimeType: string;
  nombreArchivo: string;
  ruta: string;
}

export interface ICategoriaparte {
  idCategoriaParte: number;
  nombre: string;
}

export interface IClasevehiculo {
  idClaseVehiculo: number;
  clase: string;
}

export interface IDanio {
  idDanio: number;
  descripcion: string;
  nombre: string;
}

export interface IDivisionparte {
  idDivisionParte: number;
  nombre: string;
}

export interface IEmpresa {
  idEmpresa: number;
  nombre: string;
}

export interface IEmpresarepuesto {
  idEmpresaRepuesto: number;
  codigo: string;
  fechaActualizacion: Date;
  idEmpresa: number;
  marca: string;
  material: string;
  nombre: string;
  observacion: string;
  valor: number;
}

export interface IInforme {
  idInforme: number;
  codigo: string;
  edicion: number;
  emitidoPor: string;
  fecha: Date;
  itpn: string;
  titulo: string;
}

export interface IMarca {
  idMarca: number;
  nombre: string;
}

export interface IMaterial {
  idMaterial: number;
  nombre: string;
}

export interface IMenu {
  idMenu: number;
  descripcion: string;
  nombre: string;
}

export interface IModelo {
  idModelo: number;
  año: string;
  nombre: string;
  numeroChasis: string;
  numeroMotor: string;
  idClaseVehiculo: number;
  idMarca: number;
  idTipoVehiculo: number;
}

export interface IModelorepuesto {
  idModeloRepuesto: number;
  idModelo: number;
  idRepuestos: number;
  idEmpresaRepuesto: number;
}

export interface IModelotipoparte {
  idModeloTipoParte: number;
  idClaseVehiculo: number;
  idTipoParte: number;
  idTipoVehiculo: number;
}

export interface IPatioretencion {
  idPatioRetencion: number;
  circuito: string;
  codigoSubcircuito: string;
  distrito: string;
  latitud: string;
  longitud: string;
  nombre: string;
  propietario: string;
  subcircuito: string;
  subzona: string;
  zona: string;
}

export interface IReparacion {
  idReparacion: number;
  parametro: string;
  precioPorHora: number;
}

export interface IRepuesto {
  idRepuestos: number;
  idTipoParte: number;
  idUbicacion: number;
  lado: string;
}

export interface IRol {
  idRol: number;
  descripcion: string;
  nombre: string;
}

export interface IRolmenu {
  idRolMenu: number;
  idMenu: number;
  idRol: number;
}

export interface ITipoparte {
  idTipoParte: number;
  idAdjuntos: number;
  idCategoriaParte: number;
  idDivisionParte: number;
  nombre: string;
}

export interface ITipovehiculo {
  idTipoVehiculo: number;
  tipo: string;
}

export interface IUbicacion {
  idUbicacion: number;
  nombre: string;
}

export interface IUsuario {
  idUsuario: number;
  clave: string;
  nombreUsuario: string;
}

export interface IUsuariorol {
  idUsuarioRol: number;
  idRol: number;
  idUsuario: number;
}

export interface IMarcasYModelos {
  idMarca: number;
  nombre: string;
  modelos: IModelo[];
}
export interface InformeCompletoResponse{
  patiosRetencion: IPatioretencion[],
  marcas: IMarca[],
  
  categoriasParte: ICategoriaparte[],
  tipoVehiculo: ITipovehiculo[],
  clasevehiculo: IClasevehiculo[],
  ubicaciones: IUbicacion[],
  divisionesParte: IDivisionparte[]
  danos:IDanio[],
  materiales: IMaterial[],

}