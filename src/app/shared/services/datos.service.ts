import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class DatosService {
  private dataStorage: any[] = [];
  
  constructor() {
    this.testDatabaseConnection().then(() => {
      console.log('Inicialización de la base de datos completada');
    }).catch((error) => {
      console.error('Error durante la inicialización de la base de datos', error);
    });
  }

  async guardarDatosGenerales(datos: any): Promise<void> {
    try {
       const resultado= this.dataStorage.push(datos);
      console.log('Datos generales guardados con éxito:', resultado);
    } catch (error) {
      console.error('Error al guardar los datos generales', error);
      throw error;
    }
  }

  async obtenerDatosGenerales(): Promise<any[]> {
    try {
      return this.dataStorage;
    } catch (error) {
      console.error('Error al obtener los datos generales', error);
      throw error;
    }
  }

  async obtenerUltimosDatosGenerales(): Promise<any> {
    try {
      if (this.dataStorage.length > 0) {
        return this.dataStorage[this.dataStorage.length - 1];
      } else {
        throw new Error('No hay datos disponibles');
      }
    } catch (error) {
      console.error('Error al obtener los últimos datos generales', error);
      throw error;
    }
  }

  async testDatabaseConnection(): Promise<void> {
    try {
      const result = await this.obtenerDatosGenerales();
      console.log('Conexión a la base de datos exitosa. Datos obtenidos:', result);
    } catch (error) {
      console.error('Error al probar la conexión a la base de datos', error);
    }
  }
}
