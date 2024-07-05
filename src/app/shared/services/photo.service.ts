import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory, FilesystemDirectory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import { UserPhoto } from './UserPhoto';
import { FormGroup } from '@angular/forms';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';

  constructor(private platform: Platform) {}

  public async addNewToGallery(index: number, formGroup: FormGroup) {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 90
      });

      if (capturedPhoto.base64String) {
        const savedImageFile = await this.savePicture(capturedPhoto.base64String, index);
        this.photos[index] = savedImageFile;

        formGroup.get(`foto${index + 0}`)?.setValue(savedImageFile.webviewPath);
        await this.savePhotosToStorage();
        console.log(`Foto ${index + 0} guardada:`, savedImageFile.webviewPath);
      }
    } catch (error) {
      console.error('Error al capturar la foto', error);
      throw error;
    }
  }

  public async savePicture(base64Data: string, index: number): Promise<UserPhoto> {
    const fileName = `photo_${index + 0}_${new Date().getTime()}.jpeg`;
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
    const webviewPath = this.platform.is('hybrid')
      ? Capacitor.convertFileSrc(savedFile.uri) // Utiliza convertFileSrc para obtener el webviewPath
      : `data:image/jpeg;base64,${base64Data}`;

    return {
      index: index,
      filepath: fileName,
      webviewPath: webviewPath
    };
  }

  public async loadSavedPhotos() {
    const photoList = await Preferences.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value || '[]');

    for (let photo of this.photos) {
      if (this.platform.is('hybrid')) {
        // Utiliza convertFileSrc para obtener el webviewPath desde el URI del archivo guardado
        photo.webviewPath = Capacitor.convertFileSrc(photo.filepath);
      } else {
        // En web, mantener la lógica actual si webviewPath ya es base64
        if (photo.webviewPath && !photo.webviewPath.startsWith('data:image')) {
          photo.webviewPath = `data:image/jpeg;base64,${photo.webviewPath}`;
        }
      }
    }
  }

  public async savePhotosToStorage() {
    await Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });
  }

public async getBase64Images(images: string[]): Promise<{ [key: string]: string }> {
  const base64Images: { [key: string]: string } = {};
  for (let i = 0; i < images.length; i++) {
    try {
      if (images[i].startsWith('data:image')) {
        // Si ya es una cadena base64, úsala directamente
        base64Images[`foto${i + 1}`] = images[i];
      } else {
        // Si es una ruta de archivo, lee el archivo
        const file = await Filesystem.readFile({
          path: images[i],
          directory: Directory.Data
        });
        base64Images[`foto${i + 1}`] = 'data:image/jpeg;base64,' + file.data;
      }
    } catch (error) {
      console.error(`Error al procesar la imagen ${i + 1}:`, error);
      base64Images[`foto${i + 1}`] = '';
    }
  }
  return base64Images;
}
}
