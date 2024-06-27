import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormError, mensajesErr } from 'src/app/misc/form-errors';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
      namePerson: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    });
  }

  ngOnInit() {
    this.loadCurrentUser(); // Cargar datos del usuario actual al inicializar el componente
  }

  // Método para actualizar los datos del usuario
  updateUser() {
    if (this.editForm.valid) {
      console.log('Formulario válido. Actualizando usuario...');

      // Actualizar solo los campos modificados
      const updatedUserData = {
        namePerson: this.editForm.get('namePerson')!.value,
        userName: this.editForm.get('userName')!.value,
        rut: this.currentUser.rut,
        isAdmin: this.currentUser.isAdmin,
        isSuscribed: this.currentUser.isSuscribed,
        isBusiness: this.currentUser.isBusiness,
      };

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
    const control = this.editForm.get(campo);
    if (control && control.errors) {
      const error: FormError = Object.keys(control.errors)[0] as FormError;
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
            namePerson: this.currentUser.namePerson,
            userName: this.currentUser.userName,
          });
        }
      },
      (error) => {
        console.error('Error al cargar el usuario actual', error);
        alert("Error al cargar el usuario actual, sesión expirada.");
        this.redirigirInicioSesion();
      }
    );
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
