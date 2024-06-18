import { Component, OnInit} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormError, mensajesErr } from '../misc/form-errors';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit  {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  ngOnInit() {
    // Verificar si ya inicio sesión
  }

  get btnText() {
    return this.loginForm.valid ? 'Iniciar Sesión' : 'Iniciar Sesión';
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    console.log(this.loginForm.value);
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
