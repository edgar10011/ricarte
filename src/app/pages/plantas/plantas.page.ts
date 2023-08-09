import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService';
import { IonModal } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { OverlayEventDetail } from '@ionic/core/components';

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
    private http: HttpClient, 
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


}
// export class ExampleComponent {
//   @ViewChild(IonModal) modal: IonModal;

//   message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
//   name: string;

//   cancel() {
//     this.modal.dismiss(null, 'cancel');
//   }

//   confirm() {
//     this.modal.dismiss(this.name, 'confirm');
//   }

//   onWillDismiss(event: Event) {
//     const ev = event as CustomEvent<OverlayEventDetail<string>>;
//     if (ev.detail.role === 'confirm') {
//       this.message = `Hello, ${ev.detail.data}!`;
//     }
//   }
// }
