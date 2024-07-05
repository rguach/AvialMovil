import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any = {};
  private imagenes: string[] = [];

  setData(key: string, value: any): void {
    this.data[key] = value;
  }

  getData(key: string): any {
    return this.data[key];
  }

  // Métodos para manejar imágenes
  guardarImagen(imagen: string): void {
    if (imagen) {
      this.imagenes.push(imagen);
      localStorage.setItem('imagenes', JSON.stringify(this.imagenes));
    }
  }

obtenerImagenes(): string[] {
  const storedImages = localStorage.getItem('imagenes');
  if (storedImages) {
    return JSON.parse(storedImages);
  }
  return [];
}

  limpiarImagenes(): void {
    this.imagenes = [];
    localStorage.removeItem('imagenes');
  }
}
