import { Component } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage {
  losbuses: boolean = false;
  constructor() {}

  toggleChanged(event: CustomEvent) {
    const isChecked = event.detail.checked;
    if (isChecked) {
      console.log('El toggle está activado.');
      this.losbuses = true;

    } else {
      console.log('El toggle está desactivado.');
      this.losbuses = false;

    }
  }
}