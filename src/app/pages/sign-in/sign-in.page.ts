import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular'; // Importa el ToastController


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {
  constructor(private router: Router, private http: HttpClient, private toastController: ToastController) { }
  
  user: { username: string; password: string } = { username: '', password: '' };
  username: string = '';
  password: string = '';
  confirmPassword: string = ''; // Nuevo campo para confirmar contraseña

  async register() {
    if (this.password !== this.confirmPassword) {
      // Las contraseñas no coinciden
      console.log('Las contraseñas no coinciden');

      // Crea y muestra un Toast
      const toast = await this.toastController.create({
        message: 'Las contraseñas no coinciden',
        duration: 2000, // Duración del Toast en milisegundos
        color: 'danger' // Color del Toast (opcional)
      });
      toast.present();

      return;
    }

    console.log('Cargando registro');
    const data = {
      username: this.username,
      password: this.password,
    };

    this.http.post('http://localhost:3007/register', data).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['../login']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
