import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(private router: Router) { }

  showLoaderAndRedirectToLogin() {
    const delay = 3000; // 5 segundos

    setTimeout(() => {
      // Ocultar el spinner después de 5 segundos
      // Aquí puedes implementar tu lógica para ocultar el spinner

      // Redirigir a la página de login
      this.router.navigate(['../pages/home']);
    }, delay);
  }
}
