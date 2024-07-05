import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { environment } from 'src/environments/environment';
import { RutasBackend } from '../common/helpers/RutasBackend';
import { VehiculosPlacaResponse } from '../common/DTO/VehiculosPlacaResponse';

@Injectable({
  providedIn: 'root'
})
export class VehiculoPorPlacasServiceService {

  constructor() { }

  async getVehiculoPorPlacas(placa:string){
    const response:AxiosResponse<VehiculosPlacaResponse>=await axios.get(`${environment.baseUrl}${RutasBackend.vehiculosPorPlaca.Get}?placa=${placa}`);
    return response.data;
  }
}
