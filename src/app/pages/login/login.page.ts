import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

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

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  async authenticate() {
    const data = {
      username: this.usuario.username,
      password: this.usuario.password,
    };

    this.http.post<LoginResponse>('http://localhost:3007/login', data).subscribe(

      async (response) => {
        console.log('Respuesta del servidor:', response);
        if (response.success) {
          console.log('Inicio de sesión con éxito');
          this.router.navigate(['/plantas']);
        } else {
          
          console.log('Usuario y/o contraseña incorrecta');
          const loginToast = await this.toastController.create({
            message: 'Usuario y/o contraseña incorrecta',
            duration: 2000,
            color: 'danger',
            position: 'top' // Agrega esta línea para especificar la posición del toast
          });

          loginToast.present();
        }
        
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        // Aquí puedes mostrar un mensaje de error al usuario.
        
      }
      
    );
  }
}
