import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  success: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  authenticate() {
    console.log('Cargando inicio');
    const data = {
      username: this.username,
      password: this.password,
    };

    this.http.post<LoginResponse>('http://localhost:3004/authenticate', data).subscribe(
      (response) => {
        console.log('Respuesta del servidor: ', response);
        if (response.success) {
          console.log('Inicio de sesión exitoso');
          this.router.navigate(['/plantas']); // Reemplaza 'plantas' con la ruta correcta para la página de plantas
        } else {
          console.log('Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        console.log('Hubo un error durante el inicio de sesión.');
        // Agregar lógica para mostrar mensaje de error al usuario, por ejemplo, con un Toast o un mensaje en la interfaz de usuario.
      }
    );
  }
}
