import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suscription',
  templateUrl: './suscription.page.html',
  styleUrls: ['./suscription.page.scss'],
})
export class SuscriptionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  suscriptionUser(){
    if(confirm('¿Estás seguro de que deseas realizar esta transacción?')){
      // Aqui se deberia llamar al backend para cambiar el esta de suscripcion del usuario
      this.redirigirUsuario();
    }
  }

  suscriptionBusisness(){
    if(confirm('¿Estás seguro de que deseas realizar esta transacción?')){
      // Aqui se deberia llamar al backend para cambiar el esta de suscripcion del empresario, ademas de pedirle los datos de su linea y mandarselos al backend.
      this.redirigirUsuario();
    }
  }

  goToUser(){
    this.redirigirUsuario();
  }

  // Método para dirigirse a la página de inicio de sesión
  private redirigirUsuario() {
    this.router.navigate(['inicio-sesion/sesion-usuario']);
  }

}
