import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FormError, mensajesErr } from 'src/app/misc/form-errors';
import { passwordMatchValidator, rutValidator } from 'src/app/misc/form-validators';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService,
              private router: Router, private route: ActivatedRoute)
  {
    // Se inicializa el formulario con los campos requeridos y las validaciones
    this.registerForm = this.fb.group({
      namePerson: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      passwordConfirm: ['', [Validators.required, passwordMatchValidator]],
    });
  }

  // Se obtienen las regiones al iniciar el componente
  ngOnInit() {

  }

  register() {
    if (this.registerForm.valid) {
      // Aqui se registra el usuari en la vd y se redirige a inicio sesion
      this.usuariosService.createUser(this.registerForm.value).subscribe(
        response => {
          console.log(response);
          console.log("Registrado exitosamente");
          this.redirigirInicioSesion();
        },
      );
    }
  }

  // Método para dirigirse a la pagina inicio sesión.
  goToLogin() {
    this.redirigirInicioSesion();
  }

  /**
   * Función que retorna el mensaje de error asociado a un campo del formulario
   * @param campo Campo del formulario (controlado)
   * @returns Mensaje de error asociado al campo, si es que existe
   */
  formError(campo: string): string | null {
  const control = this.registerForm.get(campo);
  if (control && control.errors) {
    const error: FormError = Object.keys(control.errors)[0] as FormError;
    return mensajesErr[error];
  }
  return null;
}

  // Método para dirigirse a la pagina registro de usuario.
  private redirigirInicioSesion() {
    this.router.navigate(['inicio-sesion']);
  }
}