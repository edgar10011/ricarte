import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { MiModalPage } from '../../services/mi-modal/mi-modal.page';

interface Plantita {
  imagen: string;
  titulo: string;
  humedad?: number;
  id:0
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
    id:0,
    titulo: ''
  };

  plantaSeleccionada: Plantita = {
    imagen: '',
    titulo: '',
    id:0
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.obtenerPlantas();
  }

  logout() {
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
    const archivoCapturado = event.target.files[0];
    if (archivoCapturado) {
      console.log('Archivo capturado:', archivoCapturado);
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
    return new Promise<string>((resolve, reject) => {
      try {
        const reader = new FileReader();

        reader.onload = (event) => {
          if (event.target && event.target.result) {
            resolve(event.target.result as string);
          } else {
            reject(new Error('No se pudo leer el archivo.'));
          }
        };

   

        reader.readAsDataURL(archivo);
      } catch (error) {
        reject(error);
      }
    });
  }

  async guardarPlanta(url: string) {
    try {
      const response = await this.http.post(url, this.nuevaPlanta).toPromise();
      console.log('Planta agregada:', response);

      this.nuevaPlanta = {
        imagen: '',
        titulo: '',
        id:0
      };
      this.archivos = [];
    } catch (error) {
      console.error('Error al agregar planta:', error);
    }
  }

  async actualizarPlanta() {
    try {
      const id = '64d923a07a58f382aecf547c'; // Asigna el valor adecuado al ID
      const url = `http://localhost:3007/Integradora/plantitas/${id}`;
  
      if (this.archivos.length > 0) {
        const base64Image = await this.convertirABase64(this.archivos[0]);
        this.plantaSeleccionada.imagen = base64Image;
      }
  
      const datosActualizados = {
        titulo: this.plantaSeleccionada.titulo,
        imagen: this.plantaSeleccionada.imagen,
        // Agrega otros campos que desees actualizar
      };
  
      const response = await this.http.put(url, datosActualizados).toPromise();
  
      await this.obtenerPlantas();
      await this.modalController.dismiss();
  
      console.log('Planta actualizada con éxito', response);
    } catch (error) {
      console.error('Error al actualizar la planta:', error);
    }
  }
  
}
