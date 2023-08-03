import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario = {
    username: '',
    password: '',
  };

  constructor(private router: Router, private http: HttpClient) {}

  authenticate() {
    console.log('Cargando inicio');
    const data = {
      username: this.usuario.username,
      password: this.usuario.password,
    };

    this.http.post<LoginResponse>('http://localhost:3004/login', data).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        if (response.success) {
          console.log('Inicio de sesión con éxito');
          // Aquí puedes redirigir al usuario a la página de inicio de sesión exitosa o mostrar un mensaje.
          this.router.navigate(['/plantas']);
        } else {
          console.log('Usuario y/o contraseña incorrecta');
          // Aquí puedes mostrar un mensaje de error al usuario.
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        // Aquí puedes mostrar un mensaje de error al usuario.
      }
    );
  }
}

