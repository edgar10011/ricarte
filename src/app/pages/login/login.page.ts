import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username!: string;
  password!: string;

  constructor(private router: Router) {}

  login() {
    if (this.username && this.password) {
      // Aquí puedes agregar la lógica para verificar las credenciales del usuario
      // y realizar las acciones necesarias, como enviar la solicitud al servidor
      // o verificar los datos en una base de datos.

      // Ejemplo básico de redirección después del inicio de sesión exitoso
      if (this.username === 'usuario' && this.password === 'contraseña') {
        this.router.navigate(['/dashboard']);
      } else {
        // Mostrar mensaje de error, las credenciales no son válidas
      }
    }
  }
}
