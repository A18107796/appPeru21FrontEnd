import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';
import { Usuario } from '../models/usuario';
import { url, url_check_token } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { param } from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = url_check_token;

  private _usuario!: Usuario;
  private _token!: string | null;
  private urlAuth: string = url;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {

    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && localStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(localStorage.getItem('usuario') || '') as Usuario;
    }
    return new Usuario();
  }

  public get token(): string | null {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && localStorage.getItem('token') != null) {
      this._token = localStorage.getItem('token') || '';
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario) {

    const credenciales = btoa('angularapp' + ':' + '1234');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.email);
    params.set('password', usuario.password);

    return this.http.post<any>(this.urlAuth, params.toString(), { headers: httpHeaders });
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    localStorage.setItem('token', accessToken);
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);

    this._usuario = new Usuario();
    this._usuario.id_usuario = payload.id_usuario;
    this._usuario.roles = payload.authorities;
    this._usuario.empleado.nombres = payload.nombres;
    this._usuario.empleado.id = payload.id_empleado;
    this._usuario.empleado.email = payload.email;
    localStorage.setItem("usuario", JSON.stringify(this._usuario));
  }



  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {

    if (this.token) {
      let payload = this.obtenerDatosToken(this.token);

      if (payload != null && payload.email && payload.email.length > 0) {
        return true;
      }
    }
    return false;
  }

  hasRole(role: string): boolean {

    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }


  logout(): void {
    this._token = null as any;
    this._usuario = null as any;
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  }


  checkToken(token: string) {
    this._token = null;
    const credenciales = btoa('angularapp' + ':' + '1234');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', 'admin');
    params.set('password', '1234');

    return this.http.post<any>(this.urlAuth, params.toString(), { headers: httpHeaders });
  }


 

}
