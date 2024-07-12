import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { ResponseBackend } from '../../common/DTO/Response';
import {  ConsultaPresupuestoResponse, ICalcularDañosDTO, ICategoriaparte, IDanio, IDivisionparte, ITipoparte, IUbicacion } from '../../common/DTO/EntidadesInforme';
import { environment } from 'src/environments/environment';
import { RutasBackend } from '../../common/helpers/RutasBackend';

@Injectable({
  providedIn: 'root'
})
export class DaniosService {

  constructor() { }

  async getTipoPartes(){
    const response: AxiosResponse<ResponseBackend<ITipoparte[]>> = await axios.get(`${environment.baseUrl}${RutasBackend.tipoPartes.get}`);
    return response.data
  }

  async getDivisionPartes(idDivisionParte?:number){
    let response: AxiosResponse<ResponseBackend<IDivisionparte[]>>;
    if(idDivisionParte!==undefined){
      response= await axios.get(`${environment.baseUrl}${RutasBackend.divisionPartes.get}?IdDivisionParte=${idDivisionParte}`);
    }else{
      response= await axios.get(`${environment.baseUrl}${RutasBackend.divisionPartes.get}`);
    }

    return response.data
  }

  async getCategoria(idCategoria?:number){
    let response: AxiosResponse<ResponseBackend<ICategoriaparte[]>>;
    if(idCategoria!==undefined){
      response= await axios.get(`${environment.baseUrl}${RutasBackend.categoriaPartes.get}?IdCategoriaParte=${idCategoria}`);
    }else{
      response= await axios.get(`${environment.baseUrl}${RutasBackend.categoriaPartes.get}`);
    }

    return response.data
  }

  async getUbicaciones(idUbicacion?:number|undefined){
    let response: AxiosResponse<ResponseBackend<IUbicacion[]>>;
    if(idUbicacion!==undefined){
      response= await axios.get(`${environment.baseUrl}${RutasBackend.ubicaciones.get}?IdUbicacion=${idUbicacion}`);
    }else{
      response= await axios.get(`${environment.baseUrl}${RutasBackend.ubicaciones.get}`);
    }

    return response.data
  }

  async getDanios(idDanio?:number|undefined){
    let response: AxiosResponse<ResponseBackend<IDanio[]>>;
    if(idDanio!==undefined){
      response= await axios.get(`${environment.baseUrl}${RutasBackend.danios.get}?IdDanio=${idDanio}`);
    }else{
      response= await axios.get(`${environment.baseUrl}${RutasBackend.danios.get}`);
    }

    return response.data
  }

  async cotizarDaños(detalles: ICalcularDañosDTO): Promise<ResponseBackend<ConsultaPresupuestoResponse>> {
    const data = {
      danios: detalles.danios.map(d => ({
        tipoParte: d.tipoParte,
        ubicacion: d.ubicacion,
        danio: d.danio
      })),
      modelo: detalles.modelo,
      anioVehiculo: detalles.anioVehiculo
    };

    try {
      const response: AxiosResponse<ResponseBackend<ConsultaPresupuestoResponse>> = await axios.post(
        `${environment.baseUrl}${RutasBackend.informeCopmpleto.post}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error al cotizar daños:', error);
      throw error;
    }
  }



}
