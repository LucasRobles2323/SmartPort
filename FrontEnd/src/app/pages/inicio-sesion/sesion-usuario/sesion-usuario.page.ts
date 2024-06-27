import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


export interface Usuario {
  email: string;
  isAdmin: number; // 1 es true y 0 es false en sql
  isSuscribed: number; // 1 es true y 0 es false en sql
  isBusiness: number; // 1 es true y 0 es false en sql
  nombre: string;
  nombre_usuario: string;
  rut: string;
}

@Component({
  selector: 'app-sesion-usuario',
  templateUrl: './sesion-usuario.page.html',
  styleUrls: ['./sesion-usuario.page.scss'],
})
export class SesionUsuarioPage implements OnInit {
  currentUser: Usuario | null = null;
  

  constructor(private usuariosService: UsuariosService, private authService : AuthService,
              private router: Router, private tokenStorage: TokenStorageService) 
  { }

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.usuariosService.getCurrentUser().subscribe(
      (user) => {
        this.currentUser = user;
      },
      (error) => {
        console.error('Error al cargar el usuario actual', error);
        alert("Error al cargar el usuario actual, sesion expirada.");
        this.redirigirInicioSesion();
      }
    );
  }

  editUser() {
    // Lógica para editar usuario
    this.redirigirEditarUsuario();
  }

  changePassword() {
    this.redirigirCambiarContrasenha();
  }

  viewReports() {
    this.redirigirCambiarContrasenha();
  }

  manageUsers() {
    // Lógica para gestionar usuarios (solo accesible si isAdmin es true)
    this.redirigirAdminDeleteUsers();
  }

  logout() {
    // Lógica para cerrar sesión
    this.authService.logout().subscribe(
      () => {
        this.tokenStorage.signOut();
        console.log("logout exitoso");
        this.router.navigate(['inicio-sesion']);
      },
      (error) => {
        console.error('Error al cerrar sesión', error);
        // Manejar el error según sea necesario (mostrar mensaje, etc.)
      }
    );
  }

  deleteAccount() {
    // Lógica para eliminar cuenta
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      this.usuariosService.deleteUser().subscribe(
        () => {
          this.tokenStorage.signOut(); // Cerrar sesión después de eliminar la cuenta
          console.log("Cuenta Eliminada");
          this.router.navigate(['inicio-sesion']);
        },
        (error) => {
          console.error('Error al eliminar cuenta', error);
          // Manejar el error según sea necesario (mostrar mensaje, etc.)
        }
      );
    }
  }

  private redirigirInicioSesion(){
    this.router.navigate(['inicio-sesion']);
  }

  private redirigirAdminDeleteUsers(){
    this.router.navigate(['inicio-sesion/sesion-usuario/admin-delete-users']);
  }

  private redirigirEditarUsuario(){
    this.router.navigate(['inicio-sesion/sesion-usuario/editar-usuario']);
  }

  private redirigirCambiarContrasenha(){
    this.router.navigate(['inicio-sesion/sesion-usuario/editar-contrasenha']);
  }

  private redirigirVerReportes(){
    alert("Pagina aun no creada.");
    //this.router.navigate(['inicio-sesion/sesion-usuario/ver-reportes']);
  }
}
