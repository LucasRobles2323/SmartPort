import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormError, mensajesErr } from '../../misc/form-errors';
import { passwordMatchValidator} from '../../misc/form-validators';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.page.html',
  styleUrls: ['./registro-usuario.page.scss'],
})
export class RegistroUsuarioPage implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(90)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      passwordConfirm: ['', [Validators.required, passwordMatchValidator]],
    });
  }

  ngOnInit() {
  }

  // Método que se ejecuta al completar formularo y presionar el boton
  onSubmit() {
    console.log(this.registerForm.value);
  }

  // Método para dirigirse a la pagina inicio sesión.
  goToLogin() {
    this.router.navigate(['../'], {relativeTo: this.route });
  }

  /**
   * Función que retorna el mensaje de error asociado a un campo del formulario
   * @param campo Campo del formulario (controlado)
   * @returns Mensaje de error asociado al campo, si es que existe
   */
  formError(campo: string): string | null {
    const control = this.registerForm.get(campo);

    if (control && control.errors) {
      const error: FormError = Object.keys(this.registerForm.get(campo)!.errors!)[0] as FormError;
      return mensajesErr[error];
    }

    return null;
  }

}
