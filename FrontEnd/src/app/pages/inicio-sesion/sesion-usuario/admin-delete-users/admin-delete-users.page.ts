import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-admin-delete-users',
  templateUrl: './admin-delete-users.page.html',
  styleUrls: ['./admin-delete-users.page.scss'],
})
export class AdminDeleteUsersPage implements OnInit {
  users: any[] = [];
  allUsersLoaded: boolean = false;
  loadedUsers: number = 0;
  usersPerPage: number = 10;

  constructor(private router: Router,private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(event?: any) {
    this.usuariosService.getUsers().subscribe(
      (data) => {
        const nonAdminUsers = data.filter(user => !user.isAdmin).slice(this.loadedUsers, this.loadedUsers + this.usersPerPage);
        if (nonAdminUsers.length < this.usersPerPage) {
          this.allUsersLoaded = true;
        }
        this.users = [...this.users, ...nonAdminUsers];
        this.loadedUsers += nonAdminUsers.length;
  
        if (event) {
          event.target.complete();
        }
      },
      (error) => {
        console.error('Error al cargar usuarios', error);
        if (event) {
          event.target.complete();
        }
      }
    );
  }

  loadMoreUsers(event: any) {
    this.loadUsers(event);
  }

  deleteUser(email: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuariosService.deleteDistinctUser(email).subscribe(
        () => {
          this.users = this.users.filter(user => user.email !== email);
          this.loadedUsers--; // Decrement loadedUsers because one user is removed
          console.log("Usuario eliminado exitosamente");
        },
        (error) => {
          console.error('Error al eliminar usuario', error);
        }
      );
    }
  }

  goToUser(){
    this.redirigirUsuario();
  }

  // Método para dirigirse a la página de inicio de sesión
  private redirigirUsuario() {
    this.router.navigate(['inicio-sesion/sesion-usuario']);
  }
}
