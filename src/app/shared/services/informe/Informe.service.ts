import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from 'src/environments/environment';
import { RutasBackend } from '../../common/helpers/RutasBackend';
import { ResponseBackend } from '../../common/DTO/Response';
import { PatioRetencion } from '../../common/DTO/PatioRetencion';

@Injectable({
  providedIn: 'root'
})
export class PatioRetencionService {

  constructor() { }

  async getData(){
    const response:AxiosResponse<ResponseBackend<PatioRetencion>> = await axios.get(`${environment.baseUrl}${RutasBackend.patiosRetencion.get}`);
    if(response.status < 200 && response.status > 299){
      throw new Error('Error al obtener los datos'+response);
    }
    return response.data;
  }

  async create(){

  }

}
