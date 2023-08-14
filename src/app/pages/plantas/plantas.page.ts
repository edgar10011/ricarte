import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService';
import { HttpClient } from '@angular/common/http';
import { IonModal, ModalController } from '@ionic/angular';
import { MiModalPage } from '../../services/mi-modal/mi-modal.page'; 

interface Plantita {
  imagen: string;
  titulo: string;
  humedad: number;
}

interface NuevaPlanta {
  imagen: string;
  titulo: string;
  humedad: number;
}


@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.page.html',
  styleUrls: ['./plantas.page.scss'],
})
export class PlantasPage implements OnInit {
  component = PlantasPage;
  plantas: Plantita[] = [];

  nuevaPlanta: NuevaPlanta = {
    imagen: '',
    titulo: '',
    humedad: 0,
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient, 
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.obtenerPlantas();
  }

  logout() {
    this.authService.logout();
    console.log('Sesión cerrada');
    this.router.navigate(['/login']);
  }

  obtenerPlantas() {
    this.http.get<Plantita[]>('http://localhost:3007/Integradora/plantitas').subscribe(
      (data) => {
        console.log(data); // Agrega este console.log() para verificar los datos recibidos
        this.plantas = data;
      },
      (error) => {
        console.error('Error al obtener plantas de la base de datos:', error);
      }
    );
  }

  async agregarPlanta(){
    try {
      const url = 'http://localhost:3007/Integradora/plantitas'; // Cambia esta URL según tu API
      const response = await this.http.post(url, this.nuevaPlanta).toPromise();

      console.log('Planta agregada:', response);

      // Limpia el formulario después de agregar
      this.nuevaPlanta = {
        imagen: '',
        titulo: '',
        humedad: 0,
      };
    } catch (error) {
      console.error('Error al agregar planta:', error);
    }
  }

  async openAddModal() {
    const modal = await this.modalController.create({
      component: MiModalPage, // ID del modal
      cssClass: 'my-custom-class' // Clase de estilos personalizados para el modal
    });

    return await modal.present();
  }

  closeAddModal() {
    this.modalController.dismiss();
  }

  // async agregarPlanta() {
  //   try {
  //     const url = 'http://localhost:3007/Integradora/plantitas'; // Cambia esta URL según tu API
  //     const response = await this.http.post(url, this.nuevaPlanta).toPromise();

  //     console.log('Planta agregada:', response);

  //     // Limpia el formulario después de agregar
  //     this.nuevaPlanta = {
  //       imagen: '',
  //       titulo: '',
  //       humedad: 0,
  //     };
  //   } catch (error) {
  //     console.error('Error al agregar planta:', error);
  //   }
  // }
}
