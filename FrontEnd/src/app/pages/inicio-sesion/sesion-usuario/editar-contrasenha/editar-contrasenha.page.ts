import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormError, mensajesErr } from 'src/app/misc/form-errors';
import { passwordMatchValidator} from 'src/app/misc/form-validators';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editar-contrasenha',
  templateUrl: './editar-contrasenha.page.html',
  styleUrls: ['./editar-contrasenha.page.scss'],
})
export class EditarContrasenhaPage implements OnInit {
  userPasswordForm: FormGroup;
  currentUser: any;

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService,
              private router: Router) {
    // Se inicializa el formulario con los campos requeridos y las validaciones
    this.userPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      passwordConfirm: ['', [Validators.required, passwordMatchValidator]],
    });
  }

  ngOnInit() {
    
  }

  changePassword(){
    const newPasword = this.userPasswordForm.get('password')!.value;
    // Aquí se actualizan los datos del usuario en la base de datos
    this.usuariosService.changePassword(newPasword).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        // Redirigir a la página de perfil o dashboard
        this.redirigirUsuario();
      },
      error => {
        console.error('Error al actualizar usuario:', error);
      }
    );
  }

  goToUser(){
    this.redirigirUsuario();
  }

  /**
   * Función que retorna el mensaje de error asociado a un campo del formulario
   * @param campo Campo del formulario (controlado)
   * @returns Mensaje de error asociado al campo, si es que existe
   */
  formError(campo: string): string | null {
    if (this.userPasswordForm.get(campo)!.errors) {
      const error: FormError = Object.keys(this.userPasswordForm.get(campo)!.errors!)[0] as FormError;
      return mensajesErr[error];
    }
    return null;
  }


  // Método para dirigirse a la pagina registro de usuario.
  private redirigirInicioSesion() {
    this.router.navigate(['inicio-sesion']);
  }

  // Método para dirigirse a la página de inicio de sesión
  private redirigirUsuario() {
    this.router.navigate(['inicio-sesion/sesion-usuario']);
  }
}
