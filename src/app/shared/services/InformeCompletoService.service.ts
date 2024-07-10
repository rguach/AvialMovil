import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { IMarca, IModelo, InformeCompletoResponse } from '../common/DTO/EntidadesInforme';
import { environment } from 'src/environments/environment';
import { RutasBackend } from '../common/helpers/RutasBackend';
import { ResponseBackend } from '../common/DTO/Response';

@Injectable({
  providedIn: 'root'
})
export class InformeCompletoService {

  constructor() { }

  async getDatos(){
    const response: AxiosResponse<InformeCompletoResponse> = await axios.get(`${environment.baseUrl}${RutasBackend.informeCopmpleto.get}`);
    console.log(response.data);
    return response.data;
  }

  async getMarcas(){
    const response: AxiosResponse<IMarca[]> = await axios.get(`${environment.baseUrl}${RutasBackend.vehiculos.getMarcas}`);
    console.log(response.data);
    return response.data;
  }

  async getModelos(idMarca:number|undefined){
    let response:AxiosResponse<ResponseBackend<IModelo[]>>;
    if(idMarca !==undefined){
      response = await axios.get(`${environment.baseUrl}${RutasBackend.vehiculos.getModelos}?IdMarca=${idMarca}`);
    }else{
       response = await axios.get(`${environment.baseUrl}${RutasBackend.vehiculos.getModelos}`);
    }
    console.log("MODELOS",response.data);
    return response.data.data;
  }
  


}
