// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/authService';
// import { HttpClient } from '@angular/common/http';



// @Component({
//   selector: 'app-plantas',
//   templateUrl: './plantas.page.html',
//   styleUrls: ['./plantas.page.scss'],
// })
// export class PlantasPage {

//   constructor(private router: Router, private authService: AuthService, private http: HttpClient) { }
//   logout() {
//     // Aquí iría la lógica para cerrar la sesión, por ejemplo, borrar los datos del usuario en el almacenamiento local o en el servicio de autenticación.
//     // Luego, redirigir al usuario a la página de inicio de sesión.
//     this.authService.logout();
//     console.log('Sesión cerrada')
//     // Ejemplo de redirección a la página de inicio de sesión:
//     this.router.navigate(['/login']);
//   }

//   obtenerPlantas() {
//     this.http.get('mongodb://localhost:27017/Integradora').subscribe(
//       (data) => {
//         // Aquí puedes procesar los datos recibidos de la base de datos
//         console.log(data);
//       },
//       (error) => {
//         console.error('Error al obtener datos de la base de datos:', error);
//       }
//     );
  
//   }
//   ngOnInit() {
//     this.obtenerPlantas();
//   }
  
  
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService';
import { HttpClient } from '@angular/common/http';

interface Plantita {
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
  plantas: Plantita[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient  
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
    //this.http.get<Plantita[]>('http://localhost:3007/obtenerPlantas').subscribe(
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

  // trackByFn(index: number, item: Plantita): string {
  //   return item.titulo; // Puedes utilizar el campo único que prefieras aquí
  
  // }

}
