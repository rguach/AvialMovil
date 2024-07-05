import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  results: string[] = [];

  itemsPerPage = 50;
  totalItems = 50; 

  currentPage = 1;

  constructor(private router: Router,  private alertController: AlertController) {}

  ngOnInit() {
    this.loadInitialResults();
  }

  private loadInitialResults() {
    this.results = this.generateResults(this.itemsPerPage);
  }

  private generateResults(count: number): string[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endIndex = startIndex + count - 1;
    const newResults = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const currentDate = new Date().toLocaleDateString(); // Obtener solo la fecha
      newResults.push(`${i}. ${currentDate}. Placa ${i}`);
    }
    return newResults;
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    if (this.results.length < this.totalItems) {
      const newResults = this.generateResults(this.itemsPerPage);
      this.results = [...this.results, ...newResults];
      ev.target.complete();
    } else {
      ev.target.disabled = true; // Deshabilitar scroll infinito cuando se alcanza el límite
    }
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    if (query.trim() === '') {
      this.loadInitialResults(); // Mostrar resultados originales cuando se borra la búsqueda
    } else {
      // Filtrar resultados basados en la búsqueda
      this.results = this.results.filter(result => result.toLowerCase().includes(query));
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      subHeader: '',
      message: 'Por favor, revice si el documento se encuentra en su dispositivo para poder visualizarlo.',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  NewReporte(){
    this.router.navigate(['/segments']);
  }

}
