import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService';



@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.page.html',
  styleUrls: ['./plantas.page.scss'],
})
export class PlantasPage {

  constructor(private router: Router, private authService: AuthService) { }

  logout() {
    // Aquí iría la lógica para cerrar la sesión, por ejemplo, borrar los datos del usuario en el almacenamiento local o en el servicio de autenticación.
    // Luego, redirigir al usuario a la página de inicio de sesión.
    this.authService.logout();
    console.log('Sesión cerrada')
    // Ejemplo de redirección a la página de inicio de sesión:
    this.router.navigate(['/login']);
  }
}
