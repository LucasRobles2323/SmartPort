import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormError, mensajesErr } from '../misc/form-errors';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit  {
  loginForm: FormGroup;
  isLoggedIn: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, 
              private router: Router, private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  ngOnInit() {
    // Verificar si ya inicio sesión
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  // Método que se ejecuta al completar formularo y presionar el boton
  onSubmit() {
    console.log(this.loginForm.value);

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if( (email == "lux23@mail.com" && password == "1234567") || (email == "ger32@mail.com" && password == "7654321")){
      // Guardar información de sesión en el almacenamiento local
      localStorage.setItem('session', JSON.stringify({ loggedIn: true }));
      // Actualizar estado de isLoggedIn
      this.isLoggedIn = true;

      this.router.navigate(['sesion-usuario'], {queryParams: { email, password }, relativeTo: this.route });
    }
    else{
      alert('Email o contraseña incorrectos');
    }

  }

  // Método para dirigirse a la pagina registro de usuario.
  goToRegister() {
    this.router.navigate(['registro-usuario'], {relativeTo: this.route });
  }

  /**
   * Función que retorna el mensaje de error asociado a un campo del formulario
   * @param campo Campo del formulario (controlado)
   * @returns Mensaje de error asociado al campo, si es que existe
   */
  formError(campo: string): string | null {
    const control = this.loginForm.get(campo);

    if (control && control.errors) {
      const error: FormError = Object.keys(this.loginForm.get(campo)!.errors!)[0] as FormError;
      return mensajesErr[error];
    }

    return null;
  }

}
