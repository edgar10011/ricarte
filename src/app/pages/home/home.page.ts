import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showSpinner: boolean = true;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.showLoaderAndRedirectToLogin();

    setTimeout(() => {
      this.showSpinner = false;
    }, 3000);
  }
}
