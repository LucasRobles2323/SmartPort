import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  losbuses: boolean = false;
  isSuscribed: boolean = false;

  constructor(private usuariosService: UsuariosService,private tokenStorage: TokenStorageService) {}

  ngOnInit() {
    // Verificar si hay sesión iniciada al cargar la página, si la hay ir a sesion usuario
    const token = this.tokenStorage.getToken();
    if (token) {
      this.loadCurrentUser();
    }
    else{
      this.isSuscribed = false;
    }
    this.losbuses = false;
  }

  loadCurrentUser() {
    this.usuariosService.getCurrentUser().subscribe(
      (user) => {
        if(user.isSuscribed != null){
          if (user.isSuscribed == 1){
            this.isSuscribed = true;
          }
          else{this.isSuscribed = false;}
        }
        else{
          this.isSuscribed = false;
        }
        
      },
      (error) => {
        console.error('Error al cargar el usuario actual', error);
      }
    );
  }

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