import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { url_spring } from 'src/environments/environment';
import { Especializacion } from '../models/especializacion';
import { EspecializacionTipo } from '../models/especializacion-tipo';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Estado } from '../enums/estado';

@Injectable({
  providedIn: 'root'
})
export class EspecializacionService {


  private url: string = url_spring + "especializaciones";
  constructor(private http: HttpClient) {

  }
  getEspecializaciones(): Observable<Especializacion[]> {
    return this.http.get<Especializacion[]>(this.url);
  }

  getTipoEspecializaciones(): Observable<EspecializacionTipo[]> {
    return this.http.get<EspecializacionTipo[]>(this.url + '/tipos');
  }

  create(especializacion: Especializacion): Observable<any> {
    especializacion.estado = Estado.ACTIVO;
    return this.http.post(this.url, especializacion).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(especializacion: Especializacion): Observable<any> {
    return this.http.put(this.url + '/edit/' + especializacion.id, especializacion).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  delete(id: Number): Observable<any> {
    return this.http.delete(this.url + '/' + id).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  getEspecializacion(id: any): Observable<any> {
    return this.http.get(this.url + "/" + id).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  saveChanges(especializacion: Especializacion): Observable<any> {
    return this.http.put(this.url + '/' + especializacion.id + '/save-changes', especializacion).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
