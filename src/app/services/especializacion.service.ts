import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { url_spring } from 'src/environments/environment';
import { Especializacion } from '../models/especializacion';
import { EspecializacionTipo } from '../models/especializacion-tipo';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Estado } from '../enums/estado';
import { Curso } from '../models/curso';
import { CommonService } from './common.service';
import { CommonServiceStatusService } from './common-service-status.service';

@Injectable({
  providedIn: 'root'
})
export class EspecializacionService extends CommonServiceStatusService<Especializacion> {


  protected baseEndPoint = url_spring + 'especializaciones';

  constructor(private http: HttpClient) {
    super(http);
  }


  getTipoEspecializaciones(): Observable<EspecializacionTipo[]> {
    return this.http.get<EspecializacionTipo[]>(this.baseEndPoint + '/tipos');
  }

  saveChanges(especializacion: Especializacion): Observable<any> {
    return this.http.put(this.baseEndPoint + '/' + especializacion.id + '/save-changes', especializacion.cursos).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  

  getEspecializacionByPeriodo(idPeriodo: number): Observable<any> {
    return this.httpClient.get(`${this.baseEndPoint}/periodos/${idPeriodo}`);
  }

}
