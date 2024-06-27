import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormError, mensajesErr } from 'src/app/misc/form-errors';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
              private authService: AuthService, private tokenStorage: TokenStorageService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  ngOnInit() {
    // Verificar si hay sesión iniciada al cargar la página, si la hay ir a sesion usuario
    const token = this.tokenStorage.getToken();
    if (token) {
      // Redirigir a la página de sesión de usuario si hay un token válido
      this.redirigirSesionUsuario();
    }

  }
  
  // Método que se ejecuta al completar formulario y presionar el botón
  login() {
    if (this.loginForm.valid) {

      const { email, password } = this.loginForm.value;
  
      // Log the payload to the console
      console.log('Sending login request with payload:', { email, password });

      this.authService.login(email, password).subscribe(
        () => {
          console.log('Login exitoso');

          this.redirigirSesionUsuario();
        },
        error => {
          console.error('Error en el inicio de sesión:', error);
        }
      );
    }
  }

  // Método para dirigirse a la pagina registro de usuario.
  goToRegister() {
    this.redirigirRegistro();
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

  private redirigirSesionUsuario(){
    this.router.navigate(['inicio-sesion/sesion-usuario']);
  }

  // Método para dirigirse a la pagina registro de usuario.
  private redirigirRegistro() {
    this.router.navigate(['inicio-sesion/registro-usuario']);
  }
}
