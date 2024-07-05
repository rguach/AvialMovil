import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({});

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  async authenticate() {
    if (this.loginForm.valid) {
      console.log('Formulario válido, intentando autenticar...');
      try {
        const response = await this.authService.authenticate(
          this.loginForm.value.username!,
          this.loginForm.value.password!
        );
  
        console.log('Respuesta del servidor:', response);
  
        if (response && response.token) {
          console.log('Autenticación exitosa');
          
          localStorage.setItem('auth_token', response.token);
          console.log('Token guardado en localStorage');
  
          //timeout para asegurarnos de que la navegación se ejecuta después de guardar el token
          setTimeout(() => {
            this.navCtrl.navigateForward('/tabs')
          }, 100);
        } else {
          console.warn('La autenticación no fue exitosa:', response);
          await this.presentAlert('Error de autenticación', 'No se recibió un token válido. Por favor, intente de nuevo.');
        }
      } catch (error) {
        console.error('Error durante la autenticación:', error);
        let errorMessage = 'Ocurrió un error durante la autenticación. Por favor, intente más tarde.';
        
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        
        await this.presentAlert('Error', errorMessage);
      }
    } else {
      console.warn('Formulario inválido');
      await this.presentAlert('Formulario inválido', 'Por favor, complete todos los campos correctamente.');
    }
  }


  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}