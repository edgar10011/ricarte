import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user_data';

  constructor() { }

  // Método para obtener el token
  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token;
  }

  // Método para almacenar el token
  storeToken(token: string): void {
    console.log('Token recibido del servidor:', token);
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Método para cerrar sesión
  logout() {
    // Eliminar los datos del usuario del almacenamiento local
    localStorage.removeItem(this.USER_KEY);
  }

  // Obtener el usuario autenticado desde el almacenamiento local
  getAuthenticatedUser(): { username: string, token: string } | null {
    const userData = localStorage.getItem(this.USER_KEY);
    if (userData) {
      const user = JSON.parse(userData);
      return user;
    }
    return null;
  }
}
