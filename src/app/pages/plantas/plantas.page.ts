import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/authService' 



interface Plantita {
  imagen: string;
  titulo: string;
  humedad?: number;
  id: string;
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
    id: '',
    titulo: '',
  };

  plantaSeleccionada: Plantita = {
    imagen: '',
    titulo: '',
    id: '',
  };

  private toastShown: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private modalController: ModalController,
    private authService: AuthService,
    private toastController: ToastController
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

  // async obtenerPlantas() {
  //   this.http.get<Plantita[]>('http://localhost:3007/Integradora/plantitas').subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.plantas = data;
  //       this.verificarHumedad(data);
  //     },
  //     (error) => {
  //       console.error('Error al obtener plantas de la base de datos:', error);
  //     }
  //   );
  // }
  async obtenerPlantas() {
    // Obtener el token de autenticación desde tu servicio de autenticación
    const authToken = this.authService.getToken(); // Reemplaza con tu lógica real
  
    if (!authToken) {
      console.log('Usuario no autenticado');
      this.plantas = [];
      return;
    }
  
    // Configurar los encabezados de la solicitud con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  
    // Realizar la solicitud HTTP con los encabezados configurados
    this.http.get<Plantita[]>('http://localhost:3007/Integradora/plantitas', { headers }).subscribe(
      (data) => {
        console.log(data);
        // Filtrar las plantas por el nombre de usuario autenticado
        const authenticatedUser = this.authService.getAuthenticatedUser(); // Suponiendo que tienes un método para obtener el usuario autenticado
  
        if (authenticatedUser) {
          console.log('Usuario autenticado:', authenticatedUser);
  
          this.plantas = data.filter(planta => planta.usuario === authenticatedUser.username);
          this.verificarHumedad(data);
        } else {
          console.log('Usuario no autenticado');
          this.plantas = [];
        }
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

  // async agregarPlanta() {
  //   try {
  //     const url = 'http://localhost:3007/Integradora/plantitas';

  //     if (this.archivos.length > 0) {
  //       const base64Image = await this.convertirABase64(this.archivos[0]);
  //       this.nuevaPlanta.imagen = base64Image;
  //     }

  //     await this.guardarPlanta(url);
  //     // Actualizar la lista de plantas después de agregar
  //     this.obtenerPlantas();

  //     window.location.reload();
  //     this.obtenerPlantas();
  //   } catch (error) {
  //     console.error('Error al agregar planta:', error);
  //   }
  // }

  async agregarPlanta() {
    try {
      const url = 'http://localhost:3007/Integradora/plantitas';
  
      if (this.archivos.length > 0) {
        const base64Image = await this.convertirABase64(this.archivos[0]);
        this.nuevaPlanta.imagen = base64Image;
      }
  
      await this.guardarPlanta(url);
      // No es necesario llamar obtenerPlantas() aquí, ya que se llama después de agregar
      this.obtenerPlantas();
  
      // No es necesario recargar la página y llamar obtenerPlantas() nuevamente
    } catch (error) {
      console.error('Error al agregar planta:', error);
    }
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
        id: '',
      };
      this.archivos = [];
    } catch (error) {
      console.error('Error al agregar planta:', error);
    }
  }



  async eliminarPlanta(titulo: string) {
    try {
      const url = `http://localhost:3007/Integradora/plantitas/titulo/${titulo}`;

      await this.http.delete(url).toPromise();
      console.log(`Planta con título ${titulo} eliminada`);

      // Actualizar la lista de plantas después de la eliminación
      this.obtenerPlantas();
    } catch (error) {
      console.error(`Error al eliminar planta con título ${titulo}:`, error);
    }
  }

  async verificarHumedad(plantas: Plantita[]) {
    if (plantas.length > 0) {
      const stored_humidity2 = plantas[0].humedad;
      if (stored_humidity2 !== undefined && stored_humidity2 !== null) {
        console.log('Humedad almacenada en la base de datos 2:', stored_humidity2, '%');

        if (stored_humidity2 < 30 && !this.toastShown) {
          this.presentToast('La humedad del suelo es baja. Iniciando riego...');
          this.toastShown = true;
        } else if (stored_humidity2 >= 30) {
          this.presenteToast('Humedad adecuada. Riego desactivado');
        }
      }
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'danger',
    });

    toast.present();
  }

  async presenteToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'success',
    });

    toast.present();
  }
}
