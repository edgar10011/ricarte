import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {
  constructor(private router: Router, private http: HttpClient) { }
  //user: { username: string; password: string } = { username: '', password: '' };
  username: string = '';
  password: string = '';

  register() {
    console.log('Cargando registro');
    const data = {
      username: this.username,
      password: this.password,
    };

    this.http.post('http://localhost:3004/register', data).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
    this.router.navigate(['../login'])
  }
}