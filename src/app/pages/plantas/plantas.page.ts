import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { MiModalPage } from '../../services/mi-modal/mi-modal.page';


interface Plantita {
  imagen: string;
  titulo: string;
  humedad?: number; // Opcional
}

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.page.html',
  styleUrls: ['./plantas.page.scss'],
})
export class PlantasPage implements OnInit {
  plantas: Plantita[] = [];
  archivos: File[] = [];

  nuevaPlanta: Plantita = {
    imagen: '',
    titulo: '',
  };

  plantaSeleccionada: Plantita = {
    imagen: '',
    titulo: '',
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
  
  recargarPagina() {
    window.location.reload();
  }

  obtenerPlantas() {
    this.http.get<Plantita[]>('http://localhost:3007/Integradora/plantitas').subscribe(
      (data) => {
        console.log(data);
        this.plantas = data;
      },
      (error) => {
        console.error('Error al obtener plantas de la base de datos:', error);
      }
    );
  }

  capturarFile(event: any) {
    const archivoCapturado = event.target?.files[0];
    if (archivoCapturado) {
      this.archivos.push(archivoCapturado);
    }
  }

  async agregarPlanta() {
    try {
      const url = 'http://localhost:3007/Integradora/plantitas';

      if (this.archivos.length > 0) {
        const base64Image = await this.convertirABase64(this.archivos[0]);
        this.nuevaPlanta.imagen = base64Image;
      }

      await this.guardarPlanta(url);
    } catch (error) {
      console.error('Error al agregar planta:', error);
    }
  }

  async editarPlanta(planta: Plantita) {
    this.plantaSeleccionada = planta; // Cargar datos de la planta seleccionada en el modal
  }

  async convertirABase64(archivo: File): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const reader = new FileReader();

        reader.onload = async (event) => {
          if (event.target && event.target.result) {
            resolve(event.target.result as string);
          } else {
            reject(new Error('No se pudo leer el archivo.'));
          }
        };

        reader.onerror = (event) => {
          //reject(event.target.error || new Error('Error al leer el archivo.'));
        };

        reader.readAsDataURL(archivo);
      } catch (error) {
        reject(error);
      }
    });
  }

  async openAddModal() {
    const modal = await this.modalController.create({
      component: MiModalPage,
      cssClass: 'my-custom-class',
    });

    return await modal.present();
  }

  async guardarPlanta(url: string) {
    try {
      const response = await this.http.post(url, this.nuevaPlanta).toPromise();
      console.log('Planta agregada:', response);

      this.nuevaPlanta = {
        imagen: '',
        titulo: '',
      };
      this.archivos = [];
    } catch (error) {
      console.error('Error al agregar planta:', error);
    }
  }
}
