import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
  // Añade aquí otros campos que pueda devolver tu API
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor(private router: Router) {}

  async authenticate(username: string, password: string): Promise<any> {
    try {
      console.log('Enviando solicitud de autenticación...');
      const response: AxiosResponse<any> = await axios.post(
        `${environment.baseUrl}/api/Usuarios/Autenticate`,
        { username, password }
      );
  
      console.log('Respuesta completa del servidor:', response);
     if (response.data && response.data.token) {
        return { success: true, token: response.data.token };
      } else {
        return { success: false, message: 'No se recibió un token válido' };
      }
    } catch (error) {
      console.error('Error en AuthService:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Respuesta de error del servidor:', error.response.data);
          throw new Error(error.response.data.message || 'Error de autenticación');
        } else if (error.request) {
          throw new Error('No se recibió respuesta del servidor');
        } else {
          throw new Error('Error al configurar la solicitud');
        }
      } else {
        throw new Error('Ocurrió un error inesperado');
      }
    }
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