import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Permissions } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    this.requestPermissions();
  }

  async requestPermissions() {
    try {
      // Solicitar permisos de cámara
      const cameraPermission = await Permissions['request']({
        name: 'camera'
      });
      console.log('Camera permission:', cameraPermission);

      // Solicitar permisos de almacenamiento
      const storagePermission = await Permissions['request']({
        name: 'storage'
      });
      console.log('Storage permission:', storagePermission);

    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  }
}
