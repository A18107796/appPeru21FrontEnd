import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { url_spring } from 'src/environments/environment';
import { Estado } from '../enums/estado';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private url: string = url_spring + 'cursos'
  constructor(private http: HttpClient) { }


  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url);
  }


  create(curso: Curso): Observable<any> {
    curso.estado = Estado.ACTIVO;
    return this.http.post(this.url, curso).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(curso: Curso): Observable<any> {
    return this.http.put(this.url + '/edit/' + curso.id, curso).pipe(
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

  getCurso(id: any): Observable<any> {
    return this.http.get(this.url + "/" + id).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
