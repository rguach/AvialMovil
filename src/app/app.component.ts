import { Component } from '@angular/core';
import { Camera } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';
import { Filesystem } from '@capacitor/filesystem';

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

  // async requestPermissions() {
  //   try {
  //     // Solicitar permisos de cámara
  //     const cameraPermission = await Camera.checkPermissions();
  //     if (cameraPermission.camera !== 'granted') {
  //       await Camera.requestPermissions();
  //     }
  //     console.log('Camera permission:', cameraPermission);

  //     // Solicitar permisos de almacenamiento (ahora se maneja a través de Filesystem)
  //     const storagePermission = await Filesystem.checkPermissions();
  //     if (!storagePermission.publicStorage) {
  //       await Filesystem.requestPermissions();
  //     }
  //     console.log('Storage permission:', storagePermission);
  //   } catch (error) {
  //     console.error('Error requesting permissions:', error);
  //   }
  // }
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
