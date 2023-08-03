import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'user_data';

  constructor() { }

  // Método para cerrar sesión
  logout() {
    // Eliminar los datos del usuario del almacenamiento local
    localStorage.removeItem(this.USER_KEY);
  }

  // Otros métodos relacionados con la autenticación y el manejo de la sesión del usuario
}
