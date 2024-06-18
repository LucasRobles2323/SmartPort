import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BusinessPerson, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Subject para controlar el estado de inicio de sesión
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable para suscribirse a cambios de inicio de sesión

  // Subject para controlar el estado de suscripción
  private isSubscribedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSubscribed$ = this.isSubscribedSubject.asObservable(); // Observable para suscribirse a cambios de suscripción

  constructor() { }

  // Método para establecer el estado de inicio de sesión
  setIsLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
  }

  // Método para obtener el estado actual de inicio de sesión
  getIsLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  // Método para establecer el estado de suscripción
  setIsSubscribed(value: boolean): void {
    this.isSubscribedSubject.next(value);
  }

  // Método para obtener el estado actual de suscripción
  getIsSubscribed(): boolean {
    return this.isSubscribedSubject.value;
  }

  // Método para establecer el usuario actual
  setUser(user: User | BusinessPerson): void {
    this.setIsSubscribed(user.isSubscribed); // Establecer estado de suscripción basado en el usuario
  }

  // Método para limpiar todos los datos del usuario al cerrar sesión
  clearUser(): void {
    this.setIsLoggedIn(false); // Establecer inicio de sesión a falso
    this.setIsSubscribed(false); // Establecer suscripción a falso
  }

}