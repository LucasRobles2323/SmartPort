import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${email}`);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/current-usuario`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/new-usuario`, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, user);
  }

  changePassword(newPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/change-password`, { new_password: newPassword });
  }

  deleteUser(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/current-user`);
  }

  deleteDistinctUser(email: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/distinct-user`, { body: { email } });
  }

}