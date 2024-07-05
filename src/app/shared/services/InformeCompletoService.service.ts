import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { InformeCompletoResponse } from '../common/DTO/Entidades';
import { environment } from 'src/environments/environment';
import { RutasBackend } from '../common/helpers/RutasBackend';

@Injectable({
  providedIn: 'root'
})
export class InformeCompletoService {

  constructor() { }

  async getDatos(){
    const response: AxiosResponse<InformeCompletoResponse> = await axios.get(`${environment.baseUrl}${RutasBackend.InformeCompleto.Get}`);
    console.log(response.data);
    return response.data;
  }

}
