import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url_spring } from 'src/environments/environment';
import { Empleado } from '../models/empleado';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends CommonService<Empleado>{
  protected baseEndPoint = url_spring + 'empleados';

  constructor(private http: HttpClient) {
    super(http);
  }

  verifyDNI(dni: string): Observable<any> {
    return this.http.get(this.baseEndPoint + "/dni/" + dni);
  }

  verifyEmail(email: string): Observable<any> {
    return this.http.get(this.baseEndPoint + "/email/" + email);
  }

  getCargos(): Observable<any> {
    return this.http.get(this.baseEndPoint + "/cargos");
  }






}
