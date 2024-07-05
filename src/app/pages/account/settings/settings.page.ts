import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  darkModeEnabled: boolean = false;
  notificationsEnabled: boolean = true;
  private token: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    console.log('Obtener configuración del usuario');
  }

  editProfile() {
    console.log('Editar perfil');
  }

  changeEmail() {
    console.log('Cambiar correo electrónico');
  }

  changePassword() {
    console.log('Cambiar contraseña');
  }
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('auth_token');
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

}
