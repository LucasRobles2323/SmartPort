import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { User, BusinessPerson } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sesion-usuario',
  templateUrl: './sesion-usuario.page.html',
  styleUrls: ['./sesion-usuario.page.scss'],
})

export class SesionUsuarioPage implements OnInit {
  mail: string = '';
  password: string = '';
  user!: User;
  business!: BusinessPerson;

  constructor(private router: Router, private authService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const password = params['password'];
      if (email && password) {

        if(email == "lux23@mail.com" && password == "1234567"){
          // Crear una variable de tipo User
          this.user = {
            email: 'user@example.com',
            username: 'user123',
            nameperson: 'John Doe',
            password: 'password123',
            isAdmin: true,
            isSubscribed: false
          } as User;

          this.authService.setUser(this.user);
        }

        if(email == "ger32@mail.com" && password == "7654321"){
          // Crear una variable de tipo User
          this.business = {
            email: 'ger32@mail.com',
            username: 'ger32lad',
            nameperson: 'Jane Doe',
            password: '7654321',
            isAdmin: true,
            isSubscribed: true,
            rutCompany: '12345678-9',
            rutPerson: '87654321-0',
            nameCompany: 'Tech Corp'
          } as BusinessPerson;

          this.authService.setUser(this.business);
        }
        
      }
    });
  }

  logout() {
    this.authService.clearUser();

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  suscribe(){

  }

  viewReports(){
    
  }

}
