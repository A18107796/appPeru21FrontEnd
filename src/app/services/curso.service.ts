import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { url_spring } from 'src/environments/environment';
import { Estado } from '../enums/estado';
import { Curso } from '../models/curso';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends CommonService<Curso>{
  protected baseEndPoint = url_spring + 'cursos'

  public emitCursos: EventEmitter<Curso[]> = new EventEmitter();




}
