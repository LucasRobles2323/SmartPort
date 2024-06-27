import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormError, mensajesErr } from 'src/app/misc/form-errors';
import { rutValidator } from 'src/app/misc/form-validators';
import { UsuariosService } from 'src/app/services/usuarios.service';

interface Region {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {
  editForm: FormGroup;
  currentUser: any; // Objeto que contiene los datos del usuario actual

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService,
              private router: Router) {
    // Inicializar el formulario con los campos y validaciones necesarias
    this.editForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      nombre_usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      rut: [''],
    });
  }

  ngOnInit() {
    this.loadCurrentUser(); // Cargar datos del usuario actual al inicializar el componente

    if(this.currentUser.isBusiness && this.currentUser.isAdmin){
      // Validar el campo 'rut' solo si existe y es necesario
      this.validateRutField();
    }
  }

  // Método para actualizar los datos del usuario
  updateUser() {
    if (this.editForm.valid) {
      console.log('Formulario válido. Actualizando usuario...');

      // Actualizar solo los campos modificados
      const updatedUserData = {
        nombre: this.editForm.get('nombre')!.value,
        nombre_usuario: this.editForm.get('nombre_usuario')!.value,
        rut: this.editForm.get('rut')!.value,
        isAdmin: false,
        isSuscribed: false,
        isBusiness: false,
      };

      // Agregar isAdmin si está presente en currentUser
      if (this.currentUser.isAdmin) {
        updatedUserData['isAdmin'] = this.currentUser.isAdmin;
      }

      // Agregar isAdmin si está presente en currentUser
      if (this.currentUser.isSuscribed) {
        updatedUserData['isSuscribed'] = this.currentUser.isSuscribed;
      }

      // Agregar isAdmin si está presente en currentUser
      if (this.currentUser.isBusiness) {
        updatedUserData['isBusiness'] = this.currentUser.isBusiness;
      }

      // Aquí se actualizan los datos del usuario en la base de datos
      this.usuariosService.updateUser(updatedUserData).subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          // Redirigir a la página de perfil o dashboard
          this.redirigirUsuario();
        },
        error => {
          console.error('Error al actualizar usuario:', error);
        }
      );
    } else {
      console.log('Formulario inválido. No se puede actualizar usuario.');
    }
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
    if (this.editForm.get(campo)!.errors) {
      const error: FormError = Object.keys(this.editForm.get(campo)!.errors!)[0] as FormError;
      return mensajesErr[error];
    }
    return null;
  }

  // Método para obtener los datos del usuario actual
  private loadCurrentUser() {
    this.usuariosService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
        // Cargar los datos del usuario en el formulario
        if (this.currentUser) {
          this.editForm.patchValue({
            nombre: this.currentUser.nombre,
            nombre_usuario: this.currentUser.nombre_usuario,
            rut: this.currentUser.rut,
          });

          // Validar el campo 'rut' solo si existe y es necesario
          this.validateRutField();
        }
      },
      (error) => {
        console.error('Error al cargar el usuario actual', error);
        alert("Error al cargar el usuario actual, sesión expirada.");
        this.redirigirInicioSesion();
      }
    );
  }

  // Método para validar el campo 'rut' si es necesario
  private validateRutField() {
    const rutControl = this.editForm.get('rut');

    if(rutControl){
      if (this.currentUser && this.currentUser.isSuscribed && this.currentUser.isBusiness) {
        rutControl.setValidators([Validators.required, rutValidator]);
      } else {
        rutControl.clearValidators();
      }
      rutControl.updateValueAndValidity();
    }
  }

  // Método para dirigirse a la página de inicio de sesión
  private redirigirInicioSesion() {
    this.router.navigate(['inicio-sesion']);
  }

  // Método para dirigirse a la página de inicio de sesión
  private redirigirUsuario() {
    this.router.navigate(['inicio-sesion/sesion-usuario']);
  }

}
