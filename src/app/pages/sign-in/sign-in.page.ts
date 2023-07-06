import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {
  username!: string;
  password!: string;

  constructor(private router: Router) {}

  register() {
    if (this.username && this.password) {
      // Aquí puedes agregar la lógica para procesar el registro,
      // como enviar los datos al servidor o guardarlos en una base de datos.

      // Ejemplo básico de redirección después del registro exitoso
      this.router.navigate(['/dashboard']);
    }
  }
}
